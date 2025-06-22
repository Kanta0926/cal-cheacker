// global.d.ts
export {};

declare global {
  interface Window {
    adsbygoogle: unknown[]; // ← これで OK
  }
}
