import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const currentUserEmail = session.user.email;

  // Get current user ID
  const currentUser = await prisma.user.findUnique({
    where: { email: currentUserEmail },
    select: { id: true },
  });

  if (!currentUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      likes: {
        where: {
          id: currentUser.id, 
        },
        select: {
          id: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  // Add `isLiked` field manually
  const postsWithLikeStatus = posts.map((post) => ({
    ...post,
    isLiked: post.likes.length > 0, // 👈 true if user liked it
    likes: post._count.likes,       // total count
  }));

  return NextResponse.json({ posts: postsWithLikeStatus });
};
