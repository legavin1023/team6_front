<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  mounted() {
    this.renderChart(
      {
        labels: ['하양', '빨강'],
        datasets: [
          {
            borderWidth: 1,
            borderColor: '#ff0000',
            backgroundColor: ['rgba(255, 100, 100, 1)', 'rgba(255, 255, 255, 1)'],
            data: [48, 52]
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    )
  },
  options: {
    legend: {
      labels: {
        fontColor: '#ffffff',
        fontSize: 18
      }
    }
  }
}
</script>
