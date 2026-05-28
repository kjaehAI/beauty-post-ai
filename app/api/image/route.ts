import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_V2,
});

export async function POST(req: Request) {
  try {
    const { shop, tone } = await req.json();

    const prompt = `
    Create an ultra high-end Korean beauty salon Instagram advertisement poster.
    
    Business type:
    ${shop}
    
    Mood and branding style:
    ${tone}
    
    Requirements:
    - Premium Korean beauty marketing design
    - Luxury Instagram advertisement aesthetic
    - Cinematic lighting
    - Soft shadows and realistic depth
    - Modern and trendy Korean branding
    - Elegant composition
    - Expensive beauty salon atmosphere
    - Highly detailed
    - Professional photography style
    - Luxury typography spacing
    - Viral Instagram ad feeling
    - Clean layout with strong focal point
    - Premium color harmony
    - Korean premium beauty brand style
    - Realistic textures
    - Polished commercial quality
    - Sophisticated feminine aesthetic
    - High-end art direction
    - Stylish and visually striking
    - Advertisement quality worthy of a real luxury beauty campaign
    
    If the business is a nail salon:
    - show elegant hands
    - glossy nails
    - luxury manicure aesthetic
    
    If the business is a skin care salon:
    - glowing skin
    - spa aesthetic
    - luxury skincare clinic mood
    
    If the business is a hair salon:
    - glossy healthy hair
    - premium salon interior
    - fashion magazine style
    
    If the business is an eyelash salon:
    - close-up beauty photography
    - elegant eyelashes
    - soft luxury makeup aesthetic
    
    Image style:
    - photorealistic
    - luxury commercial photography
    - instagram luxury ad
    - premium korean beauty brand
    - masterpiece quality
    - ultra detailed
    - Do not crop the main subject.
- Keep all important objects fully visible inside the frame.
- Add generous margins and safe padding around the design.
- Centered composition.
- Full poster layout, not close-up.
- Leave empty space around edges.
- Do not place important elements near the border.
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