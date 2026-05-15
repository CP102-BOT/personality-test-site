"use client";

import Link from "next/link";
import { useState } from "react";

const slogans = [
  "观测人类乱序，拆解奇怪人格",
  "没有正常人类，只有不同发疯方式",
  "非正式人格鉴定，仅供精神消遣",
  "人人皆有病，程度不一样",
  "剖析混乱灵魂，收纳离谱人类",
];

const loadingTexts = [
  "正在扫描你的精神漏洞...",
  "抓取混乱思维碎片中",
  "检测非正常情绪波动",
  "解析人类伪装程度",
  "打捞散落的精神碎片",
  "破除正常人伪装外壳",
  "计算发疯概率中",
  "同步宇宙离谱数据库",
];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const handleStart = () => {
    setLoading(true);
    const texts = [...loadingTexts];
    let idx = 0;
    setLoadingText(texts[0]);
    const timer = setInterval(() => {
      idx++;
      if (idx < texts.length) {
        setLoadingText(texts[Math.min(idx, texts.length - 1)]);
      } else {
        clearInterval(timer);
        window.location.href = "/test";
      }
    }, 800);
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 via-transparent to-amber-50/50 pointer-events-none" />

      {loading ? (
        <div className="flex flex-col items-center gap-6 relative z-10">
          <div className="text-6xl animate-float">🧬</div>
          <div className="flex flex-col items-center gap-3">
            <p className="text-lg text-zinc-500 animate-flicker">{loadingText}</p>
            <div className="flex gap-1.5 mt-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-purple-400"
                  style={{
                    animation: `flicker 0.6s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8 max-w-lg text-center relative z-10">
          <div className="flex flex-col items-center gap-4 animate-slide-up">
            <div className="text-7xl animate-float">🧬</div>
            <h1 className="text-4xl font-bold tracking-wider text-purple-900">
              乱序人格研究所
            </h1>
            <p className="text-sm text-zinc-400 tracking-widest uppercase">DISORDERLY PERSONALITY LAB</p>
          </div>

          <p className="text-lg text-zinc-600 leading-relaxed animate-slide-up-delay-1">
            {slogans[Math.floor(Math.random() * slogans.length)]}
          </p>

          <div className="flex flex-col items-center gap-4 mt-4 animate-slide-up-delay-2">
            <button
              onClick={handleStart}
              className="px-10 py-4 bg-purple-600 text-white text-lg font-medium rounded-full hover:bg-purple-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-purple-200"
            >
              撕开伪装
            </button>
            <div className="flex gap-6 text-sm text-zinc-400">
              <Link
                href="/about"
                className="hover:text-purple-600 transition-colors"
              >
                发疯说明
              </Link>
              <Link
                href="/admin"
                className="hover:text-purple-600 transition-colors"
              >
                后台
              </Link>
            </div>
          </div>

          <p className="text-xs text-zinc-300 mt-8 animate-slide-up-delay-3">
            本网站不治愈、不纠正、不正常
          </p>
        </div>
      )}

      <footer className="absolute bottom-4 text-center text-xs text-zinc-300">
        不要认真，本站全部胡说八道
      </footer>
    </main>
  );
}
