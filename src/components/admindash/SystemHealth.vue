<template>
    <section class="p-6 bg-white rounded-lg h-fit shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
      <h2 class="mb-4 text-lg font-medium text-neutral-800">Sistem Durumu</h2>
      
      <div class="flex flex-col gap-3 p-4 rounded-lg bg-slate-50">
        <article
          v-for="metric in healthMetrics"
          :key="metric.name"
          class="p-3 bg-white rounded border border-violet-100 border-solid shadow-[0_2px_4px_rgba(98,0,238,0.05)]"
        >
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full"
                :class="{
                  'bg-green-500': metric.status === 'healthy',
                  'bg-yellow-500': metric.status === 'warning',
                  'bg-red-500': metric.status === 'critical'
                }"
              ></div>
              <span class="text-sm text-neutral-800">{{ metric.name }}</span>
            </div>
            <span class="text-sm font-medium"
              :class="{
                'text-green-600': metric.status === 'healthy',
                'text-yellow-600': metric.status === 'warning',
                'text-red-600': metric.status === 'critical'
              }"
            >{{ metric.value }}%</span>
          </div>
          
          <div class="flex justify-between items-center mt-2">
            <span class="text-xs text-neutral-500">Son 24 saat</span>
            <div class="flex items-center gap-1">
              <svg
                v-if="metric.trend === 'up'"
                class="w-4 h-4 text-green-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 9l4-4 4 4 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
              </svg>
              <svg
                v-else-if="metric.trend === 'down'"
                class="w-4 h-4 text-red-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 6l4 4 4-4 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
              </svg>
              <svg
                v-else
                class="w-4 h-4 text-neutral-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 10h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
              </svg>
              <span class="text-xs"
                :class="{
                  'text-green-600': metric.trend === 'up',
                  'text-red-600': metric.trend === 'down',
                  'text-neutral-600': metric.trend === 'stable'
                }"
              >{{ getStatusText(metric.trend) }}</span>
            </div>
          </div>
        </article>
      </div>
  
      <div class="flex justify-end mt-4">
        <button class="px-4 py-2 text-sm bg-violet-700 rounded text-white hover:bg-violet-800 transition-colors">
          Detaylı Rapor
        </button>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import type { SystemHealthMetric } from './types';
  
  const healthMetrics = ref<SystemHealthMetric[]>([
    {
      name: 'Sistem Performansı',
      value: 98,
      status: 'healthy',
      trend: 'stable'
    },
    {
      name: 'Sunucu Yanıt Süresi',
      value: 92,
      status: 'healthy',
      trend: 'up'
    },
    {
      name: 'Veritabanı Yükü',
      value: 78,
      status: 'warning',
      trend: 'up'
    },
    {
      name: 'Depolama Kullanımı',
      value: 85,
      status: 'warning',
      trend: 'stable'
    }
  ]);
  
  const getStatusText = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'Yükseliyor';
      case 'down':
        return 'Düşüyor';
      case 'stable':
        return 'Stabil';
    }
  };
  </script>