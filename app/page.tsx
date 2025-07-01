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

  // 整数だけ抽出
  const extractNumber = (text: string) => {
    const match = text.match(/[\d.]+/);
    return match ? match[0] : text;
  };

  return (
    <main className="p-5 flex flex-col items-center justify-center gap-6 lg:gap-4">
      <div className="font-bold p-5 flex flex-col items-center justify-center">
        <h2>コピペでカロリー計算！</h2>
        <h1 className="text-2xl mb-4 ">カロリーチェッカー</h1>
        <div>
          <span className="bg-[#333333] text-white py-1 px-2 rounded-full">
            タンパク質計算対応
          </span>
        </div>
      </div>
      <div className="bg-white rounded-sm flex flex-col items-center text-center gap-4 lg:p-12 p-6 ">
        <div className="text-gray-600 text-sm">
          <span>料理で使用した食材を選択</span>
          <p className="text-0.9">
            レシピなどに書いてある材料から、カロリーを計算できます。
          </p>
        </div>
        <form onSubmit={handleSubmit} className="relative space-y-4 w-full">
          {ingredients === "" && (
            <img
              src="/write.svg"
              alt="Write Icon"
              className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 opacity-60"
            />
          )}

          <textarea
            id="textarea"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="料理に使用した食材を記入ください。"
            rows={5}
            className="w-full border-5 border-amber-200 border-dashed rounded focus:outline-none p-2 bg-FFF7E7 placeholder-gray-500/60 font-gothic text-center text-sm"
          />

          {/* <AdBanner /> */}

          <button
            type="submit"
            className="bg-amber-400 text-white px-4 py-2 rounded border hover:bg-white hover:text-amber-400 hover:border-amber-400 ease-in transition cursor-pointer"
          >
            PFCを計算
          </button>
        </form>
      </div>
      {/* <AdBanner /> */}

      {/* 即時関数でresultを整理 */}
      {result &&
        (() => {
          const lines = result.split("\n");
          const totalCal = lines[0] || "";
          const totalProtein = lines[1] || "";
          const totalFat = lines[2] || "";
          const totalCarbs = lines[3] || "";
          const details = lines.slice(4);

          return (
            <div className="flex flex-col  text-sm space-y-2 w-full max-w-lg p3 gap-0.5">
              {/* カロリー */}
              <div className="bg-white border rounded p-2 text-sm space-y-2 w-full max-w-lg">
                <p className="font-bold text-center">
                  <span>総カロリー:</span> {extractNumber(totalCal)}
                  <span>kcal</span>
                </p>
              </div>

              {/* <AdBanner /> */}

              {/* PFC */}
              <div className="flex flex-row gap-2 text-center">
                <p className="font-bold bg-white border rounded p-2 text-sm space-y-2 w-full max-w-lg">
                  <span>総タンパク質:</span> {extractNumber(totalProtein)}
                  <span>g</span>
                </p>
                <p className="font-bold bg-white border rounded p-2 text-sm space-y-2 w-full max-w-lg">
                  <span>総脂質:</span> {extractNumber(totalFat)}
                  <span>g</span>
                </p>
                <p className="font-bold bg-white border rounded p-2 text-sm space-y-2 w-full max-w-lg">
                  <span>総炭水化物:</span> {extractNumber(totalCarbs)}
                  <span>g</span>
                </p>
              </div>

              {/* 詳細 */}
              {details.length > 0 && (
                <div className="bg-white border rounded p-5 text-sm space-y-2 w-full max-w-lg">
                  <strong>詳細:</strong>
                  <ul className="list-disc list-inside text-left mt-2">
                    {details.map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })()}

      <div className="bg-white font-bold flex flex-col items-center justify-center">
        <h3 className="pt-6">使い方</h3>
        <div className="p-5 flex items-center justify-center">
          <div className="font-bold text-sm p-5 flex flex-col items-center justify-center">
            <span className="">①気になるレシピの材料をコピー</span>
            <img
              className="w-40 h-40 pt-2"
              src="Desktop Screenshot 2025.07.01 - 17.11.34.15.png"
              alt=""
            />
          </div>
          <div
            className="font-bold text-sm p-5 flex flex-col items-center justify-center"
            src="Desktop Screenshot 2025.07.01 - 17.04.56.16.png"
          >
            <span>②貼り付ける</span>
            <img
              className="w-40 h-40 pt-2"
              src="Desktop Screenshot 2025.07.01 - 17.04.56.16.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </main>
  );
}
