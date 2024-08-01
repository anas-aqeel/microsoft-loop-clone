import { Button } from '@/components/ui/button'
import { ArrowLeftFromLine, History, Pencil, Plus } from 'lucide-react'
import React from 'react'

const Layout = ({ children }) => {
    return (
        <div className='flex'>
            <div className='md:w-[20%] flex flex-col py-5'>
                <div className='px-2'>

                    <div className="flex w-full justify-between items-center px-2">
                        <div>Loop</div>
                        <div><ArrowLeftFromLine /></div>
                    </div>
                    <div className="cursor-pointer flex justify-between items-center w-full py-3 px-4 text-[#969696] hover:text-[#d2d2d2] hover:bg-[#000000] rounded-md mt-5">
                        <div className='flex items-center gap-3'>
                            <History />
                            Recent
                        </div>
                    </div>
                    <div className="group cursor-pointer flex justify-between items-center w-full py-3 px-4 text-[#969696] hover:text-[#d2d2d2] hover:bg-[#000000] rounded-md">
                        <div className='flex items-center gap-3'>
                            <Pencil />
                            Ideas
                        </div>
                        <Plus className='opacity-0 group-hover:opacity-100' />
                    </div>

                </div>
                <div className='w-full h-[1px] bg-gray-300 mt-6'></div>
                <div className='flex-1'>
                    <div className="cursor-pointer flex justify-between items-start w-full py-3 px-4 text-[#969696]  rounded-md mt-5">
                        <div className='flex flex-col  gap-1 '>
                            <h6 className='font-medium text-lg text-black'>Workspace Name</h6>
                            <p className='text-xs'>6 Members</p>
                        </div>
                        <Button className="rounded-full p-0 text-white h-8 w-8">
                            <Plus size={'16'} />
                        </Button>
                    </div>
                </div>
            </div>
            <div className='flex-1 bg-white h-screen shadow-xl'>

                {children}
            </div>

        </div>
    )
}

export default Layout