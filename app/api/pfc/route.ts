import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const { ingredients } = await req.json();

  const prompt = `以下の材料からPFC（たんぱく質・脂質・炭水化物）の推定値とカロリーを計算し、1行目に総カロリー、2行目に総タンパク質量、3行目に総脂質量、4行目に総炭水化物量を出力して。4行目以降に各食材のカロリー数を出力。：${ingredients}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return NextResponse.json({
    result: completion.choices[0].message?.content,
  });
}
