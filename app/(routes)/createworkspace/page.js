import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const CreateWorkSpace = () => {
    return (
        <div className='py-3 px-4 w-full h-[99vh] flex justify-center items-center'>
            <div className='rounded-2xl max-w-xl shadow-xl bg-white'>
                <img src="/images/workspacecover.webp" className='rounded-t-2xl w-full h-52 object-cover' alt="" />
                <div className='py-10 px-12 '>
                    <h2 className='text-xl font-medium mb-3'>Create a new workspace</h2>
                    <p>This is a shared space where you can collaborate with your team.
                        You can always rename it later.</p>
                    <div className="flex items-end gap-3 mt-5 w-full">
                        <Button>
                            +
                        </Button>
                        <div className='w-full'>
                            <Label htmlFor="title">Titile</Label>
                            <Input type="title" className="w-full bg-gray-50 border-none" id="title"  placeholder="Design Sprit " />
                        </div>
                    </div>
                    <div className='flex justify-end gap-3 mt-10'>
                        <Button disabled className="bg-gray-200 text-black px-8 rounded-lg">
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