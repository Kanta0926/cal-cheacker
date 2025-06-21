"use client";
import { useState } from "react";

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
    <main style={{ padding: 20 }}>
      <h1>PFCチェックツール</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="材料を記入してください"
          rows={5}
          style={{ width: "100%" }}
        />
        <button type="submit">PFCを計算</button>
      </form>
      {result && (
        <div style={{ marginTop: 20 }}>
          <h2>結果:</h2>
          <pre>{result}</pre>
        </div>
      )}
    </main>
  );
}
