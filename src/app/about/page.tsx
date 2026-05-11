import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-lg mx-auto w-full">
      <div className="flex flex-col items-center gap-6 text-center animate-slide-up">
        <div className="text-5xl">🤪</div>
        <h1 className="text-2xl font-bold text-zinc-800">发疯说明</h1>

        <div className="w-full bg-white rounded-2xl border border-zinc-100 p-6 flex flex-col gap-5 text-left shadow-sm">
          <div>
            <h3 className="text-sm font-semibold text-zinc-700 mb-2">
              这是什么？
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              乱序人格研究所是一个纯属娱乐的人格测试网站。我们不科学、不专业、不正经，主打一个无厘头发疯。24种人格全部原创，与MBTI等专业性格测试没有任何关系。
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-700 mb-2">
              有什么人格？
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              六大分类：佛系摆烂系、发疯矛盾系、戏精社交系、清醒摆烂系、中二脑洞系、沙雕发疯系。每类4种人格，总共24种。测试结果随机带有一定趣味性，请不要对号入座。
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-700 mb-2">
              要钱吗？
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              8题测试免费，基础结果免费。完整报告（判词+离谱分析+分享文案）需付费 ¥3.99 解锁。
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-700 mb-2">
              郑重声明
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              本网站所有内容均为原创，仅供娱乐。测试结果不构成任何人格评价或心理建议。如果你当真了，说明你确实需要稍微放松一下。
            </p>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap justify-center text-xs text-zinc-300">
          {[
            "不要认真",
            "本站全部胡说八道",
            "每个人都是残缺又可爱的怪人",
            "允许平庸，允许发疯，允许做自己",
            "人类不必一直保持正常",
            "精神偶尔掉线，是成年人的特权",
          ].map((text) => (
            <span key={text} className="px-3 py-1 bg-zinc-50 rounded-full">
              {text}
            </span>
          ))}
        </div>

        <Link
          href="/"
          className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </main>
  );
}
