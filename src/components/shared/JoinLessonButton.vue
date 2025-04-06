<template>
    <button
      @click="joinLesson"
      :disabled="!isActive"
      class="px-5 py-2.5 w-full text-base font-medium rounded text-white transition-colors"
      :class="isActive ? 'bg-violet-700 hover:bg-violet-800' : 'bg-gray-400 cursor-not-allowed'"
    >
      <span v-if="isActive">Derse Katıl</span>
      <span v-else>{{ buttonText }}</span>
    </button>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from "vue";
  
  const props = defineProps<{
    lessonDate: string; // Format: "YYYY-MM-DD"
    lessonTime: string; // Format: "HH:MM"
    lessonId: string;   // Unique lesson identifier
  }>();
  
  const emit = defineEmits<{
    (e: "joined", lessonId: string): void;
  }>();
  
  // Dersin başlama zamanını hesapla
  const lessonStartTime = computed(() => {
    const [year, month, day] = props.lessonDate.split('-').map(Number);
    const [hours, minutes] = props.lessonTime.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  });
  
  // Derse katılım butonunun aktif olma zamanını hesapla (ders başlangıcından 10 dakika önce)
  const joinActivationTime = computed(() => {
    const time = new Date(lessonStartTime.value);
    time.setMinutes(time.getMinutes() - 10);
    return time;
  });
  
  // Şu anki zamanı takip et
  const currentTime = ref(new Date());
  const timerInterval = ref<number | null>(null);
  
  // Butonun aktif olup olmadığını hesapla
  const isActive = computed(() => {
    // Ders saati geçtiyse buton pasif olur
    if (currentTime.value > new Date(lessonStartTime.value.getTime() + 60 * 60 * 1000)) {
      return false;
    }
    
    // Ders başlamadan 10 dakika öncesinden itibaren buton aktif olur
    return currentTime.value >= joinActivationTime.value;
  });
  
  // Buton metni
  const buttonText = computed(() => {
    if (currentTime.value > new Date(lessonStartTime.value.getTime() + 60 * 60 * 1000)) {
      return "Ders Tamamlandı";
    }
    
    // Dersin başlamasına ne kadar süre kaldığını hesapla
    const diffMs = joinActivationTime.value.getTime() - currentTime.value.getTime();
    if (diffMs <= 0) return "Derse Katıl";
    
    const diffMin = Math.ceil(diffMs / (1000 * 60));
    const hours = Math.floor(diffMin / 60);
    const minutes = diffMin % 60;
    
    if (hours > 0) {
      return `${hours} saat ${minutes} dk sonra aktif olacak`;
    } else {
      return `${minutes} dk sonra aktif olacak`;
    }
  });
  
  // Derse katılma fonksiyonu
  const joinLesson = () => {
    // Gerçek uygulamada Google Meet linki oluşturulmuştur
    // ve bu fonksiyon o linke yönlendirecektir.
    // Şimdilik simüle ediyoruz
    
    if (!isActive.value) return;
    
    // Emisyon ile üst bileşenlere haber ver
    emit("joined", props.lessonId);
    
    // Demo amaçlı - gerçek uygulamada Google Meet API kullanılacak
    alert("Google Meet oturumuna yönlendiriliyorsunuz...");
    
    // Gerçek uygulamada Meet linkine yönlendirme:
    // window.open(`https://meet.google.com/lookup/${meetCode}`, '_blank');
  };
  
  // Bileşen mount edildiğinde zamanlayıcıyı başlat
  onMounted(() => {
    // Her dakika güncel zamanı güncelle
    timerInterval.value = window.setInterval(() => {
      currentTime.value = new Date();
    }, 60000); // 60 saniye
    
    // İlk değeri ayarla
    currentTime.value = new Date();
  });
  
  // Bileşen unmount edildiğinde zamanlayıcıyı temizle
  onUnmounted(() => {
    if (timerInterval.value) {
      clearInterval(timerInterval.value);
    }
  });
  </script>