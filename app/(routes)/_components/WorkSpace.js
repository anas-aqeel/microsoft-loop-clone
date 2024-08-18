"use client"
import React, { useEffect, useState } from 'react'
import { ExternalLink, FilePenLine, LayoutGrid, MoreHorizontalIcon, Plus, SlidersHorizontal, Star, Trash2, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuth, useUser } from '@clerk/nextjs'
import { collection, getDocs, where, query, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import DataTable from './DataTable'
import { toast } from '@/components/ui/use-toast'
import EditStyleBox from './EditStyleBox'

const WorkSpace = () => {

  let [workSpaceList, setWorkSpaceList] = useState([]);
  let { orgId, userId } = useAuth();
  let id = orgId ? orgId : userId;
  let [loading, setLoading] = useState(true)

  let fetchData = async () => {
    try {
      const querySnapshot = await getDocs(query(collection(db, "workspace"), where("orgId", "==", id)));
      const workspaces = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWorkSpaceList(workspaces);
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)

    }

  }

  useEffect(() => {
    !loading && setLoading(true)
    fetchData();
  }, [id]);

  let [modal, setModal] = useState({
    open: false,
    labels: {
      title: "Update Workspace Information",
      subtitle: "Edit your Workspace information. Keep it short and sweet.",
      name: "Workspace Name",
    },
    workspaceId: '',
    close: () => setModal({ ...modal, open: false }),

  })

  let deleteDocument = async (id) => {
    try {
      await deleteDoc(doc(db, "workspace", id))
      setWorkSpaceList([...workSpaceList.filter((workspace) => workspace.id !== id)])
      toast({ title: "Workspace deleted", description: "Workspace has been deleted", variant: "destructive" })

    } catch (e) {
      toast({ title: "Error", description: "Something went wrong", variant: "destructive" })
    }
  }

  const menuData = {
    group1: [
      { label: "Open", icon: ExternalLink, onClick: (id) => push('/workspace/' + id) },
      { label: "Rename and style", icon: FilePenLine, onClick: (id) => setModal({ ...modal, open: true, workspaceId: id }) },
    ],
    group2: [
      { label: "Delete", icon: Trash2, onClick: (id) => deleteDocument(id) },
    ],
  };
  let { push } = useRouter();


  let [style, setStyle] = useState('table')
  return (
    <>
      {modal.open && <EditStyleBox close={modal.close} open={modal.open} collection='workspace' documentId={modal.workspaceId} labels={modal.labels} />}
      <div className="max-w-7xl w-full mx-auto px-3 md:px-6 mt-8 md:mt-20">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-medium">Hello, Good Morning</h3>
          <Button onClick={() => push('/createworkspace')} className="rounded-full text-white p-1.5">
            <Plus />
          </Button>
        </div>
        <div className="flex justify-between items-center mt-14">
          <h3 className="text-black font-medium text-2xl">Workspaces</h3>
          <div className="flex items-center gap-1 text-blue-900">
            <button className={`h-10 w-10 text-xs flex justify-center items-center  rounded-full transition-all   ${style == 'grid' ? 'shadow-md bg-white to-black' : 'bg-transparent hover:bg-slate-200'}`} onClick={() => setStyle('grid')}>
              <LayoutGrid size={18} />
            </button>
            <button className={`h-10 w-10 text-xs flex justify-center items-center  rounded-full  transition-all  ${style == 'table' ? 'shadow-md bg-white to-black' : 'bg-transparent hover:bg-slate-200'}`} onClick={() => setStyle('table')}>
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>
        {loading ? (
          <div className="md:mt-24 flex justify-center items-center w-full flex-col text-center gap-5">
            <img src="/images/loader.png" alt="No workspace" className='w-32 h-auto animate-spin' />
            <h3 className="mb-4 text-xl animate-pulse">Loading workspaces</h3>
          </div>
        ) : workSpaceList.length == 0 ? (
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
          <DataTable dataList={workSpaceList} type={style} onClickFunc={(id) => push(`/workspace/${id}`)} options={menuData} />

        )}
      </div>
    </>
  )
}

export default WorkSpace
