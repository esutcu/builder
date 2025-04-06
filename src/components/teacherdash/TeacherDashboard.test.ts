import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TeacherDashboard from "./TeacherDashboard.vue";
import DashboardHeader from "./DashboardHeader.vue";
import UpcomingClass from "./UpcomingClass.vue";
import PlannedClasses from "./PlannedClasses.vue";
import TeachingHours from "./TeachingHours.vue";
import TeachingStats from "./TeachingStats.vue";

describe("TeacherDashboard", () => {
  it("renders all main components", () => {
    const wrapper = mount(TeacherDashboard);

    expect(wrapper.findComponent(DashboardHeader).exists()).toBe(true);
    expect(wrapper.findComponent(UpcomingClass).exists()).toBe(true);
    expect(wrapper.findComponent(PlannedClasses).exists()).toBe(true);
    expect(wrapper.findComponent(TeachingHours).exists()).toBe(true);
    expect(wrapper.findComponent(TeachingStats).exists()).toBe(true);
  });
});

describe("DashboardHeader", () => {
  it("renders welcome message and logout button", () => {
    const wrapper = mount(DashboardHeader);

    expect(wrapper.text()).toContain("Hoşgeldin, Öğretmen");
    expect(wrapper.find("button").text()).toBe("Çıkış Yap");
  });
});

describe("TeachingHours", () => {
  it("displays correct hours amount", () => {
    const hours = 32;
    const wrapper = mount(TeachingHours, {
      props: { hours },
    });

    expect(wrapper.text()).toContain(`${hours} Saat`);
  });
});

describe("TeachingStats", () => {
  it("displays all statistics sections", () => {
    const wrapper = mount(TeachingStats);

    expect(wrapper.text()).toContain("Bu Ay");
    expect(wrapper.text()).toContain("Toplam");
    expect(wrapper.text()).toContain("Öğrenci Sayısı");
  });
});
