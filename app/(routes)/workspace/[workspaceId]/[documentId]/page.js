"use client"
import CommentBox from '@/app/(routes)/_components/CommentBox'
import RichTextEditor from '@/app/(routes)/_components/RichTextEditor/RichTextEditor'
import { Room } from '@/app/(routes)/Room'
import { Button } from '@/components/ui/button'
import { ArrowRightFromLine, MessageCircleMore } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

import { useWorkspace } from "../../_context"
import { ImagePlus, X, Smile } from "lucide-react"
import CoverPicker from '../../../_components/CoverPicker'
import EmojiPickerConponent from '../../../_components/EmojiPickerComponent'






const Document = () => {
  let [show, setShow] = useState(false)
  let { documentId } = useParams()
  const {
    data,
    loadingState: {
      fetchData
    },
    update,
  } = useWorkspace();



  return (
    <>



      <div className="relative">
        <div className='group relative  cursor-pointer'>
          {fetchData ? (
            <>
              <div className="w-full h-[42vh] bg-gray-200 animate-pulse"></div>
              <div className="w-20 h-20 bg-gray-100 backdrop-blur-xl rounded-md animate-pulse absolute bottom-[-25px] left-2 right-0"></div>
            </>
          ) : (<><img
            src={data.coverImg}
            width={576}
            height={208}
            className='rounded-b-xl w-full h-[35vh] object-cover group-hover:opacity-70 transition-all duration-200'
            alt=""
          />


            <label htmlFor="cover" className='absolute inset-0'></label>
            <CoverPicker onUpdate={(e) => {

              update.setCoverImg(documentId, e)
            }}
              currentImg={data.coverImg}>

              <Button
                id="cover"
                className="flex gap-3 py-4 opacity-0 w-fit absolute top-[50%] right-0 left-0 mx-auto group-hover:opacity-90 transition-all duration-200"
              >
                <ImagePlus className='text-white bg-gray-800' />
                Update Cover
              </Button>
            </CoverPicker></>)}


        </div>

        <div className={`absolute bottom-[-25px] left-0 right-0 w-full max-w-6xl mx-auto px-4 ${!Boolean(data.emoji) ? 'invisible' : 'visible'}`}>
          <div className="group relative text-6xl py-3 px-1 transition-all rounded-xl hover:bg-[#f5f9fb] backdrop-blur-3xl  cursor-pointer w-fit z-50">

            {data.emoji}
            <Button onClick={() => { update.setEmoji(documentId, null) }} className="absolute -right-4 -top-4 group-hover:visible  invisible p-0 h-9 w-9 text-red-400 bg rounded-full text-sm bg-white">
              <X size={22} />
            </Button>
          </div>
        </div>
      </div>
      <div className="sticky max-w-6xl mx-auto px-4 pt-4 ">


        {!fetchData && <EmojiPickerConponent setEmoji={(e) => { update.setEmoji(documentId, e) }} parentAttributes={{
          className: `flex gap-2 mb-8 bg-[#fafafa] hover:bg-[#f5f9fb] text-black hover:text-black  ${!Boolean(data.emoji) ? 'visible' : 'invisible'}`,
          variant: 'filled'
        }}>

          <Smile size={16} />
          Add Emoji
        </EmojiPickerConponent>}

        <div className="flex justify-between items-center">

          {fetchData ? <div className="h-10 bg-gray-300 rounded w-1/3 animate-pulse mt-3"></div> : <input
            placeholder='Document Name'
            className="text-4xl font-bold border-none outline-none w-full" defaultValue={data.name} onBlur={(e) => update.setTitle(documentId, e.target.value)} />}

        </div>


        <div className="mt-12">
          <div className='relative'>
            <RichTextEditor />

            <Button onClick={() => setShow(!show)} className="fixed right-10 bottom-5 z-40 text-white rounded-full h-14 w-14 p-0 flex justify-center items-center">
              <MessageCircleMore />
            </Button>

            <div className={`fixed right-10 bottom-5 z-50 w-full max-w-xl  rounded-md bg-white shadow-lg ${show ? 'h-[520px] py-3 px-2' : 'h-0 p-0'} overflow-hidden transition-all`}>
              <Room roomId={documentId}>
                <CommentBox show={show} setShow={setShow} />
              </Room>
            </div>


          </div>
        </div>
      </div>




    </>
  )
}

export default Document