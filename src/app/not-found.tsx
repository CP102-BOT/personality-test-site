import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center gap-6 text-center animate-slide-up">
        <div className="text-7xl">🫥</div>
        <h1 className="text-3xl font-bold text-zinc-800">页面走失了</h1>
        <p className="text-zinc-400">就像你偶尔走失的精神一样</p>
        <Link
          href="/"
          className="px-6 py-2 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-700 transition-all mt-4"
        >
          返回首页继续伪装正常人
        </Link>
      </div>
    </main>
  );
}
