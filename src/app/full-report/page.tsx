import { Suspense } from "react";
import { FullReportContent } from "@/components/FullReportContent";

interface PageProps {
  searchParams: Promise<{ code?: string; token?: string }>;
}

export default async function FullReportPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const code = sp.code || "";
  const token = sp.token || "";

  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center p-6"><p className="text-zinc-400 animate-flicker">加载中...</p></div>}>
      <FullReportContent code={code} token={token} />
    </Suspense>
  );
}
