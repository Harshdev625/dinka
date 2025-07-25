"use client";

import Footer from "@/components/footer";
import Posts from "@/components/Posts";
import React, { useEffect, useState } from "react";
import type { PostType } from "@/lib/types";

export default function Page() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("api/v1/get-posts");
        const data = await response.json();
        console.log(data)
        setPosts(data.posts || []);
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const addPost = (post: PostType,) => {
    setPosts((prev) => [post, ...prev]);
  };
 const handleLike = async (id: number, whatToDo: boolean) => {
  try {
    const res = await fetch(`/api/v1/togglelike`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id, whatToDo }), // ✅ match backend param names
    });

    if (!res.ok) throw new Error("Like failed");

    // ✅ Update post in posts array
    setPosts((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              isLiked: whatToDo,
              likes: e.likes + (whatToDo ? 1 : -1),
            }
          : e
      )
    );

    console.log("Liked post", id);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="min-h-[89vh] flex flex-col justify-between ">
      {isLoading ? (
        <div className="flex items-center justify-center flex-grow">
          <img
            src="/loading-54.gif"
            alt="Loading..."
            className="w-24  rounded-full"
          />
        </div>
      ) : (
        <div className="flex-grow overflow-y-auto">
          <Posts posts={posts} handleLike={handleLike} />
        </div>
      )}
      <Footer addpost={addPost} setIsLoading={setIsLoading} />
    </div>
  );
}
