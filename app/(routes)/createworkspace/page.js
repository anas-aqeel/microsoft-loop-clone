"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ImagePlus, Plus, SmilePlus } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import CoverPicker from '../_components/CoverPicker'
import EmojiPickerConponent from '../_components/EmojiPickerComponent'

const CreateWorkSpace = () => {
    let [coverImg, setCoverImg] = useState('/images/workspacecover.webp')
    let [title, setTitle] = useState('')
    let [emoji, setEmoji] = useState()
    return (
        <div className='py-3 px-4 w-full h-[99vh] flex justify-center items-center'>
            <div className='rounded-2xl max-w-xl shadow-xl bg-white'>
                <div className='group relative  cursor-pointer'>
                    <img
                        src={coverImg}
                        width={576}
                        height={208}
                        className='rounded-t-2xl w-full h-52 object-cover group-hover:opacity-70 transition-all duration-200'
                        alt=""
                    />
                    <label htmlFor="cover" className='absolute inset-0'></label>
                    <CoverPicker onUpdate={setCoverImg} currentImg={coverImg}>

                        <Button
                            id="cover"
                            className="flex gap-3 py-4 opacity-0 w-fit absolute top-[50%] right-0 left-0 mx-auto group-hover:opacity-90 transition-all duration-200"
                        >
                            <ImagePlus className='text-white bg-gray-800' />
                            Update Cover
                        </Button>
                    </CoverPicker>

                </div>
                <div className='py-10 px-12 '>
                    <h2 className='text-xl font-medium mb-3'>Create a new workspace</h2>
                    <p>This is a shared space where you can collaborate with your team.
                        You can always rename it later.</p>
                    <div className="flex items-end gap-3 mt-5 w-full">
                        <EmojiPickerConponent setEmoji={setEmoji}>
                            {emoji ? emoji : <SmilePlus />}
                        </EmojiPickerConponent>

                        <div className='w-full'>
                            <Label htmlFor="title">Titile</Label>
                            <Input type="title" onChange={(e) => setTitle(e.target.value)} className="w-full bg-gray-50 border-none" id="title" placeholder="Design Sprit " />
                        </div>
                    </div>
                    <div className='flex justify-end gap-3 mt-10'>
                        <Button disabled={title == ''} className="bg-gray-200 text-black px-8 rounded-lg">
                            Create
                        </Button>
                        <Button variant="outline" className="px-8 rounded-lg">
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateWorkSpace