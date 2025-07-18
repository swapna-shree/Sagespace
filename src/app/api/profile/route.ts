import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
        return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({
        success: true, data: {
            displayName: user.displayName,
            avatarUrl: user.avatarUrl,
            username: user.username,
            email: user.email,
            isVerified: user.isVerified,
        }
    });
}

export async function PUT(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?._id) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            )
        }

        const { displayName, avatarUrl } = await request.json()

        // Validate input
        if (displayName && typeof displayName !== 'string') {
            return NextResponse.json(
                { success: false, message: "Display name must be a string" },
                { status: 400 }
            )
        }

        if (avatarUrl && typeof avatarUrl !== 'string') {
            return NextResponse.json(
                { success: false, message: "Avatar URL must be a string" },
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

        // Update fields if provided
        if (displayName !== undefined) {
            user.displayName = displayName
        }

        if (avatarUrl !== undefined) {
            user.avatarUrl = avatarUrl
        }

        await user.save()

        return NextResponse.json({
            success: true,
            message: "Profile updated successfully",
            data: {
                displayName: user.displayName,
                avatarUrl: user.avatarUrl
            }
        })

    } catch (error) {
        console.error("Error updating profile:", error)
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        )
    }
} 