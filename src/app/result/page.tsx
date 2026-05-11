import { Suspense } from "react";
import { ResultContent } from "@/components/ResultContent";

interface PageProps {
  searchParams: Promise<{ answers?: string }>;
}

export default async function ResultPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const answersStr = sp.answers || "";

  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center p-6"><p className="text-zinc-400 animate-flicker">分析人格数据中...</p></div>}>
      <ResultContent answersStr={answersStr} />
    </Suspense>
  );
}
