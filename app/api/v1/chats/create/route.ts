import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest){
    const body = await req.json();
    const session: any = await getServerSession(authOptions);
    if (!session || !session.user?.email || !session.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const message = await prisma.chats.create({
            data: {
            fromId:session.user.id,
            toId:body.toId,
            type:"Message",
            message:body.message,
        },
    });
    console.log(message)
    return NextResponse.json({message})

 
}