"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { questions } from "@/lib/questions";

export default function TestPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const question = questions[current];

  const handleSelect = (value: string) => {
    setSelected(value);
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        const params = new URLSearchParams({ answers: newAnswers.join("") });
        router.push(`/result?${params.toString()}`);
      }
    }, 300);
  };

  const progress = ((current) / questions.length) * 100;

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-lg mx-auto w-full">
      <div className="w-full flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm text-zinc-400 hover:text-purple-600">
            ← 首页
          </Link>
          <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-zinc-400">
            {current + 1}/{questions.length}
          </span>
        </div>

        <div className="flex flex-col gap-6 animate-slide-up">
          <div className="text-sm text-purple-400 font-medium tracking-wider">
            Q{question.id}
          </div>
          <h2 className="text-2xl font-semibold text-zinc-800 leading-relaxed">
            {question.text}
          </h2>

          <div className="flex flex-col gap-3 mt-2">
            {question.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => selected === null && handleSelect(opt.value)}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all ${
                  selected === opt.value
                    ? "border-purple-400 bg-purple-50 text-purple-800"
                    : "border-zinc-100 bg-white hover:border-purple-200 hover:bg-purple-50/30 text-zinc-600"
                } ${selected !== null && selected !== opt.value ? "opacity-40" : ""}`}
              >
                <span className="text-xs font-mono text-zinc-300 mr-3">
                  {opt.value}
                </span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
