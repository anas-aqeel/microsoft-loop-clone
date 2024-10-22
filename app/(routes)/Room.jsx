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

export function Room({ children, roomId }) {
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
        <ClientSideSuspense
          fallback={
            <div className="flex flex-col items-center justify-center h-full">
              <div className="relative">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
                </div>
              </div>
              <p className="mt-4 text-gray-600 text-sm">Loading...</p>
            </div>
          }
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
