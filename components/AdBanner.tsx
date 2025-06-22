"use client";

import { useEffect } from "react";

export default function AdBanner() {
  useEffect(() => {
    try {
      // @ts-expect-error 宣言が必要な理由
      /* adsbygoogleの型チェック回避のため */
      //   asobygogleを初期化、広告挿入
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
