"use client"
import React, { useState } from 'react'
import { LayoutGrid, Plus, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const WorkSpace = () => {
  let [workSpaceList, setWorkSpaceList] = useState([])
  let { push } = useRouter()
  return (
    <div className="max-w-7xl w-full mx-auto px-3 md:px-6 mt-8 md:mt-20">
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-medium">Hello, Good Morning</h3>
        <Button onClick={() => push('/createworkspace')} className="rounded-full text-white p-1.5">
          <Plus />
        </Button>
      </div>
      <div className="flex justify-between items-center mt-14">
        <h3 className="text-blue-500 font-medium text-xl">Workspaces</h3>
        <div className="flex items-center gap-3">
          <button>
            <LayoutGrid />
          </button>
          <button>
            <SlidersHorizontal />
          </button>
        </div>
      </div>
      {workSpaceList.length == 0 ? (
        <div className="md:mt-8 flex justify-center items-center w-full flex-col  text-center">
          <img src="/images/workspace.webp" />
          <h3 className="font-medium mb-4 text-2xl">Create a new workspace</h3>
          <p>
            Workspaces let you plan, think, and create together — all in the
            same place
          </p>
          <Button onClick={() => push('/createworkspace')} variant="outline" className="bg-transparent flex gap-3 py-1.5 mt-3 px-2">
            <Plus />
            New Workspace
          </Button>
        </div>
      ) : (
        <div>
          Workspce List
        </div>
      )}
    </div>
  )
}

export default WorkSpace
