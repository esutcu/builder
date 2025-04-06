<template>
  <section
    class="grid gap-6 p-6 m-0 w-full bg-slate-50 grid-cols-[repeat(3,minmax(300px,1fr))] max-w-[1200px] max-md:justify-center max-md:grid-cols-[repeat(2,minmax(280px,1fr))] max-sm:p-4 max-sm:grid-cols-[minmax(280px,1fr)]"
  >
    <article
      v-for="pkg in packages"
      :key="pkg.id"
      class="flex flex-col gap-4 p-6 bg-white rounded-lg min-h-[280px] shadow-[0px_4px_4px_rgba(0,0,0,0.1)]"
      :class="{ 'border-2 border-violet-700 border-solid': pkg.isPopular }"
    >
      <h3 class="text-xl font-medium text-neutral-800">
        {{ pkg.name }}
      </h3>
      <div class="text-3xl text-violet-700 font-bold">
        ₺{{ pkg.price }}
      </div>
      <div class="text-neutral-500">{{ pkg.credits }} Ders Kredisi</div>
      
      <div class="mt-auto">
        <button
          v-if="purchasingPackageId === pkg.id"
          disabled
          class="p-3 w-full text-sm font-medium bg-violet-300 rounded text-white cursor-not-allowed"
        >
          İşleniyor...
        </button>
        <button
          v-else-if="successPackageId === pkg.id"
          disabled
          class="p-3 w-full text-sm font-medium bg-green-600 rounded text-white cursor-not-allowed"
        >
          Satın Alındı ✓
        </button>
        <button
          v-else
          @click="purchasePackage(pkg)"
          class="p-3 w-full text-sm font-medium bg-violet-700 rounded text-white hover:bg-violet-800 transition-colors"
        >
          Satın Al
        </button>
      </div>
    </article>

    <!-- Ödeme Onay Modalı -->
    <div 
      v-if="showConfirmModal"
      class="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
    >
      <div class="relative p-6 w-full max-w-md bg-white rounded-lg">
        <button 
          @click="showConfirmModal = false"
          class="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </button>
        
        <h3 class="mb-4 text-xl font-medium text-neutral-800">Ödeme Onayı</h3>
        
        <div class="mb-4 p-4 bg-slate-50 rounded">
          <p class="mb-2 text-sm text-neutral-600">
            <span class="font-medium">Paket:</span> {{ selectedPackage?.name }}
          </p>
          <p class="mb-2 text-sm text-neutral-600">
            <span class="font-medium">Kredi:</span> {{ selectedPackage?.credits }} kredi
          </p>
          <p class="mb-2 text-sm text-neutral-600">
            <span class="font-medium">Tutar:</span> ₺{{ selectedPackage?.price }}
          </p>
        </div>
        
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-neutral-700">Ödeme Yöntemi</label>
          <select 
            v-model="paymentMethod"
            class="p-2 w-full text-sm bg-white border border-neutral-300 rounded focus:outline-none focus:border-violet-500"
          >
            <option value="credit_card">Kredi Kartı</option>
            <option value="bank_transfer">Banka Transferi</option>
            <option value="demo">Demo (Simülasyon)</option>
          </select>
        </div>
        
        <div class="flex gap-4 justify-end">
          <button 
            @click="showConfirmModal = false"
            class="px-4 py-2 text-sm text-violet-700 border border-violet-300 rounded hover:bg-violet-50 transition-colors"
          >
            İptal
          </button>
          <button 
            @click="confirmPurchase"
            :disabled="purchasingPackageId !== null"
            class="px-4 py-2 text-sm text-white bg-violet-700 rounded hover:bg-violet-800 transition-colors disabled:bg-violet-300 disabled:cursor-not-allowed"
          >
            Onayla ve Satın Al
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { 
  creditPackages, 
  purchaseCredits, 
  type CreditPackage 
} from "../../services/creditService";

const packages = ref<CreditPackage[]>(creditPackages);
const showConfirmModal = ref(false);
const selectedPackage = ref<CreditPackage | null>(null);
const paymentMethod = ref("demo");
const purchasingPackageId = ref<number | null>(null);
const successPackageId = ref<number | null>(null);

const purchasePackage = (pkg: CreditPackage) => {
  selectedPackage.value = pkg;
  showConfirmModal.value = true;
};

const confirmPurchase = () => {
  if (!selectedPackage.value) return;
  
  purchasingPackageId.value = selectedPackage.value.id;
  
  // Demo amaçlı, gerçek uygulamada bir ödeme API'si kullanılacaktır
  setTimeout(() => {
    const success = purchaseCredits(
      selectedPackage.value!.id,
      selectedPackage.value!.credits,
      selectedPackage.value!.price
    );
    
    if (success) {
      successPackageId.value = selectedPackage.value!.id;
      showConfirmModal.value = false;
      
      // Başarı mesajını 3 saniye sonra kaldır
      setTimeout(() => {
        successPackageId.value = null;
      }, 3000);
    } else {
      alert("Ödeme işlemi sırasında bir hata oluştu!");
    }
    
    purchasingPackageId.value = null;
  }, 1500);
};
</script>