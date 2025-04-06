<template>
  <div class="relative min-h-screen">
    <div class="flex overflow-hidden flex-col mx-auto my-0 bg-white rounded-xl max-w-[1440px] shadow-[0_0_20px_rgba(0,0,0,0.05)] max-sm:min-h-[auto]">
      <DashboardHeader 
        :userName="adminName" 
        @logout="handleLogout"
      />

      <main class="flex relative flex-col gap-4 p-4 flex-[1_0_auto] z-[1] max-md:gap-3.5 max-md:p-3.5 max-sm:gap-3 max-sm:p-3">
        <div class="flex flex-col gap-5 w-full max-sm:w-full">
          <SystemOverview />
        
          <div class="grid gap-6 grid-cols-[2fr_1fr] max-md:grid-cols-1">
            <UserStats />
            <RevenueStats />
          </div>
          
          <div class="grid gap-6 items-start p-6 rounded-xl bg-slate-50 grid-cols-[1fr_400px] max-md:grid-cols-[1fr]">
            <UserManagement />
            <PackageManagement />
          </div>
        </div>

        <div class="grid gap-6 items-start grid-cols-2 max-md:grid-cols-1">
          <LatestActivities />
          <SystemHealth />
        </div>
      </main>

      <DashboardFooter />
    </div>

    <div
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(circle at 50% 50%, #6200ee 1px, transparent 1px); background-size: 40px 40px; opacity: 0.03;"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SystemOverview from "./SystemOverview.vue";
import UserStats from "./UserStats.vue";
import RevenueStats from "./RevenueStats.vue";
import UserManagement from "./UserManagement.vue";
import PackageManagement from "./PackageManagement.vue";
import LatestActivities from "./LatestActivities.vue";
import SystemHealth from "./SystemHealth.vue";
import DashboardHeader from "../shared/DashboardHeader.vue";
import DashboardFooter from "../shared/DashboardFooter.vue";

// Admin adı - gerçek uygulamada API'dan gelecektir
const adminName = ref('Ali');

// Çıkış işlemini yönet
const handleLogout = () => {
  // Gerçek uygulamada logout API çağrısı ve yönlendirme
  console.log('Admin çıkış yapıyor');
  // Örneğin: router.push('/login');
};
</script>