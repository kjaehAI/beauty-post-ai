"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("회원가입 성공!");
    }
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("로그인 성공!");
      window.location.href = "/generator";
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-pink-50 px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="text-center text-4xl font-bold">
          자이보라 로그인 ✨
        </h1>

        <p className="mt-4 text-center text-gray-600">
          로그인 후 AI 마케팅 기능을 이용해보세요.
        </p>

        <div className="mt-10 space-y-5">
          <input
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 p-4 outline-none focus:border-pink-400"
          />

          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 p-4 outline-none focus:border-pink-400"
          />

          <button
            onClick={handleLogin}
            className="w-full rounded-2xl bg-pink-500 py-4 text-lg font-bold text-white shadow-lg"
          >
            로그인
          </button>

          <button
            onClick={handleSignup}
            className="w-full rounded-2xl bg-black py-4 text-lg font-bold text-white shadow-lg"
          >
            회원가입
          </button>
        </div>
      </div>
    </main>
  );
}