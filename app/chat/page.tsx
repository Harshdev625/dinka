"use client"
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
export default function StickyInput() {
  const [message, setMessage] = useState("");
    const toId = useSearchParams()?.get("id")
  const handleSend = async() => {
    if (!message.trim()) return;
    const res = await fetch("/api/v1/chats/create",{
        body:JSON.stringify({toId, message}),
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        }
    })
    setMessage("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      

      {/* fixed input bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-2 flex items-center safe-area">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg outline-none"
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
