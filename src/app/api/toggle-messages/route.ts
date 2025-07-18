import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";

export async function PUT(req: NextRequest) {
    const { email } = await req.json();
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    user.isAcceptingMessage = !user.isAcceptingMessage;
    await user.save();
    return NextResponse.json({ isAcceptingMessage: user.isAcceptingMessage });
}

export async function POST(req: NextRequest) {
    return PUT(req);
} 