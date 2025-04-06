<template>
    <section class="p-6 bg-white rounded-lg h-fit shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
      <h2 class="mb-4 text-lg font-medium text-neutral-800">Son Aktiviteler</h2>
      <div class="flex flex-col gap-3 p-4 rounded-lg bg-slate-50">
        <article
          v-for="activity in activities"
          :key="activity.id"
          class="p-3 bg-white rounded border border-violet-100 border-solid shadow-[0_2px_4px_rgba(98,0,238,0.05)]"
        >
          <div class="flex justify-between items-center">
            <p class="text-sm text-neutral-800">{{ activity.action }}</p>
            <span class="text-xs text-neutral-500">{{ activity.timestamp }}</span>
          </div>
          <div class="flex gap-2 items-center mt-2">
            <span class="text-sm text-violet-700">{{ activity.user.name }}</span>
            <span class="px-2 py-0.5 text-xs rounded-full" 
              :class="activity.user.role === 'teacher' ? 'bg-orange-100 text-orange-700' : 'bg-violet-100 text-violet-700'">
              {{ activity.user.role }}
            </span>
          </div>
        </article>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import type { UserActivity } from './types';
  
  const activities = ref<UserActivity[]>([
    {
      id: '1',
      user: {
        name: 'Ahmet Yılmaz',
        role: 'teacher'
      },
      action: 'Yeni ders planı oluşturuldu',
      timestamp: '10:30'
    },
    {
      id: '2',
      user: {
        name: 'Ayşe Kaya',
        role: 'student'
      },
      action: 'Ders paketi satın alındı',
      timestamp: '09:45'
    },
    {
      id: '3',
      user: {
        name: 'Mehmet Demir',
        role: 'teacher'
      },
      action: 'Müsaitlik takvimi güncellendi',
      timestamp: '09:15'
    }
  ]);
  </script>