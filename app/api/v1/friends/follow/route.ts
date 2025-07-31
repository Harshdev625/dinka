import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const data = await req.json();
  const session: any = await getServerSession(authOptions);
  if (!session || !session.user?.email || !session.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = session.user.id
    try{
        const relation = await prisma.relations.create({
            data:{
                srcid:id,
                destid: data.friendId,
                type: "Follower"
            }
        })
        console.log(relation)
        return NextResponse.json({
            success:"true",
        })
    }catch(e){
        return NextResponse.json({
            error:"Error Occured",
        })
    }
}