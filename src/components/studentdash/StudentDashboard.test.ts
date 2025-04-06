import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import StudentDashboard from "./StudentDashboard.vue";
import DashboardHeader from "./DashboardHeader.vue";
import UpcomingClass from "./UpcomingClass.vue";
import PlannedClasses from "./PlannedClasses.vue";
import CreditBalance from "./CreditBalance.vue";

describe("StudentDashboard", () => {
  it("renders all main components", () => {
    const wrapper = mount(StudentDashboard);

    expect(wrapper.findComponent(DashboardHeader).exists()).toBe(true);
    expect(wrapper.findComponent(UpcomingClass).exists()).toBe(true);
    expect(wrapper.findComponent(PlannedClasses).exists()).toBe(true);
    expect(wrapper.findComponent(CreditBalance).exists()).toBe(true);
  });
});

describe("DashboardHeader", () => {
  it("renders welcome message and logout button", () => {
    const wrapper = mount(DashboardHeader);

    expect(wrapper.text()).toContain("Hoşgeldin, Öğrenci");
    expect(wrapper.find("button").text()).toBe("Çıkış Yap");
  });
});

describe("CreditBalance", () => {
  it("displays correct credit amount", () => {
    const credits = 8;
    const wrapper = mount(CreditBalance, {
      props: { credits },
    });

    expect(wrapper.text()).toContain(`${credits} Kredi`);
  });
});
