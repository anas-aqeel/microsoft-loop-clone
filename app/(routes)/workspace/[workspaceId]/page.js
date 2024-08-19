"use client"
import React from 'react'
import DataTable from "../../_components/DataTable"
import { useWorkspace } from "../_context"
import { LayoutGrid, Plus, SlidersHorizontal, ImagePlus, X, Smile } from "lucide-react"
import { Button } from '@/components/ui/button'
import { useRouter, useParams } from 'next/navigation'
import CoverPicker from '../../_components/CoverPicker'
import EmojiPickerConponent from '../../_components/EmojiPickerComponent'

const page = () => {
  const {
    data,
    createDocument,
    loadingState: {
      loading
    },
    update,
    style,
    setStyle,
    menuData
  } = useWorkspace();
  let { workspaceId } = useParams();
  let { push } = useRouter();



  return (

    <>

      <div className="relative">
        <div className='group relative  cursor-pointer'>
          {loading ? (
            <>
              <div className="w-full h-[42vh] bg-gray-200 animate-pulse shadow-lg"></div>
              <div className='max-w-6xl absolute mx-auto bottom-[-25px] left-2 right-2'>
                <div className="w-20 h-20 bg-gray-100 backdrop-blur-xl rounded-md animate-pulse "></div>
              </div>
            </>
          ) : (
            <>
              <img
                src={data.coverImg}
                width={576}
                height={208}
                className='rounded-b-xl w-full h-[35vh] object-cover group-hover:opacity-70 transition-all duration-200'
                alt=""
              />
              <label htmlFor="cover" className='absolute inset-0'></label>
              <CoverPicker onUpdate={(e) => {

                update.setCoverImg(workspaceId, e)
              }}
                currentImg={data.coverImg}>

                <Button
                  id="cover"
                  className="flex gap-3 py-4 opacity-0 w-fit absolute top-[50%] right-0 left-0 mx-auto group-hover:opacity-90 transition-all duration-200"
                >
                  <ImagePlus className='text-white bg-gray-800' />
                  Update Cover
                </Button>
              </CoverPicker>
            </>
          )}




        </div>

        <div className={`absolute bottom-[-25px] left-0 right-0 w-full max-w-6xl mx-auto px-4 ${!Boolean(data.emoji) ? 'invisible' : 'visible'}`}>
          <div className="group relative text-6xl py-3  backdrop-blur-3xl  px-1 transition-all rounded-xl hover:bg-[#f5f9fb] cursor-pointer w-fit z-50">

            {data.emoji}
            <Button onClick={() => { update.setEmoji(workspaceId, null) }} className="absolute -right-4 -top-4 group-hover:visible  invisible p-0 h-9 w-9 text-red-400 bg rounded-full text-sm bg-white">
              <X size={22} />
            </Button>
          </div>
        </div>
      </div>

      <div className="sticky max-w-6xl mx-auto px-4 pt-4 ">


        {!loading && <EmojiPickerConponent setEmoji={(e) => { update.setEmoji(workspaceId, e) }} parentAttributes={{
          className: `flex gap-2 mb-8 bg-[#fafafa] hover:bg-[#f5f9fb] text-black hover:text-black  ${!Boolean(data.emoji) ? 'visible' : 'invisible'}`,
          variant: 'filled'
        }}>

          <Smile size={16} />
          Add Emoji
        </EmojiPickerConponent>}

        <div className="flex justify-between items-center">
          {loading ? (
            <>
              <div className='mt-8 flex justify-between items-center w-full'>

                <div className="h-10 bg-gray-300 rounded w-1/3 animate-pulse"></div>
                <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
            </>
          ) : (
            <>
              <input
                className="text-4xl font-bold border-none outline-none w-full"
                placeholder='Workspace Name'
                defaultValue={data.name}
                onBlur={(e) => update.setTitle(workspaceId, e.target.value)}
              />
              <Button onClick={() => createDocument()} className="rounded-full text-white p-1.5">
                <Plus />
              </Button>
            </>
          )}
        </div>



        <div className="flex justify-between items-center mt-14">
          <h3 className="text-black font-medium text-xl" >Documents</h3>
          <div className="flex items-center gap-1 text-blue-900">
            <button className={`h-10 w-10 text-xs flex justify-center items-center  rounded-full transition-all   ${style == 'grid' ? 'shadow-md bg-white to-black' : 'bg-transparent hover:bg-slate-200'}`} onClick={() => setStyle('grid')}>
              <LayoutGrid size={18} />
            </button>
            <button className={`h-10 w-10 text-xs flex justify-center items-center  rounded-full  transition-all  ${style == 'table' ? 'shadow-md bg-white to-black' : 'bg-transparent hover:bg-slate-200'}`} onClick={() => setStyle('table')}>
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>


        <div className="mt-12 mb-5">

          {(data.documents.length == 0 && !loading) && (
            <div className="md:mt-8 flex justify-center items-center w-full flex-col text-center">
              <img src="/images/workspace.webp" alt="No workspace" />
              <h3 className="font-medium mb-4 text-2xl">Create a new document</h3>
              <p>
                Document lets you plan, brainstorm, and create collaboratively—all in one place.
              </p>
              <Button onClick={() => createDocument()} variant="outline" className="bg-transparent flex gap-3 py-1.5 mt-3 px-2">
                <Plus />
                New Document
              </Button>
            </div>
          )}

          {(loading || data.documents.length > 0) && <DataTable loading={loading} options={menuData} dataList={data.documents} type={style} onClickFunc={(ducumentid) => { push(`/workspace/${workspaceId}/${ducumentid}`) }} />}


        </div>
      </div>


    </>
  )
}

export default page