
import { Line } from 'vue-chartjs';

export default {
  name: "LineChart",
  extends: Line,
  props: {
    columns: String,
    datasets: String
  },
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {
          tension: 0,
          fill: false
        }
      },
      scales: {
        yAxes: [{
          stacked: false,
          ticks: {
            beginAtZero: true,
            steps: 10,
            stepValue: 5,
            max: 100
          }
        }],
      },
      legend: {
        display: true,
        labels: {
            fontColor: 'rgb(255, 99, 132)'
        }
      }
    }
  }),

  mounted() {
    this.renderChart({
      labels: JSON.parse(this.columns),
      datasets: JSON.parse(this.datasets)
    }, this.options)
  },

  methods: {

  }
}