import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/apiResponse";
import React from "react";

export default async function sendVerificationEmail(email: string, username: string, otp: string) {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your SageSpace Verification Code",
      react: React.createElement(VerificationEmail, {
        username,
        code: otp,
        email,
      }),
    });

    return {
      success: true,
      message: "Sent verification email successfully",
    };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
