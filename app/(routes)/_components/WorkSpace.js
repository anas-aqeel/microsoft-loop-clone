"use client"
import React, { useEffect, useState } from 'react'
import { LayoutGrid, MoreHorizontalIcon, Plus, SlidersHorizontal, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuth, useUser } from '@clerk/nextjs'
import { collection, getDocs, where, query } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import DataTable from './DataTable'

const WorkSpace = () => {

  let [workSpaceList, setWorkSpaceList] = useState([]);
  let { orgId, userId } = useAuth();
  let id = orgId ? orgId : userId;

  let fetchData = async () => {
    const querySnapshot = await getDocs(query(collection(db, "workspace"), where("orgId", "==", id)));
    const workspaces = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setWorkSpaceList(workspaces);
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  let { push } = useRouter();

  return (
    <div className="max-w-7xl w-full mx-auto px-3 md:px-6 mt-8 md:mt-20">
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-medium">Hello, Good Morning</h3>
        <Button onClick={() => push('/createworkspace')} className="rounded-full text-white p-1.5">
          <Plus />
        </Button>
      </div>
      <div className="flex justify-between items-center mt-14">
        <h3 className="text-black font-medium text-2xl">Workspaces</h3>
        <div className="flex items-center gap-3 text-blue-900">
          <button>
            <LayoutGrid />
          </button>
          <button>
            <SlidersHorizontal />
          </button>
        </div>
      </div>
      {workSpaceList.length == 0 ? (
        <div className="md:mt-8 flex justify-center items-center w-full flex-col text-center">
          <img src="/images/workspace.webp" alt="No workspace" />
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
        <DataTable dataList={workSpaceList} onClickFunc={(id) => push(`/workspace/${id}`)} />
        // <div className='mt-12'>
        //   <div className="w-full">
        //     <div className='flex justify-between text-blue-400 text-lg'>
        //       <div className=''>
        //         Name
        //       </div>
        //       <div className=''>
        //         Actions
        //       </div>
        //     </div>
        //     <div className='mt-6'>
        //       {workSpaceList.map((workspace) => (
        //         <button
        //         onClick={()=>{
        //           push(`/workspace/${workspace.id}`)
        //         }}
        //         key={workspace.id} className="group  w-full flex justify-between items-center py-2 cursor-pointer hover:bg-slate-200 px-2 rounded-lg outline-none border-b">
        //           <div className="py-2 flex items-center gap-4">
        //             {workspace.emoji ? workspace.emoji : <img src='/icons/document.svg' />}
        //             {workspace.title}
        //           </div>
        //           <div className="flex items-center gap-3 text-sm text-purple-500">
        //             <Button variant="outline" className="group-hover:visible invisible h-8 w-8 rounded-full p-0 bg-transparent border border-purple-500">
        //               <MoreHorizontalIcon size={16} className=' ' />
        //             </Button>
        //             <Star size={18} />
        //           </div>
        //         </button>
        //       ))}
        //     </div>
        //   </div>
        // </div>
      )}
    </div>
  )
}

export default WorkSpace
