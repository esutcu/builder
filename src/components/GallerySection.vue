<template>
  <section class="overflow-hidden px-4 py-16">
    <h3 class="mb-12 text-3xl font-bold text-center text-slate-700">
      Featured Gallery
    </h3>
    <div
      class="relative mx-auto my-0 h-[500px] max-w-[1200px] max-sm:h-[400px]"
    >
      <div
        v-if="selectedImage"
        class="fixed inset-0 z-50 flex justify-center items-center p-8 bg-black bg-opacity-80"
        @click="closeModal"
      >
        <img
          :src="selectedImage"
          alt="Selected gallery image"
          class="max-w-full rounded-lg shadow-2xl max-h-[90vh]"
        />
      </div>

      <div class="relative h-full">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="absolute top-2/4 left-2/4 transition-transform cursor-pointer duration-[0.5s] ease-[ease] h-[300px] w-[300px]"
          :style="getImageStyle(index)"
          @click="openModal(image)"
        >
          <img
            :src="image"
            :alt="`Gallery image ${index + 1}`"
            class="object-cover rounded-2xl shadow-lg size-full"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectedImage = ref<string | null>(null);
const images = ref([
  "https://picsum.photos/600/600?night",
  "https://picsum.photos/600/600?city",
  "https://picsum.photos/600/600?sunset",
  "https://picsum.photos/600/600?architecture",
  "https://picsum.photos/600/600?street",
  "https://picsum.photos/600/600?bridge",
]);

const getImageStyle = (index: number) => {
  const angle = index * (360 / images.value.length);
  const transform = `translate(-50%, -50%) rotateY(${angle}deg) translateZ(400px)`;
  const mobileTransform = `translate(-50%, -50%) rotateY(${angle}deg) translateZ(300px)`;

  return {
    transform,
    "@media (max-width: 640px)": {
      width: "200px",
      height: "200px",
      transform: mobileTransform,
    },
  };
};

const openModal = (image: string) => {
  selectedImage.value = image;
};

const closeModal = () => {
  selectedImage.value = null;
};
</script>
