  "use client"
import Post from './Post'
export default function Posts({posts, handleLike}:{posts:any, handleLike:any}) {
  
  return (
    <div className='px-2'>
        {posts?.map((e:any)=>(
          <Post handleLike={handleLike} redir={true} isLiked={e.isLiked} likes={e.likes} id={e.id} key={e.id} title={e.title} visibility={e.visiblity} author={{name: e.author.name, image:e.author.pic}} createdAt={e.createdAt} isMedia={e.isMedia} mediaUrl={e.mediaurl}  />
        ))}
    </div>
  )
}
