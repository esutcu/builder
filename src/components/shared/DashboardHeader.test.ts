import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import DashboardHeader from "./DashboardHeader.vue";

describe("DashboardHeader", () => {
  it("renders welcome message with user name", () => {
    const userName = "Test User";
    const wrapper = mount(DashboardHeader, {
      props: { userName }
    });

    expect(wrapper.text()).toContain(`Hoşgeldin, ${userName}`);
  });

  it("renders logout button", () => {
    const wrapper = mount(DashboardHeader, {
      props: { userName: "Test User" }
    });

    expect(wrapper.find("button").text()).toBe("Çıkış Yap");
  });

  it("emits logout event when button is clicked", async () => {
    const wrapper = mount(DashboardHeader, {
      props: { userName: "Test User" }
    });

    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted()).toHaveProperty("logout");
    expect(wrapper.emitted().logout).toHaveLength(1);
  });
});