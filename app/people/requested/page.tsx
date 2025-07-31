"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "sonner";
type Person = {
  id: string;
  name: string;
  pic: string;
};
export default function Page() {
  const [peoples, setPeoples] = useState<Person[]>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/v1/friends/requested");
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
              <button>
                Unfollow
              </button>
            </Badge>
            <Badge variant="outline">Waiting </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
