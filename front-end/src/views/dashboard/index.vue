<template>
  <div class="main">
    <div class="text_box wrap">
      <div>
        <p>1호기 전원 : {{ plc.mqttNo1On === true ? 'ON' : 'OFF' }}</p>
        <p>2호기 전원 : {{ plc.mqttNo2On === true ? 'ON' : 'OFF' }}</p>
      </div>
      <div>
        <p>내보낸 상자 수</p>
        <p>{{ plc.mqttNo1Box }}</p>
      </div>
      <div>
        <p>내보낸 주사위 수</p>
        <p>{{ plc.mqttNo2Box }}</p>
      </div>
      <div>
        <p>총 생산량 수</p>
        <p>{{ plc.mqttNo3Box }}</p>
      </div>
      <div class="donut_chart"><PieChart_3 style="height: 160px; width: 245px" /></div>
    </div>
    <div class="box">
      <div class="text_box">
        <div>
          <p>3호기 x 좌표값 : {{ plc.mqttNo3Xaxis }}</p>
          <p>3호기 y 좌표값 : {{ plc.mqttNo3Yaxis }}</p>
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
      <div class="line_chart">
        <line-chart
          :key="lineChartKey"
          :chart-data="chart.chartData"
          :options="chart.options"
          style="height: 260px; width: 980px"
        />
      </div>
      <div class="chart_box">
        <div class="donut_chart">
          <PieChart_1 style="height: 160px; width: 245px" /><PieChart_2 style="height: 160px; width: 245px" />
        </div>
        <div class="bar_chart"><BarChart style="height: 190px; width: 470px" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import mqtt from 'mqtt'
import LineChart from '@/components/chart/lineChart'
import PieChart_1 from './PieChart_1.vue'
import PieChart_2 from './PieChart_2.vue'
import PieChart_3 from './PieChart_3.vue'
import BarChart from './BarChart.vue'

export default {
  components: {
    'line-chart': LineChart,
    PieChart_1,
    PieChart_2,
    PieChart_3,
    BarChart
  },
  data() {
    return {
      lineChartKey: +new Date(),
      mqttData: null,
      plc: {
        // 1호기 & 2호기 데이터
        mqttNo1On: null,
        mqttNo2On: null,

        // 3호기 데이터
        mqttNo3Yaxis: null,
        mqttNo3Xaxis: null,

        // 생산량 카운트
        mqttNo1Box: null,
        mqttNo2Box: null,
        mqttNo3Box: null
      },
      chart: {
        // chart gradient
        gradient: null,
        gradient2: null,

        // chart settings
        maxDataLength: 20,
        mqttDataListA: [],
        mqttDataListB: [],
        datasetDatas: [],
        chartData: null,
        chartLabels: [],

        // chart config
        config: {
          // labels: this.chartLabels,
          labels: [],
          datasets: [
            {
              label: '양품',
              borderColor: '#9e4fd4',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: 'white',
              backgroundColor: '',
              // data: this.chart.mqttDataListA
              data: []
            },
            {
              label: '불량품',
              borderColor: '#05CBE1',
              pointBackgroundColor: 'white',
              pointBorderColor: 'white',
              borderWidth: 1,
              backgroundColor: '',
              // data: this.chart.mqttDataListB
              data: []
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          xAxes: [
            {
              type: 'realtime',
              realtime: {
                duration: 200,
                refresh: 1000,
                delay: 200
              }
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'value'
              }
            }
          ],
          tooltips: {
            mode: 'nearest',
            intersect: false
          },
          hover: {
            mode: 'nearest',
            intersect: false
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          },
          animation: {
            duration: 0
          }
        }
      }
    }
  },
  created() {
    this.createMqtt()
  },
  mounted() {
    const lineCanvas = document.getElementById('line-chart')
    this.chart.gradient = lineCanvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.chart.gradient2 = lineCanvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

    this.chart.gradient.addColorStop(0, 'rgba(158, 79, 212, 0.5)')
    this.chart.gradient.addColorStop(0.5, 'rgba(158, 79, 212, 0.25)')
    this.chart.gradient.addColorStop(1, 'rgba(158, 79, 212, 0)')

    this.chart.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.5)')
    this.chart.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)')
    this.chart.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)')

    this.chart.config.datasets[0].backgroundColor = this.chart.gradient
    // this.chart.config.datasets[1].backgroundColor = this.chart.gradient2

    this.makeChartData()

    // this.renderChart(this.chart.config, this.chart.options)
  },
  methods: {
    createMqtt() {
      // mqtt 연결
      const mqttClient = mqtt.connect(process.env.VUE_APP_MQTT)

      mqttClient.on('connect', () => {
        // mqtt 연결 시 구독한다.
        const topic = toString(process.env.MQTT_TOPIC) // 구독할 토픽
        mqttClient.subscribe(topic, {}, (error, res) => {
          if (error) {
            console.error('mqtt client error', error)
          }
        })
      })

      // 메세지 실시간 수신
      mqttClient.on('message', (topic, message) => {
        this.mqttData = JSON.parse(message) // json string으로만 받을 수 있음
        // ------PLC DATA FILTERING------

        // 1호기 & 2호기 데이터
        let no12Data = this.mqttData.Wrapper.filter(p => p.tagId === '9' || p.tagId === '10')
        this.plc.mqttNo1On = no12Data[0].value
        this.plc.mqttNo2On = no12Data[1].value

        // 3호기 데이터
        let no3Data = this.mqttData.Wrapper.filter(p => p.tagId === '21' || p.tagId === '22')
        no3Data = no3Data.map(p => parseInt(p.value))
        this.plc.mqttNo3Yaxis = no3Data[0]
        this.plc.mqttNo3Xaxis = no3Data[1]

        // 생산량 데이터
        let boxData = this.mqttData.Wrapper.filter(p => p.tagId === '15' || p.tagId === '16' || p.tagId === '17')
        boxData = boxData.map(p => parseInt(p.value))
        this.plc.mqttNo1Box = boxData[0]
        this.plc.mqttNo2Box = boxData[1]
        this.plc.mqttNo3Box = boxData[2]

        // ------LINECHART DATA FILTERING------
        this.removeOldData() // 오래된 데이터 제거

        // 라벨 데이터 필터링 & 추가
        let timeData = this.mqttData.Wrapper.filter(p => p.tagId === '0')
        this.chart.config.labels.push(timeData[0].value.substring(14, 19)) // 차트라벨 생성

        // 양품 불량품 데이터 필터링
        let productData = this.mqttData.Wrapper.filter(p => p.tagId === '17' || p.tagId === '15')
        productData = productData.map(p => parseInt(p.value))

        // 리스트에 계속 추가
        this.chart.config.datasets[0].data.push(productData[1])
        // 불량품은 반출한 박스의 개수에서 총 생산량 개수를 제한다.
        this.chart.config.datasets[1].data.push(productData[0] - productData[1])

        this.makeChartData() // 차트용 데이터 작성

        // console.log(this.chart.chartLabels)
        // console.log(this.chart.datasetDatas)
      })
    },

    // ---------LINECHART DATA METHOD---------
    removeOldData() {
      // 현재 차트에 출력할 개수가 x개를 넘어서면 제일 오래된 데이터를 제거한다.
      if (
        this.chart.maxDataLength - 1 < this.chart.config.datasets[0].data.length &&
        this.chart.maxDataLength - 1 < this.chart.config.datasets[1].data.length
      ) {
        this.chart.config.labels.shift() // 차트라벨 제거
        this.chart.config.datasets[0].data.shift() // mqttdata 제거
        this.chart.config.datasets[1].data.shift() // mqttdata 제거
      }
    },
    makeChartData() {
      // 차트용 데이터 생성
      // mqtt 정보가 없으면 기본 그래프를 그려준다.
      if (this.chart.config.datasets[0].data.length === 0 || this.chart.config.datasets[1].data.length === 0) {
        this.chart.chartData = {
          labels: ['0'],
          datasets: [
            {
              label: 'no data',
              data: [0]
            }
          ]
        }
        return
      }

      this.lineChartKey = +new Date()
      this.chart.chartData = this.chart.config
      // console.log(this.chart.config.labels, this.chart.config.datasets[0].data)
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center;

  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .line_chart {
    border: 3px solid $sub3;
    width: 1000px;
    height: 280px;
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
  }
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
  .text_box {
    display: flex;
    margin-top: 40px;
    > div {
      display: inline-block;
      border: 3px solid $sub3;
      color: $light;
      width: 235px;
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
  .wrap {
    flex-wrap: wrap;
    flex-direction: column;
    margin-top: 40px;
    padding-left: 20px;
    > div {
      margin-bottom: 20px;
    }
    > div:last-child {
      margin-bottom: 0px;
      height: 200px;
      background: none;
    }
  }
}
</style>
