<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  amount: Number,
  type: {
    type: String,
    default: 'neutral'
  }
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value || 0)
}

// Dynamically assign gradients and emojis based on the card type
// Change bg-gradient-to-br to bg-linear-to-br
const iconStyle = computed(() => {
  if (props.type === 'income') return { bg: 'from-emerald-500 to-teal-600', icon: '💰' }
  if (props.type === 'expense') return { bg: 'from-rose-500 to-pink-600', icon: '💳' }
  return { bg: 'from-indigo-500 to-purple-600', icon: '💼' }
})
</script>

<template>
  <div class="bg-[#121217] rounded-2xl border border-white/5 p-6 shadow-lg flex flex-col justify-between h-full">
    
    <div class="flex items-center gap-4 mb-4">
      <div 
        class="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-lg"
        :class="`bg-linear-to-br ${iconStyle.bg}`"
    >
        {{ iconStyle.icon }}
      </div>
      <h3 class="text-sm font-medium text-gray-400 tracking-wide">{{ title }}</h3>
    </div>
    
    <p class="text-3xl font-bold text-gray-100">
      {{ formatCurrency(amount) }}
    </p>
  </div>
</template>