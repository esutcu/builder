import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import AdminDashboard from './AdminDashboard.vue';
import SystemOverview from './SystemOverview.vue';
import UserManagement from './UserManagement.vue';
import PackageManagement from './PackageManagement.vue';
import LatestActivities from './LatestActivities.vue';
import SystemHealth from './SystemHealth.vue';
import RevenueStats from './RevenueStats.vue';
import UserStats from './UserStats.vue';
import DashboardHeader from '../shared/DashboardHeader.vue';

// Console.log çağrılarını yakalayacak mock
const originalConsoleLog = console.log;
const mockConsoleLog = vi.fn();

describe('AdminDashboard', () => {
  beforeEach(() => {
    // Console.log'u mockla
    console.log = mockConsoleLog;
    mockConsoleLog.mockClear();
  });

  afterEach(() => {
    // Test sonrası console.log'u geri yükle
    console.log = originalConsoleLog;
  });

  it('renders all main components', () => {
    const wrapper = mount(AdminDashboard);

    // Header ve ana bileşenler var mı?
    expect(wrapper.findComponent(DashboardHeader).exists()).toBe(true);
    expect(wrapper.findComponent(SystemOverview).exists()).toBe(true);
    expect(wrapper.findComponent(UserStats).exists()).toBe(true);
    expect(wrapper.findComponent(RevenueStats).exists()).toBe(true);
    expect(wrapper.findComponent(UserManagement).exists()).toBe(true);
    expect(wrapper.findComponent(PackageManagement).exists()).toBe(true);
    expect(wrapper.findComponent(LatestActivities).exists()).toBe(true);
    expect(wrapper.findComponent(SystemHealth).exists()).toBe(true);
  });

  it('has correct layout structure', () => {
    const wrapper = mount(AdminDashboard);
    
    // Dashboard'ın genel yapısı doğru mu?
    expect(wrapper.classes()).toContain('relative');
    expect(wrapper.classes()).toContain('min-h-screen');
    
    // Main section kontrolü
    const main = wrapper.find('main');
    expect(main.exists()).toBe(true);
    expect(main.classes()).toContain('flex');
  });

  it('handles logout action', async () => {
    const wrapper = mount(AdminDashboard);
    
    // Header'dan çıkış yapma olayını simüle et
    await wrapper.findComponent(DashboardHeader).vm.$emit('logout');
    
    // handleLogout'un çağrıldığını kontrol et
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Admin çıkış yapıyor'));
  });
});

// SystemOverview Component Tests
describe('SystemOverview', () => {
  it('renders all statistic cards', () => {
    const wrapper = mount(SystemOverview);
    
    // 4 istatistik kartı olmalı
    const cards = wrapper.findAll('article');
    expect(cards).toHaveLength(4);
    
    // Kartlarda istatistik değerleri var mı?
    expect(wrapper.text()).toContain('Toplam Öğrenci');
    expect(wrapper.text()).toContain('Toplam Öğretmen');
    expect(wrapper.text()).toContain('Aktif Dersler');
    expect(wrapper.text()).toContain('Toplam Gelir');
  });
});

// UserManagement Component Tests
describe('UserManagement', () => {
  it('renders search input and creates button', () => {
    const wrapper = mount(UserManagement);
    
    // Arama ve ekleme UI elemanları var mı?
    expect(wrapper.find('input[placeholder="Kullanıcı ara..."]').exists()).toBe(true);
    expect(wrapper.find('button:contains("Yeni Kullanıcı")').exists()).toBe(true);
  });
  
  it('filters users based on search input', async () => {
    const wrapper = mount(UserManagement);
    
    // Başta tüm kullanıcılar görünür olmalı
    const initialArticles = wrapper.findAll('article');
    const initialCount = initialArticles.length;
    
    // Arama yap
    const searchInput = wrapper.find('input[placeholder="Kullanıcı ara..."]');
    await searchInput.setValue('Ayşe');
    
    // Filtrelenmiş kullanıcılar gösterilmeli
    const filteredArticles = wrapper.findAll('article');
    expect(filteredArticles.length).toBeLessThanOrEqual(initialCount);
    
    // Aranan terim içeren kullanıcı varsa, sonuçlarda gösterilmeli
    if (filteredArticles.length > 0) {
      expect(wrapper.text()).toContain('Ayşe');
    }
  });
  
  it('shows pagination controls', () => {
    const wrapper = mount(UserManagement);
    
    // Sayfalama kontrolleri var mı?
    expect(wrapper.find('button:contains("Önceki")').exists()).toBe(true);
    expect(wrapper.find('button:contains("Sonraki")').exists()).toBe(true);
  });
});

// PackageManagement Component Tests
describe('PackageManagement', () => {
  it('renders package list and new package button', () => {
    const wrapper = mount(PackageManagement);
    
    // Paket listesi ve ekleme butonu var mı?
    expect(wrapper.find('button:contains("Yeni Paket")').exists()).toBe(true);
    
    // Paket listesi var mı?
    const packages = wrapper.findAll('article');
    expect(packages.length).toBeGreaterThan(0);
  });
  
  it('displays package details correctly', () => {
    const wrapper = mount(PackageManagement);
    
    // Paket detayları gösteriliyor mu?
    const firstPackage = wrapper.findAll('article')[0];
    expect(firstPackage.text()).toMatch(/₺\d+/); // Fiyat
    expect(firstPackage.text()).toMatch(/\d+ Kredi/); // Kredi
    expect(firstPackage.text()).toMatch(/\d+ Abone/); // Abone sayısı
  });
  
  it('has edit functionality', () => {
    const wrapper = mount(PackageManagement);
    
    // Her paketin düzenleme butonu var mı?
    const packages = wrapper.findAll('article');
    packages.forEach(pkg => {
      expect(pkg.find('button:contains("Düzenle")').exists()).toBe(true);
    });
  });
});

// RevenueStats Component Tests
describe('RevenueStats', () => {
  it('renders revenue overview and period selector', () => {
    const wrapper = mount(RevenueStats);
    
    // Dönem seçici var mı?
    expect(wrapper.find('select').exists()).toBe(true);
    expect(wrapper.find('option[value="daily"]').exists()).toBe(true);
    expect(wrapper.find('option[value="weekly"]').exists()).toBe(true);
    expect(wrapper.find('option[value="monthly"]').exists()).toBe(true);
    
    // Gelir özetleri var mı?
    expect(wrapper.text()).toContain('Toplam Gelir');
    expect(wrapper.text()).toContain('Ortalama Satış');
  });
  
  it('changes period when selection changes', async () => {
    const wrapper = mount(RevenueStats);
    
    // Başlangıç periyodunu kontrol et
    const select = wrapper.find('select');
    expect(select.element.value).toBe('monthly');
    
    // Periyodu değiştir
    await select.setValue('weekly');
    
    // Değişim gerçekleşti mi?
    expect(select.element.value).toBe('weekly');
  });
  
  it('displays package sales data', () => {
    const wrapper = mount(RevenueStats);
    
    // Paket satışları gösteriliyor mu?
    expect(wrapper.text()).toContain('Paket Satışları');
    
    // Satış verileri var mı?
    expect(wrapper.text()).toMatch(/₺[\d,]+/); // Gelir formatı
    expect(wrapper.text()).toMatch(/\d+ satış/); // Satış adedi
  });
});

// UserStats Component Tests
describe('UserStats', () => {
  it('renders user statistics and period selector', () => {
    const wrapper = mount(UserStats);
    
    // Dönem seçici var mı?
    expect(wrapper.find('select').exists()).toBe(true);
    
    // İstatistik kartları var mı?
    expect(wrapper.text()).toContain('Aktif Öğrenciler');
    expect(wrapper.text()).toContain('Aktif Öğretmenler');
  });
  
  it('displays growth indicators', () => {
    const wrapper = mount(UserStats);
    
    // Büyüme göstergeleri var mı?
    expect(wrapper.text()).toMatch(/↑ \d+%/); // Artış göstergesi
    expect(wrapper.text()).toContain('geçen aya göre');
  });
  
  it('shows growth chart', () => {
    const wrapper = mount(UserStats);
    
    // Büyüme grafiği var mı?
    expect(wrapper.find('.bg-violet-500').exists()).toBe(true); // Grafik çubukları
    expect(wrapper.text()).toContain('Son 12 Ay');
    expect(wrapper.text()).toContain('Büyüme');
  });
});

// LatestActivities Component Tests
describe('LatestActivities', () => {
  it('renders activity list', () => {
    const wrapper = mount(LatestActivities);
    
    // Aktivite başlığı ve listesi var mı?
    expect(wrapper.text()).toContain('Son Aktiviteler');
    
    // Aktivite kayıtları var mı?
    const activities = wrapper.findAll('article');
    expect(activities.length).toBeGreaterThan(0);
  });
  
  it('displays activity details correctly', () => {
    const wrapper = mount(LatestActivities);
    
    // Aktivite detayları gösteriliyor mu?
    const firstActivity = wrapper.findAll('article')[0];
    expect(firstActivity.text()).toMatch(/\d+:\d+/); // Zaman
    expect(firstActivity.find('.text-violet-700').exists()).toBe(true); // Kullanıcı adı
    expect(firstActivity.find('.rounded-full').exists()).toBe(true); // Rol etiketi
  });
  
  it('distinguishes between teacher and student activities', () => {
    const wrapper = mount(LatestActivities);
    
    // Öğretmen ve öğrenci etiketleri var mı?
    expect(wrapper.find('.bg-orange-100').exists() || wrapper.find('.bg-violet-100').exists()).toBe(true);
  });
});

// SystemHealth Component Tests
describe('SystemHealth', () => {
  it('renders system health metrics', () => {
    const wrapper = mount(SystemHealth);
    
    // Sistem sağlığı başlığı ve metrikleri var mı?
    expect(wrapper.text()).toContain('Sistem Durumu');
    
    // Metrik kayıtları var mı?
    const metrics = wrapper.findAll('article');
    expect(metrics.length).toBeGreaterThan(0);
  });
  
  it('shows different health status indicators', () => {
    const wrapper = mount(SystemHealth);
    
    // Sağlık durumu göstergeleri var mı?
    expect(wrapper.find('.rounded-full').exists()).toBe(true); // Durum indikatörü
    
    // Trend göstergeleri var mı?
    expect(wrapper.text()).toMatch(/Yükseliyor|Düşüyor|Stabil/);
  });
  
  it('has detailed report button', () => {
    const wrapper = mount(SystemHealth);
    
    // Detaylı rapor butonu var mı?
    expect(wrapper.find('button:contains("Detaylı Rapor")').exists()).toBe(true);
  });
});

// Platform Management Functionality Tests
describe('Platform Management Functionality', () => {
  it('simulates the full system monitoring flow', async () => {
    // 1. Admin platformun genel durumunu izler
    const adminDashboard = mount(AdminDashboard);
    expect(adminDashboard.findComponent(SystemOverview).exists()).toBe(true);
    expect(adminDashboard.findComponent(SystemHealth).exists()).toBe(true);
    
    // 2. Kullanıcı yönetimi
    const userManagement = mount(UserManagement);
    
    // Yeni kullanıcı ekleme simülasyonu
    const addUserButton = userManagement.find('button:contains("Yeni Kullanıcı")');
    expect(addUserButton.exists()).toBe(true);
    
    // Gerçek uygulamada burada modal açılacak ve form doldurulacak
    
    // 3. Kredi paketi yönetimi
    const packageManagement = mount(PackageManagement);
    
    // Yeni paket ekleme simülasyonu
    const addPackageButton = packageManagement.find('button:contains("Yeni Paket")');
    expect(addPackageButton.exists()).toBe(true);
    
    // Gerçek uygulamada burada modal açılacak ve form doldurulacak
    
    // 4. Gelir takibi
    const revenueStats = mount(RevenueStats);
    
    // Farklı periyot seçimi
    const periodSelector = revenueStats.find('select');
    await periodSelector.setValue('weekly');
    expect(periodSelector.element.value).toBe('weekly');
    
    // Gerçek uygulamada burada veriler yenilenecek
    
    // 5. Sistem sağlığı takibi
    const systemHealth = mount(SystemHealth);
    
    // Detaylı rapor görüntüleme
    const reportButton = systemHealth.find('button:contains("Detaylı Rapor")');
    expect(reportButton.exists()).toBe(true);
    
    // Gerçek uygulamada burada detaylı rapor sayfasına yönlendirilecek
  });
});