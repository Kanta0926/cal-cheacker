export {};

declare global {
  interface Window {
    /** Google AdSense の配列。push で広告をレンダリング */
    adsbygoogle: { push: (args?: unknown) => void }[];
  }
}
