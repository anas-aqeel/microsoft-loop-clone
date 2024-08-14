import React, { useEffect, useState } from 'react'
import CoverPicker from './CoverPicker'
import { toast } from '@/components/ui/use-toast'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import { Button } from '@/components/ui/button'
import { ImagePlus, LoaderCircle, SmilePlus } from 'lucide-react'
import EmojiPickerConponent from './EmojiPickerComponent'
import { Label } from '@radix-ui/react-dropdown-menu'

import { Input } from '@/components/ui/input'

const EditStyleBox = ({ documentId, labels, close, collection = "Documents" }) => {
    let [loading, setLoading] = useState(true)
    let [data, setData] = useState({
        coverImg: '',
        emoji: null,
        title: '',
    })

    useEffect(() => {
        let saveInfo = async () => {
            let docSnap = await getDoc(doc(db, collection, documentId))
            if (!docSnap.exists()) return;
            setData(docSnap.data())
            setLoading(false)
        }

        saveInfo()
    }, [documentId])

    let onUpdateData = async () => {
        setLoading(true)
        try {
            await updateDoc(doc(db, collection, documentId), {
                coverImg: data.coverImg,
                emoji: data.emoji,
                title: data.title,
            })

            toast({
                title: `${collection} Updated`,
                description: `Your ${collection} has been updated.`,

            })

        }
        catch (err) {
            console.log(err)
            toast({
                title: "Error",
                description: "Something went wrong. Please try again later.",
            })
        }
        finally {
            setLoading(false)
            close()
        }
    }

    return (

        <div className='fixed inset-0 z-[5000] min-h-screen w-full flex justify-center items-center bg-white bg-opacity-70'>
            <div className='rounded-2xl max-w-xl shadow-xl bg-white'>
                {loading ? <div className='w-full h-52 bg-gray-200 animate-pulse'></div> : <div className='group relative  cursor-pointer'>
                    <img
                        src={data.coverImg}
                        width={576}
                        height={208}
                        className='rounded-t-2xl w-full h-52 object-cover group-hover:opacity-70 transition-all duration-200'
                        alt=""
                    />
                    <label htmlFor="cover" className='absolute inset-0'></label>
                    <CoverPicker onUpdate={(img) => setData({ ...data, img })} currentImg={data.coverImg}>

                        <Button
                            id="cover"
                            className="flex gap-3 py-4 opacity-0 w-fit absolute top-[50%] right-0 left-0 mx-auto group-hover:opacity-90 transition-all duration-200"
                        >
                            <ImagePlus className='text-white bg-gray-800' />
                            Update Cover
                        </Button>
                    </CoverPicker>

                </div>}
                <div className='pt-2 pb-10 px-12 '>
                    <h2 className='text-xl font-medium mb-3'>{labels.title}</h2>
                    <p>{labels.subtitle}</p>
                    <div className="flex items-end gap-3 mt-5 w-full">
                        <EmojiPickerConponent setEmoji={(emoji) => setData({ ...data, emoji })}>
                            {data.emoji ? data.emoji : <SmilePlus />}
                        </EmojiPickerConponent>

                        <div className='w-full'>
                            <Label htmlFor="title" className='text-sm'>{labels.name}</Label>
                            <Input type="title" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="w-full bg-gray-50 border-none mt-1 " id="title" placeholder="Design Sprit " />
                        </div>
                    </div>
                    <div className='flex justify-end gap-3 mt-10'>
                        <Button disabled={data.title == '' || loading} onClick={onUpdateData} className="bg-gray-200 text-black  hover:text-white flex px-2 items-center gap-3 w-28 rounded-lg">
                            {loading && <LoaderCircle className="animate-spin" />}
                            Update
                        </Button>
                        <Button onClick={() => close()} variant="outline" className="px-8 rounded-lg">
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default EditStyleBox