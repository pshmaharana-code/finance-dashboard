<script setup>
import { computed } from 'vue'
import { useFinanceStore } from '../stores/useFinanceStore'

const store = useFinanceStore()

const topCategory = computed(() => {
  const expenses = store.transactions.filter(t => t.type === 'expense')
  if (expenses.length === 0) return { name: 'N/A', amount: 0 }

  const totals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount
    return acc
  }, {})

  const top = Object.entries(totals).sort((a, b) => b[1] - a[1])[0]
  return { name: top[0], amount: top[1] }
})

const biggestExpense = computed(() => {
  const expenses = store.transactions.filter(t => t.type === 'expense')
  if (expenses.length === 0) return null
  return expenses.reduce((max, current) => (current.amount > max.amount ? current : max), expenses[0])
})

const savingsRate = computed(() => {
  if (store.totalIncome === 0) return 0
  const rate = ((store.totalIncome - store.totalExpense) / store.totalIncome) * 100
  return Math.max(0, rate).toFixed(1)
})

const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)
</script>

<template>
  <div class="space-y-6">
    
    <div>
      <h1 class="text-2xl font-bold text-gray-100">Financial Insights</h1>
      <p class="text-gray-400 mt-1">AI-driven observations based on your recent activity.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div class="bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-500/10">
        <div class="flex items-center gap-3 mb-4">
          <span class="bg-white/20 p-2.5 rounded-xl text-xl shadow-inner">💰</span>
          <h3 class="font-medium text-indigo-100 tracking-wide uppercase text-sm">Savings Rate</h3>
        </div>
        <p class="text-4xl font-bold mb-2">{{ savingsRate }}%</p>
        <p class="text-indigo-100/80 text-sm leading-relaxed">
          You are saving {{ savingsRate }}% of your total income. 
          <span v-if="savingsRate > 20" class="text-white font-medium">Great job!</span>
          <span v-else>Try to reduce unnecessary expenses.</span>
        </p>
      </div>

      <div class="bg-[#121217] rounded-2xl p-6 border border-white/5 shadow-lg flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <span class="bg-rose-500/20 text-rose-400 p-2.5 rounded-xl text-xl">🔥</span>
            <h3 class="font-medium text-gray-400 tracking-wide uppercase text-sm">Highest Spending</h3>
          </div>
          <p class="text-3xl font-bold text-gray-100 mb-2">{{ topCategory.name }}</p>
        </div>
        <p class="text-gray-500 text-sm">
          You have spent <span class="font-bold text-gray-300">{{ formatCurrency(topCategory.amount) }}</span> in this category so far.
        </p>
      </div>

      <div class="bg-[#121217] rounded-2xl p-6 border border-white/5 shadow-lg flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <span class="bg-amber-500/20 text-amber-400 p-2.5 rounded-xl text-xl">🏷️</span>
            <h3 class="font-medium text-gray-400 tracking-wide uppercase text-sm">Biggest Expense</h3>
          </div>
          <div v-if="biggestExpense">
            <p class="text-3xl font-bold text-gray-100 mb-2">{{ formatCurrency(biggestExpense.amount) }}</p>
          </div>
        </div>
        <div v-if="biggestExpense">
          <p class="text-gray-500 text-sm leading-relaxed">
            Your largest single transaction was for <span class="font-bold text-gray-300">{{ biggestExpense.description }}</span> on <span class="text-gray-400">{{ biggestExpense.date }}</span>.
          </p>
        </div>
        <div v-else>
          <p class="text-gray-500 text-sm">No expenses recorded yet.</p>
        </div>
      </div>

    </div>

  </div>
</template>