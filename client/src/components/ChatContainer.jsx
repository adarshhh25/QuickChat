import React from 'react'
import assets from '../assets/assets'

const ChatContainer = () => {
  return (
    <div>
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
         <img src={assets.profile_martin} alt="" className='w-8 rounded-full' />
         <p className='flex-1 text-lg text-white flex items-center gap-2'>
           <span className='w-2 h-2 rounded-full bg-green-500'></span>
         </p>
      </div>
    </div>
  )
}

export default ChatContainer
