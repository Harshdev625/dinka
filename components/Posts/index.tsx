"use client"
import Post from './Post'
import InfiniteScroll from "react-infinite-scroll-component";
export default function Posts({ posts, handleLike, fetchPost }: {posts: any, handleLike: any, fetchPost: any}) {
  
  console.log(posts);

  return (
    <div className='px-2'>
      <InfiniteScroll
        next={fetchPost} // Pass query param to your fetch function if needed
        dataLength={posts.length}
        hasMore={true} 
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>You have seen it all</b>
          </p>
        }
        refreshFunction={() => {}}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        }
      >
        {posts?.map((e: any) => (
          <Post
            hidedel={false}
            handleLike={handleLike}
            redir={true}
            isLiked={e.isLiked}
            likes={e.likes}
            id={e.id}
            key={e.id}
            title={e.title}
            visibility={e.visiblity}
            author={{ name: e.author.name ? e.author.name : "Unknown", image: e.author.pic }}
            createdAt={e.createdAt}
            isMedia={e.isMedia}
            mediaUrl={e.mediaurl}
          />
        ))}
      </InfiniteScroll>
    </div>
  )
}
