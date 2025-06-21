// pages/api/pfc.ts
// import type { NextApiRequest, NextApiResponse } from "next";
// import OpenAI from "openai";

// // OpenAI APIのインスタンス初期化
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   // POST以外はエラー処理
//   if (req.method !== "POST") return res.status(405).end();

//   const { ingredients } = req.body;

//   const prompt = `以下の材料からPFC（たんぱく質・脂質・炭水化物）の推定値とカロリーを教えてください。また料理としてのカロリーも教えて：${ingredients}`;

//   // プロンプトを送信
//   const completion = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: prompt }],
//   });

//   //   jsonでの返し
//   const answer = completion.data.choices[0].message?.content;
//   res.status(200).json({ result: answer });
// }

import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs"; // OpenAI SDK は Node.js ランタイム推奨

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const { ingredients } = await req.json();

  const prompt = `以下の材料からPFC（たんぱく質・脂質・炭水化物）の推定値とカロリーを教えてください。また料理として推定値のカロリーを足した値も教えて：${ingredients}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return NextResponse.json({
    result: completion.choices[0].message?.content,
  });
}
