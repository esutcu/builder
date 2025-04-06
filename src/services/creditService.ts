// Kredi işlemleri için basit bir servis
// Gerçek uygulamada bu servis API çağrıları yapacaktır

export interface CreditTransaction {
    id: string;
    type: 'purchase' | 'spend' | 'refund';
    amount: number;
    timestamp: Date;
    description: string;
  }
  
  export interface CreditPackage {
    id: number;
    name: string;
    credits: number;
    price: number;
    isPopular?: boolean;
  }
  
  // LocalStorage anahtar isimleri
  const CREDITS_KEY = 'educonnect_credits';
  const TRANSACTIONS_KEY = 'educonnect_transactions';
  
  /**
   * Kullanıcının mevcut kredi bakiyesini döndürür
   */
  export const getCurrentCredits = (): number => {
    try {
      const credits = localStorage.getItem(CREDITS_KEY);
      return credits ? parseInt(credits, 10) : 0;
    } catch (e) {
      console.error('Kredi bilgisi alınamadı', e);
      return 0;
    }
  };
  
  /**
   * Kullanıcının kredi bakiyesini günceller
   */
  export const updateCredits = (newAmount: number): void => {
    try {
      localStorage.setItem(CREDITS_KEY, newAmount.toString());
    } catch (e) {
      console.error('Kredi bilgisi güncellenemedi', e);
    }
  };
  
  /**
   * Kredi satın alma işlemi
   */
  export const purchaseCredits = (packageId: number, amount: number, price: number): boolean => {
    try {
      // Normalde burada ödeme işlemi gerçekleştirilir (API çağrısı)
      // Bu örnekte sadece simulasyon yapıyoruz
      
      // Mevcut kredileri al
      const currentCredits = getCurrentCredits();
      
      // Krediyi ekle
      updateCredits(currentCredits + amount);
      
      // İşlemi kaydet
      addTransaction({
        id: generateTransactionId(),
        type: 'purchase',
        amount,
        timestamp: new Date(),
        description: `${amount} kredi satın alındı. Paket: ${packageId}`
      });
      
      return true;
    } catch (e) {
      console.error('Kredi satın alma işlemi başarısız', e);
      return false;
    }
  };
  
  /**
   * Kredi harcama işlemi
   */
  export const spendCredits = (amount: number, description: string): boolean => {
    try {
      // Mevcut kredileri al
      const currentCredits = getCurrentCredits();
      
      // Yeterli kredi var mı kontrol et
      if (currentCredits < amount) {
        console.error('Yetersiz kredi');
        return false;
      }
      
      // Krediyi düş
      updateCredits(currentCredits - amount);
      
      // İşlemi kaydet
      addTransaction({
        id: generateTransactionId(),
        type: 'spend',
        amount: -amount,
        timestamp: new Date(),
        description
      });
      
      return true;
    } catch (e) {
      console.error('Kredi harcama işlemi başarısız', e);
      return false;
    }
  };
  
  /**
   * Tüm kredi işlemlerini döndürür
   */
  export const getTransactions = (): CreditTransaction[] => {
    try {
      const transactions = localStorage.getItem(TRANSACTIONS_KEY);
      if (!transactions) return [];
      
      const parsed = JSON.parse(transactions) as CreditTransaction[];
      
      // Tarih nesnesini düzgün formata çevir
      return parsed.map(t => ({
        ...t,
        timestamp: new Date(t.timestamp)
      }));
    } catch (e) {
      console.error('İşlem geçmişi alınamadı', e);
      return [];
    }
  };
  
  /**
   * Yeni bir işlem ekler
   */
  export const addTransaction = (transaction: CreditTransaction): void => {
    try {
      const transactions = getTransactions();
      transactions.push(transaction);
      
      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
    } catch (e) {
      console.error('İşlem kaydedilemedi', e);
    }
  };
  
  /**
   * Basit bir işlem ID'si oluşturur
   */
  const generateTransactionId = (): string => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };
  
  /**
   * Kullanılabilir kredi paketleri
   */
  export const creditPackages: CreditPackage[] = [
    {
      id: 1,
      name: "Başlangıç Paketi",
      credits: 4,
      price: 299
    },
    {
      id: 2,
      name: "Popüler Paket",
      credits: 8,
      price: 549,
      isPopular: true
    },
    {
      id: 3,
      name: "Premium Paket",
      credits: 16,
      price: 999
    }
  ];