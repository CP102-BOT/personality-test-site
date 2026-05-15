"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FullReportContent } from "@/components/FullReportContent";

function FullReportPageInner() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "";
  const token = searchParams.get("token") || "";
  return <FullReportContent code={code} token={token} />;
}

export default function FullReportPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center p-6"><p className="text-zinc-400 animate-flicker">加载中...</p></div>}>
      <FullReportPageInner />
    </Suspense>
  );
}
