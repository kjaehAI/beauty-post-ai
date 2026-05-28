"use client";

import { useState } from "react";

export default function GeneratorPage() {
  const [shop, setShop] = useState("");
  const [tone, setTone] = useState("");
  const [result, setResult] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loadingText, setLoadingText] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const generatePost = async () => {
    if (!shop || !tone) {
      alert("업종과 분위기를 입력해주세요.");
      return;
    }

    setLoadingText(true);
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shop, tone }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "생성 실패");
      }

      setResult(data.result);
    } catch (error) {
      alert("홍보글 생성 중 오류가 발생했습니다.");
      console.error(error);
    } finally {
      setLoadingText(false);
    }
  };

  const generateImage = async () => {
    if (!shop || !tone) {
      alert("업종과 분위기를 입력해주세요.");
      return;
    }

    setLoadingImage(true);
    setImageUrl("");

    try {
      const res = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shop, tone }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "이미지 생성 실패");
      }

      setImageUrl(data.image);
    } catch (error) {
      alert("이미지 생성 중 오류가 발생했습니다.");
      console.error(error);
    } finally {
      setLoadingImage(false);
    }
  };

  return (
    <main className="min-h-screen bg-pink-50 px-6 py-20">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="text-center text-4xl font-bold">
          자이보라 AI 홍보 생성기 ✨
        </h1>

        <p className="mt-4 text-center text-gray-600">
          홍보글과 이미지를 자동으로 생성합니다.
        </p>

        <div className="mt-10 space-y-6">
          <div>
            <label className="mb-2 block font-semibold">업종 입력</label>
            <input
              type="text"
              placeholder="예: 네일샵, 피부샵"
              value={shop}
              onChange={(e) => setShop(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 p-4 outline-none focus:border-pink-400"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">분위기 입력</label>
            <input
              type="text"
              placeholder="예: 감성, 고급스러운"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 p-4 outline-none focus:border-pink-400"
            />
          </div>

          <button
            onClick={generatePost}
            disabled={loadingText}
            className="w-full rounded-2xl bg-pink-500 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-pink-400 disabled:opacity-50"
          >
            {loadingText ? "홍보글 생성 중..." : "AI 홍보글 생성하기"}
          </button>

          <button
            onClick={generateImage}
            disabled={loadingImage}
            className="w-full rounded-2xl bg-black py-4 text-lg font-bold text-white shadow-lg transition hover:bg-gray-800 disabled:opacity-50"
          >
            {loadingImage ? "이미지 생성 중..." : "AI 이미지 생성하기"}
          </button>
        </div>

        {result && (
          <div className="mt-10 rounded-3xl bg-gray-100 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">생성 결과</h2>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(result);
                  alert("홍보글이 복사되었습니다!");
                }}
                className="rounded-xl bg-black px-4 py-2 text-sm font-bold text-white"
              >
                복사하기
              </button>
            </div>

            <p className="whitespace-pre-line text-gray-700">{result}</p>
          </div>
        )}

        {imageUrl && (
          <div className="mt-10 rounded-3xl bg-gray-100 p-6">
            <h2 className="mb-4 text-2xl font-bold">생성 이미지</h2>
            <img
              src={imageUrl}
              alt="AI 생성 이미지"
              className="w-full rounded-2xl"
            />
          </div>
        )}
      </div>
    </main>
  );
}