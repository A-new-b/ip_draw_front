<template>
  <div>
    <v-chart :options="option" style="width: 100%; height: 400px" />
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
import axios from "axios";

export default {
  components: {
    "v-chart": ECharts
  },
  data() {
    return {
      option: {
        xAxis: {
          type: 'category', // category为一级分类,适用于离散的类目数据
          boundaryGap: false,  // 无间隙
          data: Array.from(Array(100), (v,k) =>k)
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line"
          }
        ]
      }
    };
  },
  mounted() {
    this.updateData();
  },
  methods: {
    startListen() {

    },
    endListen() {

    },
    updateData() {
      let abc=this

      this.timer = setInterval(() => {
        //console.log(_this)
        // console.log(this)
        //console.log(_this.option.series.);//["data"][0]++;
        //console.log(JSON.parse(JSON.stringify(_this.option.series)));

        // 获取真实数据
        //console.log(JSON.parse(JSON.stringify(_this.option.series[0])));
        let handler=function(response){
          let _this=abc
          //console.log(response)

          _this.option.series[0].data.push(response.data["now_bytes"])

        }
        axios
            .get("/api/counter")
            .then(response=>handler(response));

        // 无用，因为vue无法识别数组内的更改
        //this.option.series[0].data[0] += 10;
        window.a = abc;
      }, 1000);
    }
  }

};
</script>
