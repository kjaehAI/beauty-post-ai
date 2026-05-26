"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [business, setBusiness] = useState("네일샵");
  const [location, setLocation] = useState("");
  const [event, setEvent] = useState("");
  const [style, setStyle] = useState("고급스러운");

  const [instagramText, setInstagramText] = useState("");
  const [blogText, setBlogText] = useState("");
  const [placeText, setPlaceText] = useState("");

  const [posts, setPosts] = useState<any[]>([]);

  const [imageUrl, setImageUrl] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    loadPosts();
  }, [user]);

  async function loadPosts() {
    if (!user) return;

    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setPosts(data || []);
  }

  async function signUp() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("회원가입 완료");
    }
  }

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function handleGenerate() {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        business,
        location,
        event,
        style,
      }),
    });

    const data = await res.json();
    console.log(data);
    

    const text = data.result || "";

    const instagramMatch = text.match(
      /\[INSTAGRAM\]([\s\S]*?)\[BLOG\]/
    );

    const blogMatch = text.match(
      /\[BLOG\]([\s\S]*?)\[PLACE\]/
    );

    const placeMatch = text.match(
      /\[PLACE\]([\s\S]*)/
    );

    const insta = instagramMatch?.[1]?.trim() || "";
    const blog = blogMatch?.[1]?.trim() || "";
    const place = placeMatch?.[1]?.trim() || "";

    setInstagramText(insta);
    setBlogText(blog);
    setPlaceText(place);

    const { error } = await supabase.from("posts").insert([
      {
        user_id: user.id,
        user_email: user.email,
        instagram_text: insta,
        blog_text: blog,
        place_text: place,
      },
    ]);

    if (error) {
      console.log(error);
      alert(error.message);
    }

    loadPosts();
  }

  async function handleGenerateImage() {
    try {
      setLoadingImage(true);
  
      const res = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          business,
          location,
          event,
          style,
        }),
      });
  
      const data = await res.json();
  
      console.log(data);
  
      setImageUrl(data.imageUrl);
    } catch (error: any) {
      console.log(error);
  
      alert(error?.message || "이미지 생성 실패");
    } finally {
      setLoadingImage(false);
    }
  }

  async function copyText(text: string) {
    await navigator.clipboard.writeText(text);
    alert("복사 완료");
  }

  function openInstagram() {
    window.open("https://instagram.com", "_blank");
  }

  function openNaverBlog() {
    window.open("https://blog.naver.com", "_blank");
  }

  function openNaverPlace() {
    window.open("https://map.naver.com", "_blank");
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-[32px] shadow-2xl p-10">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-bold mb-5">
              AI Beauty Marketing
            </div>

            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white">
              BeautyPost AI
            </h1>

            <p className="mt-5 text-lg text-zinc-400 leading-relaxed">
              미용실 · 네일샵 · 피부샵 홍보글을
              <br />
              AI가 자동으로 생성해드립니다
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-white outline-none"
            />

            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-white outline-none"
            />

            <button
              onClick={signIn}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-2xl"
            >
              로그인
            </button>

            <button
              onClick={signUp}
              className="w-full bg-white text-black font-bold py-4 rounded-2xl"
            >
              회원가입
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-black">
              BeautyPost AI
            </h1>

            <p className="text-zinc-400 mt-2">
              AI 뷰티샵 마케팅 자동화
            </p>
          </div>

          <button
            onClick={signOut}
            className="bg-white text-black px-5 py-3 rounded-2xl font-bold"
          >
            로그아웃
          </button>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8">
          <div className="grid md:grid-cols-2 gap-4">
          <select
  value={business}
  onChange={(e) => setBusiness(e.target.value)}
  className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 outline-none"
>
  <option>네일샵</option>
  <option>헤어샵</option>
  <option>미용실</option>
  <option>속눈썹샵</option>
  <option>피부관리샵</option>
  <option>왁싱샵</option>
</select>

            <input
              placeholder="지역"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 outline-none"
            />

<input
  placeholder="예: 신규고객 30% 할인 이벤트"
  value={event}
  onChange={(e) => setEvent(e.target.value)}
  className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 outline-none"
/>

<select
  value={style}
  onChange={(e) => setStyle(e.target.value)}
  className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 outline-none"
>
  <option>고급스러운</option>
  <option>감성적인</option>
  <option>친근한</option>
  <option>예약 유도형</option>
  <option>트렌디한</option>
</select>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full mt-6 bg-pink-500 hover:bg-pink-600 text-white font-bold py-5 rounded-2xl text-lg"
          >
            AI 홍보글 생성하기
          </button>

          <button
            onClick={handleGenerateImage}
            className="w-full mt-4 bg-white text-black font-bold py-5 rounded-2xl text-lg"
          >
            {loadingImage
              ? "이미지 생성 중..."
              : "AI 이미지 생성"}
          </button>

          {imageUrl && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-5">
                🎨 AI 생성 이미지
              </h2>

              <img
  src={imageUrl}
  alt="AI 생성"
  className="w-full max-w-[520px] mx-auto rounded-3xl shadow-2xl object-contain"
/>
            </div>
          )}

          {instagramText && (
            <div className="space-y-6 mt-10">
              <ChannelCard
                title="📸 인스타그램용"
                text={instagramText}
                copyTextLabel="인스타 글 복사"
                onCopy={() => copyText(instagramText)}
                onOpen={openInstagram}
                openText="인스타그램 열기"
                color="bg-gradient-to-r from-pink-500 to-orange-400"
              />

              <ChannelCard
                title="🟢 네이버 블로그용"
                text={blogText}
                copyTextLabel="블로그 글 복사"
                onCopy={() => copyText(blogText)}
                onOpen={openNaverBlog}
                openText="네이버 블로그 열기"
                color="bg-green-500"
              />

              <ChannelCard
                title="📍 네이버 플레이스용"
                text={placeText}
                copyTextLabel="플레이스 글 복사"
                onCopy={() => copyText(placeText)}
                onOpen={openNaverPlace}
                openText="네이버 플레이스 열기"
                color="bg-emerald-500"
              />
            </div>
          )}

          {posts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-black mb-6">
                📁 내 생성 기록
              </h2>

              <div className="space-y-6">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-3xl border p-6 shadow-sm text-black"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <p className="font-bold text-lg">
                        생성된 홍보글
                      </p>

                      <p className="text-sm text-gray-500">
                        {new Date(
                          post.created_at
                        ).toLocaleString()}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <p className="font-bold mb-2">
                          📸 인스타그램용
                        </p>

                        <div className="bg-gray-50 rounded-2xl p-4 whitespace-pre-wrap text-sm">
                          {post.instagram_text}
                        </div>
                      </div>

                      <div>
                        <p className="font-bold mb-2">
                          🟢 네이버 블로그용
                        </p>

                        <div className="bg-gray-50 rounded-2xl p-4 whitespace-pre-wrap text-sm">
                          {post.blog_text}
                        </div>
                      </div>

                      <div>
                        <p className="font-bold mb-2">
                          📍 네이버 플레이스용
                        </p>

                        <div className="bg-gray-50 rounded-2xl p-4 whitespace-pre-wrap text-sm">
                          {post.place_text}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function ChannelCard({
  title,
  text,
  copyTextLabel,
  onCopy,
  onOpen,
  openText,
  color,
}: any) {
  return (
    <div className="bg-white rounded-3xl border p-6 shadow-sm text-black">
      <p className="font-bold mb-3 text-lg">
        {title}
      </p>

      <div className="bg-gray-50 rounded-2xl p-5 whitespace-pre-wrap leading-8 text-sm">
        {text}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        <button
          onClick={onCopy}
          className="w-full bg-black hover:bg-zinc-800 text-white font-bold py-4 rounded-2xl"
        >
          📋 {copyTextLabel}
        </button>

        <button
          onClick={onOpen}
          className={`w-full ${color} text-white font-bold py-4 rounded-2xl`}
        >
          {openText}
        </button>
      </div>
    </div>
  );
}