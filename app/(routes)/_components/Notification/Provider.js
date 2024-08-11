'use client'

import { db } from '@/config/FirebaseConfig'
import { useAuth, useUser } from '@clerk/nextjs'
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense'
import { doc, getDoc } from 'firebase/firestore'
import { Loader2 } from 'lucide-react'

export function Provider({ children, roomId }) {
  const { user } = useUser()
  const { userId, orgId } = useAuth()



  return (
    <LiveblocksProvider
      authEndpoint={async (room) => {
        const body = JSON.stringify({
          room: roomId,
        })
        try {
          const response = await fetch('/api/liveblocks-auth', {
            method: 'POST',
            body,
          })
          let data = await response.json()
          return data
        } catch (error) {
          console.log(error.message)
          return {}
        }
      }}
      resolveUsers={async ({ userIds: userEmails }) => {
        const ref = doc(db, 'users', orgId || userId)
        const documentSnapshot = await getDoc(ref)

        if (documentSnapshot.exists()) {
          const documentData = documentSnapshot.data()

          if (orgId) {
            return documentData.members.filter((member) =>
              userEmails.includes(member.email),
            )
          } else {
            return [documentData]
          }
        } else {
          console.error('Document does not exist')
          return []
        }
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const ref = doc(db, 'users', orgId || userId)
        const documentSnapshot = await getDoc(ref)

        if (documentSnapshot.exists()) {
          let userList = orgId
            ? documentSnapshot.data().members
            : [documentSnapshot.data()]

          if (text) {
            userList = userList.filter((user) => user.name.includes(text))
          }

          return userList
            .filter(
              (user_) => user_.email !== user.primaryEmailAddress.emailAddress,
            )
            .map((user) => user.email)
        } else {
          console.error('Document does not exist')
          return []
        }
      }}
    >
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<div className='animate-spin'><Loader2 /></div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
