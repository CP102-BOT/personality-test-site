"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { getPersonalityByCode } from "@/lib/personalities";

export function UnlockContent({ personalityCode }: { personalityCode: string }) {
  const router = useRouter();
  const personality = getPersonalityByCode(personalityCode);

  const [unlockCode, setUnlockCode] = useState("");
  const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleVerify = async () => {
    if (!unlockCode.trim()) return;
    setStatus("verifying");
    try {
      const res = await fetch("/api/verify-unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: unlockCode.trim() }),
      });
      const data = await res.json();
      if (data.valid) {
        setStatus("success");
        setTimeout(() => {
          router.push(`/full-report?code=${personalityCode}&token=${data.token}`);
        }, 1000);
      } else {
        setStatus("error");
        setErrorMsg(data.message || "解锁码无效");
      }
    } catch {
      setStatus("error");
      setErrorMsg("验证失败，请稍后重试");
    }
  };

  if (!personality) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <p className="text-zinc-500">人格数据未找到</p>
        <Link href="/" className="text-purple-600 mt-4 text-sm">返回首页</Link>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-lg mx-auto w-full">
      <div className="w-full flex flex-col items-center gap-6 animate-slide-up">
        <div className="text-4xl">🔓</div>
        <h1 className="text-2xl font-bold text-zinc-800 text-center">解锁「{personality.name}」完整报告</h1>
        <div className="w-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100 flex flex-col items-center gap-4">
          <p className="text-xs text-zinc-400 text-center line-through">原价 ¥9.9</p>
          <p className="text-2xl text-rose-600 font-bold text-center">¥0.1</p>
          <p className="text-xs text-rose-400 text-center -mt-2">体验价 · 1毛钱解锁完整报告</p>
          <p className="text-xs text-zinc-400 text-center mt-1">微信 / 支付宝扫码支付</p>
          <div className="w-48 h-48 bg-white rounded-xl border border-amber-200 flex items-center justify-center overflow-hidden shadow-sm">
            <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col items-center justify-center gap-2 p-4">
              <span className="text-4xl">💳</span>
              <span className="text-xs text-zinc-400 text-center leading-relaxed">请上传你的<br />收款码图片</span>
              <span className="text-[10px] text-zinc-300 font-mono bg-white/60 px-2 py-0.5 rounded">QR_PLACEHOLDER</span>
            </div>
          </div>
          <p className="text-xs text-zinc-400 text-center">上线前请将上方占位替换为真实收款码图片<br />付款后请联系获取解锁码</p>
        </div>
        <div className="w-full flex flex-col gap-3">
          <label className="text-sm text-zinc-500">输入解锁码</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={unlockCode}
              onChange={(e) => {
                setUnlockCode(e.target.value.toUpperCase());
                if (status === "error") setStatus("idle");
              }}
              placeholder="如：XYZ1-ABCD"
              className="flex-1 px-4 py-3 rounded-xl border-2 border-zinc-200 focus:border-purple-400 focus:outline-none text-sm font-mono tracking-wider"
              disabled={status === "verifying" || status === "success"}
              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
            />
            <button
              onClick={handleVerify}
              disabled={!unlockCode.trim() || status === "verifying" || status === "success"}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {status === "verifying" ? "验证中..." : status === "success" ? "✓" : "解锁"}
            </button>
          </div>
          {status === "error" && <p className="text-sm text-rose-500">{errorMsg}</p>}
          {status === "success" && <p className="text-sm text-emerald-500">解锁成功！正在跳转...</p>}
        </div>
        <div className="flex gap-4 mt-2">
          <Link href="/" className="text-sm text-zinc-400 hover:text-purple-600">返回首页</Link>
        </div>
        <p className="text-xs text-zinc-300 text-center">每个人都是残缺又可爱的怪人</p>
      </div>
    </main>
  );
}
