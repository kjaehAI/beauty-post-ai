import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_V2,
});

export async function POST(req: Request) {
  try {
    const { shop, tone } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: `
너는 뷰티샵 전문 인스타 마케팅 카피라이터야.

업종: ${shop}
분위기: ${tone}

조건:
- 인스타그램 홍보글로 작성
- 이모지 포함
- 예약 유도 문구 포함
- 너무 과장하지 않기
- 한국어로 자연스럽게 작성
`,
    });

    return NextResponse.json({
      result: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "홍보글 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}