import { vi } from 'vitest';
import { config } from '@vue/test-utils';

// Tüm VUE Uygulaması üzerinde genel mock yapılandırması
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Test Utils için küresel yapılandırma
config.global.stubs = {
  transition: {
    inheritAttrs: false,
    template: '<slot></slot>'
  }
};

// Test ortamında alert, prompt ve confirm pencerelerini mock'la
window.alert = vi.fn();
window.confirm = vi.fn();
window.prompt = vi.fn();

// localStorage mock'la
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});