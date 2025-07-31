import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
export const POST = async (req: NextRequest) => {
  const session:any = await getServerSession(authOptions);

  if (!session || !session.user?.email || !session.user?.id ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const id =  session.user.id;
  const posts = await prisma.post.findMany({
    where:{
        authorId:id
    },
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
          id: session.user.id, 
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

  const postsWithLikeStatus = posts.map((post) => ({
    ...post,
    isLiked: post.likes.length > 0, 
    likes: post._count.likes
  }));

  return NextResponse.json({ posts: postsWithLikeStatus });
};
