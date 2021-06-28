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
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
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
      let _this = this;
      axios
          .get("/api/init")
          .then(response => (this.data = response.data));
      this.timer = setInterval(() => {
        //console.log(_this)
        // console.log(this)
        //console.log(_this.option.series.);//["data"][0]++;
        //console.log(JSON.parse(JSON.stringify(_this.option.series)));

        // 获取真实数据
        //console.log(JSON.parse(JSON.stringify(_this.option.series[0])));

        this.option.series[0].data[0] += 10;
        //this._init()
        //console.log(_this.setOption)
        window.a = _this;
      }, 1000);
    }
  }

};
</script>
