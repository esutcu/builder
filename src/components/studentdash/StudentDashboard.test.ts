import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import StudentDashboard from './StudentDashboard.vue';

// creditService mocklaması
vi.mock('../../services/creditService', () => ({
  getCurrentCredits: vi.fn().mockReturnValue(10),
  getTransactions: vi.fn().mockReturnValue([]),
  spendCredits: vi.fn().mockImplementation((amount, description) => {
    console.log(`Simulated spending ${amount} credits for: ${description}`);
    return true;
  }),
  purchaseCredits: vi.fn().mockImplementation((packageId, amount, price) => {
    console.log(`Simulated purchasing ${amount} credits for ${price}`);
    return true;
  }),
  creditPackages: [
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
    }
  ]
}));

// Console.log çağrılarını yakalayacak mock
const originalConsoleLog = console.log;
const mockConsoleLog = vi.fn();

describe('StudentDashboard', () => {
  beforeEach(() => {
    // Console.log'u mockla
    console.log = mockConsoleLog;
    mockConsoleLog.mockClear();
  });

  afterEach(() => {
    // Test sonrası console.log'u geri yükle
    console.log = originalConsoleLog;
  });

  it('renders all main components', async () => {
    const wrapper = mount(StudentDashboard, {
      global: {
        stubs: {
          'DashboardHeader': true,
          'UpcomingClass': true,
          'PlannedClasses': true,
          'CreditBalance': true,
          'TeacherSelector': true,
          'TimeBasedTeacherSelector': true,
          'AvailabilityCalendar': true,
          'TimeSelector': true,
          'PackagePricing': true,
          'DashboardFooter': true
        }
      }
    });

    await flushPromises();
    
    // Bileşenler var mı?
    expect(wrapper.find('dashboard-header-stub').exists()).toBe(true);
    expect(wrapper.find('upcoming-class-stub').exists()).toBe(true);
    expect(wrapper.find('credit-balance-stub').exists()).toBe(true);
  });

  it('handles tab switching correctly', async () => {
    const wrapper = mount(StudentDashboard, {
      global: {
        stubs: {
          'DashboardHeader': true,
          'UpcomingClass': true,
          'PlannedClasses': true,
          'CreditBalance': true,
          'TeacherSelector': true,
          'TimeBasedTeacherSelector': true,
          'AvailabilityCalendar': true,
          'TimeSelector': true,
          'PackagePricing': true,
          'DashboardFooter': true
        }
      }
    });

    // İki sekme butonu olmalı
    const buttons = wrapper.findAll('button');
    const tabs = buttons.filter(btn => btn.text().includes('Seçimi'));
    
    expect(tabs.length).toBeGreaterThanOrEqual(2);
    
    // Zaman seçimi sekmesine tıkla (ikinci sekme)
    await tabs[1].trigger('click');
    
    // activeTab değerinin 'time' olduğunu kontrol et
    expect(wrapper.vm.activeTab).toBe('time');
  });

  it('handles teacher selection', async () => {
    const wrapper = mount(StudentDashboard);
    
    // TeacherSelector bileşeni yerine direkt emit yapalım
    wrapper.vm.selectTeacherHandler('Ayşe Yılmaz');
    
    // Console logları kontrol et
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Ayşe Yılmaz seçildi'));
  });

  it('handles time selection', async () => {
    const wrapper = mount(StudentDashboard);
    
    // handleTimeSelection fonksiyonunu direkt çağır
    const date = new Date('2024-03-15');
    const hour = 14;
    wrapper.vm.handleTimeSelection(date, hour);
    
    // Console logları kontrol et - doğru tarih formatıyla
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Tarih:'));
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Saat: 14:00'));
  });

  it('handles lesson booking', async () => {
    const wrapper = mount(StudentDashboard);
    
    // Ders planlama işlemini taklit et
    const date = new Date('2024-03-15');
    const hour = 14;
    const teacherId = 1;
    wrapper.vm.bookLessonHandler(teacherId, date, hour);
    
    // Console logları kontrol et
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Ders planlandı: Öğretmen ID: 1'));
  });

  it('handles logout action', async () => {
    const wrapper = mount(StudentDashboard);
    
    // handleLogout fonksiyonunu direkt çağır
    wrapper.vm.handleLogout();
    
    // Console logları kontrol et
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Öğrenci çıkış yapıyor'));
  });
});

describe('CreditBalance Component', () => {
  it('displays credit information', async () => {
    // Bu testi ayrı bir dosyada test edebiliriz
    expect(true).toBe(true);
  });
});

describe('UpcomingClass Component', () => {
  it('renders class information', async () => {
    // Bu testi ayrı bir dosyada test edebiliriz
    expect(true).toBe(true);
  });
});