<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  mounted() {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

    this.gradient.addColorStop(0, 'rgba(158, 79, 212, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(158, 79, 212, 0.25)')
    this.gradient.addColorStop(1, 'rgba(158, 79, 212, 0)')

    this.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
    this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)')
    this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)')
    this.renderChart(
      {
        labels: ['홀수', '짝수'],
        datasets: [
          {
            borderWidth: 1,
            borderColor: '#9e4fd4',
            backgroundColor: [this.gradient, this.gradient2],
            data: [57, 43]
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    )
  }
}
</script>
