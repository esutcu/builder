<template>
  <section class="px-8 py-24 w-full max-sm:px-4 max-sm:py-16">
    <h3 class="mb-12 text-3xl font-bold text-center">Pricing Plans</h3>
    <div class="flex gap-5 max-md:flex-col">
      <div
        v-for="plan in plans"
        :key="plan.title"
        class="w-[33%] max-md:ml-0 max-md:w-full"
      >
        <div
          :class="[
            'px-8 py-12 text-center rounded-2xl shadow-lg transition-all bg-slate-50 duration-[0.3s] ease-[ease] max-sm:px-4 max-sm:py-8',
            plan.isPro
              ? 'scale-105 border-2 border-blue-500 border-solid shadow-xl z-[1]'
              : '',
            plan.isPro ? 'hover:scale-110' : 'hover:translate-y-[-10px]',
          ]"
        >
          <h4 class="mb-4 text-xl font-semibold">{{ plan.title }}</h4>
          <p class="mb-6 text-4xl font-bold text-blue-500">{{ plan.price }}</p>
          <ul class="mb-8 text-left">
            <li v-for="feature in plan.features" :key="feature" class="mb-2">
              ✓ {{ feature }}
            </li>
          </ul>
          <button
            class="px-6 py-3 font-semibold bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-colors"
          >
            Choose Plan
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { PricingPlan } from "./types";

const plans = ref<PricingPlan[]>([
  {
    title: "Basic",
    price: "$49/mo",
    features: [
      "4 Sessions per month",
      "Basic progress tracking",
      "Email support",
    ],
  },
  {
    title: "Pro",
    price: "$89/mo",
    features: [
      "8 Sessions per month",
      "Advanced progress tracking",
      "Priority support",
      "Study materials included",
    ],
    isPro: true,
  },
  {
    title: "Premium",
    price: "$149/mo",
    features: [
      "Unlimited Sessions",
      "Complete progress analytics",
      "24/7 support",
      "All materials included",
      "Parent dashboard access",
    ],
  },
]);
</script>
