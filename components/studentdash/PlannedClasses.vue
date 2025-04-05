<template>
  <section
    class="p-6 bg-white rounded-lg h-fit shadow-[0px_4px_4px_rgba(0,0,0,0.1)]"
  >
    <h2 class="mb-4 text-lg font-medium text-neutral-800">Planlı Dersler</h2>
    <div class="flex flex-col gap-3 p-4 rounded-lg bg-slate-50">
      <article
        v-for="(class_, index) in plannedClasses"
        :key="index"
        class="p-3 bg-white rounded border border-violet-100 border-solid shadow-[0_2px_4px_rgba(98,0,238,0.05)]"
      >
        <p class="mb-1 text-sm text-neutral-500">Tarih: {{ class_.date }}</p>
        <p class="mb-1 text-sm text-neutral-500">Saat: {{ class_.time }}</p>
        <p class="text-sm text-neutral-500">Öğretmen: {{ class_.teacher }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { PlannedClass } from "./types";

const plannedClasses = ref<PlannedClass[]>([
  {
    date: "18 Mart 2024",
    time: "15:30",
    teacher: "Mehmet Yıldız",
  },
  {
    date: "20 Mart 2024",
    time: "10:00",
    teacher: "Zeynep Kaya",
  },
]);
</script>
