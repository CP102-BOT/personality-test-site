import { Suspense } from "react";
import { UnlockContent } from "@/components/UnlockContent";

interface PageProps {
  searchParams: Promise<{ code?: string }>;
}

export default async function UnlockPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const code = sp.code || "";

  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center p-6"><p className="text-zinc-400 animate-flicker">加载中...</p></div>}>
      <UnlockContent personalityCode={code} />
    </Suspense>
  );
}
