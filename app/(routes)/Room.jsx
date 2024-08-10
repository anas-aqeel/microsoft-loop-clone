'use client'

import { db } from '@/config/FirebaseConfig'
import { useAuth, useUser } from '@clerk/nextjs'
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense'
import { doc, getDoc } from 'firebase/firestore'
import { useParams } from 'next/navigation'

export function Room({ children }) {
  const { user } = useUser()
  const { userId, orgId } = useAuth()
  const { documentId } = useParams()

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
      resolveUsers={async ({ userIds:userEmails }) => {
        console.log('userEmails', userEmails)
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
      <RoomProvider id={documentId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
