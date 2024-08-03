"use client"
import { useParams, useRouter } from "next/navigation"
import React from 'react'
import DataTable from "../../_components/DataTable"
import { useWorkspace } from "../_context"
import { ExternalLink, FilePenLine, Loader2, Trash2, UserPlus } from "lucide-react"

const page = () => {
  let { push } = useRouter()
  let { workspaceId } = useParams()
  let { data, setData, loading } = useWorkspace()


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
  return (
    loading ? (<div className="w-full mt-10 flex justify-center items-center">
      <Loader2 size={42} className="animate-spin" />
    </div>) :
      (
        <>
          <DataTable options={menuData} dataList={data.documents} onClickFunc={(ducumentid) => { push(`/workspace/${workspaceId}/${ducumentid}`) }} />
        </>

      )
  )
}

export default page