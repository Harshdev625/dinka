import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const session:any = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, whatToDo } = body;
  console.log(id, whatToDo)
  if (typeof id !== "number" || typeof whatToDo !== "boolean") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const userId = session.user.id;

  if (whatToDo) {
    await prisma.post.update({
      where: { id: id },
      data: {
        likes: {
          connect: { id: userId },
        },
      },
    });
  } else {
    await prisma.post.update({
      where: { id: id },
      data: {
        likes: {
          disconnect: { id: userId },
        },
      },
    });
  }

  return NextResponse.json({ liked: whatToDo });
}
