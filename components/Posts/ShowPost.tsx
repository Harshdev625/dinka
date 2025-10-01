"use client";
import React, { useState } from 'react';
import Post from './Post';
import Comment from "@/components/Comment"
import GoBack from '../GoBack';
import { toast } from 'sonner'
import { useSession } from "next-auth/react"

type PostProps = any

export default function ShowPost({
  id,
  title,
  isMedia,
  likes,
  mediaUrl,
  visibility = "Public",
  author,
  createdAt,
  isLiked,
  comments
}: PostProps) {
  const  data1:any  = useSession()
  const userid = data1.data?.user?.id;
  const [likeCount, setLikeCount] = useState(likes);
  const [isPostLiked, setIsPostLiked] = useState(isLiked);
   const handleDelete = async (postid:number) => {
    const res = await fetch("/api/v1/deletepost", {
      method:"POST",
      body:JSON.stringify({postid:postid}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const body = await res.json();
    if(body.error){
      toast.error(body.error)
      return;
    }
    if(body.message){
      toast.success(body.message)
      window.location.href = "/"
    }
  }

  const handleLike = async (postId: number) => {
    try {
      const res = await fetch(`/api/v1/togglelike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: postId, whatToDo: !isPostLiked }),
      });

      if (!res.ok) throw new Error("Like failed");
      //@ts-ignore
      setLikeCount(prev => isPostLiked ? prev - 1 : prev + 1);
      //@ts-ignore
      setIsPostLiked(prev => !prev);

      console.log("Toggled like for post", postId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='px-2'>
    <GoBack/>
    <Post
      falserounded={true}
      hidedel={userid==author.id}
      id={id}
      likes={likeCount}
      isLiked={isPostLiked}
      title={title}
      author={author}
      authorId={author.id}
      createdAt={createdAt}
      isMedia={isMedia}
      mediaUrl={mediaUrl}
      visibility={visibility}
      handleLike={handleLike}
      handleDelete={handleDelete}
      />
      <Comment id={id} comments={comments}/>
      </div>
  );
}
