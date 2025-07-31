import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session: any = await getServerSession(authOptions);
  if (!session || !session.user?.email || !session.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = session.user.id;

  const people = await prisma.user.findMany({
    where: {
      id: { not: id },
      AND: [
        {
          followers: {
            some: {
              destid: id,
              type: "Follower",
            },
          },
        },
        {
          following: {
            none: {
              srcid: id,
              type: "Follower",
            },
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      image: true,
      bio: true,
      pic: true,
    },
  });

  return NextResponse.json({ people });
}
