// src/services/analyticsService.ts

// Analitik veri tipleri
export interface MonthlyData {
    name: string;
    öğrenci: number;
    öğretmen: number;
    gelir: number;
    dersler: number;
  }
  
  export interface WeekdayData {
    name: string;
    dersler: number;
  }
  
  export interface HourlyData {
    saat: string;
    dersler: number;
  }
  
  export interface ActivityData {
    name: string;
    aktivÖğrenci: number;
    aktivÖğretmen: number;
  }
  
  export interface HeatmapData {
    [key: string]: number;
  }
  
  export interface AnalyticsData {
    monthlyData: MonthlyData[];
    weekdayData: WeekdayData[];
    hourlyData: HourlyData[];
    activityData: ActivityData[];
    heatmapData: HeatmapData;
    userStats: {
      totalStudents: number;
      totalTeachers: number;
      totalAdmins: number;
      activeStudents: number;
      activeTeachers: number;
      studentGrowth: number;
      teacherGrowth: number;
      studentTeacherRatio: number;
      averageSatisfaction: number;
    };
    financeStats: {
      totalRevenue: number;
      averageLessonValue: number;
      revenuePerStudent: number;
      estimatedYearlyRevenue: number;
      packageSales: {
        starter: number;
        popular: number;
        premium: number;
      };
    };
    lessonStats: {
      totalLessons: number;
      completedLessons: number;
      cancelledLessons: number;
      completionRate: number;
      averageDuration: number;
    };
  }
  
  // Demo verileri - gerçek uygulamada bu veriler API'dan gelecektir
  const demoData: AnalyticsData = {
    monthlyData: [
      { name: "Oca", öğrenci: 120, öğretmen: 25, gelir: 8500, dersler: 320 },
      { name: "Şub", öğrenci: 130, öğretmen: 27, gelir: 9200, dersler: 340 },
      { name: "Mar", öğrenci: 145, öğretmen: 30, gelir: 10100, dersler: 365 },
      { name: "Nis", öğrenci: 160, öğretmen: 32, gelir: 11500, dersler: 410 },
      { name: "May", öğrenci: 180, öğretmen: 35, gelir: 12800, dersler: 450 },
      { name: "Haz", öğrenci: 220, öğretmen: 38, gelir: 15600, dersler: 520 },
      { name: "Tem", öğrenci: 240, öğretmen: 40, gelir: 16900, dersler: 540 },
      { name: "Ağu", öğrenci: 250, öğretmen: 42, gelir: 17800, dersler: 550 },
      { name: "Eyl", öğrenci: 280, öğretmen: 46, gelir: 19500, dersler: 620 },
      { name: "Eki", öğrenci: 310, öğretmen: 49, gelir: 21400, dersler: 680 },
      { name: "Kas", öğrenci: 340, öğretmen: 52, gelir: 23600, dersler: 740 },
      { name: "Ara", öğrenci: 365, öğretmen: 55, gelir: 25800, dersler: 790 }
    ],
    weekdayData: [
      { name: "Pazartesi", dersler: 98 },
      { name: "Salı", dersler: 112 },
      { name: "Çarşamba", dersler: 105 },
      { name: "Perşembe", dersler: 120 },
      { name: "Cuma", dersler: 80 },
      { name: "Cumartesi", dersler: 150 },
      { name: "Pazar", dersler: 95 }
    ],
    hourlyData: [
      { saat: "08:00", dersler: 10 },
      { saat: "10:00", dersler: 30 },
      { saat: "12:00", dersler: 45 },
      { saat: "14:00", dersler: 80 },
      { saat: "16:00", dersler: 95 },
      { saat: "18:00", dersler: 60 },
      { saat: "20:00", dersler: 35 }
    ],
    activityData: [
      { name: "Oca", aktivÖğrenci: 45, aktivÖğretmen: 70 },
      { name: "Şub", aktivÖğrenci: 48, aktivÖğretmen: 72 },
      { name: "Mar", aktivÖğrenci: 52, aktivÖğretmen: 75 },
      { name: "Nis", aktivÖğrenci: 55, aktivÖğretmen: 78 },
      { name: "May", aktivÖğrenci: 58, aktivÖğretmen: 80 },
      { name: "Haz", aktivÖğrenci: 65, aktivÖğretmen: 83 },
      { name: "Tem", aktivÖğrenci: 70, aktivÖğretmen: 85 }
    ],
    heatmapData: {
      "8-0": 0, "8-1": 1, "8-2": 1, "8-3": 0, "8-4": 0, "8-5": 0, "8-6": 0,
      "9-0": 0, "9-1": 1, "9-2": 2, "9-3": 1, "9-4": 1, "9-5": 0, "9-6": 0,
      "10-0": 0, "10-1": 2, "10-2": 2, "10-3": 2, "10-4": 1, "10-5": 0, "10-6": 0,
      "11-0": 0, "11-1": 2, "11-2": 2, "11-3": 2, "11-4": 2, "11-5": 0, "11-6": 0,
      "12-0": 0, "12-1": 1, "12-2": 1, "12-3": 1, "12-4": 1, "12-5": 0, "12-6": 0,
      "13-0": 0, "13-1": 1, "13-2": 1, "13-3": 1, "13-4": 1, "13-5": 0, "13-6": 0,
      "14-0": 1, "14-1": 2, "14-2": 2, "14-3": 2, "14-4": 2, "14-5": 1, "14-6": 1,
      "15-0": 1, "15-1": 3, "15-2": 3, "15-3": 3, "15-4": 2, "15-5": 2, "15-6": 1,
      "16-0": 2, "16-1": 3, "16-2": 3, "16-3": 3, "16-4": 3, "16-5": 2, "16-6": 2,
      "17-0": 2, "17-1": 3, "17-2": 3, "17-3": 3, "17-4": 3, "17-5": 1, "17-6": 2,
      "18-0": 1, "18-1": 2, "18-2": 2, "18-3": 2, "18-4": 2, "18-5": 1, "18-6": 2,
      "19-0": 1, "19-1": 1, "19-2": 1, "19-3": 1, "19-4": 1, "19-5": 0, "19-6": 1,
      "20-0": 0, "20-1": 0, "20-2": 0, "20-3": 0, "20-4": 0, "20-5": 0, "20-6": 0
    },
    userStats: {
      totalStudents: 934,
      totalTeachers: 246,
      totalAdmins: 15,
      activeStudents: 728,
      activeTeachers: 226,
      studentGrowth: 15.4,
      teacherGrowth: 8.2,
      studentTeacherRatio: 4.8,
      averageSatisfaction: 4.2
    },
    financeStats: {
      totalRevenue: 89425,
      averageLessonValue: 196,
      revenuePerStudent: 542,
      estimatedYearlyRevenue: 1200000,
      packageSales: {
        starter: 156,
        popular: 284,
        premium: 92
      }
    },
    lessonStats: {
      totalLessons: 4521,
      completedLessons: 3845,
      cancelledLessons: 285,
      completionRate: 93.1,
      averageDuration: 52
    }
  };
  
  /**
   * Analitik verilerini getir
   * @param period Veri periyodu (haftalık, aylık, yıllık)
   * @returns Analitik verileri
   */
  export const getAnalyticsData = async (period: 'weekly' | 'monthly' | 'yearly' = 'monthly'): Promise<AnalyticsData> => {
    // Gerçek uygulamada burada API çağrısı yapılacaktır
    // Örnek: return await apiService.get(`/analytics?period=${period}`);
    
    // Demo amaçlı: 1 saniye bekleyip verileri döndür
    return new Promise((resolve) => {
      setTimeout(() => {
        // Demo verileri dön, seçilen periyoda göre bazı değerleri değiştir
        let multiplier = 1;
        if (period === 'weekly') multiplier = 0.25;
        if (period === 'yearly') multiplier = 12;
        
        // Gelir ve ders sayılarını periyoda göre ayarla
        const modifiedData = {
          ...demoData,
          financeStats: {
            ...demoData.financeStats,
            totalRevenue: Math.round(demoData.financeStats.totalRevenue * multiplier),
            estimatedYearlyRevenue: Math.round(demoData.financeStats.estimatedYearlyRevenue * (period === 'yearly' ? 1 : period === 'weekly' ? 0.1 : 0.5))
          },
          lessonStats: {
            ...demoData.lessonStats,
            totalLessons: Math.round(demoData.lessonStats.totalLessons * multiplier),
            completedLessons: Math.round(demoData.lessonStats.completedLessons * multiplier),
            cancelledLessons: Math.round(demoData.lessonStats.cancelledLessons * multiplier)
          }
        };
        
        resolve(modifiedData);
      }, 1000);
    });
  };
  
  /**
   * Analitik raporunu indir
   * @param format Rapor formatı (pdf, csv, excel)
   * @param period Veri periyodu (haftalık, aylık, yıllık)
   * @returns İndirme başarı durumu
   */
  export const downloadAnalyticsReport = async (
    format: 'pdf' | 'csv' | 'excel', 
    period: 'weekly' | 'monthly' | 'yearly' = 'monthly'
  ): Promise<boolean> => {
    // Gerçek uygulamada burada API çağrısı yapılacaktır
    // Örnek: await apiService.get(`/analytics/download?format=${format}&period=${period}`);
    
    // Demo amaçlı: 1.5 saniye bekleyip başarılı döndür
    return new Promise((resolve) => {
      console.log(`${period} periyoduna ait ${format} formatında rapor indiriliyor...`);
      setTimeout(() => {
        resolve(true);
      }, 1500);
    });
  };
  
  /**
   * Analitik e-posta raporu gönder
   * @param email E-posta adresi
   * @param period Veri periyodu (haftalık, aylık, yıllık)
   * @returns Gönderim başarı durumu
   */
  export const sendAnalyticsReport = async (
    email: string,
    period: 'weekly' | 'monthly' | 'yearly' = 'monthly'
  ): Promise<boolean> => {
    // Gerçek uygulamada burada API çağrısı yapılacaktır
    // Örnek: await apiService.post(`/analytics/send-email`, { email, period });
    
    // Demo amaçlı: 1.5 saniye bekleyip başarılı döndür
    return new Promise((resolve) => {
      console.log(`${period} periyoduna ait rapor ${email} adresine gönderiliyor...`);
      setTimeout(() => {
        resolve(true);
      }, 1500);
    });
  };