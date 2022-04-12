<template>
  <div class="main">
    <div class="text_box wrap">
      <div>
        <p>1호기 전원</p>
        <p>
          {{ plc.mqttNo1On === true ? 'ON' : 'OFF' }}
          <span class="toggle">
            <input id="toggle1" v-model="plc.mqttNo1On" type="checkbox" />
            <label for="toggle1"></label>
          </span>
        </p>
      </div>
      <div>
        <p>2호기 전원</p>
        <p>
          {{ plc.mqttNo2On === true ? 'ON' : 'OFF' }}
          <span class="toggle">
            <input id="toggle2" v-model="plc.mqttNo2On" type="checkbox" />
            <label for="toggle2"></label>
          </span>
        </p>
      </div>
      <div>
        <p>3호기 전원</p>
        <p>
          {{ plc.mqttNo3On === true ? 'ON' : 'OFF' }}
          <span class="toggle">
            <input id="toggle3" v-model="plc.mqttNo3On" type="checkbox" />
            <label for="toggle3"></label>
          </span>
        </p>
      </div>
      <div>
        <p>총 생산량 수</p>
        <p>{{ plc.mqttNo3Box }}</p>
      </div>
      <div>
        <p>3호기 x 좌표값 : {{ plc.mqttNo3Xaxis }}</p>
        <p>3호기 y 좌표값 : {{ plc.mqttNo3Yaxis }}</p>
      </div>
      <div>
        <p>공정 반복 시간</p>
        <p>{{ plc.mqttNo1Delay }}</p>
      </div>
    </div>
    <div class="box">
      <div class="text_box">
        <div>
          <p>내보낸 상자 수</p>
          <p>{{ plc.mqttNo1Box }}</p>
        </div>
        <div class="border">
          <p>내보낸 주사위 수</p>
          <p>{{ plc.mqttNo2Box }}</p>
        </div>
      </div>

      <div class="line_chart pc">
        <line-chart
          :key="lineChartKey"
          :chart-data="lineChart.chartData"
          :options="options"
          style="height: 260px; width: 470px"
        />
      </div>
      <div class="line_chart movi">
        <line-chart
          :key="lineChartKey"
          :chart-data="lineChart.chartData"
          :options="options"
          style="height: 260px; width: 320px"
        />
      </div>

      <div class="chart_box">
        <div class="donut_chart pc">
          <pie-chart-3
            :key="pieChart3Key"
            :chart-data="pieChart3.chartData"
            :options="pieOptions"
            style="height: 150px; width: 245px"
          />
          <pie-chart-1
            :key="pieChart1Key"
            :chart-data="pieChart1.chartData"
            :options="pieOptions"
            style="height: 150px; width: 245px"
            class="PieChart_margin"
          />
        </div>
        <div class="donut_chart movi">
          <pie-chart-3
            :key="pieChart3Key"
            :chart-data="pieChart3.chartData"
            :options="pieOptions"
            style="height: 200px; width: 300px"
          />
          <pie-chart-1
            :key="pieChart1Key"
            :chart-data="pieChart1.chartData"
            :options="pieOptions"
            style="height: 200px; width: 300px"
            class="PieChart_margin"
          />
        </div>
      </div>
    </div>
    <div class="plc_box">
      <span class="plc">
        <!-- red lamp -->
        <input id="plc1" v-model="plc.mqttLamp3" type="checkbox" />
        <label for="plc1"></label>
      </span>
      <span class="plc">
        <!-- yellow lamp -->
        <input id="plc2" v-model="plc.mqttLamp2" type="checkbox" />
        <label for="plc2"></label>
      </span>
      <span class="plc">
        <!-- green lamp -->
        <input id="plc3" v-model="plc.mqttLamp1" type="checkbox" />
        <label for="plc3"></label>
      </span>
    </div>
  </div>
</template>

<script>
import mqtt from 'mqtt'
import LineChart from '@/components/chart/lineChart'
import PieChart from '@/components/chart/doughnutChart'

export default {
  components: {
    'line-chart': LineChart,
    'pie-chart-1': PieChart,
    'pie-chart-3': PieChart
  },
  data() {
    return {
      // chartKey data들입니다.
      lineChartKey: +new Date(),
      pieChart1Key: +new Date() + 1,
      pieChart3Key: +new Date() + 2,

      // mqttData
      mqttData: null,

      // PLC 관련 data들입니다.
      plc: {
        // 1호기 & 2호기 & 3호기 전원 데이터
        mqttNo1On: null,
        mqttNo2On: null,
        mqttNo3On: null,

        // 3호기 X축 Y축 데이터
        mqttNo3Yaxis: null,
        mqttNo3Xaxis: null,

        // 생산량 카운트
        mqttNo1Box: null,
        mqttNo2Box: null,
        mqttNo3Box: null,

        // PLC 상태 전원
        mqttLamp1: null,
        mqttLamp2: null,
        mqttLamp3: null,

        // 1호기 박스 반출 시간
        mqttNo1Delay: null
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

    // ----------PIECHART 1 DRAWING ----------
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
  },
  methods: {
    createMqtt() {
      // mqtt 연결
      const mqttClient = mqtt.connect(process.env.VUE_APP_MQTT)

      mqttClient.on('connect', () => {
        // mqtt 연결 시 구독한다.
        // console.log('mqtt success')
        const topic = process.env.VUE_APP_MQTT_TOPIC // 구독할 토픽: "UVC"
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

        // 1호기 & 2호기 & 3호기 전원 데이터
        let no123Data = this.mqttData.Wrapper.filter(p => p.tagId === '9' || p.tagId === '10' || p.tagId === '11')
        this.plc.mqttNo1On = no123Data[0].value
        this.plc.mqttNo2On = no123Data[1].value
        this.plc.mqttNo3On = no123Data[2].value

        // 3호기 X축 Y축 데이터
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

        // PLC 상태 전원
        let lampData = this.mqttData.Wrapper.filter(p => p.tagId === '18' || p.tagId === '19' || p.tagId === '20')
        this.plc.mqttLamp1 = lampData[0].value // green
        this.plc.mqttLamp2 = lampData[1].value // yellow
        this.plc.mqttLamp3 = lampData[2].value // red

        // 1호기 박스 반출 시간
        let no1Delay = this.mqttData.Wrapper.filter(p => p.tagId === '14')
        no1Delay = no1Delay.map(p => parseInt(p.value))
        this.plc.mqttNo1Delay = no1Delay[0]

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

      this.pieChart1Key = +new Date() + 1
      this.pieChart1.chartData = this.pieChart1.config
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

      this.pieChart3Key = +new Date() + 2
      this.pieChart3.chartData = this.pieChart3.config
    }
  }
}
</script>

<style lang="scss" scoped>
.toggle,
.plc_box {
  label {
    position: relative;
    display: inline-block;
    left: 10px;
    top: 4px;
    width: 15px;
    height: 15px;
    background-color: #fd1015;
    border-radius: 50px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  input {
    label {
      box-shadow: 0px 0px 10px #fd1015;
    }
  }
  input {
    display: none;
    &:checked + label {
      background-color: #00ff33;
      box-shadow: 0px 0px 10px #00ff33;
    }
  }
}
.plc_box {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  .plc {
    margin-bottom: 10px;
  }
  .plc:first-child {
    label {
      background-color: #6e6060;
    }
    input {
      &:checked + label {
        background-color: #fd1015;
        box-shadow: 0px 0px 10px #fd1015;
      }
    }
  }
  .plc:nth-of-type(2) {
    label {
      background-color: #9ea08b;
    }
    input {
      &:checked + label {
        background-color: #edff47;
        box-shadow: 0px 0px 10px #edff47;
      }
    }
  }
  .plc:nth-of-type(3) {
    label {
      background-color: #839487;
    }
    input {
      &:checked + label {
        background-color: #00ff33;
        box-shadow: 0px 0px 10px #00ff33;
      }
    }
  }
}
@media (min-width: 481px) {
  .main {
    display: flex;
    justify-content: center;
    .box {
      margin-top: -20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .line_chart {
      display: block;
      border: 3px solid $sub3;
      width: 480px;
      height: 280px;
      margin-left: -20px;
      margin-top: 20px;
      border-radius: 20px;
      display: flex;
      justify-content: center;
    }
    .chart_box {
      margin-left: -20px;
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }
    .donut_chart,
    .bar_chart {
      display: flex;
      justify-content: center;
      width: 480px;
      margin-left: 20px;
      border: 3px solid $sub3;
      border-radius: 20px;
      height: 180px;
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
    }
    .wrap {
      flex-wrap: wrap;
      flex-direction: column;
      margin-top: 40px;
      padding-left: 20px;
      > div {
        margin-bottom: 20px;
      }
    }
  }
  .movi {
    display: none !important;
  }
}

@media (max-width: 480px) {
  .border {
    border-bottom: 3px solid $sub3;
  }
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
    }
  }
  .chart_box {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: 100px;
  }
  .donut_chart,
  .line_chart,
  .bar_chart {
    margin: 30px auto;
  }
  .line_chart {
    padding-left: 12px;
  }
  .PieChart_margin {
    margin-top: 40px;
  }
  .pc {
    display: none !important;
  }
}
</style>
