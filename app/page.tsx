"use client";
import { useState } from "react";
// import AdBanner from "@/components/AdBanner";

export default function Home() {
  // 入力用の変数とAPIから返ってくる変数
  const [ingredients, setIngredients] = useState("");
  const [result, setResult] = useState("");

  //   フォームの送信
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/pfc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients }),
    });

    // 結果をセット
    const data = await res.json();
    setResult(data.result);
  };

  return (
    <main className="p-5 flex flex-col items-center justify-center gap-4">
      <div className="font-bold p-5 flex flex-col items-center justify-center">
        <h2>コピペでカロリー計算！</h2>
        <h1 className="text-2xl mb-4 ">PFCチェックツール</h1>
        <div>
          <span className="bg-[#333333] text-white py-1 px-2 rounded-full">
            タンパク質計算対応
          </span>
        </div>
      </div>
      <div className="bg-white rounded-sm flex flex-col items-center text-center gap-4 p-12">
        <div className="text-gray-600 text-sm">
          <span>料理で使用した食材を選択</span>
          <p className="text-0.9">
            レシピなどに書いてある材料から、カロリーを計算できます。
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <textarea
            id="textarea"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="料理に使用した食材を記入ください。"
            rows={5}
            className="w-full border-5 border-amber-100 border-dashed rounded p-2 bg-FFF7E7 placeholder-gray-500/60 font-gothic text-center text-sm"
          />

          {/* <AdBanner /> */}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            PFCを計算
          </button>
        </form>
      </div>
      {result && (
        <div className="mt-5">
          <h2 className="text-xl font-semibold mb-2">結果:</h2>
          <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
            {result}
          </pre>
        </div>
      )}
    </main>
  );
}
