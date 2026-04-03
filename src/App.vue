<script setup>
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="min-h-screen bg-[#0c0c0f] text-gray-100 flex font-sans selection:bg-indigo-500/30">
    
    <Sidebar />

    <div class="flex-1 flex flex-col min-h-screen">
      
      <header class="h-16 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-10 bg-[#0c0c0f]/80 backdrop-blur-md">
        <h2 class="text-lg font-medium text-gray-200">Welcome Back, Piyush ✨</h2>
        
        <div class="flex items-center gap-4">
          <div class="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
            <span class="text-gray-400 text-sm">🔍 Search anything...</span>
          </div>
          <div class="h-8 w-8 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-500/20">
            P
          </div>
        </div>
      </header>

      <main class="p-8 flex-1 overflow-y-auto">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>

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