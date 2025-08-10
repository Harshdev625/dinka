"use client";

import { DialogDemo } from "./Options";
import React from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Globe,
  Users,
} from "lucide-react";
import share from "@/components/Posts/sharecall";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Toaster } from "../ui/sonner";
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
    image?: string;
    pic?:string
  };
  createdAt: string;
  falserounded?: boolean;
  handleDelete?: (postid:number)=>void;
};

export default function Post({
  id,
  title,
  isMedia,
  likes,
  mediaUrl,
  visibility = "Public",
  author,
  createdAt,
  handleLike,
  handleDelete,
  isLiked,
  redir,
  hidedel=true,
  falserounded,
}: PostProps & {hidedel?:boolean, handleLike: any; redir?: boolean }) {
  const visibilityIcon = {
    Public: <Globe className="w-4 h-4 text-blue-500" />,
    Followers: <Users className="w-4 h-4 text-green-500" />,
  }[visibility];
  return (
    <div className="rounded-3xl mb-5 border-zinc-200 border p-4 w-full max-w-xl mx-auto space-y-2 transition-all duration-300 bg-background shadow-xs dark:bg-input/30 dark:border-input">
      <div className="flex items-start justify-between">
        <div className="w-max flex items-center">
          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
            <Toaster />
            <Image
              alt="author"
              src={
                author.image ||author.pic||
                "https://imgs.search.brave.com/iiL6FIsWn1W2fHExlUdzmEXVolOVkj4jfy06SrdfTf8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4x/LnZlY3RvcnN0b2Nr/LmNvbS9pL3RodW1i/LWxhcmdlLzk3Lzcw/L3B1cnBsZS11c2Vy/LWljb24taW4tdGhl/LWNpcmNsZS1hLXNv/bGlkLWdyYWRpZW50/LXZlY3Rvci0yMzUx/OTc3MC5qcGc"
              }
              fill
              style={{ objectFit: "cover",  }}
            />
          </div>
          <div className="flex-1 flex flex-col px-2 pb-2">
            <div className="font-semibold text-lg text-zinc-700">
              {author.name}
            </div>
            <div className="text-xs text-zinc-500">
              {formatDistanceToNow(new Date(createdAt), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-xs text-zinc-500 px-5 py-3">
          {visibilityIcon}
          <span>{visibility}</span>
          {hidedel && <DialogDemo btnClick={()=>{ handleDelete && handleDelete(id)}} />}
        </div>
      </div>

      {redir ? (
        <Link href={`/postid/${id}`}>
          <div className="text-[14.6px] px-2 text-zinc-800 whitespace-pre-wrap">
            {title}
          </div>
        </Link>
      ) : (
        <div className="text-[14.6px] px-2 text-zinc-800 whitespace-pre-wrap">
          {title}
        </div>
      )}

      {/* Media */}
      {isMedia && mediaUrl && (
        <Link href={mediaUrl}>
          <div className="w-full h-[400px] relative mt-5 overflow-hidden">
            <Image
              src={mediaUrl}
              alt="post media"
              fill
              quality={30}
              priority={false}
              className="object-contain w-full h-full rounded-md overflow-hidden"
            />
          </div>
        </Link>
      )}

      {/* Buttons */}
      <div className="flex items-center justify-evenly w-full gap-2 pt-3 px-1.5 text-zinc-600">
        <button
          onClick={() => handleLike(id, !isLiked)}
          type="button"
          aria-label="Love"
          className={`${
            isLiked
              ? "text-white bg-rose-500"
              : "text-rose-400 bg-zinc-100"
          } transition gap-1 py-2 px-6 rounded-full w-1/3 flex justify-center items-center`}
        >
          <Heart className="w-5 h-5" strokeWidth={2.4} />
          <span className="text-sm">{likes ?? ""}</span>
        </button>

        <Link
          href={`/postid/${id}`}
          className="text-blue-500 transition bg-zinc-100 py-2 px-6 rounded-full w-1/3 flex justify-center"
        >
          <MessageCircle className="w-5 h-5" strokeWidth={2.4} />
        </Link>

        <button
          onClick={() => share(id)}
          type="button"
          aria-label="Share"
          className="text-purple-500 transition bg-zinc-100 py-2 px-6 rounded-full w-1/3 flex justify-center"
        >
          <Share2 className="w-5 h-5" strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}
