"use client"
import { prompts } from '@/app/_utils/prompts'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

const PromptGallery = ({ children, onClick }) => {
  let [selected, setSelected] = useState("")

  return (
    <Dialog onOpenChange={() => {
      selected != '' && setSelected('')
    }}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="px-0 max-w-2xl  h-[600px] flex flex-col w-full">
        <div className={'flex gap-6  border-b px-6 items-center pb-4'}>
          <img src={'https://ph-files.imgix.net/aef2db33-bc9d-4971-8fc6-28c28c682944.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&fit=max'} className='h-fit w-24 rounded-lg' />
          <div className=''>
            <h2 className='text-2xl font-medium'>Prompt Gallery</h2>
            <p className='text-xs mt-2'>Select Prompts</p>
          </div>
        </div>
        <div className='px-6 flex-1 flex flex-col w-full'>
          <Input type="search" id="search" placeholder="Search available prompts" />

          {prompts.length > 0 ? (<div className='grid grid-cols-3 gap-1.5 mt-6 overflow-auto p-1 h-[320px]'>
            {prompts.map(({ url, alt, title }) => (
              <Button onClick={() => { setSelected(title) }} variant="outline" className=" h-auto w-auto p-0.5 flex gap-2 items-center rounded-lg border-none outline-none focus:outline focus:outline-blue-800">
                <div className='rounded-lg w-[35%] h-full bg-purple-400'>
                  <img src={url} alt={alt} className='h-full w-full object-cover mix-blend-plus-darker' />
                </div>
                <p className='inset-0 mx-auto top-[47%] font-medium text-sm text-wrap'>{title}</p>
              </Button>
            ))}

          </div>) : (
            <button className='w-full flex flex-1  justify-center items-center flex-col border-none outline-none'>
              <img src='/images/search.webp' className='w-72 h-auto' />
              <p className='text-center max-w-[260px] text-sm'>Your search didn't match any prompt.</p>
            </button>
          )}

        </div>

        <div className='flex justify-end gap-3 mt-5 px-6'>
          <DialogClose className={`${selected == '' ? 'pointer-events-none' : 'pointer-events-auto'}`}>

            <Button disabled={selected == ''} className="bg-gray-200 text-black hover:text-white px-8 rounded-lg" onClick={() => onClick(selected)}>
              Select
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="outline" className="px-8 rounded-lg">
              Cancel
            </Button>

          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PromptGallery
