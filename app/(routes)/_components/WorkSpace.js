"use client"
import React, { useEffect, useState } from 'react'
import { ExternalLink, FilePenLine, LayoutGrid, MoreHorizontalIcon, Plus, SlidersHorizontal, Star, Trash2, UserPlus } from 'lucide-react'
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

  const menuData = {
    group1: [
      { label: "Open", icon: ExternalLink, onClick: () => console.log("Open clicked") },
      { label: "Rename and style", icon: FilePenLine, onClick: () => console.log("Rename and style clicked") },
      { label: "Members", icon: UserPlus, onClick: () => console.log("Members clicked") },
    ],
    group2: [
      { label: "Delete", icon: Trash2, onClick: () => console.log("Delete clicked") },
    ],
  };
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
        <DataTable dataList={workSpaceList} onClickFunc={(id) => push(`/workspace/${id}`)} options={menuData} />

      )}
    </div>
  )
}

export default WorkSpace
