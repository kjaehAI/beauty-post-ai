import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_V2,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
${body.location}에 있는 ${body.business} 홍보 이미지.
분위기는 ${body.style}.
이벤트 내용은 ${body.event}.
고급스럽고 감성적인 인스타그램 광고 스타일.
`;

    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    const imageBase64 = response.data?.[0]?.b64_json;

    if (!imageBase64) {
      return NextResponse.json(
        { error: "이미지 생성 실패" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      imageUrl: `data:image/png;base64,${imageBase64}`,
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