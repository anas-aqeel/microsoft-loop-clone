'use client'
import { db } from '@/config/FirebaseConfig'
import { OrganizationSwitcher, useAuth, UserButton, useUser } from '@clerk/nextjs'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'

const Header = ({ logo = true }) => {
  let { user } = useUser()

  let saveUserInfo = async () => {
    const docSnapshot = await getDoc(doc(db, "users", user.id));
    if (!docSnapshot.exists()) {
      try {
        await setDoc(doc(db, "users", user.id), {
          name: user.fullName,
          avatar: user.imageUrl,
          email: user.primaryEmailAddress.emailAddress
        })

      } catch (error) {
        console.error(error.message)
      }
    }
  }

  useEffect(() => {
    user && saveUserInfo()
  }, [user])
  return (
    <div className="sticky bg-white top-0 z-50 right-0 left-0">
      <div
        className="flex justify-between py-2.5 px-3  items-center
       mx-auto"
      >
        <div className={`flex items-center gap-2 ${logo ? 'visible' : 'invisible'}`}>
          <img src="/images/Sync.png" className="w-[40px] h-auto" />
          <h5 className="font-black text-xl">Sync</h5>
        </div>
        <OrganizationSwitcher
          afterCreateOrganizationUrl={'/dashboard#:slug'}
          afterSelectOrganizationUrl={'/dashboard#:slug'}
          afterSelectPersonalUrl={'/dashboard'}
          afterLeaveOrganizationUrl="/dashboard"
          appearance={{
            elements: {},
          }}
        />
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'h-9 w-9 border border-gray-200 ',
              userButtonBox: ' shadow-none',
            },
          }}
        />
      </div>
    </div>
  )
}

export default Header
