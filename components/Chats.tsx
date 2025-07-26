"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "./ui/sonner";
export default function ChatPage({id, addComment}:any) {
  const [message, setMessage] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const handlePost = async(e:any) => {
        e.preventDefault();
        scrollToBottom();
        const res = await fetch("/api/v1/comment", {method:"POST", body:JSON.stringify({comment:message, postid:id})})
        const data = await res.json()
        addComment(data.data)
        setMessage("");

    }
  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };
  return (
    <div className="flex flex-col absolute bottom-0 shadow">
        <Toaster/>
      <form
        className="flex items-center gap-2 py-5 px-4 bg-zinc-100"
        onSubmit={handlePost}>
        <Input
          type="text"
          placeholder="Type your message..."
          value={message}
          onFocus={scrollToBottom}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 py-3 rounded-full focus:ring-0 ring-0 focus:border-0 border-0"
        />
        <Button
          type="submit"
          size="sm"
          className="rounded-full h-10 w-10 p-0 bg-blue-500 hover:bg-blue-600"
          disabled={!message.trim()}
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
}
