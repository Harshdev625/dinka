import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";
import ShowPost from "@/components/Posts/ShowPost";

// ✅ Correct typing for route params
type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { id } = params; // ✅ DO NOT use `await` here

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return <div>Unauthorized</div>;

  const postId = parseInt(id);
  if (isNaN(postId)) return <div>Invalid Post ID</div>;

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!currentUser) return <div>User not found</div>;

  const post:any = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: { select: { name: true, image: true } },
      likes: {
        where: { id: currentUser.id },
        select: { id: true },
      },
      comments: {
        include: {
          user: {
            select: { id: true, name: true, image: true },
          },
        },
      },
      _count: {
        select: { likes: true },
      },
    },
  });

  if (!post) return <div>Post not found</div>;

  return (
    <ShowPost
      id={post.id}
      title={post.title}
      createdAt={post.createdAt}
      isMedia={post.isMedia ?? false}
      mediaUrl={post.mediaurl ?? null}
      visibility={post.visibility ?? "Public"}
      author={post.author}
      isLiked={post.likes.length > 0}
      likes={post._count.likes}
      comments={post.comments}
    />
  );
}
