<template>
    <section class="grid gap-6 grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
      <article class="p-6 bg-white rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-neutral-800">Toplam Öğrenci</h3>
          <div class="p-2 bg-violet-100 rounded-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#6200EE" stroke-width="2" stroke-linecap="round"/>
              <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="#6200EE" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
        <div class="mb-2 text-3xl font-bold text-violet-700">1,234</div>
        <div class="flex items-center text-sm">
          <span class="text-green-600">↑ 12%</span>
          <span class="ml-2 text-neutral-500">bu ay</span>
        </div>
      </article>
  
      <article class="p-6 bg-white rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-neutral-800">Toplam Öğretmen</h3>
          <div class="p-2 bg-orange-100 rounded-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#FF8913" stroke-width="2" stroke-linecap="round"/>
              <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="#FF8913" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
        <div class="mb-2 text-3xl font-bold text-orange-500">246</div>
        <div class="flex items-center text-sm">
          <span class="text-green-600">↑ 8%</span>
          <span class="ml-2 text-neutral-500">bu ay</span>
        </div>
      </article>
  
      <article class="p-6 bg-white rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-neutral-800">Aktif Dersler</h3>
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="#2196F3" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
        <div class="mb-2 text-3xl font-bold text-blue-500">892</div>
        <div class="flex items-center text-sm">
          <span class="text-green-600">↑ 15%</span>
          <span class="ml-2 text-neutral-500">bu ay</span>
        </div>
      </article>
  
      <article class="p-6 bg-white rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-neutral-800">Toplam Gelir</h3>
          <div class="p-2 bg-green-100 rounded-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v20m5-17H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="#4CAF50" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
        <div class="mb-2 text-3xl font-bold text-green-600">₺89,425</div>
        <div class="flex items-center text-sm">
          <span class="text-green-600">↑ 23%</span>
          <span class="ml-2 text-neutral-500">bu ay</span>
        </div>
      </article>
    </section>
  </template>
  
  <script setup lang="ts">
  // Dummy data kullanıyoruz, gerçek uygulamada API'den gelecek
  </script>