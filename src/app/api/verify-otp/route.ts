import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";

export async function POST(req: NextRequest) {
    const { email, otp } = await req.json();
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    if (user.otp !== otp || user.otpExpiry < new Date()) {
        return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    return NextResponse.json({ message: "Verification successful" });
} 