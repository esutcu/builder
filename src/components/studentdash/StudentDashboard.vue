<template>
  <div class="relative min-h-screen">
    <div
      class="flex overflow-hidden flex-col mx-auto my-0 bg-white rounded-xl max-w-[1440px] shadow-[0_0_20px_rgba(0,0,0,0.05)] max-sm:min-h-[auto]"
    >
      <DashboardHeader 
        :userName="studentName" 
        @logout="handleLogout"
      />

      <main
        class="flex relative flex-col gap-4 p-4 flex-[1_0_auto] z-[1] max-md:gap-3.5 max-md:p-3.5 max-sm:gap-3 max-sm:p-3"
      >
        <div class="flex flex-col gap-5 w-full max-sm:w-full">
          <UpcomingClass />
          <PlannedClasses />
          <CreditBalance :credits="8" />

          <div class="p-6 rounded-xl bg-slate-50">
            <h2 class="mb-4 text-xl font-medium text-neutral-800">Ders Planlama</h2>
            
            <div class="mb-6">
              <div class="flex border-b border-gray-200">
                <button 
                  @click="activeTab = 'teacher'" 
                  class="py-2 px-4 text-sm font-medium transition-colors relative"
                  :class="activeTab === 'teacher' ? 'text-violet-700' : 'text-neutral-500 hover:text-neutral-700'"
                >
                  Öğretmen Seçimi
                  <div 
                    v-if="activeTab === 'teacher'"
                    class="absolute bottom-0 left-0 w-full h-0.5 bg-violet-700"
                  ></div>
                </button>
                <button 
                  @click="activeTab = 'time'" 
                  class="py-2 px-4 text-sm font-medium transition-colors relative"
                  :class="activeTab === 'time' ? 'text-violet-700' : 'text-neutral-500 hover:text-neutral-700'"
                >
                  Zaman Seçimi
                  <div 
                    v-if="activeTab === 'time'"
                    class="absolute bottom-0 left-0 w-full h-0.5 bg-violet-700"
                  ></div>
                </button>
              </div>
            </div>

            <div v-if="activeTab === 'teacher'" class="grid gap-6 items-start grid-cols-[300px_2fr_328px] max-md:grid-cols-[300px_1fr] max-sm:grid-cols-[1fr]">
              <TeacherSelector @select="selectTeacherHandler" />
              <AvailabilityCalendar :isTeacher="false" />
              <TimeSelector />
            </div>

            <div v-else class="grid gap-6 items-start grid-cols-[2fr_328px] max-md:grid-cols-[1fr] max-sm:grid-cols-[1fr]">
              <TimeBasedTeacherSelector 
                :selectedDate="selectedDate" 
                :selectedHour="selectedHour" 
                @bookLesson="bookLessonHandler"
              />
              <div>
                <TimeSelector 
                  @confirm="handleTimeSelection" 
                />
              </div>
            </div>
          </div>
        </div>

        <PackagePricing />
      </main>

      <DashboardFooter />
    </div>

    <div
      class="absolute inset-0 pointer-events-none"
      style="
        background: radial-gradient(
          circle at 50% 50%,
          #6200ee 1px,
          transparent 1px
        );
        background-size: 40px 40px;
        opacity: 0.03;
      "
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import UpcomingClass from "./UpcomingClass.vue";
import PlannedClasses from "./PlannedClasses.vue";
import CreditBalance from "./CreditBalance.vue";
import TeacherSelector from "./TeacherSelector.vue";
import TimeBasedTeacherSelector from "./TimeBasedTeacherSelector.vue";
import AvailabilityCalendar from "../shared/AvailabilityCalendar.vue";
import TimeSelector from "../shared/TimeSelector.vue";
import PackagePricing from "./PackagePricing.vue";
import DashboardHeader from "../shared/DashboardHeader.vue";
import DashboardFooter from "../shared/DashboardFooter.vue";

// Öğrenci adı - gerçek uygulamada API'dan gelecektir
const studentName = ref('Can');

// Tab yönetimi
const activeTab = ref<'teacher' | 'time'>('teacher');

// Zaman seçimi için durumlar
const selectedDate = ref<Date | null>(null);
const selectedHour = ref<number | null>(null);

// Öğretmen seçimi
const selectTeacherHandler = (teacher: string) => {
  console.log(`${teacher} seçildi, müsaitlik takvimi gösteriliyor.`);
  // Gerçek uygulamada API'ya istek atılacak ve seçilen öğretmenin müsaitliği görüntülenecek
};

// Zaman seçimi
const handleTimeSelection = (date: Date, hour: number) => {
  selectedDate.value = date;
  selectedHour.value = hour;
  console.log(`Tarih: ${date.toLocaleDateString()}, Saat: ${hour}:00 seçildi.`);
};

// Ders planlama
const bookLessonHandler = (teacherId: number, date: Date, hour: number) => {
  console.log(`Ders planlandı: Öğretmen ID: ${teacherId}, Tarih: ${date.toLocaleDateString()}, Saat: ${hour}:00`);
  
  // Gerçek uygulamada API'ya ders planı kaydedilecek
  // Kredi işlemi TimeBasedTeacherSelector içinde yapılıyor
  
  // Seçimleri sıfırla
  selectedDate.value = null;
  selectedHour.value = null;
  
  // Eğer gerekirse, dersleri yenilemek için bir API çağrısı yapılabilir
  // fetchPlannedLessons();
};

// Çıkış işlemini yönet
const handleLogout = () => {
  // Gerçek uygulamada logout API çağrısı ve yönlendirme
  console.log('Öğrenci çıkış yapıyor');
  // Örneğin: router.push('/login');
};
</script>