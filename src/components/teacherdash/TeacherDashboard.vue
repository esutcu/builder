<template>
  <div class="relative min-h-screen">
    <div
      class="flex overflow-hidden flex-col mx-auto my-0 bg-white rounded-xl max-w-[1440px] shadow-[0_0_20px_rgba(0,0,0,0.05)] max-sm:min-h-[auto]"
    >
      <DashboardHeader 
        :userName="teacherName" 
        @logout="handleLogout"
      />

      <main
        class="flex relative flex-col gap-4 p-4 flex-[1_0_auto] z-[1] max-md:gap-3.5 max-md:p-3.5 max-sm:gap-3 max-sm:p-3"
      >
        <div class="flex flex-col gap-5 w-full max-sm:w-full">
          <UpcomingClass />
          <PlannedClasses />
          <TeachingHours :hours="32" />

          <div
            class="grid gap-6 items-start p-6 rounded-xl bg-slate-50 grid-cols-[1fr_328px] max-md:grid-cols-[1fr] max-sm:grid-cols-[1fr]"
          >
            <AvailabilityCalendar :isTeacher="true" @updateAvailability="handleAvailabilityUpdate" />
            <TimeSelector />
          </div>
        </div>

        <TeachingStats />
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
import TeachingHours from "./TeachingHours.vue";
import AvailabilityCalendar from "../shared/AvailabilityCalendar.vue";
import TimeSelector from "../shared/TimeSelector.vue";
import TeachingStats from "./TeachingStats.vue";
import DashboardHeader from "../shared/DashboardHeader.vue";
import DashboardFooter from "../shared/DashboardFooter.vue";

// Öğretmen adı - gerçek uygulamada API'dan gelecektir
const teacherName = ref('Ayşe');

// Müsaitlik verilerini API'ya gönderen fonksiyon
const handleAvailabilityUpdate = (availabilityData: any) => {
  console.log("Müsaitlik verileri güncellendi:", availabilityData);
  // Gerçek uygulamada burada API çağrısı yapılacak
  // örn: await apiService.updateTeacherAvailability(availabilityData);
};

// Çıkış işlemini yönet
const handleLogout = () => {
  // Gerçek uygulamada logout API çağrısı ve yönlendirme
  console.log('Öğretmen çıkış yapıyor');
  // Örneğin: router.push('/login');
};
</script>