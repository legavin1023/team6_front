<script>
import mqtt from 'mqtt'
import { Line, mixins } from 'vue-chartjs'
// import LineChart from '@/components/chart/lineChart'

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['options'],
  data() {
    return {
      // chart gradient
      gradient: null,
      gradient2: null,

      // chart settings
      selected: {
        tagList: ['양품', '불량품']
      },
      maxDataLength: 20,
      mqttDataListA: [],
      mqttDataListB: [],
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
            // backgroundColor: this.gradient,
            // data: this.mqttDataListA
            data: [0]
          },
          {
            label: '불량품',
            borderColor: '#05CBE1',
            pointBackgroundColor: 'white',
            pointBorderColor: 'white',
            borderWidth: 1,
            // backgroundColor: this.gradient2,
            // data: this.mqttDataListB
            data: [0]
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
        }
      }
    }
  },
  created() {
    this.createMqtt()
  },
  mounted() {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

    this.gradient.addColorStop(0, 'rgba(158, 79, 212, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(158, 79, 212, 0.25)')
    this.gradient.addColorStop(1, 'rgba(158, 79, 212, 0)')

    this.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
    this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)')
    this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)')

    this.makeChartData()

    this.renderChart(this.config, this.options)
  },
  methods: {
    createMqtt() {
      // mqtt 연결
      const mqttClient = mqtt.connect(process.env.VUE_APP_MQTT)

      mqttClient.on('connect', () => {
        // mqtt 연결 시 구독
        const topic = 'UVC' // 구독할 topic
        mqttClient.subscribe(topic, {}, (error, res) => {
          if (error) {
            console.error('mqtt client error', error)
          }
        })
      })

      // 메시지 실시간 수신
      mqttClient.on('message', (topic, message) => {
        const mqttData = JSON.parse(message) // json string으로만 받을 수 있음

        this.removeOldData() // 오래된 데이터 제거

        // 데이터 필터링
        let productData = mqttData.Wrapper.filter(p => p.tagId === '17' || p.tagId === '15')
        productData = productData.map(p => parseInt(p.value))
        let timeData = mqttData.Wrapper.filter(p => p.tagId === '0')

        this.config.labels.push(timeData[0].value.substring(14, 19)) // 차트라벨 생성

        // 리스트에 계속 추가
        this.config.datasets[0].data.push(productData[0])
        this.config.datasets[1].data.push(productData[1])

        this.makeChartData() // 차트용 데이터 작성

        console.log(this.config.labels)
        console.log(this.config.datasets[1].data)
      })
    },
    removeOldData() {
      // 현재 차트에 출력할 개수가 x개를 넘어서면 제일 오래된 데이터를 제거한다.
      if (
        this.maxDataLength - 1 < this.config.datasets[0].data.length &&
        this.maxDataLength - 1 < this.config.datasets[1].data.length
      ) {
        this.config.labels.shift() // 차트라벨 제거
        this.config.datasets[0].data.shift() // mqttdata 제거
        this.config.datasets[1].data.shift() // mqttdata 제거
      }
    },
    makeChartData() {
      // 차트용 데이터 생성

      // mqtt 정보가 없으면 기본 그래프를 그려준다.
      if (this.config.datasets[0].data.length === 0 || this.config.datasets[1].data.length === 0) {
        this.chartData = {
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
    }
  }
}
</script>
