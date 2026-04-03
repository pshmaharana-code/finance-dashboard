<script setup>
import { ref, computed } from 'vue'
import { useFinanceStore } from '../stores/useFinanceStore'

const store = useFinanceStore()

const searchQuery = ref('')
const typeFilter = ref('all')

const filteredTransactions = computed(() => {
  return store.transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesType = typeFilter.value === 'all' || t.type === typeFilter.value
    return matchesSearch && matchesType
  }).sort((a, b) => new Date(b.date) - new Date(a.date))
})

const isModalOpen = ref(false)
const newTx = ref({
  date: new Date().toISOString().split('T')[0],
  description: '',
  amount: null,
  type: 'expense',
  category: 'Food'
})

const categories = ['Salary', 'Freelance', 'Housing', 'Food', 'Utilities', 'Entertainment', 'Other']

const handleAddTransaction = () => {
  if (!newTx.value.description || !newTx.value.amount) return
  store.addTransaction({
    date: newTx.value.date,
    description: newTx.value.description,
    amount: Number(newTx.value.amount),
    type: newTx.value.type,
    category: newTx.value.category
  })
  isModalOpen.value = false
  newTx.value.description = ''
  newTx.value.amount = null
}

const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)
</script>

<template>
  <div class="space-y-6">
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-100">Transactions</h1>
        <p class="text-gray-400 mt-1">Manage and view your financial history.</p>
      </div>

      <button 
        v-if="store.currentRole === 'admin'"
        @click="isModalOpen = true"
        class="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-lg shadow-indigo-500/20"
      >
        + Add Transaction
      </button>
    </div>

    <div class="bg-[#121217] p-4 rounded-2xl border border-white/5 shadow-lg flex flex-col sm:flex-row gap-4">
      <div class="flex-1 relative">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">🔍</span>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search descriptions..." 
          class="w-full pl-10 pr-4 py-2 bg-[#1a1a21] border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-200 placeholder-gray-500 transition-all"
        >
      </div>
      <div class="w-full sm:w-48">
        <select 
          v-model="typeFilter"
          class="w-full px-4 py-2 bg-[#1a1a21] border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-200 transition-all"
        >
          <option value="all">All Types</option>
          <option value="income">Income Only</option>
          <option value="expense">Expenses Only</option>
        </select>
      </div>
    </div>

    <div class="bg-[#121217] border border-white/5 rounded-2xl shadow-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-white/5">
          <thead class="bg-white/5">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
              <th v-if="store.currentRole === 'admin'" class="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            
            <tr v-for="tx in filteredTransactions" :key="tx.id" class="hover:bg-white/2 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{{ tx.date }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">{{ tx.description }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span class="bg-white/5 border border-white/10 text-gray-300 px-2.5 py-1 rounded-md text-xs font-medium">{{ tx.category }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-bold" :class="tx.type === 'income' ? 'text-emerald-400' : 'text-gray-200'">
                {{ tx.type === 'income' ? '+' : '-' }}{{ formatCurrency(tx.amount) }}
              </td>
              
              <td v-if="store.currentRole === 'admin'" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="store.deleteTransaction(tx.id)" class="text-rose-500 hover:text-rose-400 transition-colors">Delete</button>
              </td>
            </tr>

            <tr v-if="filteredTransactions.length === 0">
              <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                <span class="text-3xl block mb-2">📭</span>
                No transactions found matching your filters.
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-[#121217] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div class="p-6 border-b border-white/5 flex justify-between items-center bg-white/2">
          <h3 class="text-lg font-bold text-gray-100">New Transaction</h3>
          <button @click="isModalOpen = false" class="text-gray-500 hover:text-gray-300 transition-colors">&times;</button>
        </div>
        
        <form @submit.prevent="handleAddTransaction" class="p-6 space-y-5">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1.5">Type</label>
              <select v-model="newTx.type" class="w-full bg-[#1a1a21] border border-white/10 rounded-xl p-2.5 text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none">
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1.5">Date</label>
              <input type="date" v-model="newTx.date" required class="w-full bg-[#1a1a21] border border-white/10 rounded-xl p-2.5 text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none scheme-dark">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1.5">Description</label>
            <input type="text" v-model="newTx.description" required placeholder="e.g. Netflix Subscription" class="w-full bg-[#1a1a21] border border-white/10 rounded-xl p-2.5 text-gray-200 placeholder-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none">
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1.5">Amount ($)</label>
              <input type="number" step="0.01" v-model="newTx.amount" required class="w-full bg-[#1a1a21] border border-white/10 rounded-xl p-2.5 text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1.5">Category</label>
              <select v-model="newTx.category" class="w-full bg-[#1a1a21] border border-white/10 rounded-xl p-2.5 text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none">
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end gap-3 border-t border-white/5 mt-4 pt-6">
            <button type="button" @click="isModalOpen = false" class="px-4 py-2 text-gray-400 hover:text-gray-200 hover:bg-white/5 rounded-xl transition-colors">Cancel</button>
            <button type="submit" class="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/20 font-medium transition-colors">Save Transaction</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>