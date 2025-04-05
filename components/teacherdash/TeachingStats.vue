<template>
  <section
    class="grid gap-6 p-6 m-0 w-full bg-slate-50 grid-cols-[repeat(3,minmax(300px,1fr))] max-w-[1200px] max-md:justify-center max-md:grid-cols-[repeat(2,minmax(280px,1fr))] max-sm:p-4 max-sm:grid-cols-[minmax(280px,1fr)]"
  >
    <article
      class="flex flex-col gap-4 p-6 bg-white rounded-lg min-h-[280px] shadow-[0px_4px_4px_rgba(0,0,0,0.1)]"
    >
      <h3 class="text-xl font-medium text-neutral-800">Bu Ay</h3>
      <div class="text-3xl text-violet-700 font-bold">24 Saat</div>
      <div class="text-neutral-500">Tamamlanan Ders</div>
      <div class="mt-auto text-sm text-green-600">%15 artış</div>
    </article>

    <article
      class="flex flex-col gap-4 p-6 bg-white rounded-lg min-h-[280px] shadow-[0px_4px_4px_rgba(0,0,0,0.1)] border-2 border-violet-700 border-solid"
    >
      <h3 class="text-xl font-medium text-neutral-800">Toplam</h3>
      <div class="text-3xl text-violet-700 font-bold">156 Saat</div>
      <div class="text-neutral-500">Tamamlanan Ders</div>
      <div class="mt-auto text-sm text-green-600">%25 artış</div>
    </article>

    <article
      class="flex flex-col gap-4 p-6 bg-white rounded-lg min-h-[280px] shadow-[0px_4px_4px_rgba(0,0,0,0.1)]"
    >
      <h3 class="text-xl font-medium text-neutral-800">Öğrenci Sayısı</h3>
      <div class="text-3xl text-violet-700 font-bold">18</div>
      <div class="text-neutral-500">Aktif Öğrenci</div>
      <div class="mt-auto text-sm text-green-600">%10 artış</div>
    </article>
  </section>
</template>

<script setup lang="ts"></script>
