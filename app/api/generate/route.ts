import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
너는 실제 한국 뷰티샵 원장님들이 인스타그램, 네이버 블로그, 네이버 플레이스에 올리는 홍보글을 작성하는 전문 마케터다.

입력 정보:
업종: ${body.business}
지역: ${body.location}
이벤트: ${body.event}
분위기: ${body.style}

공통 규칙:
- 절대 AI처럼 쓰지 말 것
- 너무 짧게 쓰지 말 것
- 실제 원장님이 직접 쓴 것처럼 자연스럽게
- 과장 광고 금지
- "럭셔리", "프리미엄", "특별한 아름다움", "손끝을 빛나게", "경험해보세요" 같은 뻔한 표현 금지
- 지역명과 이벤트 내용을 반드시 자연스럽게 포함
- 예약 문의 유도 포함
- 업종에 맞는 현실적인 장점 포함
- [지역명] 같은 대괄호 placeholder 절대 쓰지 말 것

아래 형식으로만 작성:

[INSTAGRAM]
인스타그램 피드용 글.
5~8문장.
너무 딱딱하지 않게.
이모지 2~4개.
마지막에 해시태그 10개.

[BLOG]
네이버 블로그용 글.
제목 3개 먼저 추천.
그다음 본문 작성.
본문은 9~12문장.
지역 검색에 잘 걸리도록 지역명과 업종명을 자연스럽게 반복.
너무 광고처럼 쓰지 말고 실제 매장 소개글처럼 작성.

[PLACE]
네이버 플레이스 소식용 글.
5~7문장.
이벤트 내용, 예약 방법, 방문 유도, 매장 장점을 담백하게 작성.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.85,
    });

    const result = response.choices[0].message.content || "생성 실패";

    return Response.json({ result });
  } catch (error) {
    console.error(error);

    return Response.json({
      result: "홍보글 생성 중 오류가 발생했습니다.",
    });
  }
}