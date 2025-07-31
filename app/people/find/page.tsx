"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "sonner";
import { toast } from "sonner";
type Person = {
  id: string;
  name: string;
  pic: string;
};

export default function Page() {
  const [peoples, setPeoples] = useState<Person[]>([]);

  const handleFollow = async (id: string, name:string) => {
    const response = await fetch("/api/v1/friends/follow", {
      body: JSON.stringify({ friendId: id }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setPeoples(peoples.filter((person) => person.id !== id));
      toast("You Followed: "+name)
    }
  };

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/v1/friends/find");
      const data = await res.json();
      if (!res.ok || !data.people) {
        console.log("Failed to fetch people");
        return;
      }
      setPeoples(data.people);
    })();
  }, []);

  return (
    <div className="w-full space-y-4">
      <Toaster/>
      {peoples.length === 0 && (
        <p className="text-center text-muted-foreground">No people found.</p>
      )}
      {peoples.map((e) => (
        <div key={e.id} className="border rounded-2xl p-4 max-w-xl mx-auto">
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 rounded-full relative overflow-hidden">
              <Image src={e.pic} alt="" fill className="object-cover" />
            </div>
            <div className="font-medium">{e.name}</div>
          </div>
          <div className="flex justify-end gap-2 mt-3">
            <Badge asChild>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-full cursor-pointer"
                onClick={() => handleFollow(e.id, e.name)}
              >
                Follow
              </button>
            </Badge>
            <Badge variant="outline">View</Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
