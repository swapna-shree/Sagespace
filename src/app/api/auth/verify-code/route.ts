import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";

export async function POST(req: NextRequest) {
    const { email, code } = await req.json();
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (user.otp !== code || user.otpExpiry < new Date()) {
        return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 });
    }

    user.isVerified = true;
    user.otp = '';
    user.otpExpiry = new Date(0);
    await user.save();

    return NextResponse.json({ message: "Verification successful" });
} 