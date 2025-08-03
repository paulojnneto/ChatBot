import '@testing-library/jest-dom';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: unknown) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => { }, // deprecated
    removeListener: () => { }, // deprecated
    addEventListener: () => { },
    removeEventListener: () => { },
    dispatchEvent: () => false,
  }),
});