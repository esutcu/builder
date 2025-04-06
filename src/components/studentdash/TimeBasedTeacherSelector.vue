<template>
  <section class="p-6 bg-white rounded-lg h-fit shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-medium text-neutral-800">Zaman Bazlı Öğretmen Seçimi</h2>
      <div class="flex items-center gap-2">
        <button 
          v-if="selectedTeacher" 
          @click="resetSelection" 
          class="px-3 py-1 text-sm text-violet-700 bg-violet-50 rounded hover:bg-violet-100 transition-colors"
        >
          Seçimi Sıfırla
        </button>
      </div>
    </div>

    <div v-if="!selectedDate || !selectedHour">
      <p class="text-sm text-neutral-600 mb-3">
        Önce takvimden bir tarih ve saat seçin, ardından müsait öğretmenler listelenecektir.
      </p>
    </div>

    <div v-else-if="loading">
      <div class="flex justify-center items-center p-6">
        <div class="w-10 h-10 border-4 border-violet-200 border-t-violet-700 rounded-full animate-spin"></div>
      </div>
    </div>

    <div v-else-if="availableTeachers.length === 0">
      <div class="p-4 text-center bg-slate-50 rounded-lg">
        <p class="text-sm text-neutral-600">
          Seçilen tarih ve saatte müsait öğretmen bulunamadı. Lütfen başka bir zaman seçin.
        </p>
      </div>
    </div>

    <div v-else>
      <div class="mb-4 p-3 bg-slate-50 rounded-lg">
        <p class="text-sm text-neutral-800">
          <span class="font-medium">Seçilen Tarih ve Saat:</span> 
          {{ formatDate(selectedDate) }} - {{ selectedHour }}:00
        </p>
      </div>

      <div class="flex flex-col gap-3">
        <h3 class="text-sm font-medium text-neutral-600">Bu saatte müsait öğretmenler:</h3>

        <div 
          v-for="teacher in availableTeachers" 
          :key="teacher.id"
          class="flex justify-between items-center p-3 border border-violet-100 rounded-lg hover:border-violet-300 transition-colors"
          :class="{'bg-violet-50': selectedTeacher?.id === teacher.id}"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-violet-200 flex items-center justify-center text-violet-700 font-medium">
              {{ teacher.name.charAt(0) }}
            </div>
            <div>
              <h4 class="text-sm font-medium text-neutral-800">{{ teacher.name }}</h4>
              <p class="text-xs text-neutral-500">{{ teacher.subject }}</p>
            </div>
          </div>
          <button 
            @click="selectTeacher(teacher)"
            class="px-4 py-2 text-sm bg-violet-700 rounded text-white hover:bg-violet-800 transition-colors"
          >
            Seç
          </button>
        </div>
      </div>

      <div v-if="selectedTeacher" class="mt-6 p-4 bg-violet-50 border border-violet-200 rounded-lg">
        <h3 class="text-sm font-medium text-violet-800 mb-2">Ders Özeti</h3>
        <p class="text-sm text-neutral-700 mb-1">
          <span class="font-medium">Öğretmen:</span> {{ selectedTeacher.name }}
        </p>
        <p class="text-sm text-neutral-700 mb-1">
          <span class="font-medium">Ders:</span> {{ selectedTeacher.subject }}
        </p>
        <p class="text-sm text-neutral-700 mb-1">
          <span class="font-medium">Tarih:</span> {{ formatDate(selectedDate) }}
        </p>
        <p class="text-sm text-neutral-700 mb-4">
          <span class="font-medium">Saat:</span> {{ selectedHour }}:00
        </p>

        <div class="flex justify-between items-center">
          <p class="text-sm text-neutral-700">
            <span class="font-medium">Gerekli Kredi:</span> 1
            <span v-if="userCredits < 1" class="ml-2 text-xs text-red-600">
              (Yetersiz Kredi: {{ userCredits }})
            </span>
          </p>
          <button 
            @click="bookLesson"
            :disabled="userCredits < 1 || isBooking"
            class="px-5 py-2 text-sm bg-violet-700 rounded text-white hover:bg-violet-800 transition-colors disabled:bg-violet-300 disabled:cursor-not-allowed"
          >
            {{ isBooking ? 'İşleniyor...' : 'Dersi Planla' }}
          </button>
        </div>
        
        <div v-if="userCredits < 1" class="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg">
          <p class="text-sm text-red-700">
            Ders planlamak için yeterli krediniz bulunmuyor. Lütfen kredi satın alın.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import type { Teacher } from "../types";
import { getCurrentCredits, spendCredits } from "../../services/creditService";

// Props
const props = defineProps<{
  selectedDate: Date | null;
  selectedHour: number | null;
}>();

// Emit
const emit = defineEmits<{
  (e: 'bookLesson', teacherId: number, date: Date, hour: number): void;
}>();

// State
const loading = ref(false);
const selectedTeacher = ref<Teacher | null>(null);
const userCredits = ref(0);
const isBooking = ref(false);

// Mock data - gerçek uygulamada API'dan gelecek
const mockTeachers = [
  {
    id: 1,
    name: "Ayşe Yılmaz",
    subject: "Matematik",
    availableSlots: [
      { date: "2024-03-15", time: "14:00" },
      { date: "2024-03-16", time: "10:00" },
      { date: "2024-03-16", time: "11:00" },
    ]
  },
  {
    id: 2,
    name: "Mehmet Kaya",
    subject: "Fizik",
    availableSlots: [
      { date: "2024-03-15", time: "09:00" },
      { date: "2024-03-15", time: "10:00" },
      { date: "2024-03-16", time: "13:00" },
    ]
  },
  {
    id: 3,
    name: "Zeynep Demir",
    subject: "Kimya",
    availableSlots: [
      { date: "2024-03-16", time: "14:00" },
      { date: "2024-03-17", time: "11:00" },
      { date: "2024-03-17", time: "12:00" },
    ]
  },
  {
    id: 4,
    name: "Ali Öz",
    subject: "Biyoloji",
    availableSlots: [
      { date: "2024-03-15", time: "15:00" },
      { date: "2024-03-15", time: "16:00" },
      { date: "2024-03-17", time: "14:00" },
    ]
  }
];

// Kredi miktarını düzenli olarak kontrol et
const updateCreditBalance = () => {
  userCredits.value = getCurrentCredits();
};

onMounted(() => {
  updateCreditBalance();
  
  // Gerçek uygulamada olaylarla veya API'yla senkronize edilecek,
  // burada basitçe 3 saniyede bir güncelliyoruz
  const interval = setInterval(updateCreditBalance, 3000);
  
  // Bileşen yok edildiğinde interval'i temizle
  return () => clearInterval(interval);
});

// Computed - gerçek uygulamada reactive değerlere ve API yanıtlarına dayalı olacak
const availableTeachers = ref<Teacher[]>([]);

// Tarih ve saat değiştiğinde müsait öğretmenleri güncelle
watch([() => props.selectedDate, () => props.selectedHour], ([newDate, newHour]) => {
  if (newDate && newHour !== null) {
    fetchAvailableTeachers(newDate, newHour);
  } else {
    availableTeachers.value = [];
    selectedTeacher.value = null;
  }
}, { immediate: true });

// Müsait öğretmenleri getir (gerçek API çağrısını simüle ediyor)
const fetchAvailableTeachers = (date: Date, hour: number) => {
  loading.value = true;
  selectedTeacher.value = null;
  
  // API çağrısını simüle ediyoruz
  setTimeout(() => {
    const formattedDate = formatDateForCompare(date);
    const formattedHour = `${hour}:00`;
    
    // Seçilen tarih ve saatte müsait öğretmenleri filtrele
    availableTeachers.value = mockTeachers.filter(teacher => 
      teacher.availableSlots.some(slot => 
        slot.date === formattedDate && slot.time === formattedHour
      )
    );
    
    loading.value = false;
  }, 800);
};

// Öğretmen seç
const selectTeacher = (teacher: Teacher) => {
  selectedTeacher.value = teacher;
};

// Dersi planla
const bookLesson = () => {
  if (props.selectedDate && props.selectedHour !== null && selectedTeacher.value) {
    isBooking.value = true;
    
    // Ders planlamayı simüle et ve krediyi düş
    setTimeout(() => {
      // Kredi harcama işlemini gerçekleştir
      const success = spendCredits(1, `${selectedTeacher.value?.name} ile ${formatDate(props.selectedDate!)} tarihinde, saat ${props.selectedHour}:00'da ders planlandı.`);
      
      if (success) {
        emit('bookLesson', selectedTeacher.value.id, props.selectedDate!, props.selectedHour!);
        alert("Ders başarıyla planlandı!");
        resetSelection();
      } else {
        alert("Ders planlanırken bir hata oluştu. Lütfen tekrar deneyin.");
      }
      
      isBooking.value = false;
    }, 1500);
  }
};

// Seçimi sıfırla
const resetSelection = () => {
  selectedTeacher.value = null;
};

// Tarih formatlama yardımcı fonksiyonları
const formatDate = (date: Date | null): string => {
  if (!date) return '';
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}.${month}.${year}`;
};

const formatDateForCompare = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${year}-${month}-${day}`;
};
</script>