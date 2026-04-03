<script setup>
import { useFinanceStore } from '../stores/useFinanceStore'
import SummaryCard from '../components/SummaryCard.vue'
import TrendChart from '../components/TrendChart.vue'
import BreakdownChart from '../components/BreakdownChart.vue'

const store = useFinanceStore()
</script>

<template>
  <div class="space-y-6">
    
    <div>
      <h1 class="text-2xl font-bold text-gray-100">Dashboard Overview</h1>
      <p class="text-gray-400 mt-1">Your financial summary at a glance.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SummaryCard title="Total Balance" :amount="store.totalBalance" type="neutral" />
      <SummaryCard title="Total Income" :amount="store.totalIncome" type="income" />
      <SummaryCard title="Total Expenses" :amount="store.totalExpense" type="expense" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      
      <div class="lg:col-span-2 bg-[#121217] rounded-2xl border border-white/5 p-6 h-100 flex flex-col shadow-lg">
        <h3 class="text-sm font-medium text-gray-400 mb-4 tracking-wide">Balance Trend</h3>
        <div class="flex-1 relative">
          <TrendChart />
        </div>
      </div>
      
      <div class="bg-[#121217] rounded-2xl border border-white/5 p-6 h-100 flex flex-col shadow-lg">
        <h3 class="text-sm font-medium text-gray-400 mb-4 tracking-wide">Spending Breakdown</h3>
        <div class="flex-1 relative">
          <BreakdownChart />
        </div>
      </div>

    </div>

  </div>
</template>