<template>
  <div>
    <div style="float:left;width: 50%;">
      <v-chart autoresize :options="option_for_second_num" style="float:left;width: 100%; height: 400px " />
      <div align="center">总数据包：{{ now_num }}</div>
    </div>

    <div style="float:left;width: 50%;">
      <v-chart autoresize :options="option_for_second_bytes" style="float:left;width: 100%; height: 400px" />
      <div align="center"> 总流量：{{ now_bytes }}</div>
    </div>


    <v-container style="display: flex;flex-direction: row;justify-content: center">
      <v-btn color="primary" style="margin: 1%">开始监听</v-btn>
      <v-btn color="primary" style="margin: 1%">停止监听</v-btn>
    </v-container>
  </div>

</template>
<style></style>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/polar";
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import axios from "axios";

export default {
  components: {
    "v-chart": ECharts
  },
  data() {
    return {
      now_num: undefined,
      now_bytes: undefined,
      option_for_second_num: {
        title: {
          left: 'center',
          text: '每秒处理数据包/个',
        },
        tooltip: {
          trigger: "axis",

          // axisPointer: {
          //   type: 'cross',
          //   animation: false,
          //   label: {
          //     backgroundColor: '#ccc',
          //     borderColor: '#aaa',
          //     borderWidth: 1,
          //     shadowBlur: 0,
          //     shadowOffsetX: 0,
          //     shadowOffsetY: 0,
          //
          //     color: '#222'
          //   }
          // },
        },
        xAxis: {
          type: "time",
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          splitLine: {
            show: true
          }
        },
        series: [
          {
            // data: [150, 230, 224, 218, 135, 147, 260],
            name:"每秒数据包",
            data: [],
            showSymbol: true,
            hoverAnimation: false,
            type: "line"
          }
        ]
      },
      option_for_second_bytes: {
        title: {
          left: 'center',
          text: '每秒处理数据/字节',
        },
        tooltip: {
          trigger: "axis",
          // axisPointer: {
          //   animation: false
          // }
        },
        xAxis: {
          type: "time",
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          splitLine: {
            show: true
          }
        },
        series: [
          {
            // data: [150, 230, 224, 218, 135, 147, 260],
            name:"每秒字节",
            data: [],
            showSymbol: true,
            hoverAnimation: false,
            type: "line",
          }
        ]
      }
    };
  },
  mounted() {
    this.initalizeData();
    this.setIntervalForUpdate();
  },
  methods: {
    startListen() {

    },
    endListen() {

    },
    setIntervalForUpdate() {
      let abc = this;

      this.timer = setInterval(() => {
        // 获取真实数据
        //console.log(JSON.parse(JSON.stringify(_this.option.series[0])));


        let handler = function(response) {
          let _this = abc;
          //console.log(response)

          let second_num = response.data["second_num"];
          let second_bytes = response.data["second_bytes"];

          _this.option_for_second_num.series[0].data.shift();
          _this.option_for_second_num.series[0].data.push(_this.packTimeAndData(second_num));

          _this.option_for_second_bytes.series[0].data.shift();
          _this.option_for_second_bytes.series[0].data.push(_this.packTimeAndData(second_bytes));

          _this.now_num = response.data["now_num"] + " 个";
          _this.now_bytes = _this.readablizeBytes(response.data["now_bytes"]);
        };
        axios
            .get("/api/counter")
            .then(response => handler(response));

        // 无用，因为vue无法识别数组内的更改
        //this.option.series[0].data[0] += 10;
        window.a = abc;
      }, 1000);
    },
    initalizeData() {
      let now = new Date();
      for (let i = -100; i < 0; i++) {
        let time = new Date(now.getTime() + i * 1000);
        this.option_for_second_num.series[0].data.push([time, 0]);
        this.option_for_second_bytes.series[0].data.push([time, 0]);
      }
    }
    ,
    packTimeAndData(value) {
      // 把当前时间与数据结合在一起作为一个数据点
      let now = new Date();
      return {
        name: now.toString(),
        value: [
          now,
          value
        ]
      };
    },
    readablizeBytes(bytes) {
      var s = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
      var e = Math.floor(Math.log(bytes) / Math.log(1024));
      return (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + " " + s[e];
    }
  }


};
</script>
