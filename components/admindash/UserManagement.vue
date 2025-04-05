<template>
    <section class="p-6 bg-white rounded-lg h-fit shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-medium text-neutral-800">Kullanıcı Yönetimi</h2>
        <div class="flex gap-2">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Kullanıcı ara..."
            class="px-3 py-2 text-sm rounded border border-solid border-neutral-200"
          />
          <button class="px-4 py-2 text-sm bg-violet-700 rounded text-white hover:bg-violet-800 transition-colors">
            Yeni Kullanıcı
          </button>
        </div>
      </div>
  
      <div class="flex flex-col gap-3">
        <article
          v-for="user in filteredUsers"
          :key="user.id"
          class="p-4 bg-slate-50 rounded-lg border border-violet-100 border-solid"
        >
          <div class="flex justify-between items-center mb-2">
            <div class="flex items-center gap-3">
              <h3 class="text-base font-medium text-neutral-800">{{ user.name }}</h3>
              <span class="px-2 py-0.5 text-xs rounded-full"
                :class="{
                  'bg-orange-100 text-orange-700': user.role === 'teacher',
                  'bg-violet-100 text-violet-700': user.role === 'student',
                  'bg-blue-100 text-blue-700': user.role === 'admin'
                }"
              >
                {{ user.role }}
              </span>
            </div>
            <span class="px-2 py-0.5 text-xs rounded-full"
              :class="{
                'bg-green-100 text-green-700': user.status === 'active',
                'bg-red-100 text-red-700': user.status === 'inactive',
                'bg-yellow-100 text-yellow-700': user.status === 'suspended'
              }"
            >
              {{ user.status }}
            </span>
          </div>
  
          <div class="flex justify-between items-center text-sm">
            <span class="text-neutral-500">{{ user.email }}</span>
            <div class="flex gap-2">
              <span class="text-neutral-500">Son giriş: {{ user.lastActive }}</span>
              <button class="text-violet-700 hover:underline">Düzenle</button>
            </div>
          </div>
        </article>
      </div>
  
      <div class="flex gap-2 justify-center mt-4">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 text-sm rounded text-white"
          :class="currentPage === 1 ? 'bg-gray-300' : 'bg-violet-700 hover:bg-violet-800'"
        >
          Önceki
        </button>
        <span class="px-3 py-1 text-sm">Sayfa {{ currentPage }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage >= totalPages"
          class="px-3 py-1 text-sm bg-violet-700 rounded text-white hover:bg-violet-800"
        >
          Sonraki
        </button>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import type { User } from './types';
  
  const searchQuery = ref('');
  const currentPage = ref(1);
  const itemsPerPage = 5;
  
  const users = ref<User[]>([
    {
      id: '1',
      name: 'Ayşe Yılmaz',
      email: 'ayse.yilmaz@email.com',
      role: 'teacher',
      status: 'active',
      joinDate: '2024-01-15',
      lastActive: '2024-03-15 14:30'
    },
    {
      id: '2',
      name: 'Mehmet Kaya',
      email: 'mehmet.kaya@email.com',
      role: 'student',
      status: 'active',
      joinDate: '2024-02-01',
      lastActive: '2024-03-15 13:45'
    },
    {
      id: '3',
      name: 'Ali Demir',
      email: 'ali.demir@email.com',
      role: 'admin',
      status: 'active',
      joinDate: '2023-12-01',
      lastActive: '2024-03-15 15:20'
    }
  ]);
  
  const filteredUsers = computed(() => {
    return users.value.filter(user =>
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  
  const totalPages = computed(() => {
    return Math.ceil(filteredUsers.value.length / itemsPerPage);
  });
  
  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };
  </script>