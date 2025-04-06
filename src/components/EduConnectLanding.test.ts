import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import EduConnectLanding from "./EduConnectLanding.vue";

describe("EduConnectLanding", () => {
  it("renders all sections", () => {
    const wrapper = mount(EduConnectLanding);

    expect(wrapper.find("nav").exists()).toBe(true);
    expect(wrapper.find("section").exists()).toBe(true);
    expect(wrapper.find("footer").exists()).toBe(true);
  });

  it("has correct background color", () => {
    const wrapper = mount(EduConnectLanding);
    expect(wrapper.classes()).toContain("bg-slate-50");
  });
});
