import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_V2,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
${body.location}에 있는 ${body.business} 홍보글 작성.

이벤트:
${body.event}

분위기:
${body.style}

반드시 아래 형식으로만 응답:

[INSTAGRAM]
인스타용 글

[BLOG]
블로그용 글

[PLACE]
네이버플레이스용 글
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const result =
      completion.choices[0]?.message?.content || "";

    const instagram =
      result.split("[INSTAGRAM]")[1]?.split("[BLOG]")[0]?.trim() || "";

    const blog =
      result.split("[BLOG]")[1]?.split("[PLACE]")[0]?.trim() || "";

    const place =
      result.split("[PLACE]")[1]?.trim() || "";

    return NextResponse.json({
      instagram,
      blog,
      place,
      raw: result,
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      {
        error: error.message || "서버 오류",
      },
      { status: 500 }
    );
  }
}