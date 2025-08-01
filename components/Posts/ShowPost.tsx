"use client";
import React, { useState } from 'react';
import Post from './Post';
import Comment from "@/components/Comment"
import GoBack from '../GoBack';
type PostProps = {
  id: number;
  likes: number;
  title: string;
  isMedia?: boolean;
  mediaUrl?: string | null;
  visibility: "Public" | "Followers";
  isLiked: boolean;
  author: {
    name: string;
    pic?: string;
  };
  createdAt: string;
  comments:any;
};

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
  const [likeCount, setLikeCount] = useState(likes);
  const [isPostLiked, setIsPostLiked] = useState(isLiked);
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

      setLikeCount(prev => isPostLiked ? prev - 1 : prev + 1);
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
      id={id}
      likes={likeCount}
      isLiked={isPostLiked}
      title={title}
      author={author}
      createdAt={createdAt}
      isMedia={isMedia}
      mediaUrl={mediaUrl}
      visibility={visibility}
      handleLike={handleLike}
      />
      <Comment id={id} comments={comments}/>
      </div>
  );
}
