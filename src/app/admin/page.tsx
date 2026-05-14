"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "admin_authenticated";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [count, setCount] = useState(10);
  const [generated, setGenerated] = useState<string[]>([]);
  const [stats, setStats] = useState<{ total: number; used: number; unused: number } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "true") {
      setAuthed(true);
    }
  }, []);

  const handleLogin = async () => {
    setPassError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (data.ok) {
      localStorage.setItem(STORAGE_KEY, "true");
      setAuthed(true);
    } else {
      setPassError("密码错误");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  const fetchStats = async () => {
    const res = await fetch("/api/generate-codes");
    const data = await res.json();
    setStats({ total: data.total, used: data.used, unused: data.unused });
  };

  const doGenerate = async () => {
    setLoading(true);
    const res = await fetch("/api/generate-codes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count }),
    });
    const data = await res.json();
    setGenerated(data.codes || []);
    setLoading(false);
    fetchStats();
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
    setPassword("");
    setPassError("");
  };

  if (!authed) {
    return (
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm flex flex-col gap-4">
          <div className="text-center">
            <div className="text-3xl mb-2">🔒</div>
            <h2 className="text-lg font-bold text-zinc-800">管理员登录</h2>
            <p className="text-xs text-zinc-400 mt-1">请输入管理密码</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setPassError(""); }}
            onKeyDown={handleKeyDown}
            placeholder="输入密码"
            className="px-4 py-3 rounded-xl border-2 border-zinc-200 focus:border-purple-400 focus:outline-none text-sm w-full"
            autoFocus
          />
          {passError && <p className="text-xs text-rose-500 text-center">{passError}</p>}
          <button
            onClick={handleLogin}
            className="w-full py-2.5 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition-all"
          >
            登录
          </button>
          <Link href="/" className="text-xs text-zinc-400 hover:text-purple-600 text-center">
            返回首页
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col items-center p-6 max-w-lg mx-auto w-full">
      <div className="w-full flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-zinc-800">🔧 解锁码管理</h1>
          <div className="flex gap-3">
            <button onClick={handleLogout} className="text-sm text-zinc-400 hover:text-rose-600">
              退出登录
            </button>
            <Link href="/" className="text-sm text-zinc-400 hover:text-purple-600">
              返回首页
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-100 p-5 flex flex-col gap-4 shadow-sm">
          <div className="flex gap-3 items-end">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-xs text-zinc-400">生成数量</label>
              <input
                type="number"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                min={1}
                max={100}
                className="px-4 py-2 rounded-xl border-2 border-zinc-200 focus:border-purple-400 focus:outline-none text-sm"
              />
            </div>
            <button
              onClick={doGenerate}
              disabled={loading}
              className="px-6 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 disabled:opacity-50 transition-all"
            >
              {loading ? "生成中..." : "生成解锁码"}
            </button>
          </div>

          <button
            onClick={fetchStats}
            className="text-sm text-purple-500 hover:text-purple-700 transition-colors self-start"
          >
            刷新统计数据
          </button>

          {stats && (
            <div className="flex gap-4 text-sm">
              <div className="flex flex-col items-center bg-zinc-50 rounded-xl px-4 py-2">
                <span className="text-lg font-bold text-zinc-700">{stats.total}</span>
                <span className="text-xs text-zinc-400">总计</span>
              </div>
              <div className="flex flex-col items-center bg-emerald-50 rounded-xl px-4 py-2">
                <span className="text-lg font-bold text-emerald-600">{stats.unused}</span>
                <span className="text-xs text-emerald-400">可用</span>
              </div>
              <div className="flex flex-col items-center bg-rose-50 rounded-xl px-4 py-2">
                <span className="text-lg font-bold text-rose-600">{stats.used}</span>
                <span className="text-xs text-rose-400">已用</span>
              </div>
            </div>
          )}
        </div>

        {generated.length > 0 && (
          <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-5 flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-emerald-700">
              新生成 {generated.length} 个解锁码
            </h3>
            <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
              {generated.map((code) => (
                <p
                  key={code}
                  className="text-sm font-mono text-emerald-600 bg-white rounded-lg px-3 py-1.5"
                >
                  {code}
                </p>
              ))}
            </div>
            <button
              onClick={() => { navigator.clipboard.writeText(generated.join("\n")); }}
              className="text-xs text-emerald-500 hover:text-emerald-700 self-start"
            >
              复制全部
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
