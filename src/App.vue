<script setup>
import Sidebar from './components/Sidebar.vue'
import { useFinanceStore } from './stores/useFinanceStore' // 1. Import the store

const store = useFinanceStore() // 2. Initialize it
</script>

<template>
  <div class="min-h-screen bg-[#0c0c0f] text-gray-100 flex font-sans selection:bg-indigo-500/30">
    
    <Sidebar />

    <div class="flex-1 flex flex-col min-h-screen relative">
      
      <header class="h-16 border-b border-white/5 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-10 bg-[#0c0c0f]/80 backdrop-blur-md">
        <h2 class="text-base sm:text-lg font-medium text-gray-200">FinDash ✨</h2>
        
        <div class="flex items-center gap-3 sm:gap-4">
          
          <button 
            @click="store.toggleRole" 
            class="md:hidden text-xs font-medium capitalize px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
            :class="store.currentRole === 'admin' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/5 text-gray-300'"
          >
            {{ store.currentRole }}
          </button>

          <div class="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
            <span class="text-gray-400 text-sm">🔍 Search anything...</span>
          </div>
          <div class="h-8 w-8 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-500/20">
            P
          </div>
        </div>
      </header>

      <main class="p-4 sm:p-8 flex-1 overflow-y-auto pb-24 md:pb-8">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>

      <nav class="md:hidden fixed bottom-0 left-0 w-full bg-[#0c0c0f]/90 backdrop-blur-lg border-t border-white/5 flex justify-around items-center p-3 z-50">
        <router-link to="/" class="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 p-2 rounded-xl transition-all" active-class="!text-indigo-400 bg-indigo-500/10">
          <span class="text-xl">📊</span>
          <span class="text-[10px] font-medium">Dash</span>
        </router-link>
        <router-link to="/transactions" class="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 p-2 rounded-xl transition-all" active-class="!text-indigo-400 bg-indigo-500/10">
          <span class="text-xl">💳</span>
          <span class="text-[10px] font-medium">Transact</span>
        </router-link>
        <router-link to="/insights" class="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 p-2 rounded-xl transition-all" active-class="!text-indigo-400 bg-indigo-500/10">
          <span class="text-xl">💡</span>
          <span class="text-[10px] font-medium">Insights</span>
        </router-link>
      </nav>

    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>