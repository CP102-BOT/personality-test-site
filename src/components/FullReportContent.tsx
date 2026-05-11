"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPersonalityByCode, Personality } from "@/lib/personalities";

export function FullReportContent({ code, token }: { code: string; token: string }) {
  const [personality, setPersonality] = useState<Personality | null>(null);
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verify = async () => {
      if (!token || !code) {
        setChecking(false);
        return;
      }
      try {
        const res = await fetch("/api/verify-unlock", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        if (data.valid) {
          setVerified(true);
          const p = getPersonalityByCode(code);
          if (p) setPersonality(p);
        }
      } catch {
        // ignore
      }
      setChecking(false);
    };
    verify();
  }, [code, token]);

  if (checking) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <p className="text-zinc-400 animate-flicker">验证访问权限...</p>
      </main>
    );
  }

  if (!verified || !personality) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center p-6 gap-4">
        <p className="text-zinc-500">需要解锁码才能查看完整报告</p>
        <Link href={`/unlock?code=${code}`} className="px-6 py-2 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-700 transition-all">去解锁</Link>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col items-center p-6 max-w-lg mx-auto w-full">
      <div className="w-full flex flex-col items-center gap-6 animate-slide-up">
        <div className="text-5xl">📋</div>
        <h1 className="text-3xl font-bold text-zinc-800 text-center">{personality.name}</h1>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-100 text-purple-600">{personality.code} · {personality.category}</span>
        <div className="flex flex-wrap justify-center gap-2">
          {personality.tags.map((tag) => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full bg-purple-50 text-purple-500">{tag}</span>
          ))}
        </div>
        <div className="w-full bg-white rounded-2xl border border-zinc-100 p-6 flex flex-col gap-5 shadow-sm">
          <div>
            <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">人格介绍</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">{personality.intro}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 rounded-xl p-4">
              <h3 className="text-xs font-semibold text-emerald-500 mb-2">优点</h3>
              <p className="text-sm text-zinc-600">{personality.advantages}</p>
            </div>
            <div className="bg-rose-50 rounded-xl p-4">
              <h3 className="text-xs font-semibold text-rose-500 mb-2">缺点</h3>
              <p className="text-sm text-zinc-600">{personality.disadvantages}</p>
            </div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-purple-500 mb-2">专属判词</h3>
            <p className="text-base text-purple-700 font-medium italic leading-relaxed">「{personality.verdict}」</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">离谱分析</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">{personality.analysis}</p>
          </div>
        </div>
        <div className="w-full bg-zinc-50 rounded-2xl p-5 flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-zinc-600">分享文案</h3>
          <div className="flex flex-col gap-2">
            {[
              `在乱序人格研究所测出我的隐藏人格——${personality.name} 🤡`,
              `人类观测报告出炉｜我的精神状态公开透明：${personality.name}`,
              `解锁专属人格✨ 原来我是「${personality.name}」${personality.tags[0]}`,
            ].map((text, i) => (
              <div key={i} className="bg-white rounded-lg px-4 py-3 text-sm text-zinc-600 border border-zinc-100 cursor-pointer hover:border-purple-200 transition-all" onClick={() => navigator.clipboard.writeText(text)}>
                <div className="flex justify-between items-start gap-2">
                  <span>{text}</span>
                  <span className="text-xs text-zinc-300 shrink-0">复制</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full bg-amber-50 rounded-2xl p-4 border border-amber-100">
          <p className="text-xs text-amber-600 text-center leading-relaxed">本站所有结果仅供娱乐，没有科学依据，纯属瞎编。<br />不要对号入座，但是你大概率已经对上了。<br />禁止过度精神内耗，建议随时发疯。</p>
        </div>
        <p className="text-xs text-zinc-300 text-center">本测试纯属无厘头娱乐，非专业心理测评。<br />人生没有标准答案，你是什么人格，从来不由别人定义。</p>
        <div className="flex gap-4">
          <Link href="/test" className="text-sm text-zinc-400 hover:text-purple-600">重新测试</Link>
          <Link href="/" className="text-sm text-zinc-400 hover:text-purple-600">返回首页</Link>
        </div>
      </div>
    </main>
  );
}
