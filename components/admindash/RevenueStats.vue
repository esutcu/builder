<template>
    <section class="p-6 bg-white rounded-lg h-fit shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg font-medium text-neutral-800">Gelir İstatistikleri</h2>
        <select 
          v-model="selectedPeriod"
          class="px-3 py-2 text-sm rounded border border-solid border-neutral-200"
        >
          <option value="daily">Günlük</option>
          <option value="weekly">Haftalık</option>
          <option value="monthly">Aylık</option>
        </select>
      </div>
  
      <div class="flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-slate-50 rounded-lg">
            <div class="text-sm text-neutral-500 mb-2">Toplam Gelir</div>
            <div class="text-2xl font-bold text-violet-700">₺89,425</div>
            <div class="flex items-center mt-2">
              <span class="text-green-600 text-sm">↑ 23%</span>
              <span class="text-neutral-500 text-sm ml-2">geçen aya göre</span>
            </div>
          </div>
  
          <div class="p-4 bg-slate-50 rounded-lg">
            <div class="text-sm text-neutral-500 mb-2">Ortalama Satış</div>
            <div class="text-2xl font-bold text-violet-700">₺549</div>
            <div class="flex items-center mt-2">
              <span class="text-green-600 text-sm">↑ 12%</span>
              <span class="text-neutral-500 text-sm ml-2">geçen aya göre</span>
            </div>
          </div>
        </div>
  
        <div class="mt-4">
          <h3 class="text-sm font-medium text-neutral-800 mb-4">Paket Satışları</h3>
          <div class="flex flex-col gap-3">
            <div 
              v-for="package_ in packageSales" 
              :key="package_.name"
              class="flex justify-between items-center p-3 bg-slate-50 rounded-lg"
            >
              <div>
                <div class="text-sm font-medium text-neutral-800">{{ package_.name }}</div>
                <div class="text-xs text-neutral-500">{{ package_.sales }} satış</div>
              </div>
              <div class="text-sm font-medium text-violet-700">₺{{ package_.revenue.toLocaleString() }}</div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="mt-6 pt-6 border-t border-neutral-200">
        <h3 class="text-sm font-medium text-neutral-800 mb-4">Günlük Satışlar</h3>
        <div class="h-48 bg-slate-50 rounded-lg p-4">
          <!-- Buraya bir grafik komponenti eklenebilir -->
          <div class="flex items-end justify-between h-full">
            <div v-for="day in dailySales" :key="day.date" class="flex flex-col items-center w-8">
              <div 
                class="w-4 bg-violet-500 rounded-t transition-all duration-300"
                :style="{ height: `${day.percentage}%` }"
              ></div>
              <div class="text-xs text-neutral-500 mt-2">{{ day.day }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const selectedPeriod = ref('monthly');
  
  const packageSales = ref([
    {
      name: 'Premium Paket',
      sales: 48,
      revenue: 47952
    },
    {
      name: 'Standart Paket',
      sales: 76,
      revenue: 26524
    },
    {
      name: 'Başlangıç Paketi',
      sales: 52,
      revenue: 14949
    }
  ]);
  
  const dailySales = ref([
    { day: 'Pzt', percentage: 65, date: '2024-03-11' },
    { day: 'Sal', percentage: 80, date: '2024-03-12' },
    { day: 'Çar', percentage: 45, date: '2024-03-13' },
    { day: 'Per', percentage: 90, date: '2024-03-14' },
    { day: 'Cum', percentage: 75, date: '2024-03-15' },
    { day: 'Cmt', percentage: 40, date: '2024-03-16' },
    { day: 'Paz', percentage: 30, date: '2024-03-17' }
  ]);
  </script>