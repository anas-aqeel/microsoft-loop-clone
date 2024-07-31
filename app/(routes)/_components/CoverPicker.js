"use client"
import cover_images from '@/app/_utils/cover_images'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

const CoverPicker = ({ children, onUpdate, currentImg }) => {
  let [selectedImage, setSelectedImage] = useState('')


  return (
    <Dialog onOpenChange={() => {
      setSelectedImage('')
    }}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="px-0 max-w-2xl  h-[600px] flex flex-col w-full">
        <div className={'flex gap-6  border-b px-6 items-center pb-4'}>
          <img src={currentImg} className='h-fit w-24 rounded-lg' />
          <div className=''>
            <h2 className='text-2xl font-medium'>Update cover</h2>
            <p className='text-xs mt-2'>Currently selected</p>
          </div>
        </div>
        <div className='px-6 flex-1 flex flex-col w-full'>
          <Input type="search" id="search" placeholder="Search all stock images" />

          {cover_images.length > 0 ? (<div className='grid grid-cols-4 gap-1.5 mt-6 overflow-auto p-1 h-[320px]'>
            {cover_images.map(({ url, alt }) => (
              <Button onClick={() => { setSelectedImage(url) }} variant="outline" className="h-auto w-auto p-0.5 rounded-lg border-none outline-none focus:outline focus:outline-blue-800">
                <img src={url} alt={alt} className='rounded-lg w-full h-full object-cover' />
              </Button>
            ))}

          </div>) : (
            <div className='w-full flex flex-1  justify-center items-center flex-col'>
              <img src='/images/search.webp' className='w-72 h-auto' />
              <p className='text-center max-w-[260px] text-sm'>Your search didn't match any content.
                Please try another term.</p>
            </div>
          )}

        </div>

        <div className='flex justify-end gap-3 mt-5 px-6'>
          <DialogClose className={`${selectedImage == '' ? 'pointer-events-none' : 'pointer-events-auto'}`}>

            <Button disabled={selectedImage == ''} className="bg-gray-200 text-black hover:text-white px-8 rounded-lg" onClick={() => onUpdate(selectedImage)}>
              Update
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

export default CoverPicker
