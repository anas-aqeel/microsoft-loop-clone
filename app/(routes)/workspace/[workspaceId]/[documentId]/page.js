"use client"
import CommentBox from '@/app/(routes)/_components/CommentBox'
import RichTextEditor from '@/app/(routes)/_components/RichTextEditor/RichTextEditor'
import { Room } from '@/app/(routes)/Room'
import { Button } from '@/components/ui/button'
import { MessageCircleMore } from 'lucide-react'
import React, { useState } from 'react'

const Document = () => {
  let [show, setShow] = useState(false)



  return (
    <div className='relative'>
      <RichTextEditor />

      <Button onClick={() => setShow(!show)} className="fixed right-10 bottom-5 z-40 text-white rounded-full h-14 w-14 p-0 flex justify-center items-center">
        <MessageCircleMore />
      </Button>

      <div className={`fixed right-10 bottom-5 z-50 w-full max-w-xl  rounded-md bg-white shadow-lg ${show ? 'h-[520px] py-3 px-2' : 'h-0 p-0'} overflow-hidden transition-all`}>
        <Room>
          <CommentBox show={show} setShow={setShow} />
        </Room>
      </div>

    </div>
  )
}

export default Document