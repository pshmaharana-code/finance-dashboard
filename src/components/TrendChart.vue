<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, plugins } from 'chart.js'
import { useFinanceStore } from '../stores/useFinanceStore'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const store = useFinanceStore()

const chartData = computed(() => {
    const sorted = [...store.transactions].sort((a,b) => new Date(a.date) - new Date(b.date))

    let runningBalance = 0
    const labels = []
    const dataPoints = []

    sorted.forEach(t => {
        runningBalance += t.type === 'income' ? t.amount : -t.amount
        labels.push(t.date)
        dataPoints.push(runningBalance)
    })

    return {
        labels,
        datasets: [
            {
                label: 'Balance Trend ($)',
                borderColor: '#4f46e5', 
                backgroundColor: '#4f46e5',
                data: dataPoints,
                tension: 0.3,
                fill:false
            }
        ]
    }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  scales: {
    y: { 
      beginAtZero: true,
      grid: { color: 'rgba(255, 255, 255, 0.05)' }, // Faint white grid lines
      ticks: { color: 'rgba(255, 255, 255, 0.5)' }  // Gray text
    },
    x: {
      grid: { display: false },
      ticks: { color: 'rgba(255, 255, 255, 0.5)' }
    }
  }
}
</script>

<template>
    <div class="h-full w-full">
        <Line v-if="chartData.labels.length > 0" :data="chartData" :options="chartOptions" />
        <div v-else class="h-full flex items-center justify-center text-gray-400 text-sm">
            Not enough data to show trend.
        </div>
    </div>
</template>