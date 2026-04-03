<script setup>
import { useFinanceStore } from '../stores/useFinanceStore'

const store = useFinanceStore()
</script>

<template>
  <aside class="w-64 border-r border-white/5  flex-col justify-between hidden md:flex h-screen sticky top-0 bg-[#121217]">
    
    <div>
      <div class="h-16 flex items-center px-6 border-b border-white/5">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span class="text-white font-bold text-sm">F</span>
          </div>
          <span class="text-xl font-bold text-gray-100 tracking-wide">FinDash</span>
        </div>
      </div>

      <nav class="p-4 space-y-2 mt-4">
        <p class="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Menu</p>
        
        <router-link to="/" class="block px-4 py-2.5 rounded-xl text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-colors" active-class="bg-indigo-500/10 text-indigo-400 font-medium border border-indigo-500/20">
          Dashboard
        </router-link>
        <router-link to="/transactions" class="block px-4 py-2.5 rounded-xl text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-colors" active-class="bg-indigo-500/10 text-indigo-400 font-medium border border-indigo-500/20">
          Transactions
        </router-link>
        <router-link to="/insights" class="block px-4 py-2.5 rounded-xl text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-colors" active-class="bg-indigo-500/10 text-indigo-400 font-medium border border-indigo-500/20">
          Insights
        </router-link>
      </nav>
    </div>

    <div class="p-4 border-t border-white/5 bg-white/2">
      <p class="text-xs text-gray-500 mb-3 uppercase font-semibold tracking-wider">Current Role</p>
      <div class="flex items-center justify-between bg-[#1a1a21] border border-white/10 rounded-xl p-2.5">
        <span class="text-sm font-medium capitalize" :class="store.currentRole === 'admin' ? 'text-indigo-400' : 'text-gray-400'">
          {{ store.currentRole }}
        </span>
        <button 
          @click="store.toggleRole"
          class="text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors text-gray-300"
        >
          Switch
        </button>
      </div>
    </div>
  </aside>
</template>