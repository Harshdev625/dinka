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

import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

type PostProps = {
    id: number;
    likes: number; 
    title: string;
    isMedia?: boolean;
    mediaUrl?: string|null;
    visibility: "Public" | "Followers";
    isLiked:Boolean
    author: {
        name: string;
        image?: string;
    };
    createdAt: string;
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
    isLiked
}: PostProps&{handleLike:any}) {
    const visibilityIcon = {
        Public: <Globe className="w-4 h-4 text-blue-500" />,
        Followers: <Users className="w-4 h-4 text-green-500" />,
    }[visibility];

    return (
        <div className="rounded-4xl mb-5 border-zinc-200  border p-4 w-full max-w-xl mx-auto space-y-2 transition-all duration-300   bg-background shadow-xs  dark:bg-input/30 dark:border-input ">
            <div className="flex items-start justify-between">
                <div className="w-max flex items-center">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                        <Image
                            alt="author"
                            src={
                                author.image ||
                                "https://imgs.search.brave.com/XGLf_1PQgMe663J8lzlj5Q43AOJUWIEyTIP1nI4rTT0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4z/ZC5pY29uc2NvdXQu/Y29tLzNkL3ByZW1p/dW0vdGh1bWIvdXNl/ci0zZC1pbGx1c3Ry/YXRpb24tZG93bmxv/YWQtaW4tcG5nLWJs/ZW5kLWZieC1nbHRm/LWZpbGUtZm9ybWF0/cy0tYXZhdGFyLXBy/b2ZpbGUtYWNjb3Vu/dC1pbnRlcmZpY29u/LXNldC0yLWxpZ2h0/LXBhY2staW50ZXJm/YWNlLWlsbHVzdHJh/dGlvbnMtMzEwNTI2/NS5wbmc"
                            }
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className="flex-1 flex flex-col px-2 pb-2">
                        <div className="font-semibold text-lg text-zinc-700">{author.name}</div>
                        <div className="text-xs text-zinc-500">
                            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                        </div>
                    </div>
                </div>

                {/* Visibility */}
                <div className="flex items-center space-x-1 text-xs text-zinc-500 px-5 py-3">
                    {visibilityIcon}
                    <span>{visibility}</span>
                    <DialogDemo/>
                </div>
            </div>

            {/* Post Content */}
            <div className="text-[14.6px] px-2 text-zinc-800 whitespace-pre-wrap">{title}</div>
                                        
         {isMedia && mediaUrl && (
                <Link href={mediaUrl}>
                <div className="w-full h-[400px] relative   overflow-hidden">
                    <Image
                    src={mediaUrl}
                    alt="post media"
                    fill
                    className="object-contain w-full h-full rounded-md overflow-hidden "
                    />
                </div>
                </Link>
                )}
            <div className="flex items-center justify-evenly  w-full gap-2 pt-3  px-1.5 text-zinc-600">
                <button
                    onClick={()=>handleLike(id, !isLiked)}
                    type="button"
                    aria-label="Love"
                    className={`${isLiked?"text-white bg-rose-500":"text-rose-400 bg-zinc-100"} transition gap-1  py-3 px-6 rounded-full w-1/3 flex justify-center items-center`}
                >
                    <Heart className="w-5 h-5 " strokeWidth={2.4}  />{likes?likes:""}
                </button>

                <button
                    type="button"
                    aria-label="Comment"
                    className="text-blue-400 transition bg-zinc-100  py-3 px-6 rounded-full w-1/3 flex justify-center"
                >
                    <MessageCircle className="w-5 h-5 " strokeWidth={2.4}  />
                </button>

                <button
                    type="button"
                    aria-label="Share"
                    className="text-purple-400 transition bg-zinc-100  py-3 px-6 rounded-full w-1/3 flex justify-center"
                >
                    <Share2 className="w-5 h-5 " strokeWidth={2.4}  />
                </button>
            </div>

        </div>
    );
}
