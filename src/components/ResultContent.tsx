"use client";

import Link from "next/link";
import { calculateResult } from "@/lib/scorer";
import { useState } from "react";

const resultPrefixes = [
  "经过混乱数据分析，你的人格属于少见的<strong>「纯净非正常人类」</strong>",
  "剔除表面伪装，你的真实人格浮出水面",
  "在杂乱的精神样本中，捕捉到你的专属人格",
  "抛开世俗标准，你拥有独一份的混乱特质",
];

export function ResultContent({ answersStr }: { answersStr: string }) {
  const answers = answersStr.split("");
  const result = calculateResult(answers);
  const { personality } = result;
  const [prefix] = useState(
    () => resultPrefixes[Math.floor(Math.random() * resultPrefixes.length)]
  );

  const codeColors: Record<string, string> = {
    A: "bg-emerald-100 text-emerald-700",
    B: "bg-rose-100 text-rose-700",
    C: "bg-amber-100 text-amber-700",
    D: "bg-sky-100 text-sky-700",
    E: "bg-violet-100 text-violet-700",
    F: "bg-orange-100 text-orange-700",
  };

  const codeColor = codeColors[personality.categoryLetter] || "bg-zinc-100 text-zinc-700";

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-lg mx-auto w-full">
      <div className="w-full flex flex-col items-center gap-6 animate-slide-up">
        <div className="text-5xl">🧬</div>
        <span className={`text-xs font-mono px-3 py-1 rounded-full ${codeColor}`}>
          {personality.code} · {personality.category}
        </span>
        <h1 className="text-3xl font-bold text-zinc-800 text-center">{personality.name}</h1>
        <div className="flex flex-wrap justify-center gap-2">
          {personality.tags.map((tag) => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full bg-zinc-100 text-zinc-500">{tag}</span>
          ))}
        </div>
        <p className="text-sm text-zinc-400 text-center leading-relaxed" dangerouslySetInnerHTML={{ __html: prefix }} />
        <p className="text-zinc-600 text-center leading-relaxed">{personality.intro}</p>
        <div className="w-full bg-zinc-50 rounded-2xl p-6 flex flex-col gap-3">
          <div>
            <h3 className="text-sm font-semibold text-emerald-600 mb-1">优点</h3>
            <p className="text-sm text-zinc-500">{personality.advantages}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-rose-600 mb-1">缺点</h3>
            <p className="text-sm text-zinc-500">{personality.disadvantages}</p>
          </div>
        </div>
        <blockquote className="text-lg text-purple-600 font-medium text-center italic border-l-4 border-purple-200 pl-4">
          「{personality.verdict}」
        </blockquote>
        <div className="w-full bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 flex flex-col items-center gap-3">
          <p className="text-sm text-zinc-500 text-center">想看完整分析报告？解锁专属判词解读</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400 line-through">¥9.9</span>
            <span className="text-sm font-semibold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">¥0.1 · 1毛钱体验</span>
          </div>
          <Link href={`/unlock?code=${personality.code}`} className="px-8 py-3 bg-purple-600 text-white rounded-full text-sm font-medium hover:bg-purple-700 transition-all shadow-lg shadow-purple-200">
            立即解锁完整报告
          </Link>
          <p className="text-xs text-zinc-300">含完整判词 + 离谱分析 + 梗标签</p>
        </div>
        <p className="text-xs text-zinc-300 text-center mt-4">
          本测试纯属无厘头娱乐，非专业心理测评。<br />
          人生没有标准答案，你是什么人格，从来不由别人定义。
        </p>
        <div className="flex gap-4 mt-2">
          <Link href="/test" className="text-sm text-zinc-400 hover:text-purple-600">重新测试</Link>
          <Link href="/" className="text-sm text-zinc-400 hover:text-purple-600">返回首页</Link>
        </div>
      </div>
    </main>
  );
}
