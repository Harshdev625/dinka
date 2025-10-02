import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navbar";
import React from "react";
import { PostProvider } from "@/app/Providers/PostsProvider";
import { usePostContext } from "@/app/Providers/PostsProvider";
import SessionProvider from "@/app/Providers/SessionProvider";
import { SocketProvider } from "@/app/hooks/videosocket";

export const metadata: Metadata = {
  title: "Dinka - To Be Social",
  description: "Dinka is a social media app",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-50 antialiased min-h-screen">
        <SessionProvider>
          <div className="w-screen min-h-screen relative">
            <NavBar />
            <div className="py-16"></div>
            <PostProvider>
              <SocketProvider>{children}</SocketProvider>
            </PostProvider>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
