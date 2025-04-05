<template>
  <section
    class="p-6 bg-white rounded-lg h-fit shadow-[0px_4px_4px_rgba(0,0,0,0.1)]"
  >
    <h2 class="mb-6 text-2xl font-semibold text-neutral-800">Yaklaşan Ders</h2>
    <div
      class="flex gap-6 justify-between items-center mb-4 max-sm:flex-col max-sm:gap-2 max-sm:items-start"
    >
      <div class="flex gap-2 items-center text-base text-neutral-800">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M15.8333 3.33334H4.16667C3.24619 3.33334 2.5 4.07954 2.5 5.00001V16.6667C2.5 17.5872 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5872 17.5 16.6667V5.00001C17.5 4.07954 16.7538 3.33334 15.8333 3.33334Z"
            stroke="#717370"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M2.5 8.33334H17.5"
            stroke="#717370"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M13.3333 1.66666V4.99999"
            stroke="#717370"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M6.66667 1.66666V4.99999"
            stroke="#717370"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
        <span class="font-medium">15 Mart 2024</span>
      </div>

      <div
        class="flex gap-3 items-center px-4 py-2 text-2xl text-orange-500 bg-orange-50 rounded-lg"
      >
        <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z"
            stroke="#FF8913"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M10 5V10L13.3333 11.6667"
            stroke="#FF8913"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
        <span class="font-semibold">14:30</span>
      </div>

      <div class="flex gap-2 items-center text-base text-neutral-800">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 9.16667C11.841 9.16667 13.3333 7.67428 13.3333 5.83333C13.3333 3.99238 11.841 2.5 10 2.5C8.15905 2.5 6.66667 3.99238 6.66667 5.83333C6.66667 7.67428 8.15905 9.16667 10 9.16667Z"
            stroke="#717370"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M15.8333 17.5C15.8333 14.2784 13.2216 11.6667 10 11.6667C6.77834 11.6667 4.16667 14.2784 4.16667 17.5"
            stroke="#717370"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
        <span class="font-medium">Öğrenci: Can Yılmaz</span>
      </div>
    </div>

    <button
      class="px-5 py-2.5 w-full text-base font-medium bg-violet-700 rounded text-white hover:bg-violet-800 transition-colors"
    >
      Derse Başla
    </button>
  </section>
</template>

<script setup lang="ts"></script>
