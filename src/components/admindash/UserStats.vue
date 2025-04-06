<template>
    <section class="p-6 bg-white rounded-lg h-fit shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg font-medium text-neutral-800">Kullanıcı İstatistikleri</h2>
        <select 
          v-model="selectedPeriod"
          class="px-3 py-2 text-sm rounded border border-solid border-neutral-200"
        >
          <option value="daily">Günlük</option>
          <option value="weekly">Haftalık</option>
          <option value="monthly">Aylık</option>
        </select>
      </div>
  
      <div class="grid grid-cols-2 gap-4 mb-4">
        <article class="p-4 bg-slate-50 rounded-lg">
          <h3 class="text-sm text-neutral-500 mb-2">Aktif Öğrenciler</h3>
          <div class="text-2xl font-bold text-violet-700">934</div>
          <div class="flex items-center mt-2">
            <span class="text-green-600 text-sm">↑ 12%</span>
            <span class="text-neutral-500 text-sm ml-2">geçen aya göre</span>
          </div>
        </article>
  
        <article class="p-4 bg-slate-50 rounded-lg">
          <h3 class="text-sm text-neutral-500 mb-2">Aktif Öğretmenler</h3>
          <div class="text-2xl font-bold text-orange-500">187</div>
          <div class="flex items-center mt-2">
            <span class="text-green-600 text-sm">↑ 8%</span>
            <span class="text-neutral-500 text-sm ml-2">geçen aya göre</span>
          </div>
        </article>
      </div>
  
      <div class="h-48 bg-slate-50 rounded-lg p-4">
        <!-- Buraya bir kullanıcı grafiği eklenebilir -->
        <div class="h-full flex items-end">
          <div class="w-full grid grid-cols-12 gap-1 h-[80%]">
            <div 
              v-for="(value, index) in userGrowthData" 
              :key="index"
              class="bg-violet-500 rounded-t"
              :style="{ height: `${value}%` }"
            ></div>
          </div>
        </div>
        <div class="mt-2 flex justify-between">
          <span class="text-xs text-neutral-500">Son 12 Ay</span>
          <span class="text-xs text-green-600">%15 Büyüme</span>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const selectedPeriod = ref('monthly');
  
  // Demo için büyüme verileri
  const userGrowthData = [45, 52, 49, 60, 55, 58, 63, 60, 65, 70, 68, 75];
  </script>