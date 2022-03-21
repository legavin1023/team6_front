<template>
  <div class="box">
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
      <div>
        <p><span>시계아이콘</span>작동 시간</p>
        <p>{{}}</p>
      </div>
    </div>
    <div class="line_chart"></div>
    <div class="chart_box">
      <div class="donut_chart"></div>
      <div class="bar_chart"></div>
    </div>
  </div>
</template>

<script>
export default {}
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
      border: 3px solid $sub2;
      color: $sub2;
      width: 230px;
      background: linear-gradient(45deg, rgba(136, 139, 191, 0.3) 0%, #000000 100%);
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
  }
  .line_chart {
    background: $main;
    width: 1000px;
    height: 300px;
    margin-left: -20px;
    margin-top: 20px;
    border-radius: 20px;
  }
  .chart_box {
    width: 1000px;
    margin-left: -20px;
    margin-top: 20px;
    display: flex;
    .donut_chart,
    .bar_chart {
      width: 490px;
      border: 3px solid $sub2;
      border-radius: 20px;
      height: 200px;
    }
    .donut_chart {
      margin-right: 20px;
    }
  }
}
</style>
