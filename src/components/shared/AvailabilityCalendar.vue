<template>
  <section class="p-6 bg-white rounded-lg h-fit shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-medium text-neutral-800">Müsaitlik Takvimi</h2>
      <div v-if="isTeacher" class="flex gap-2">
        <button 
          @click="isEditing = !isEditing" 
          class="px-4 py-2 text-sm font-medium bg-violet-700 rounded text-white hover:bg-violet-800 transition-colors"
        >
          {{ isEditing ? 'Düzenlemeyi Bitir' : 'Müsaitlik Düzenle' }}
        </button>
        <button 
          v-if="isEditing && hasChanges"
          @click="saveChanges" 
          class="px-4 py-2 text-sm font-medium bg-green-600 rounded text-white hover:bg-green-700 transition-colors"
        >
          Kaydet
        </button>
      </div>
    </div>

    <div class="flex justify-between items-center mb-4">
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
          :class="[
            getDateClass(date),
            isEditing && date.day && !date.isPast ? 'cursor-pointer hover:opacity-80' : ''
          ]"
          @click="isEditing && date.day && !date.isPast && toggleDateAvailability(date)"
        >
          <span v-if="date.day">{{ date.day }}</span>
        </div>
      </div>

      <div v-if="isEditing && selectedDay !== null" class="mt-6 p-4 bg-white rounded-lg border border-violet-200">
        <h3 class="mb-4 text-base font-medium text-neutral-800">
          {{ selectedDay.day }} {{ currentMonthName.split(' ')[0] }} için Saat Ayarları
        </h3>
        
        <div class="grid grid-cols-4 gap-2">
          <div
            v-for="hour in availableHours"
            :key="hour"
            class="flex justify-center items-center p-2 text-sm rounded-lg cursor-pointer border"
            :class="isHourSelected(selectedDay, hour) 
              ? 'bg-violet-100 border-violet-500 text-violet-800' 
              : 'bg-slate-50 border-slate-200 hover:bg-slate-100'"
            @click="toggleHourAvailability(selectedDay, hour)"
          >
            {{ hour }}:00
          </div>
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
import { ref, computed, watch } from "vue";

// Props
const props = defineProps<{
  isTeacher?: boolean;
}>();

// Emit
const emit = defineEmits<{
  (e: 'updateAvailability', dates: any[]): void;
}>();

// State
const weekDays = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const today = new Date();
const isEditing = ref(false);
const hasChanges = ref(false);
const selectedDay = ref<any>(null);

// Dummy müsaitlik verileri (gerçek uygulamada API'dan gelecek)
const availableDates = ref<Record<string, number[]>>({
  // Format: 'YYYY-MM-DD': [9, 10, 11, 14, 15] (saat listesi)
  '2024-03-05': [9, 10, 11],
  '2024-03-10': [14, 15, 16],
  '2024-03-12': [9, 10, 13, 14],
  '2024-03-15': [11, 12, 13]
});

// Dummy planlanmış dersler (gerçek uygulamada API'dan gelecek)
const scheduledDates = ref<Record<string, number[]>>({
  // Format: 'YYYY-MM-DD': [9, 14] (saat listesi)
  '2024-03-07': [14],
  '2024-03-14': [10],
  '2024-03-21': [15],
  '2024-03-28': [11]
});

// Saat aralığı
const availableHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

// Computed
const currentMonthName = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value, 1);
  return date.toLocaleString("tr-TR", {
    month: "long",
    year: "numeric",
  });
});

const calendarDays = computed(() => {
  const days: any[] = [];
  const firstDay = new Date(currentYear.value, currentMonth.value, 1);
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);
  const daysInMonth = lastDay.getDate();
  
  // Ayın ilk gününden önceki boşluklar
  const firstDayOfWeek = firstDay.getDay() || 7; // Pazartesi: 1, Pazar: 7
  for (let i = 1; i < firstDayOfWeek; i++) {
    days.push({ day: null, available: false, scheduled: false, isPast: false });
  }
  
  // Ayın tüm günleri
  for (let i = 1; i <= daysInMonth; i++) {
    const dayDate = new Date(currentYear.value, currentMonth.value, i);
    const dateStr = formatDate(dayDate);
    const isPast = dayDate < today;
    
    // Tarihin müsaitlik ve planlama durumunu kontrol et
    const available = !isPast && dateStr in availableDates.value;
    const scheduled = !isPast && dateStr in scheduledDates.value;
    
    days.push({ 
      day: i, 
      date: dateStr,
      available, 
      scheduled, 
      isPast 
    });
  }
  
  return days;
});

// Methods
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getDateClass = (date: any) => {
  if (!date.day) return "";
  if (date.isPast) return "bg-gray-200 text-gray-400";
  if (date.scheduled) return "bg-green-200 text-green-800";
  if (date.available) return "bg-violet-200 text-violet-800";
  return "bg-white";
};

const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
  selectedDay.value = null;
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
  selectedDay.value = null;
};

const toggleDateAvailability = (date: any) => {
  if (date.isPast) return;
  
  if (date.scheduled) {
    // Planlanmış dersler düzenlenemez
    return;
  }
  
  selectedDay.value = date;
};

const isHourSelected = (date: any, hour: number): boolean => {
  if (!date) return false;
  
  const dateStr = date.date;
  return availableDates.value[dateStr]?.includes(hour) || false;
};

const toggleHourAvailability = (date: any, hour: number) => {
  if (!date) return;
  
  const dateStr = date.date;
  
  // Eğer planlanmış saatse değiştirilemez
  if (scheduledDates.value[dateStr]?.includes(hour)) {
    return;
  }
  
  // availableDates nesnesini güncelle
  if (!availableDates.value[dateStr]) {
    availableDates.value[dateStr] = [];
  }
  
  const hours = availableDates.value[dateStr];
  const index = hours.indexOf(hour);
  
  if (index === -1) {
    // Saat ekle
    hours.push(hour);
  } else {
    // Saati kaldır
    hours.splice(index, 1);
    
    // Eğer saat kalmadıysa tarihi listeden çıkar
    if (hours.length === 0) {
      delete availableDates.value[dateStr];
    }
  }
  
  hasChanges.value = true;
  
  // Reactive güncelleme için
  availableDates.value = { ...availableDates.value };
};

const saveChanges = () => {
  // Müsaitlik verilerini API'ya gönder
  emit('updateAvailability', availableDates.value);
  
  // UI güncellemeleri
  hasChanges.value = false;
  isEditing.value = false;
  selectedDay.value = null;
  
  alert('Müsaitlik bilgileriniz kaydedildi!');
};

// Değişiklikleri izle ve UI'ı güncelle
watch(availableDates, () => {
  hasChanges.value = true;
}, { deep: true });
</script>