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

export default {
  components: {
    "v-chart": ECharts,
  },
  data() {
    return {
      option: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      },
    };
  },
  methods:{
    startListen(){

    }
  },

};
</script>
