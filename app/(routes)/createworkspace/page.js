"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ImagePlus, LoaderCircle, SmilePlus } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import CoverPicker from '../_components/CoverPicker'
import EmojiPickerConponent from '../_components/EmojiPickerComponent'
import { useAuth, useUser } from '@clerk/nextjs'
import { collection, doc, setDoc } from 'firebase/firestore'
import { useToast } from '@/components/ui/use-toast'
import { db } from '@/config/FirebaseConfig'
import { useRouter } from 'next/navigation'
import { uid } from 'uid'

const CreateWorkSpace = () => {
    let { user } = useUser()
    let { orgId, userId } = useAuth()
    let { toast } = useToast()
    let { replace } = useRouter()
    let [title, setTitle] = useState('')
    let [emoji, setEmoji] = useState(null)
    let [loading, setLoading] = useState(false)
    let [coverImg, setCoverImg] = useState('/images/workspacecover.webp')

    let onWorkSpaceCreate = async () => {
        setLoading(true)
        let workspaceId = Date.now().toString()
        let docRef = doc(db, 'workspace', workspaceId);
        try {
            await setDoc(docRef, {
                title,
                coverImg,
                emoji,
                id: workspaceId,
                orgId: orgId ? orgId : userId,
                createdBy: user?.primaryEmailAddress?.emailAddress
            });
            let docId = uid()
            await setDoc(doc(db, "Documents", docId), {
                title: "Untitled",
                coverImg,
                emoji: null,
                shareable: false,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                workspaceId,
                id: docId,
                documentOutput: []
            })
            await setDoc(doc(db, "DocumentOutputs", docId), {
                docId,
                description: "",
                version: 1,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                updatedBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: new Date(),
                updatedAt: new Date(),
                lastUpdated: new Date(),
            });
            replace(`/workspace/${workspaceId}/${docId}`)
            toast({
                title: "Workspace Successfully Created",
                description: "Your Workspace has been saved to the database."
            });
        } catch (e) {
            toast({
                title: "Error Creating Workspace",
                description: `${e.message}`
            });
        } finally {
            setLoading(false)
            setCoverImg('/images/workspacecover.webp')
            setEmoji(null)
            setTitle('')
        }
    }
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
                            <Input type="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-gray-50 border-none" id="title" placeholder="Design Sprit " />
                        </div>
                    </div>
                    <div className='flex justify-end gap-3 mt-10'>
                        <Button disabled={title == '' || loading} onClick={onWorkSpaceCreate} className="bg-gray-200 text-black  hover:text-white flex px-2 items-center gap-3 w-28 rounded-lg">
                            {loading && <LoaderCircle className="animate-spin" />}
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