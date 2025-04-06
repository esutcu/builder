<template>
    <section
      class="sticky top-5 bg-white rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.1)] size-full max-sm:w-full"
    >
      <div class="px-6 pt-6 pb-4">
        <h2
          class="mb-6 text-xs font-medium tracking-widest uppercase text-neutral-500"
        >
          Select date and time
        </h2>
  
        <div class="flex justify-between items-center mb-6">
          <button
            @click="previousMonth"
            class="p-2 text-violet-700 hover:bg-violet-50 rounded-full transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
  
          <div class="text-base text-neutral-800">
            {{ currentMonthName }}
          </div>
  
          <button
            @click="nextMonth"
            class="p-2 text-violet-700 hover:bg-violet-50 rounded-full transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M8.59 7.41L10 6l6 6-6 6-1.41-1.41L13.17 12z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
  
        <div class="grid grid-cols-7 gap-0.5">
          <div
            v-for="day in ['S', 'M', 'T', 'W', 'T', 'F', 'S']"
            :key="day"
            class="flex justify-center items-center h-10 text-xs text-neutral-500"
          >
            {{ day }}
          </div>
        </div>
  
        <div class="grid grid-cols-7 gap-0.5 mb-6">
          <div v-for="(date, index) in calendarDays" :key="index" class="h-10">
            <button
              v-if="date"
              @click="selectDate(date)"
              class="flex justify-center items-center size-full text-sm rounded transition-colors"
              :class="
                isSelectedDate(date)
                  ? 'bg-purple-100 text-violet-700'
                  : 'hover:bg-gray-50'
              "
            >
              {{ date.getDate() }}
            </button>
          </div>
        </div>
  
        <div class="flex gap-3 items-center mb-6">
          <div class="flex-1">
            <div
              class="mb-2 text-xs font-medium tracking-widest uppercase text-neutral-500"
            >
              Hour
            </div>
            <div class="flex gap-3 items-center">
              <div
                class="flex flex-1 justify-center items-center h-20 text-6xl text-violet-700 bg-purple-100 rounded"
              >
                {{ selectedHour !== null ? String(selectedHour).padStart(2, '0') : "--" }}
              </div>
              <div class="flex flex-col rounded border border-gray-300 w-[52px]">
                <button
                  @click="setPeriod('AM')"
                  class="h-10 text-sm font-medium tracking-widest transition-colors"
                  :class="
                    period === 'AM'
                      ? 'bg-purple-100 text-violet-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  "
                >
                  ÖÖ
                </button>
                <button
                  @click="setPeriod('PM')"
                  class="h-10 text-sm font-medium tracking-widest border-t border-gray-300 transition-colors"
                  :class="
                    period === 'PM'
                      ? 'bg-purple-100 text-violet-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  "
                >
                  ÖS
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Saat seçimi için yeni eklenen bölüm -->
        <div class="mb-6">
          <div class="mb-2 text-xs font-medium tracking-widest uppercase text-neutral-500">
            Select Hour
          </div>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="hour in availableHours"
              :key="hour"
              @click="selectHour(hour)"
              class="flex justify-center items-center py-2 text-sm rounded transition-colors"
              :class="
                selectedHour === hour
                  ? 'bg-purple-100 text-violet-700'
                  : 'bg-gray-50 hover:bg-gray-100'
              "
            >
              {{ String(hour).padStart(2, '0') }}
            </button>
          </div>
        </div>
      </div>
  
      <div
        class="flex gap-4 justify-end px-6 py-4 bg-gray-50 border-t border-solid border-t-gray-300"
      >
        <button
          @click="cancel"
          class="px-4 py-2 text-sm font-medium tracking-wide text-violet-700 uppercase rounded hover:bg-violet-50 transition-colors"
        >
          İptal
        </button>
        <button
          @click="confirm"
          class="px-6 py-2 text-sm font-medium tracking-wide text-white uppercase bg-violet-700 rounded hover:bg-violet-800 transition-colors"
        >
          Tamam
        </button>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from "vue";
  
  const currentDate = ref(new Date());
  const selectedDate = ref<Date | null>(null);
  const selectedHour = ref<number | null>(null);
  const period = ref<"AM" | "PM">("AM");
  
  const currentMonthName = computed(() => {
    return currentDate.value.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  });
  
  const calendarDays = computed(() => {
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
  
    const days: (Date | null)[] = [];
  
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
  
    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
  
    return days;
  });
  
  // Müsait saatler (demo için)
  const availableHours = computed(() => {
    return period.value === "AM" 
      ? [8, 9, 10, 11] 
      : [12, 13, 14, 15, 16, 17, 18];
  });
  
  const previousMonth = () => {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() - 1,
      1,
    );
  };
  
  const nextMonth = () => {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() + 1,
      1,
    );
  };
  
  const selectDate = (date: Date) => {
    selectedDate.value = date;
  };
  
  const isSelectedDate = (date: Date) => {
    return selectedDate.value?.getTime() === date.getTime();
  };
  
  const selectHour = (hour: number) => {
    selectedHour.value = hour;
  };
  
  const setPeriod = (newPeriod: "AM" | "PM") => {
    period.value = newPeriod;
    selectedHour.value = null; // Periyot değiştiğinde seçili saati sıfırla
  };
  
  const emit = defineEmits<{
    (e: "cancel"): void;
    (e: "confirm", date: Date, hour: number, period: "AM" | "PM"): void;
  }>();
  
  const cancel = () => {
    emit("cancel");
  };
  
  const confirm = () => {
    if (selectedDate.value && selectedHour.value) {
      emit("confirm", selectedDate.value, selectedHour.value, period.value);
    }
  };
  </script>