  "use client"
import Post from './Post'
import type { PostType } from '@/lib/types'
export default function Posts({posts, handleLike}:{posts:any, handleLike:any}) {
  
  return (
    <div className='px-2'>
        {posts?.map((e:PostType)=>(
          <Post handleLike={handleLike} redir={true} isLiked={e.isLiked} likes={e.likes} id={e.id} key={e.id} title={e.title} visibility={e.visiblity} author={{name: e.author.name}} createdAt={e.createdAt} isMedia={e.isMedia} mediaUrl={e.mediaurl}  />
        ))}
    </div>
  )
}
