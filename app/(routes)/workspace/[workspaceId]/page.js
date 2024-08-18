"use client"
import React from 'react'
import DataTable from "../../_components/DataTable"
import { useWorkspace } from "../_context"
import { Loader2, LayoutGrid, Plus, SlidersHorizontal, ImagePlus, X, Smile } from "lucide-react"
import { Button } from '@/components/ui/button'
import { useRouter, useParams } from 'next/navigation'
import Header from '../../_components/Header'
import CoverPicker from '../../_components/CoverPicker'
import EmojiPickerConponent from '../../_components/EmojiPickerComponent'

const page = () => {
  const {
    data,
    collapse,
    setCollapse,
    loading,
    createDocument,
    update,
    style,
    setStyle,
    menuData
  } = useWorkspace();
  let { workspaceId } = useParams();
  let { push } = useRouter();



  return (
    <>

      {/* <div className={`absolute top-3 left-2 ${collapse ? "visible z-50" : "invisible"}`}>
          <CollapseBtn collapse={collapse} setCollapse={setCollapse} Icon={ArrowRightFromLine} />
        </div> */}
      <Header logo={false} />
      <div className="relative">
        <div className='group relative  cursor-pointer'>
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

        </div>

        <div className={`absolute bottom-[-25px] left-0 right-0 w-full max-w-6xl mx-auto px-4 ${!Boolean(data.emoji) ? 'invisible' : 'visible'}`}>
          <div className="group relative text-6xl py-3 px-1 transition-all rounded-xl hover:bg-[#f5f9fb] cursor-pointer w-fit z-50">

            {data.emoji}
            <Button onClick={() => { update.setEmoji(workspaceId, null) }} className="absolute -right-4 -top-4 group-hover:visible  invisible p-0 h-9 w-9 text-red-400 bg rounded-full text-sm bg-white">
              <X size={22} />
            </Button>
          </div>
        </div>
      </div>
      <div className="sticky max-w-6xl mx-auto px-4 pt-4 ">


        <EmojiPickerConponent setEmoji={(e) => { update.setEmoji(workspaceId, e) }} parentAttributes={{
          className: `flex gap-2 mb-8 bg-[#fafafa] hover:bg-[#f5f9fb] text-black hover:text-black  ${!Boolean(data.emoji) ? 'visible' : 'invisible'}`,
          variant: 'filled'
        }}>

          <Smile size={16} />
          Add Emoji
        </EmojiPickerConponent>

        <div className="flex justify-between items-center">
          <input className="text-4xl font-bold border-none outline-none" defaultValue={data.name} onBlur={(e) => update.setTitle(workspaceId, e.target.value)} />

          <Button onClick={() => createDocument()} className="rounded-full text-white p-1.5">
            <Plus />
          </Button>
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
        <div className="mt-12">
          {loading ? (<div className="w-full mt-10 flex justify-center items-center">
            <Loader2 size={42} className="animate-spin" />
          </div>) :
            (
              <>
                <DataTable options={menuData} dataList={data.documents} type={style} onClickFunc={(ducumentid) => { push(`/workspace/${workspaceId}/${ducumentid}`) }} />
              </>

            )}
        </div>
      </div>


    </>
  )
}

export default page