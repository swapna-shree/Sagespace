import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  // TODO: Integrate with Gemini or AI API
  const suggestions = [
    "Remember to take a deep breath.",
    "You are stronger than you think.",
    "It's okay to ask for help.",
  ];
  return NextResponse.json({ suggestions });
}
