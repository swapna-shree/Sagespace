import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?._id) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { isAcceptingMessages } = await request.json();

        if (typeof isAcceptingMessages !== 'boolean') {
            return NextResponse.json(
                { success: false, message: "Invalid request body" },
                { status: 400 }
            );
        }

        await dbConnect();

        const user = await UserModel.findById(session.user._id);

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        user.isAcceptingMessage = isAcceptingMessages;
        await user.save();

        return NextResponse.json({
            success: true,
            message: `Messages ${isAcceptingMessages ? 'enabled' : 'disabled'} successfully`,
            isAcceptingMessages
        });

    } catch (error) {
        console.error("Error toggling messages:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
} 