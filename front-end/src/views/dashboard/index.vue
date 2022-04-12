<template>
  <div class="main">
    <div class="text_box wrap">
      <div>
        <p>1호기 전원 : {{ plc.mqttNo1On === true ? 'ON' : 'OFF' }}</p>
        <p>2호기 전원 : {{ plc.mqttNo2On === true ? 'ON' : 'OFF' }}</p>
      </div>
      <div>
        <div v-if="plc.mqttNo1Box !== null">
          <p>내보낸 상자 수</p>
          <p>{{ plc.mqttNo1Box }}</p>
        </div>
        <p v-if="plc.mqttNo1Box == null">PLC와 연결되어있지 않습니다.</p>
      </div>
      <div>
        <div v-if="plc.mqttNo2Box !== null">
          <p>내보낸 주사위 수</p>
          <p>{{ plc.mqttNo2Box }}</p>
        </div>
        <p v-if="plc.mqttNo2Box == null">PLC와 연결되어있지 않습니다.</p>
      </div>

      <div class="border">
        <div v-if="plc.mqttNo3Box !== null">
          <p>총 생산량 수</p>
          <p>{{ plc.mqttNo3Box }}</p>
        </div>
        <p v-if="plc.mqttNo3Box == null">PLC와 연결되어있지 않습니다.</p>
      </div>
      <div class="donut_chart">
        <pie-chart-3
          :key="pieChart3Key"
          :chart-data="pieChart3.chartData"
          :options="pieOptions"
          style="height: 160px; width: 245px"
        />
      </div>
    </div>
    <div class="box">
      <div class="text_box">
        <div>
          <p v-if="plc.mqttNo3Xaxis !== null">3호기 x 좌표값 : {{ plc.mqttNo3Xaxis }}</p>
          <p v-if="plc.mqttNo3Yaxis !== null">3호기 y 좌표값 : {{ plc.mqttNo3Yaxis }}</p>
          <p v-if="plc.mqttNo3Xaxis == null || plc.mqttNo3Yaxis == null">PLC와 연결되어있지 않습니다.</p>
        </div>
        <div>
          <p>하루 총 생산량</p>
          <p>{{ pieChart1.product }}</p>
        </div>
        <div>
          <p>3호기 가동 시작 : {{}}</p>
          <p>3호기 가동 종료 : {{}}</p>
        </div>
        <div class="clack border">
          <span>시계아이콘</span>
          <p>작동 시간</p>
          <p>{{}}</p>
        </div>
      </div>

      <div class="line_chart pc">
        <!-- <canvas ref="canvas" style="height: 260px; width: 980px"> -->
        <line-chart
          :key="lineChartKey"
          :chart-data="lineChart.chartData"
          :options="options"
          style="height: 260px; width: 980px"
        />
      </div>
      <div class="line_chart movi">
        <line-chart
          :key="lineChartKey"
          :chart-data="lineChart.chartData"
          :options="options"
          style="height: height: 260px; width: 320px"
        />
      </div>

      <div class="chart_box">
        <div class="donut_chart pc">
          <pie-chart-1
            :key="pieChart1Key"
            :chart-data="pieChart1.chartData"
            :options="pieOptions"
            style="height: 160px; width: 245px"
          />
          <pie-chart-2
            :key="pieChart2Key"
            :chart-data="pieChart2.chartData"
            :options="pieOptions"
            style="height: 160px; width: 245px"
          />
        </div>
        <div class="donut_chart movi">
          <pie-chart-1
            :key="pieChart1Key"
            :chart-data="pieChart1.chartData"
            :options="pieOptions"
            style="height: 160px; width: 245px"
          />
        </div>
        <div id="movi" class="donut_chart movi">
          <pie-chart-2
            :key="pieChart2Key"
            :chart-data="pieChart2.chartData"
            :options="pieOptions"
            style="height: 160px; width: 245px"
          />
        </div>
        <div class="bar_chart pc">
          <bar-chart
            :key="barChartKey"
            :chart-data="barChart.chartData"
            :options="options"
            style="height: 190px; width: 470px"
          />
        </div>
        <div class="bar_chart movi">
          <bar-chart :chart-data="barChart.chartData" :options="options" style="height: 190px; width: 320px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mqtt from 'mqtt'
import LineChart from '@/components/chart/lineChart'
import PieChart from '@/components/chart/doughnutChart'
import BarChart from '@/components/chart/barChart'

export default {
  components: {
    'line-chart': LineChart,
    'pie-chart-1': PieChart,
    'pie-chart-2': PieChart,
    'pie-chart-3': PieChart,
    'bar-chart': BarChart
  },
  data() {
    return {
      // chartKey data들입니다.
      lineChartKey: +new Date(),
      barChartKey: +new Date() + 1,
      pieChart1Key: +new Date() + 2,
      pieChart2Key: +new Date() + 3,
      pieChart3Key: +new Date() + 3,

      // mqttData
      mqttData: null,

      // PLC 관련 data들입니다.
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

      // chart 공통 option data 입니다.
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
      },
      pieOptions: {
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
        tooltips: {
          mode: 'nearest',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: false
        },
        animation: {
          duration: 0
        }
      },

      // lineChart 관련 data들입니다.
      lineChart: {
        // lineChart gradient
        gradient: null,
        gradient2: null,

        // lineChart settings
        maxDataLength: 20,
        // mqttDataListA: [],
        // mqttDataListB: [],
        // datasetDatas: [],
        chartData: null,
        // lineChartLabels: [],

        // lineChart config
        config: {
          // labels: this.lineChartLabels,
          labels: [],
          datasets: [
            {
              label: '양품',
              borderColor: '#9e4fd4',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: 'white',
              backgroundColor: '',
              // data: this.lineChart.mqttDataListA
              data: []
            },
            {
              label: '불량품',
              borderColor: '#05CBE1',
              pointBackgroundColor: 'white',
              pointBorderColor: 'white',
              borderWidth: 1,
              backgroundColor: '',
              // data: this.lineChart.mqttDataListB
              data: []
            }
          ]
        }
      },

      // barChart 관련 data들입니다.
      barChart: {
        // barChart gradient
        gradient: null,

        // barChart diceNum
        diceNum1: 0,
        diceNum2: 0,
        diceNum3: 0,
        diceNum4: 0,
        diceNum5: 0,
        diceNum6: 0,

        // barChart settings
        chartData: null,

        // barChart config
        config: {
          labels: [1, 2, 3, 4, 5, 6],
          datasets: [
            {
              label: '주사위 갯수',
              backgroundColor: '',
              data: [],
              borderWidth: 1,
              borderColor: '#9e4fd4'
            }
          ]
        }
      },

      // pieChart 관련 data들입니다.
      pieChart: {
        // pieChart gradient
        gradient: null,
        gradient2: null
      },

      pieChart1: {
        // pieChart1 settings
        chartData: null,
        product: null,
        defective: null,

        // pieChart1 config
        config: {
          labels: ['양품', '불량품'],
          datasets: [
            {
              borderWidth: 1,
              borderColor: '#9e4fd4',
              backgroundColor: [],
              data: []
            }
          ]
        }
      },
      pieChart2: {
        // pieChart2 settings
        chartData: null,
        odd: 0,
        even: 0,

        // pieChart2 config
        config: {
          labels: ['홀수', '짝수'],
          datasets: [
            {
              borderWidth: 1,
              borderColor: '#9e4fd4',
              backgroundColor: [],
              data: []
            }
          ]
        }
      },
      pieChart3: {
        // pieChart2 settings
        chartData: null,
        red: 0,
        white: 0,

        // pieChart2 config
        config: {
          labels: ['하양', '빨강'],
          datasets: [
            {
              borderWidth: 1,
              borderColor: '#ff0000',
              backgroundColor: ['rgba(255, 100, 100, 1)', 'rgba(255, 255, 255, 1)'],
              data: []
            }
          ]
        }
      }
    }
  },
  created() {
    this.createMqtt()
  },
  mounted() {
    // ---------LINECHART DRAWING---------
    const lineCanvas = document.getElementById('line-chart')

    this.lineChart.gradient = lineCanvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.lineChart.gradient2 = lineCanvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

    this.lineChart.gradient.addColorStop(0, 'rgba(158, 79, 212, 0.5)')
    this.lineChart.gradient.addColorStop(0.5, 'rgba(158, 79, 212, 0.25)')
    this.lineChart.gradient.addColorStop(1, 'rgba(158, 79, 212, 0)')

    this.lineChart.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.5)')
    this.lineChart.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)')
    this.lineChart.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)')

    this.lineChart.config.datasets[0].backgroundColor = this.lineChart.gradient
    // this.lineChart.config.datasets[1].backgroundColor = this.lineChart.gradient2

    this.makeLineChartData()

    // this.renderChart(this.lineChart.config, this.lineChart.options)

    // ----------BARCHART DRAWING----------
    const barCanvas = document.getElementById('bar-chart')

    this.barChart.gradient = barCanvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.barChart.gradient.addColorStop(0, 'rgba(158, 79, 212, 0.5)')
    this.barChart.gradient.addColorStop(0.9, 'rgba(0, 231, 255, 0.9)')

    this.makeBarChartData()

    // ----------PIECHART 1, 2 DRAWING ----------
    const pieCanvas = document.getElementById('doughnut-chart')

    this.pieChart.gradient = pieCanvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.pieChart.gradient2 = pieCanvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

    this.pieChart.gradient.addColorStop(0, 'rgba(158, 79, 212, 0.5)')
    this.pieChart.gradient.addColorStop(0.5, 'rgba(158, 79, 212, 0.25)')
    this.pieChart.gradient.addColorStop(1, 'rgba(158, 79, 212, 0)')

    this.pieChart.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
    this.pieChart.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)')
    this.pieChart.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)')

    this.pieChart1.config.datasets[0].backgroundColor = [this.pieChart.gradient, this.pieChart.gradient2]
    this.pieChart2.config.datasets[0].backgroundColor = [this.pieChart.gradient, this.pieChart.gradient2]
  },
  methods: {
    createMqtt() {
      // mqtt 연결
      const mqttClient = mqtt.connect(process.env.VUE_APP_MQTT)

      mqttClient.on('connect', () => {
        // mqtt 연결 시 구독한다.
        // const topic = 'UVC' // 구독할 토픽
        // console.log('mqtt success')
        const topic = process.env.VUE_APP_MQTT_TOPIC // 구독할 토픽
        mqttClient.subscribe(topic, {}, (error, res) => {
          if (error) {
            console.error('mqtt client error', error)
          }
        })
      })

      // 메세지 실시간 수신
      mqttClient.on('message', (topic, message) => {
        // console.log('hello mqtt')
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
        this.removeOldLineData() // 오래된 데이터 제거

        // 라벨 데이터 필터링 & 추가
        let timeData = this.mqttData.Wrapper.filter(p => p.tagId === '0')
        this.lineChart.config.labels.push(timeData[0].value.substring(14, 19)) // 차트라벨 생성

        // 양품 불량품 데이터 필터링
        let productData = this.mqttData.Wrapper.filter(p => p.tagId === '17' || p.tagId === '15')
        productData = productData.map(p => parseInt(p.value))

        // 리스트에 계속 추가
        this.lineChart.config.datasets[0].data.push(productData[1])
        // 불량품은 반출한 박스의 개수에서 총 생산량 개수를 제한다.
        this.lineChart.config.datasets[1].data.push(productData[0] - productData[1])

        this.makeLineChartData() // 차트용 데이터 작성

        // ------PIECHART1 DATA FILTERING------
        this.pieChart1.product = productData[1]
        this.pieChart1.defective = productData[0] - productData[1]

        this.pieChart1.config.datasets[0].data = [this.pieChart1.product, this.pieChart1.defective]

        this.makePieChart1Data()

        // ------PIECHART2 DATA FILTERING------
        let diceNum = this.mqttData.Wrapper.filter(p => p.tagId === '37')
        diceNum = diceNum.map(p => parseInt(p.value))

        if (diceNum[0] !== 0 && diceNum[0] % 2 == 0) {
          this.pieChart2.even += 1
        } else if (diceNum[0] !== 0 && diceNum[0] % 2 !== 0) {
          this.pieChart2.odd += 1
        }

        this.pieChart2.config.datasets[0].data = [this.pieChart2.odd, this.pieChart2.even]

        this.makePieChart2Data()

        // ------PIECHART3 DATA FILTERING------
        let colorSence = this.mqttData.Wrapper.filter(p => p.tagId == '39')
        colorSence = colorSence.map(p => parseInt(p.value))

        if (colorSence == 0) {
          this.pieChart3.red += 1
        } else if (colorSence == 1) {
          this.pieChart3.white += 1
        }

        this.pieChart3.config.datasets[0].data = [this.pieChart3.white, this.pieChart3.red]

        this.makePieChart3Data()

        // ------BARCHART DATA FILTERING------
        let diceData = this.mqttData.Wrapper.filter(p => p.tagId === '37')
        diceData = diceData.map(p => parseInt(p.value))

        // console.log(diceData)

        setTimeout(() => {
          if (diceData[0] === 1) {
            this.barChart.diceNum1 += 1
          } else if (diceData[0] === 2) {
            this.barChart.diceNum2 += 1
          } else if (diceData[0] === 3) {
            this.barChart.diceNum3 += 1
          } else if (diceData[0] === 4) {
            this.barChart.diceNum4 += 1
          } else if (diceData[0] === 5) {
            this.barChart.diceNum5 += 1
          } else if (diceData[0] === 6) {
            this.barChart.diceNum6 += 1
          }
        }, 3000)

        this.barChart.config.datasets[0].data = [
          this.barChart.diceNum1,
          this.barChart.diceNum2,
          this.barChart.diceNum3,
          this.barChart.diceNum4,
          this.barChart.diceNum5,
          this.barChart.diceNum6
        ]

        this.makeBarChartData()

        // console.log(this.barChart.config.datasets[0].data)

        // console.log(this.lineChart.chartLabels)
        // console.log(this.lineChart.datasetDatas)
      })
    },

    // ---------LINECHART DATA METHOD---------
    removeOldLineData() {
      // 현재 차트에 출력할 개수가 x개를 넘어서면 제일 오래된 데이터를 제거한다.
      if (
        this.lineChart.maxDataLength - 1 < this.lineChart.config.datasets[0].data.length &&
        this.lineChart.maxDataLength - 1 < this.lineChart.config.datasets[1].data.length
      ) {
        this.lineChart.config.labels.shift() // 차트라벨 제거
        this.lineChart.config.datasets[0].data.shift() // mqttdata 제거
        this.lineChart.config.datasets[1].data.shift() // mqttdata 제거
      }
    },
    makeLineChartData() {
      // 차트용 데이터 생성
      // mqtt 정보가 없으면 기본 그래프를 그려준다.
      if (this.lineChart.config.datasets[0].data.length === 0 || this.lineChart.config.datasets[1].data.length === 0) {
        this.lineChart.chartData = {
          labels: ['0'],
          datasets: [
            {
              label: 'PLC와 연결되어있지 않습니다.',
              data: [0]
            }
          ]
        }
        return
      }

      this.lineChartKey = +new Date()
      this.lineChart.chartData = this.lineChart.config
    },

    // ---------BARCHART DATA METHOD---------
    makeBarChartData() {
      // 차트용 데이터 생성
      // mqtt 정보가 없으면 기본 그래프를 그려준다.
      if (this.barChart.config.datasets[0].data.length === 0) {
        this.barChart.chartData = {
          labels: ['0'],
          datasets: [
            {
              label: 'PLC와 연결되어있지 않습니다.',
              data: [0]
            }
          ]
        }
        return
      }

      this.barChartKey = +new Date() + 1
      this.barChart.chartData = this.barChart.config
    },

    // ---------PIECHART 1, 2 DATA METHOD---------
    makePieChart1Data() {
      // mqtt 정보가 없으면 기본 그래프를 그려준다.
      if (this.pieChart1.config.datasets[0].data.length === 0) {
        this.pieChart1.chartData = {
          labels: ['0'],
          datasets: [
            {
              label: 'PLC와 연결되어있지 않습니다.',
              data: [0]
            }
          ]
        }
        return
      }

      this.pieChart1Key = +new Date() + 2
      this.pieChart1.chartData = this.pieChart1.config
    },
    makePieChart2Data() {
      // mqtt 정보가 없으면 기본 그래프를 그려준다.
      if (this.pieChart2.config.datasets[0].data.length === 0) {
        this.pieChart2.chartData = {
          labels: ['PLC와 연결되어있지 않습니다.'],
          datasets: [
            {
              label: 'PLC와 연결되어있지 않습니다.',
              data: [0]
            }
          ]
        }
        return
      }

      this.pieChart2Key = +new Date() + 3
      this.pieChart2.chartData = this.pieChart2.config
    },
    makePieChart3Data() {
      // mqtt 정보가 없으면 기본 그래프를 그려준다.
      if (this.pieChart3.config.datasets[0].data.length === 0) {
        this.pieChart3.chartData = {
          labels: ['PLC와 연결되어있지 않습니다.'],
          datasets: [
            {
              label: 'PLC와 연결되어있지 않습니다.',
              data: [0]
            }
          ]
        }
        return
      }

      this.pieChart3Key = +new Date() + 4
      this.pieChart3.chartData = this.pieChart3.config
    }
  }
}
</script>

<style lang="scss" scoped>
@media (min-width: 481px) {
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
        width: 235px;
        border: 3px solid $sub3;
        color: $light;
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
  .movi {
    display: none !important;
  }
}

@media (max-width: 480px) {
  .main {
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100vw;
    overflow-x: hidden;
    .text_box {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      > div:not(.donut_chart) {
        width: 100%;
        line-height: 35px;
        padding: 5px;
        text-align: center;
        border-top: 3px solid $sub3;
        color: $light;
        background: linear-gradient(45deg, rgba(136, 139, 191, 0.3) 0%, #ffffff00 100%);
      }
      .border {
        border-bottom: 3px solid $sub3;
      }
      span {
        display: block;
        position: absolute;
        left: 120px;
        top: 920px;
        text-indent: -9999px;
        width: 20px;
        height: 20px;
        background: url('../../assets/image/clock.png') center/cover no-repeat;
      }
    }
  }
  .chart_box {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
  }
  .donut_chart,
  .line_chart,
  .bar_chart {
    margin: 30px auto;
  }
  .pc {
    display: none !important;
  }
}
</style>
