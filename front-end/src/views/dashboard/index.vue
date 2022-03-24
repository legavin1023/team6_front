<template>
  <div class="main box">
    <div class="text_box">
      <div>
        <p>3호기 x 좌표값 : {{}}</p>
        <p>3호기 y 좌표값 : {{}}</p>
      </div>
      <div>
        <p>하루 총 생산량</p>
        <p>{{}}</p>
      </div>
      <div>
        <p>3호기 가동 시작 : {{}}</p>
        <p>3호기 가동 종료 : {{}}</p>
      </div>
      <div class="clack">
        <span>시계아이콘</span>
        <p>작동 시간</p>
        <p>{{}}</p>
      </div>
    </div>
    <div class="line_chart"><AreaChart style="height: 280px; width: 980px" /></div>
    <div class="chart_box">
      <div class="donut_chart">
        <PieChart_1 style="height: 160px; width: 245px" /><PieChart_2 style="height: 160px; width: 245px" />
      </div>
      <div class="bar_chart"><BarChart style="height: 190px; width: 470px" /></div>
    </div>
  </div>
</template>

<script>
import AreaChart from './AreaChart.vue'
import PieChart_1 from './PieChart_1.vue'
import PieChart_2 from './PieChart_2.vue'
import BarChart from './BarChart.vue'

export default {
  name: 'App',
  components: {
    AreaChart,
    PieChart_1,
    PieChart_2,
    BarChart
  },
  data() {
    return {
      chartData: {
        Books: 24,
        Magazine: 30
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .text_box {
    display: flex;
    margin-top: 2.5%;
    > div {
      display: inline-block;
      border: 3px solid $sub3;
      color: $light;
      width: 230px;
      background: linear-gradient(45deg, rgba(136, 139, 191, 0.3) 0%, #ffffff00 100%);
      height: 80px;
      transition-duration: 1s;
      text-align: center;
      line-height: 30px;
      border-radius: 20px;
      font-size: 0.9em;
      margin-right: 20px;
    }
    > div:hover {
      background: rgba(136, 139, 191, 0.3);
    }
    p {
      position: relative;
      top: 10px;
    }
    .clack p {
      position: relative;
      top: -10px;
    }
    span {
      display: block;
      position: relative;
      left: 40px;
      top: 15px;
      text-indent: -9999px;
      width: 20px;
      height: 20px;
      background: url('../../assets/image/clock.png') center/cover no-repeat;
    }
  }
  .line_chart {
    border: 3px solid $sub3;
    width: 1000px;
    height: 300px;
    margin-left: -20px;
    margin-top: 20px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
  }
  .chart_box {
    width: 1000px;
    margin-left: -20px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    .donut_chart,
    .bar_chart {
      display: flex;
      justify-content: center;
      width: 490px;
      border: 3px solid $sub3;
      border-radius: 20px;
      height: 200px;
    }
    .donut_chart {
      display: flex;
      justify-content: center;
      margin-right: 20px;
      display: flex;
      padding-top: 10px;
    }
  }
}
</style>
