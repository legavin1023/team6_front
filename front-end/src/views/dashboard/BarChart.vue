<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted() {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient.addColorStop(0, 'rgba(158, 79, 212, 0.5)')
    this.gradient.addColorStop(0.9, 'rgba(0, 231, 255, 0.9)')
    this.renderChart(
      {
        labels: [1, 2, 3, 4, 5, 6],
        datasets: [
          {
            label: '주사위 갯수',
            backgroundColor: this.gradient,
            data: [30, 20, 12, 39, 22, 27],
            borderWidth: 1,
            borderColor: '#9e4fd4'
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    )
  }
}
</script>
