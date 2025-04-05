<template>
  <div class="relative mb-16 max-sm:mb-8">
    <div
      class="p-8 ml-16 rounded-2xl shadow-md transition-transform duration-[0.3s] ease-[ease] max-sm:p-4 max-sm:ml-12 hover:translate-x-2"
    >
      <h4 class="mb-2 text-xl font-semibold text-blue-500">{{ title }}</h4>
      <p class="text-slate-500">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>
