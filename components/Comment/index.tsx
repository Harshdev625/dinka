import React, { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import Chats from  "@/components/Chats"
import { formatDistanceToNow } from 'date-fns'
export default function index({comments,id}:any) {
  const [commentState, setComment] = useState(comments)
  console.log(commentState)
  const addComment = (comment:any)=>{
    setComment([comment, ...commentState])
    console.log(comment)
  }
  return (
    <div className=''>
      <div className='max-h-[50vh] overflow-y-scroll '>
        {commentState.map((e:any)=><div key={e.createdAt} className='w-full border p-2  bg-zinc-100  rounded-xl mb-2'>
          <div className='flex gap-3'>
            <div className='w-8 h-8 bg-black  rounded-full'>

            </div>
            <div className='flex gap-2 items-center'>
              <div className='textsm'>
              {e.user.name} 
              </div>
              <div className='text-xs'>
                ॱ {formatDistanceToNow(e.createdAt) } ago
              </div>
            </div>


          </div>
            <div className='p-2 tsxt-sm'>{e.content}</div>
        </div>)}
        <div className='pb-18'>

        </div>
      </div>
      <Chats id={id} addComment={addComment}/>
    </div>
  )
}
