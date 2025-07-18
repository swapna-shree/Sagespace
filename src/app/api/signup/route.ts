import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return NextResponse.json(
        { success: false, message: "Username already taken" },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const now = new Date();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return NextResponse.json(
          { success: false, message: "User already exists with the entered email" },
          { status: 400 }
        );
      }

      // RATE LIMIT: Don't allow resend within 2 mins
      const lastSent = existingUserByEmail.lastVerificationSentAt;
      if (lastSent && now.getTime() - lastSent.getTime() < 2 * 60 * 1000) {
        return NextResponse.json(
          { success: false, message: "Please wait before requesting another verification email." },
          { status: 429 }
        );
      }

      //  AVOID OVERWRITE: Only hash password if empty
      if (!existingUserByEmail.password) {
        existingUserByEmail.password = await bcrypt.hash(password, 15);
      }

      existingUserByEmail.verifyCode = verifyCode;
      existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 60 * 60 * 1000); // +1 hour
      existingUserByEmail.lastVerificationSentAt = new Date();

      await existingUserByEmail.save();
    } else {
      const hashedPassword = await bcrypt.hash(password, 15);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        displayName: "",
        avatarUrl: "",
        messages: [],
        lastVerificationSentAt: new Date(),
      });

      await newUser.save();
    }

    const emailResponse = await sendVerificationEmail(email, username, verifyCode);
    if (!emailResponse.success) {
      return NextResponse.json(
        { success: false, message: emailResponse.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user", error);
    return NextResponse.json(
      { success: false, message: "Error registering user" },
      { status: 500 }
    );
  }
}
