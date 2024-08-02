"use client"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from 'react'
import DataTable from "../../_components/DataTable"
import { getDoc } from "firebase/firestore"
import { useWorkspace } from "../_context"
import { Loader2 } from "lucide-react"

const page = () => {
  let {push} = useRouter()
  let {workspaceId} = useParams()
  let { data, setData, loading } = useWorkspace()

  return (
    loading ? (<div className="w-full mt-10 flex justify-center items-center">
      <Loader2 size={42} className="animate-spin" />
    </div>) :
      (
        <DataTable dataList={data.documents} onClickFunc={(ducumentid) => { push(`/workspace/${workspaceId}/${ducumentid}`) }} />

      )
  )
}

export default page