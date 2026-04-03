<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, plugins } from 'chart.js'
import { useFinanceStore } from '../stores/useFinanceStore';

ChartJS.register(ArcElement, Tooltip, Legend)

const store = useFinanceStore()

const chartData = computed(() => {
    const expenses = store.transactions.filter(t => t.type === 'expense')
    const categoryTotals = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount
        return acc
    }, {})

    return {
        labels: Object.keys(categoryTotals),
        datasets: [
            {
                backgroundColor: ['#f43f5e', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#64748b'],
                data: Object.values(categoryTotals),
                borderWidth: 0
            }
        ]
    }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { 
      position: 'bottom',
      labels: { color: 'rgba(255, 255, 255, 0.7)' } // Light text for dark mode
    }
  },
  // Adding a dark border to the doughnut slices so they pop
  elements: {
    arc: { borderColor: '#121217', borderWidth: 2 } 
  }
}

</script>

<template>
    <div class="h-full w-full relative">
        <Doughnut v-if="chartData.labels.length > 0" :data="chartData" :options="chartOptions" />
        <div v-else class="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
            No expense data available.
        </div>
    </div> 
</template>