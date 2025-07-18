import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";

export async function POST(req: NextRequest) {
    const { username } = await req.json();
    await dbConnect();
    const user = await User.findOne({ username });
    if (user) {
        return NextResponse.json({ available: false, message: "Username is already taken" });
    }
    return NextResponse.json({ available: true, message: "Username is available" });
} 