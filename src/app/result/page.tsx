"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ResultContent } from "@/components/ResultContent";

function ResultPageInner() {
  const searchParams = useSearchParams();
  const answersStr = searchParams.get("answers") || "";
  return <ResultContent answersStr={answersStr} />;
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center p-6"><p className="text-zinc-400 animate-flicker">分析人格数据中...</p></div>}>
      <ResultPageInner />
    </Suspense>
  );
}
