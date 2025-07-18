import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import { NextRequest, NextResponse } from "next/server"
import { Message } from "@/model/User"

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
    // Assuming user.messages is an array of message objects
    return NextResponse.json({ success: true, messages: user.messages || [] });
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect()

        const { username, content } = await request.json()

        if (!username || !content) {
            return NextResponse.json(
                { success: false, message: "Username and content are required" },
                { status: 400 }
            )
        }

        const user = await UserModel.findOne({ username })

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            )
        }

        // Check if user is accepting messages
        if (!user.isAcceptingMessage) {
            return NextResponse.json(
                { success: false, message: "User is not accepting messages" },
                { status: 403 }
            )
        }

        const newMessage: Message = {
            content,
            createdAt: new Date(),
            isFromUser: true,
            isAI: false
        }

        user.messages.push(newMessage)
        await user.save()

        return NextResponse.json({
            success: true,
            message: "Message sent successfully"
        })

    } catch (error) {
        console.error("Error sending message:", error)
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        )
    }
} 