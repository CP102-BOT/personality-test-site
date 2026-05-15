"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { UnlockContent } from "@/components/UnlockContent";

function UnlockPageInner() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "";
  return <UnlockContent personalityCode={code} />;
}

export default function UnlockPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center p-6"><p className="text-zinc-400 animate-flicker">加载中...</p></div>}>
      <UnlockPageInner />
    </Suspense>
  );
}
