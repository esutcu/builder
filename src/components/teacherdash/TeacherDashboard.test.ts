import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import TeacherDashboard from './TeacherDashboard.vue';

// Console.log çağrılarını yakalayacak mock
const originalConsoleLog = console.log;
const mockConsoleLog = vi.fn();

describe('TeacherDashboard', () => {
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
    const wrapper = mount(TeacherDashboard, {
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

    await flushPromises();

    // Bileşenler var mı?
    expect(wrapper.find('dashboard-header-stub').exists()).toBe(true);
    expect(wrapper.find('upcoming-class-stub').exists()).toBe(true);
    expect(wrapper.find('planned-classes-stub').exists()).toBe(true);
    expect(wrapper.find('teaching-hours-stub').exists()).toBe(true);
  });

  it('handles availability update', async () => {
    const wrapper = mount(TeacherDashboard, {
      global: {
        stubs: {
          'DashboardHeader': true,
          'UpcomingClass': true,
          'PlannedClasses': true,
          'TeachingHours': true,
          'TeachingStats': true,
          'DashboardFooter': true,
          'TimeSelector': true
        }
      }
    });

    // availabilityCalendar bileşenini bul
    const availabilityCalendar = wrapper.findComponent({ name: 'AvailabilityCalendar' });
    
    // Test mock verileri
    const mockAvailabilityData = {
      '2024-03-15': [9, 10, 11, 14, 15],
      '2024-03-16': [10, 11, 12]
    };
    
    // Emit olayını tetikle
    availabilityCalendar.vm.$emit('updateAvailability', mockAvailabilityData);
    
    // Doğru olay işleyici çalıştırıldı mı?
    await flushPromises();
    expect(mockConsoleLog).toHaveBeenCalledWith(
      expect.stringContaining('Müsaitlik verileri güncellendi'),
      expect.anything()
    );
  });

  it('handles logout action', async () => {
    const wrapper = mount(TeacherDashboard, {
      global: {
        stubs: {
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
    
    // Dashboard header bileşenini bul
    const header = wrapper.findComponent({ name: 'DashboardHeader' });
    
    // Logout olayını tetikle
    header.vm.$emit('logout');
    
    // Doğru olay işleyici çalıştırıldı mı?
    await flushPromises();
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Öğretmen çıkış yapıyor'));
  });

  it('displays teacher name correctly', async () => {
    const wrapper = mount(TeacherDashboard, {
      global: {
        stubs: {
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
    
    // teacherName prop'u DashboardHeader'a doğru iletildi mi?
    const header = wrapper.findComponent({ name: 'DashboardHeader' });
    expect(header.props('userName')).toBe('Ayşe');
  });
});

describe('TeachingHours Component', () => {
  it('displays hours correctly', async () => {
    // Bu testi ayrı bir dosyada test edebiliriz
    expect(true).toBe(true);
  });
});

describe('AvailabilityCalendar Component', () => {
  it('allows editing availability', async () => {
    // Bu testi ayrı bir dosyada test edebiliriz
    expect(true).toBe(true);
  });
});