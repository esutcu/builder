<template>
  <section class="overflow-hidden relative px-4 py-16 bg-slate-50">
    <h3 class="mb-12 text-3xl font-bold text-center">How It Works</h3>
    <div class="flex gap-5 max-md:flex-col">
      <div class="w-6/12 max-md:ml-0 max-md:w-full">
        <div class="relative justify-center p-8">
          <div class="relative mx-auto my-0 max-w-[800px]">
            <div
              class="overflow-hidden relative rounded-2xl shadow-xl cursor-pointer"
              @click="openModal"
            >
              <img
                src="https://placehold.co/800x450"
                alt="Video thumbnail"
                class="object-cover overflow-hidden w-full h-auto transition-transform aspect-square duration-[0.3s] ease-[ease]"
              />
              <div
                class="flex absolute top-2/4 left-2/4 justify-center items-center w-20 h-20 rounded-full transition-all -translate-x-2/4 -translate-y-2/4 bg-white bg-opacity-90 duration-[0.3s] ease-[ease] hover:scale-110"
              >
                <div
                  class="ml-1.5 w-0 h-0 border-solid border-[15px_0_15px_25px] border-[transparent_transparent_transparent_#3b82f6]"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
        <div class="relative p-8 mx-auto my-0 max-w-[800px] timeline-container">
          <TimelineStep
            v-for="(step, index) in steps"
            :key="index"
            :title="step.title"
            :description="step.description"
          />
        </div>
      </div>
    </div>

    <VideoModal
      v-if="isModalOpen"
      @close="closeModal"
      videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TimelineStep from "./TimelineStep.vue";
import VideoModal from "./VideoModal.vue";

const isModalOpen = ref(false);

const steps = [
  {
    title: "Step 1: Sign Up",
    description:
      "Create your account and complete your student profile to help us understand your learning needs.",
  },
  {
    title: "Step 2: Choose Your Plan",
    description:
      "Select a subscription plan that fits your learning goals and schedule.",
  },
  {
    title: "Step 3: Schedule Classes",
    description:
      "Browse available time slots and book sessions with your preferred teachers.",
  },
  {
    title: "Step 4: Start Learning",
    description:
      "Join your online classes and begin your personalized learning journey with expert guidance.",
  },
];

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<style scoped>
.timeline-container::before {
  content: "";
  position: absolute;
  left: 30px;
  top: 60px;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, #3b82f6 0%, #6366f1 100%);
  animation: growLine 1.5s ease-out forwards;
}

@keyframes growLine {
  0% {
    transform: scaleY(0);
    opacity: 0;
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
}
</style>
