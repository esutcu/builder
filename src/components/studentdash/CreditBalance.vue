<template>
  <section
    class="p-6 mb-5 bg-white rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.1)]"
  >
    <div class="flex justify-between items-center">
      <h2 class="mb-2 text-lg font-medium text-neutral-800">
        Mevcut Kredi Bakiyeniz
      </h2>
      <button 
        @click="showTransactions = !showTransactions"
        class="px-3 py-1 text-sm text-violet-700 bg-violet-50 rounded hover:bg-violet-100 transition-colors"
      >
        {{ showTransactions ? 'İşlemleri Gizle' : 'İşlem Geçmişi' }}
      </button>
    </div>
    
    <div class="flex items-center gap-3">
      <div class="text-3xl text-violet-700 font-bold">{{ credits }} Kredi</div>
      <div 
        v-if="credits < 2" 
        class="px-2 py-1 text-xs text-red-700 bg-red-50 rounded-full"
      >
        Kredi Azalıyor!
      </div>
    </div>

    <div v-if="showTransactions" class="mt-4">
      <h3 class="mb-2 text-sm font-medium text-neutral-600">Son İşlemler</h3>
      
      <div v-if="transactions.length === 0" class="p-3 text-sm text-neutral-500 bg-slate-50 rounded">
        Henüz bir işlem yapılmamış.
      </div>
      
      <div v-else class="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
        <div 
          v-for="transaction in transactions" 
          :key="transaction.id"
          class="p-3 text-sm border border-slate-100 rounded"
          :class="{
            'bg-green-50 border-green-100': transaction.type === 'purchase',
            'bg-red-50 border-red-100': transaction.type === 'spend',
            'bg-blue-50 border-blue-100': transaction.type === 'refund',
          }"
        >
          <div class="flex justify-between items-center">
            <span class="font-medium">
              {{ 
                transaction.type === 'purchase' 
                  ? `+${transaction.amount} Kredi Eklendi` 
                  : transaction.type === 'spend' 
                    ? `${transaction.amount} Kredi Kullanıldı` 
                    : `+${transaction.amount} Kredi İade` 
              }}
            </span>
            <span class="text-xs text-neutral-500">
              {{ formatDate(transaction.timestamp) }}
            </span>
          </div>
          <p class="mt-1 text-xs text-neutral-600">{{ transaction.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { 
  getCurrentCredits, 
  getTransactions, 
  type CreditTransaction 
} from "../../services/creditService";

const credits = ref(0);
const transactions = ref<CreditTransaction[]>([]);
const showTransactions = ref(false);

// Kredi bakiyesini periyodik olarak güncelle
const updateCredits = () => {
  credits.value = getCurrentCredits();
  transactions.value = getTransactions().sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  ).slice(0, 10); // Son 10 işlem
};

onMounted(() => {
  updateCredits();
  
  // Her 5 saniyede bir bakiyeyi güncelle (gerçek uygulamada farklı bir yaklaşım kullanılabilir)
  const interval = setInterval(updateCredits, 5000);
  
  // Bileşen yok edildiğinde interval'i temizle
  return () => clearInterval(interval);
});

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
</script>