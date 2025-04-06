<template>
  <div
    class="fixed inset-0 flex justify-center items-center p-8 backdrop-blur-sm bg-black bg-opacity-80 z-[1000]"
    @click="$emit('close')"
  >
    <div class="relative p-8 w-full rounded-2xl max-w-[900px]" @click.stop>
      <button
        class="absolute top-4 right-4 p-2 cursor-pointer border-none"
        @click="$emit('close')"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="stroke-slate-500"
        >
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke-width="2"
            stroke-linecap="round"
          ></path>
        </svg>
      </button>
      <h3 class="mb-4 text-2xl font-bold text-slate-800">
        Experience Interactive Learning
      </h3>
      <p class="mb-8 text-slate-500">
        See how our platform enables seamless interaction between students and
        teachers
      </p>
      <div class="overflow-hidden relative pb-56 h-0 rounded-lg">
        <iframe
          :src="videoUrl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          class="absolute top-0 left-0 border-none size-full"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  videoUrl: string;
}>();

defineEmits<{
  (e: "close"): void;
}>();
</script>
