import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import StudentDashboard from '../components/studentdash/StudentDashboard.vue';
import TeacherDashboard from '../components/teacherdash/TeacherDashboard.vue';
import AdminDashboard from '../components/admindash/AdminDashboard.vue';

// Mock creditService
vi.mock('../services/creditService', () => ({
  getCurrentCredits: vi.fn(() => 10),
  getTransactions: vi.fn(() => []),
  spendCredits: vi.fn((amount, description) => {
    console.log(`Simulated spending ${amount} credits for: ${description}`);
    return true;
  }),
  purchaseCredits: vi.fn((packageId, amount, price) => {
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

describe('System Integration Tests', () => {
  beforeEach(() => {
    // Console.log'u mockla
    console.log = mockConsoleLog;
    mockConsoleLog.mockClear();
  });

  afterEach(() => {
    // Test sonrası console.log'u geri yükle
    console.log = originalConsoleLog;
  });

  // Basit entegrasyon testi
  it('verifies that all dashboards can be mounted', async () => {
    // Öğrenci dashboard'unu monte et
    const studentDashboard = mount(StudentDashboard, {
      global: {
        stubs: {
          'DashboardHeader': true,
          'UpcomingClass': true,
          'PlannedClasses': true,
          'CreditBalance': true,
          'TeacherSelector': true,
          'AvailabilityCalendar': true,
          'TimeSelector': true,
          'PackagePricing': true,
          'DashboardFooter': true,
          'TimeBasedTeacherSelector': true
        }
      }
    });
    
    expect(studentDashboard.exists()).toBe(true);
    
    // Öğretmen dashboard'unu monte et
    const teacherDashboard = mount(TeacherDashboard, {
      global: {
        stubs: {
          'DashboardHeader': true,
          'UpcomingClass': true,
          'PlannedClasses': true,
          'TeachingHours': true,
          'AvailabilityCalendar': true,
          'TimeSelector': true,
          'TeachingStats': true,
          'DashboardFooter': true
        }
      }
    });
    
    expect(teacherDashboard.exists()).toBe(true);
    
    // Admin dashboard'unu monte et
    const adminDashboard = mount(AdminDashboard, {
      global: {
        stubs: {
          'DashboardHeader': true,
          'SystemOverview': true,
          'UserStats': true,
          'RevenueStats': true,
          'UserManagement': true,
          'PackageManagement': true,
          'LatestActivities': true,
          'SystemHealth': true,
          'DashboardFooter': true
        }
      }
    });
    
    expect(adminDashboard.exists()).toBe(true);
  });

  it('simulates teacher-student interaction flow', async () => {
    // 1. Öğretmen müsaitlik belirliyor
    const teacherDashboard = mount(TeacherDashboard, {
      global: {
        stubs: {
          'UpcomingClass': true,
          'PlannedClasses': true,
          'TeachingHours': true,
          'TimeSelector': true,
          'TeachingStats': true,
          'DashboardFooter': true
        }
      }
    });
    
    // AvailabilityCalendar bileşeninin updateAvailability olayını simüle et
    const availabilityCalendar = teacherDashboard.findComponent({ name: 'AvailabilityCalendar' });
    
    if (availabilityCalendar.exists()) {
      const mockAvailabilityData = {
        '2024-03-15': [9, 10, 11, 14, 15],
        '2024-03-16': [10, 11, 12]
      };
      
      availabilityCalendar.vm.$emit('updateAvailability', mockAvailabilityData);
      
      await flushPromises();
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('Müsaitlik verileri güncellendi'),
        expect.anything()
      );
    }
    
    // 2. Öğrenci ders planlıyor
    const studentDashboard = mount(StudentDashboard, {
      global: {
        stubs: {
          'UpcomingClass': true,
          'PlannedClasses': true,
          'CreditBalance': true,
          'AvailabilityCalendar': true,
          'TeacherSelector': true,
          'TimeSelector': true,
          'PackagePricing': true,
          'DashboardFooter': true
        }
      }
    });
    
    // Ders planlama işlemi
    const teacherId = 1;
    const date = new Date('2024-03-15');
    const hour = 14;
    
    studentDashboard.vm.bookLessonHandler(teacherId, date, hour);
    
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Ders planlandı'));
    
    // 3. Admin aktiviteleri izliyor
    const adminDashboard = mount(AdminDashboard, {
      global: {
        stubs: {
          'DashboardHeader': true,
          'SystemOverview': true,
          'UserStats': true,
          'RevenueStats': true,
          'UserManagement': true,
          'PackageManagement': true,
          'SystemHealth': true,
          'DashboardFooter': true
        }
      }
    });
    
    // LatestActivities bileşeni var mı?
    const latestActivities = adminDashboard.findComponent({ name: 'LatestActivities' });
    expect(latestActivities.exists()).toBe(true);
  });

  it('verifies credit system flow', async () => {
    // Öğrenci dashboard'u
    const studentDashboard = mount(StudentDashboard, {
      global: {
        stubs: {
          'DashboardHeader': true,
          'UpcomingClass': true,
          'PlannedClasses': true,
          'TeacherSelector': true,
          'AvailabilityCalendar': true,
          'TimeSelector': true,
          'TimeBasedTeacherSelector': true,
          'DashboardFooter': true
        }
      }
    });
    
    // CreditBalance bileşeni
    const creditBalance = studentDashboard.findComponent({ name: 'CreditBalance' });
    expect(creditBalance.exists()).toBe(true);
    
    // PackagePricing bileşeni
    const packagePricing = studentDashboard.findComponent({ name: 'PackagePricing' });
    expect(packagePricing.exists()).toBe(true);
    
    // Ders planlama ve kredi harcama işlemini simüle et
    const teacherId = 1;
    const date = new Date('2024-03-15');
    const hour = 14;
    
    studentDashboard.vm.bookLessonHandler(teacherId, date, hour);
    
    // Kredi harcama işlemi doğru çalıştı mı?
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Ders planlandı'));
  });
});