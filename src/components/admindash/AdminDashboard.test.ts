import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import AdminDashboard from "./AdminDashboard.vue";
import DashboardHeader from "./DashboardHeader.vue";
import SystemOverview from "./SystemOverview.vue";
import UserManagement from "./UserManagement.vue";
import PackageManagement from "./PackageManagement.vue";
import LatestActivities from "./LatestActivities.vue";
import SystemHealth from "./SystemHealth.vue";
import RevenueStats from "./RevenueStats.vue";

describe("AdminDashboard", () => {
  it("renders all main components", () => {
    const wrapper = mount(AdminDashboard);

    expect(wrapper.findComponent(DashboardHeader).exists()).toBe(true);
    expect(wrapper.findComponent(SystemOverview).exists()).toBe(true);
    expect(wrapper.findComponent(UserManagement).exists()).toBe(true);
    expect(wrapper.findComponent(PackageManagement).exists()).toBe(true);
    expect(wrapper.findComponent(LatestActivities).exists()).toBe(true);
    expect(wrapper.findComponent(SystemHealth).exists()).toBe(true);
    expect(wrapper.findComponent(RevenueStats).exists()).toBe(true);
  });

  it("has correct layout classes", () => {
    const wrapper = mount(AdminDashboard);
    expect(wrapper.classes()).toContain("relative");
    expect(wrapper.classes()).toContain("min-h-screen");
  });
});

describe("DashboardHeader", () => {
  it("renders welcome message and logout button", () => {
    const wrapper = mount(DashboardHeader);
    expect(wrapper.text()).toContain("Hoşgeldin, Admin");
    expect(wrapper.find("button").text()).toBe("Çıkış Yap");
  });
});

describe("SystemOverview", () => {
  it("renders all statistic cards", () => {
    const wrapper = mount(SystemOverview);
    const cards = wrapper.findAll("article");
    expect(cards).toHaveLength(4);
  });
});

describe("UserManagement", () => {
  it("renders search input and user list", () => {
    const wrapper = mount(UserManagement);
    expect(wrapper.find('input[placeholder="Kullanıcı ara..."]').exists()).toBe(true);
    expect(wrapper.find("button").exists()).toBe(true);
  });
  
  it("filters users based on search", async () => {
    const wrapper = mount(UserManagement);
    const searchInput = wrapper.find('input[placeholder="Kullanıcı ara..."]');
    await searchInput.setValue("Ayşe");
    expect(wrapper.findAll("article")).toHaveLength(1);
  });
});

describe("PackageManagement", () => {
  it("renders package list and new package button", () => {
    const wrapper = mount(PackageManagement);
    expect(wrapper.find('button:contains("Yeni Paket")').exists()).toBe(true);
    expect(wrapper.findAll("article").length).toBeGreaterThan(0);
  });
});

describe("SystemHealth", () => {
  it("renders health metrics", () => {
    const wrapper = mount(SystemHealth);
    const metrics = wrapper.findAll("article");
    expect(metrics.length).toBeGreaterThan(0);
  });
});

describe("RevenueStats", () => {
  it("renders revenue overview and package sales", () => {
    const wrapper = mount(RevenueStats);
    expect(wrapper.find("select").exists()).toBe(true);
    expect(wrapper.findAll(".bg-slate-50").length).toBeGreaterThan(0);
  });

  it("changes period selection", async () => {
    const wrapper = mount(RevenueStats);
    const select = wrapper.find("select");
    await select.setValue("weekly");
    expect((select.element as HTMLSelectElement).value).toBe("weekly");
  });
});