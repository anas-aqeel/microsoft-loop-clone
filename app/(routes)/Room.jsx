'use client'

import { db } from '@/config/FirebaseConfig'
import { useClerk, useUser } from '@clerk/nextjs'
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { useParams } from 'next/navigation'

export function Room({ children }) {
  let { user } = useUser()
  let { documentId } = useParams()

  return (
    <LiveblocksProvider
      authEndpoint={async (room) => {
        const body = JSON.stringify({
          room,
          user,
        })

        const response = await fetch('/api/liveblocks-auth', {
          method: 'POST',
          body,
        })

        return await response.json()
      }}
      resolveUsers={async ({ userIds }) => {
        console.log(userIds)
        const q = query(collection(db, 'users'), where('email', 'in', userIds))
        const querySnapshot = await getDocs(q)
        const userList = []
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          userList.push(doc.data())
        })
        return userList
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const q = query(collection(db, 'users'), where('email', '!=', null))
        let userList = (await getDocs(q)).map((doc) => doc.data())

        if (text) {
          userList = userList.filter((user) => user.name.includes(text))
        }

        // Return a list of user IDs that match the query
        return userList
          .filter(
            (user_) => user_.email != user.primaryEmailAddress.emailAddress,
          )
          .map((user) => user.email)
      }}
    >
      <RoomProvider id={documentId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
