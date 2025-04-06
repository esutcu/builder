<template>
  <section class="overflow-hidden relative px-4 py-16 bg-blue-50">
    <h3 class="mb-12 text-3xl font-bold text-center text-slate-800">
      What Our Students Say
    </h3>
    <div class="flex gap-5 max-md:flex-col">
      <article
        v-for="testimonial in testimonials"
        :key="testimonial.name"
        class="w-[33%] max-md:ml-0 max-md:w-full"
      >
        <div
          class="p-8 rounded-2xl shadow-md transition-transform duration-[0.3s] ease-[ease] hover:translate-y-[-10px] bg-white"
        >
          <div class="flex items-center mb-6">
            <img
              :src="testimonial.image"
              :alt="testimonial.name"
              class="object-cover overflow-hidden mr-4 w-16 h-16 rounded-full"
            />
            <div>
              <h4 class="text-lg font-semibold text-slate-800">
                {{ testimonial.name }}
              </h4>
              <p class="text-sm text-slate-500">{{ testimonial.role }}</p>
            </div>
          </div>
          <p class="leading-relaxed text-slate-700">
            {{ testimonial.content }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Testimonial } from "./types";

const testimonials = ref<Testimonial[]>([
  {
    name: "Sarah Johnson",
    role: "Mathematics Student",
    image: "https://placehold.co/80x80",
    content:
      "The personalized attention I receive has dramatically improved my understanding of complex math concepts. My grades have improved significantly!",
  },
  {
    name: "Michael Chen",
    role: "Physics Student",
    image: "https://placehold.co/80x80",
    content:
      "The flexibility to schedule classes around my busy schedule has been a game-changer. The teachers are incredibly knowledgeable and patient.",
  },
  {
    name: "Emma Rodriguez",
    role: "Chemistry Student",
    image: "https://placehold.co/80x80",
    content:
      "The interactive learning experience and real-time feedback have made complex chemistry concepts much easier to grasp. Highly recommended!",
  },
]);
</script>
