import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_V2,
});

export async function POST(req: Request) {
  try {
    const { shop, tone } = await req.json();

    const prompt = `
Create a polished Instagram marketing poster for a Korean beauty salon.
Business type: ${shop}
Style: ${tone}
Use soft pink, white, rose-gold colors.
Luxury beauty marketing design.
No unreadable text.
Clean layout, modern, premium, square format.
`;

    const image = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    return NextResponse.json({
      image: `data:image/png;base64,${image.data?.[0]?.b64_json}`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "이미지 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}