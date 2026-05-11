import { NextRequest, NextResponse } from "next/server";
import { findCode, markCodeAsUsed } from "@/lib/store";

export async function POST(request: NextRequest) {
  try {
    const { code, token } = await request.json();

    if (token) {
      const entry = findCode(token);
      return NextResponse.json({ valid: !!(entry && entry.used) });
    }

    if (!code) {
      return NextResponse.json({ valid: false, message: "请输入解锁码" });
    }

    const entry = findCode(code);

    if (!entry) {
      return NextResponse.json({ valid: false, message: "解锁码不存在" });
    }

    if (entry.used) {
      return NextResponse.json({ valid: false, message: "此解锁码已被使用" });
    }

    markCodeAsUsed(code);

    return NextResponse.json({ valid: true, token: code });
  } catch {
    return NextResponse.json(
      { valid: false, message: "验证服务异常" },
      { status: 500 }
    );
  }
}
