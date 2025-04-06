<template>
  <section class="p-6 bg-white rounded-lg h-fit shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
    <h2 class="mb-4 text-lg font-medium text-neutral-800">Müsaitlik Takvimi</h2>
    <div class="flex flex-col gap-3 p-4 rounded-lg bg-slate-50">
      <div class="grid grid-cols-7 gap-2">
        <div
          v-for="day in weekDays"
          :key="day"
          class="flex justify-center items-center h-10 text-sm text-neutral-500 font-medium"
        >
          {{ day }}
        </div>
        <div
          v-for="(date, index) in calendarDays"
          :key="index"
          class="relative flex justify-center items-center h-10 text-sm rounded-lg"
          :class="getDateClass(date)"
        >
          <span v-if="date.day">{{ date.day }}</span>
        </div>
      </div>

      <div class="mt-4">
        <h3 class="mb-3 text-sm font-medium text-neutral-800">Renk Açıklaması</h3>
        <div class="flex gap-4">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded-full bg-violet-200"></div>
            <span class="text-xs text-neutral-600">Müsait</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded-full bg-green-200"></div>
            <span class="text-xs text-neutral-600">Planlanmış</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded-full bg-gray-200"></div>
            <span class="text-xs text-neutral-600">Geçmiş</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const weekDays = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

interface CalendarDay {
  day: number | null;
  available: boolean;
  scheduled: boolean;
  isPast: boolean;
}

const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const today = new Date();

// For demo/preview purposes
const randomAvailableDays = ref([3, 5, 10, 12, 15, 17, 20, 22, 25, 27]);
const randomScheduledDays = ref([7, 14, 21, 28]);

const calendarDays = computed(() => {
  const days: CalendarDay[] = [];
  const firstDay = new Date(currentYear.value, currentMonth.value, 1);
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);
  const daysInMonth = lastDay.getDate();
  
  // Add empty slots for days before the first of the month
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push({ day: null, available: false, scheduled: false, isPast: false });
  }
  
  // Add all days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const dayDate = new Date(currentYear.value, currentMonth.value, i);
    const isPast = dayDate < today;
    
    // Mark specific days as available or scheduled (for demo)
    const available = !isPast && randomAvailableDays.value.includes(i);
    const scheduled = !isPast && randomScheduledDays.value.includes(i);
    
    days.push({ 
      day: i, 
      available, 
      scheduled, 
      isPast 
    });
  }
  
  return days;
});

const getDateClass = (date: CalendarDay) => {
  if (!date.day) return "";
  if (date.isPast) return "bg-gray-200 text-gray-400";
  if (date.scheduled) return "bg-green-200 text-green-800";
  if (date.available) return "bg-violet-200 text-violet-800";
  return "bg-white";
};
</script>