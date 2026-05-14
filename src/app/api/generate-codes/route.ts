import { NextRequest, NextResponse } from "next/server";
import { generateCodes, getStats } from "@/lib/store";

export async function POST(request: NextRequest) {
  try {
    const { count = 10 } = await request.json();
    const codes = await generateCodes(Math.min(count, 100));
    return NextResponse.json({ generated: codes.length, codes });
  } catch (e) {
    return NextResponse.json({ error: "生成失败" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const stats = await getStats();
    return NextResponse.json(stats);
  } catch (e) {
    return NextResponse.json({ error: "查询失败" }, { status: 500 });
  }
}
