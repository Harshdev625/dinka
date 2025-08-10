"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import type { PostType } from "@/lib/types";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
type PostContextType = {
  posts: PostType[];
  addPost: (post: PostType) => void;
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
  handleLike: (id: number, whatToDo: boolean) => void;
};
const PostContext = createContext<PostContextType | null>(null);

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error("usePostContext must be used within PostProvider");
  return context;
};

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/v1/get-posts");
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const addPost = (post: PostType) => {
    setPosts((prev) => [post, ...prev]);
  };
  // const handlleDelete = async (postid:number) => {
  //   const res = await fetch("/api/v1/deletepost", {
  //     method:"POST",
  //     body:JSON.stringify({postId:postid}),
  //     headers:{
  //       "Content-Type":"application/json"
  //     }
  //   })
  //   const body = await res.json();
  //   if(body.error){
  //     toast.error(body.error)
  //     return;
  //   }
  //   if(body.message){
  //     toast.success(body.message)
  //     setPosts((posts)=>posts.filter(e=>e.id!==postid))
      
  //   }
  // }
  const handleLike = async (id: number, whatToDo: boolean) => {
    try {
      const res = await fetch(`/api/v1/togglelike`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, whatToDo }),
      });
      if (!res.ok) throw new Error("Like failed");

      setPosts((prev) =>
        prev.map((e) =>
          e.id === id
            ? {
                ...e,
                isLiked: whatToDo,
                likes: Math.max(0, e.likes + (whatToDo ? 1 : -1)),
              }
            : e
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PostContext.Provider value={{ posts, addPost, isLoading, setIsLoading, handleLike}}>
      <Toaster/>
      {children}
      <Footer addpost={addPost} setIsLoading={setIsLoading}  />
    </PostContext.Provider>
  );
};
