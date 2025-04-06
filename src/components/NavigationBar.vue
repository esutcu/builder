<template>
  <nav class="fixed z-50 p-4 w-full shadow-md">
    <div class="flex gap-5 max-md:flex-col">
      <div class="w-1/5 max-md:ml-0 max-md:w-full">
        <h1 class="text-2xl font-bold bg-clip-text">EduConnect Pro</h1>
      </div>
      <div class="ml-5 w-3/5 max-md:ml-0 max-md:w-full">
        <div class="flex gap-8 justify-center max-sm:hidden">
          <a href="#" class="text-slate-500 hover:text-blue-500">Home</a>
          <a href="#" class="text-slate-500 hover:text-blue-500">Features</a>
          <a href="#" class="text-slate-500 hover:text-blue-500">About</a>
          <a href="#" class="text-slate-500 hover:text-blue-500">Contact</a>
        </div>
      </div>
      <div class="ml-5 w-1/5 max-md:ml-0 max-md:w-full">
        <button
          class="px-4 py-2 bg-blue-500 rounded-lg shadow-md text-white hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
        >
          Login
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// Navigation bar component
</script>
