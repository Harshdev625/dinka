"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function Page() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/v1/getuserdetails", { method: "POST" });
      const data = await res.json();
      if (!data.error) {
        setData(data);
        console.log(data)
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center py-10 gap-4">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-4 w-48" />
        <div className="flex gap-4 mt-4">
          <Skeleton className="w-28 h-16 rounded-lg" />
          <Skeleton className="w-28 h-16 rounded-lg" />
        </div>
      </div>
    );
  }

  const { user, followersCount, followingCount } = data || {};
  return (
    <div className="w-full max-w-md mx-auto px-4 py-10">
      <div className="flex flex-col items-center">
        <div className="relative h-24 w-24 rounded-full overflow-hidden bg-zinc-200">
          {user?.image ? (
            <Image src={user.image} alt="User" fill style={{ objectFit: "cover" }} />
          ) : null}
        </div>

        <h1 className="mt-4 text-xl font-semibold text-zinc-800 text-center">
          {user?.name || "Unnamed User"}
        </h1>

        <p className="mt-1 text-sm text-zinc-500 text-center">{user?.bio || "No bio available."}</p>

        <div className="flex justify-between w-full mt-6 gap-4">
          <div className="flex-1 bg-zinc-100 rounded-lg py-3 text-center">
            <div className="text-lg font-medium text-zinc-800">{followersCount ?? 0}</div>
            <div className="text-xs text-zinc-500">Followers</div>
          </div>
          <div className="flex-1 bg-zinc-100 rounded-lg py-3 text-center">
            <div className="text-lg font-medium text-zinc-800">{followingCount ?? 0}</div>
            <div className="text-xs text-zinc-500">Following</div>
          </div>
        </div>
      </div>
        <div className="p-4 font-bold text-zinc-600 text-xl">
          <div>Posts</div>
        </div>
        <div className="flex flex-wrap ">


        </div>
    </div>
  );
}
