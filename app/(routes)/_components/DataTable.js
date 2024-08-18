import React from 'react'
import { CustomDropdownMenu } from './OptionsMenu'
import { MoreHorizontalIcon, Star } from 'lucide-react'

const DataTable = ({ dataList, onClickFunc, options, type = "table" }) => {

    return (
        <div className='mt-12'>
            <div className="w-full">
                {type === "table" ? (
                    <>
                        <div className='flex justify-between text-blue-400 text-lg'>
                            <div className=''>
                                Name
                            </div>
                            <div className=''>
                                Actions
                            </div>
                        </div>
                        <div className='mt-6'>
                            {dataList.map((dataItem) => (
                                <button
                                    id={dataItem.id}
                                    onClick={(e) => {
                                        console.log("Clicked target:", e.target);
                                        onClickFunc(`${dataItem.id}`);
                                    }}
                                    key={dataItem.id} className="group relative  w-full flex justify-between items-center py-2 cursor-pointer hover:bg-slate-200 px-2 rounded-lg outline-none border-b">
                                    <div className="py-1.5 flex items-center gap-4">
                                        <div className='bg-purple-50 rounded-md py-2 px-2'>

                                            {dataItem.emoji ? dataItem.emoji : <img src='/icons/document.svg' />}
                                        </div>
                                        {dataItem.title}
                                    </div>
                                    <div className="flex absolute z-[100] top-0 bottom-0 right-3 items-center gap-3 text-sm text-purple-500">
                                        <CustomDropdownMenu id={dataItem.id} menuData={options} parentClass={'group-hover:visible invisible h-8 w-8 rounded-full p-0 bg-transparent border border-purple-500 z-[1000]'}>

                                            <MoreHorizontalIcon size={16} className=' ' />
                                        </CustomDropdownMenu>
                                       
                                    </div>
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8 place-content-start'>
                            {dataList.map((dataItem) => {
                                return (
                                    <button
                                        id={dataItem.id}
                                        className='shadow-md rounded-lg group'
                                        onClick={(e) => {
                                            onClickFunc(`${dataItem.id}`);

                                        }}>
                                        <img src={dataItem.coverImg} className='w-full max-h-[200px] h-[75%] rounded-t-lg object-cover ' alt="" />
                                        <div className='mt-2 flex justify-between px-2 py-3'>
                                            <div className='text-sm flex items-center'>
                                                {dataItem.emoji}
                                                <h6 className='ml-2'>
                                                    {dataItem.title}
                                                </h6>
                                            </div>
                                            <div className="flex  z-[100]  items-center gap-3 text-sm text-black">
                                                <CustomDropdownMenu id={dataItem.id} menuData={options} parentClass={'visible  h-8 w-8 rounded-full p-0 bg-transparent border border-transparent hover:border-black z-[1000]'}>

                                                    <MoreHorizontalIcon size={16} className=' ' />
                                                </CustomDropdownMenu>
                                                
                                            </div>
                                        </div>

                                    </button>
                                )
                            })}
                        </div>
                    </>
                )}

            </div>
        </div>
    )
}

export default DataTable