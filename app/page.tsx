"use client";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import Posts from "@/components/Posts";
import { usePostContext } from "./Providers/PostsProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageCircleIcon, 
  HeartIcon, 
  ShareIcon, 
  UsersIcon,
  SparklesIcon,
  TrendingUpIcon
} from "lucide-react";
import Link from "next/link";

export default function Page() {
  const { data: session, status } = useSession();
  const postContext = usePostContext();

  // If authenticated, show the main feed
  if (status === "authenticated" && session) {
    return (
      <div className="min-h-[89vh] flex flex-col justify-between">
        {postContext.isLoading ? (
          <div className="flex items-center justify-center flex-grow">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto">
            <Posts posts={postContext.posts} handleLike={postContext.handleLike} fetchPost={postContext.fetchPost} />
          </div>
        )}
      </div>
    );
  }

  // If loading, show skeleton
  if (status === "loading") {
    return (
      <div className="min-h-[89vh] flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, show landing page
  return (
    <div className="min-h-[89vh] bg-gradient-to-br from-zinc-50 to-zinc-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="logo text-8xl mb-6 font-bold">dinka</div>
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-800 mb-6">
              Connect. Share. Discover.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 mb-8 max-w-3xl mx-auto">
              Dinka is a modern social media platform where you can share posts, 
              interact through likes and comments, and connect with others in real time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/signup">
                <Button size="lg" className="text-lg cursor-pointer px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Get Started
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 cursor-pointer">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mb-4">
            Why Choose Dinka?
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Experience social media the way it should be - simple, engaging, and meaningful.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircleIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-800 mb-4">Real-time Chat</h3>
              <p className="text-zinc-600">
                Connect instantly with friends through our seamless messaging system.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-800 mb-4">Engage & React</h3>
              <p className="text-zinc-600">
                Like, comment, and share posts to build meaningful connections.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <UsersIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-800 mb-4">Find Friends</h3>
              <p className="text-zinc-600">
                Discover and connect with people who share your interests.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-4">
                <SparklesIcon className="w-8 h-8 text-purple-600 mr-2" />
                <span className="text-4xl font-bold text-zinc-800">Modern</span>
              </div>
              <p className="text-zinc-600">Clean, intuitive design that puts content first</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <TrendingUpIcon className="w-8 h-8 text-blue-600 mr-2" />
                <span className="text-4xl font-bold text-zinc-800">Fast</span>
              </div>
              <p className="text-zinc-600">Lightning-fast performance and real-time updates</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <ShareIcon className="w-8 h-8 text-green-600 mr-2" />
                <span className="text-4xl font-bold text-zinc-800">Social</span>
              </div>
              <p className="text-zinc-600">Built for meaningful connections and conversations</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join Dinka?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your social journey today and connect with amazing people.
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 cursor-pointer">
              Create Your Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );  
}
