import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { resendCodeSchema } from "@/schemas/resendCodeSchema"; // if you made a Zod schema
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { email } = await req.json();

    // validate input
    const parsed = resendCodeSchema.safeParse({ email });
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (user.isVerified) {
      return NextResponse.json(
        { success: false, message: "User is already verified" },
        { status: 400 }
      );
    }

    // rate limit logic
    const lastSent = user.verifyCodeExpiry?.getTime() || 0;
    const now = Date.now();
    const MIN_RESEND_INTERVAL = 2 * 60 * 1000; // 2 minutes
    if (now - lastSent < MIN_RESEND_INTERVAL) {
      return NextResponse.json(
        {
          success: false,
          message: "Please wait a bit before requesting a new code.",
        },
        { status: 429 }
      );
    }

    // Generate new code and expiry
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verifyCode = verifyCode;
    user.verifyCodeExpiry = new Date(now + 60 * 60 * 1000); // 1 hour validity
    await user.save();

    // Send email
    const emailResponse = await sendVerificationEmail(
      user.email,
      user.username,
      verifyCode
    );

    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send verification email.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Verification email resent successfully",
    });
  } catch (error) {
    console.error("Error in resend route:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
