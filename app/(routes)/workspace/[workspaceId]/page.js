"use client"
import { useParams, useRouter } from "next/navigation"
import React from 'react'
import DataTable from "../../_components/DataTable"
import { useWorkspace } from "../_context"
import { ExternalLink, FilePenLine, Loader2, Trash2, UserPlus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import EditStyleBox from "../../_components/EditStyleBox"
import { ShareDialog } from "../../_components/ShareDialog"

const page = () => {
  let { push } = useRouter()
  let { workspaceId } = useParams()
  let { data, loading, modal, menuData } = useWorkspace()



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