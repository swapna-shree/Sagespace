import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?._id) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            )
        }

        const { currentPassword, newPassword } = await request.json()

        // Validate input
        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { success: false, message: "Current password and new password are required" },
                { status: 400 }
            )
        }

        if (typeof currentPassword !== 'string' || typeof newPassword !== 'string') {
            return NextResponse.json(
                { success: false, message: "Passwords must be strings" },
                { status: 400 }
            )
        }

        if (newPassword.length < 6) {
            return NextResponse.json(
                { success: false, message: "New password must be at least 6 characters long" },
                { status: 400 }
            )
        }

        await dbConnect()

        const user = await UserModel.findById(session.user._id)

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            )
        }

        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)

        if (!isCurrentPasswordValid) {
            return NextResponse.json(
                { success: false, message: "Current password is incorrect" },
                { status: 400 }
            )
        }

        // Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 15)

        // Update password
        user.password = hashedNewPassword
        await user.save()

        return NextResponse.json({
            success: true,
            message: "Password changed successfully"
        })

    } catch (error) {
        console.error("Error changing password:", error)
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        )
    }
} 