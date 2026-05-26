import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_V2,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
${body.business} 홍보 이미지,
${body.location} 지역,
${body.event} 이벤트,
${body.style} 분위기,
고급스럽고 감각적인 인스타그램 스타일 디자인
`;

    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    const image = response.data?.[0]?.b64_json;

    if (!image) {
      return NextResponse.json(
        { error: "이미지 생성 결과가 없습니다." },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      imageUrl: `data:image/png;base64,${image}`,
    });

    return NextResponse.json({
      imageUrl: `data:image/png;base64,${image}`,
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}