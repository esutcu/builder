<template>
  <section
    class="p-6 mb-5 bg-white rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.1)]"
  >
    <h2 class="mb-4 text-lg font-medium text-neutral-800">Toplam Ders Saati</h2>
    <div class="text-3xl text-violet-700 font-bold">{{ hours }} Saat</div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  hours: number;
}>();
</script>
