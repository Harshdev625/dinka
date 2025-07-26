import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
export async function POST(req:NextRequest, res:NextResponse){
    const body = await req.json();
    const session:any = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const currentUserEmail = session.user.email;
    
  if (!session || !session.user || !session.user.id ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
    // Get current user ID
    const currentUser = await prisma.user.findUnique({
        where: { email: currentUserEmail },
        select: { id: true },
    });

    if (!currentUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const {comment, postid} = body

    console.log(comment, postid, session.user)
    const commmentobj = await prisma.comment.create({
        data:{
            userId: session.user.id,
            postId:postid,
            content: comment
        },
          include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })
    return NextResponse.json({data:commmentobj})
}