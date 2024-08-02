import { Button } from '@/components/ui/button'
import { MoreHorizontalIcon, Star } from 'lucide-react'
import React from 'react'

const DataTable = ({ dataList, onClickFunc }) => {
    return (
        <div className='mt-12'>
            <div className="w-full">
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
                            onClick={() => {
                                onClickFunc(`${dataItem.id}`)
                            }}
                            key={dataItem.id} className="group  w-full flex justify-between items-center py-2 cursor-pointer hover:bg-slate-200 px-2 rounded-lg outline-none border-b">
                            <div className="py-2 flex items-center gap-4">
                                {dataItem.emoji ? dataItem.emoji : <img src='/icons/document.svg' />}
                                {dataItem.title}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-purple-500">
                                <Button variant="outline" className="group-hover:visible invisible h-8 w-8 rounded-full p-0 bg-transparent border border-purple-500">
                                    <MoreHorizontalIcon size={16} className=' ' />
                                </Button>
                                <Star size={18} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DataTable