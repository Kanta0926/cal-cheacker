"use client";

import { useEffect } from "react";

export default function AdBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-3692703811848538"
      data-ad-slot="2119244295"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
