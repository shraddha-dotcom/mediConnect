// setup.js

import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// ✅ Clean up after each test
afterEach(() => {
  cleanup();
});

//  Mock fetch globally
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: [] }),
  })
);

//  Optional: Mock window.localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => JSON.stringify('mock-token')), // ✅ Fixes the error
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
});



// import { afterEach } from "vitest";
// import { cleanup } from "@testing-library/react";
// import "@testing-library/jest-dom/vitest";
// afterEach(() => {
// cleanup();
// });
