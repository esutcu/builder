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
        <p class="text-sm text-neutral-500">Öğrenci: {{ class_.student }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface PlannedClass {
  date: string;
  time: string;
  student: string;
}

const plannedClasses = ref<PlannedClass[]>([
  {
    date: "18 Mart 2024",
    time: "15:30",
    student: "Ali Demir",
  },
  {
    date: "20 Mart 2024",
    time: "10:00",
    student: "Ayşe Kaya",
  },
]);
</script>
