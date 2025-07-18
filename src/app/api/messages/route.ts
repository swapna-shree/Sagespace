import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/options"
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import { NextRequest, NextResponse } from "next/server"
import { Message } from "@/model/User"

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?._id) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            )
        }

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '20')
        const skip = (page - 1) * limit

        await dbConnect()

        const user = await UserModel.findById(session.user._id)

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            )
        }

        const messages = user.messages || []
        const total = messages.length
        const paginatedMessages = messages.slice(skip, skip + limit)

        return NextResponse.json({
            success: true,
            messages: paginatedMessages,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        })

    } catch (error) {
        console.error("Error fetching messages:", error)
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        )
    }
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