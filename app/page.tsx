"use client";
 import { Skeleton } from "@/components/ui/skeleton"
import Posts from "@/components/Posts";
import { usePostContext } from "./Providers/PostsProvider";
export default function Page() {
  const postContext = usePostContext()
  return (
    <div className="min-h-[89vh] flex flex-col justify-between ">
      {postContext.isLoading ? (
        <div className="flex items-center justify-center flex-grow">
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
        </div>
      ) : (
        <div className="flex-grow overflow-y-auto">
          <Posts  posts={postContext.posts} handleLike={postContext.handleLike} fetchPost={postContext.fetchPost}/>
        </div>
      )}
    </div>
  );
}
