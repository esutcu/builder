<template>
  <section class="flex flex-col gap-5 w-[300px] max-sm:w-full">
    <div
      class="p-6 bg-white rounded-lg h-fit shadow-[0px_4px_4px_rgba(0,0,0,0.1)] max-sm:w-full"
    >
      <h2 class="mb-4 text-lg font-medium text-neutral-800">Ders Planla</h2>
      <div class="flex flex-col gap-3">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Öğretmen ara..."
          class="px-3 py-2 mb-2 text-sm rounded border border-solid border-neutral-200"
        />

        <div
          v-for="teacher in paginatedTeachers"
          :key="teacher"
          class="flex justify-between items-center p-3 rounded border border-solid border-neutral-200"
        >
          <span class="text-sm text-neutral-800">{{ teacher }}</span>
          <button
            @click="selectTeacher(teacher)"
            class="px-4 py-2 text-sm font-medium bg-violet-700 rounded text-white hover:bg-violet-800 transition-colors"
          >
            Seç
          </button>
        </div>

        <div class="flex gap-2 justify-center mt-3">
          <button
            @click="previousPage"
            :disabled="currentPage === 1"
            class="px-2 py-1 text-sm rounded text-white"
            :class="
              currentPage === 1
                ? 'bg-gray-300'
                : 'bg-violet-700 hover:bg-violet-800'
            "
          >
            Önceki
          </button>
          <span class="px-2 py-1 text-sm"> Sayfa {{ currentPage }} </span>
          <button
            @click="nextPage"
            :disabled="currentPage >= totalPages"
            class="px-2 py-1 text-sm bg-violet-700 rounded text-white hover:bg-violet-800"
          >
            Sonraki
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const teachers = [
  "Ayşe Yılmaz",
  "Mehmet Yıldız",
  "Zeynep Kaya",
  "Ali Demir",
  "Fatma Öztürk",
  "Ahmet Kaya",
  "Selin Arslan",
  "Mustafa Çelik",
  "Elif Yıldırım",
  "Burak Şahin",
];

const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 5;

const filteredTeachers = computed(() => {
  return teachers.filter((teacher) =>
    teacher.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

const totalPages = computed(() => {
  return Math.ceil(filteredTeachers.value.length / itemsPerPage);
});

const paginatedTeachers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredTeachers.value.slice(start, end);
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

const emit = defineEmits<{
  (e: "select", teacher: string): void;
}>();

const selectTeacher = (teacher: string) => {
  emit("select", teacher);
};
</script>
