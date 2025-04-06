<template>
  <section
    class="grid gap-6 p-6 m-0 w-full bg-slate-50 grid-cols-[repeat(3,minmax(300px,1fr))] max-w-[1200px] max-md:justify-center max-md:grid-cols-[repeat(2,minmax(280px,1fr))] max-sm:p-4 max-sm:grid-cols-[minmax(280px,1fr)]"
  >
    <article
      v-for="(pkg, index) in packages"
      :key="index"
      class="flex flex-col gap-4 p-6 bg-white rounded-lg min-h-[280px] shadow-[0px_4px_4px_rgba(0,0,0,0.1)]"
      :class="{ 'border-2 border-violet-700 border-solid': pkg.isPopular }"
    >
      <h3 class="text-xl font-medium text-neutral-800">
        {{ pkg.title }}
      </h3>
      <div class="text-3xl text-violet-700 font-bold">
        {{ pkg.price }}
      </div>
      <div class="text-neutral-500">{{ pkg.credits }} Ders Kredisi</div>
      <button
        class="p-3 mt-auto text-sm font-medium bg-violet-700 rounded text-white hover:bg-violet-800 transition-colors"
      >
        Satın Al
      </button>
    </article>
  </section>
</template>

<script setup lang="ts">
import type { Package } from "./types";

const packages: Package[] = [
  {
    title: "Başlangıç Paketi",
    price: "₺299",
    credits: 4,
  },
  {
    title: "Popüler Paket",
    price: "₺549",
    credits: 8,
    isPopular: true,
  },
  {
    title: "Premium Paket",
    price: "₺999",
    credits: 16,
  },
];
</script>
