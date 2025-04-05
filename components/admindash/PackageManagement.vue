<template>
    <section class="p-6 bg-white rounded-lg h-fit shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-medium text-neutral-800">Ders Paketleri</h2>
        <button class="px-4 py-2 text-sm bg-violet-700 rounded text-white hover:bg-violet-800 transition-colors">
          Yeni Paket
        </button>
      </div>
      
      <div class="flex flex-col gap-3">
        <article
          v-for="pkg in packages"
          :key="pkg.id"
          class="p-4 bg-slate-50 rounded-lg border border-violet-100 border-solid"
        >
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-base font-medium text-neutral-800">{{ pkg.name }}</h3>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 text-xs rounded-full"
                :class="pkg.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
              >
                {{ pkg.isActive ? 'Aktif' : 'Pasif' }}
              </span>
            </div>
          </div>
          
          <div class="flex justify-between items-center mb-2">
            <span class="text-lg font-bold text-violet-700">₺{{ pkg.price }}</span>
            <span class="text-sm text-neutral-500">{{ pkg.credits }} Kredi</span>
          </div>
  
          <div class="flex justify-between items-center text-sm">
            <span class="text-neutral-500">{{ pkg.subscriberCount }} Abone</span>
            <button class="text-violet-700 hover:underline">Düzenle</button>
          </div>
        </article>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import type { Package } from './types';
  
  const packages = ref<Package[]>([
    {
      id: '1',
      name: 'Başlangıç Paketi',
      price: 299,
      credits: 4,
      isActive: true,
      subscriberCount: 156
    },
    {
      id: '2',
      name: 'Popüler Paket',
      price: 549,
      credits: 8,
      isActive: true,
      subscriberCount: 284
    },
    {
      id: '3',
      name: 'Premium Paket',
      price: 999,
      credits: 16,
      isActive: true,
      subscriberCount: 92
    }
  ]);
  </script>