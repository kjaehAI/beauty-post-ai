import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 text-gray-900">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
        <p className="mb-4 rounded-full bg-white px-4 py-2 text-sm shadow">
          Zyvora AI Beauty Marketing
        </p>

        <h1 className="text-4xl font-bold leading-tight md:text-6xl">
          원장님 홍보,
          <br />
          이제 AI가 대신합니다 ✨
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-600">
          뷰티샵 전용 AI 마케팅 솔루션. 홍보글과 이미지를 자동으로 생성해
          인스타 콘텐츠 제작 시간을 줄여드립니다.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/login"
            className="rounded-full bg-black px-8 py-4 font-semibold text-white shadow-lg"
          >
            무료 체험 시작하기
          </Link>

          <Link
            href="/dashboard"
            className="rounded-full bg-white px-8 py-4 font-semibold shadow"
          >
            서비스 바로가기
          </Link>
        </div>

        <div className="mt-16 grid w-full gap-5 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 text-left shadow">
            <h3 className="text-xl font-bold">홍보글 자동 생성</h3>
            <p className="mt-3 text-gray-600">
              네일샵, 피부샵, 속눈썹샵, 미용실 홍보 문구를 빠르게 생성합니다.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 text-left shadow">
            <h3 className="text-xl font-bold">이미지 콘텐츠 제작</h3>
            <p className="mt-3 text-gray-600">
              인스타 업로드용 감성 이미지와 이벤트 콘텐츠 제작을 도와줍니다.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 text-left shadow">
            <h3 className="text-xl font-bold">무료 체험 가능</h3>
            <p className="mt-3 text-gray-600">
              복잡한 설치 없이 로그인 후 바로 AI 마케팅을 테스트할 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}