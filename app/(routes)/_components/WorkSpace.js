"use client"
import React, { useState } from 'react'
import { LayoutGrid, Plus, SlidersHorizontal } from 'lucide-react'

const WorkSpace = () => {
  let [workSpaceList, setWorkSpaceList] = useState([])
  return (
    <div className="max-w-7xl w-full mx-auto px-3 md:px-6 mt-8 md:mt-20">
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-medium">Hello, Good Morning</h3>
        <button className="bg-black rounded-full text-white p-1.5 font-bold">
          <Plus />
        </button>
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
          <button className="flex items-center gap-2 py-1.5 mt-3 px-2 rounded-md border border-gray-400">
            <Plus />
            New Workspace
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default WorkSpace
