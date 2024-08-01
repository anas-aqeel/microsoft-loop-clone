'use client'
import { OrganizationSwitcher, useAuth, UserButton } from '@clerk/nextjs'
import React from 'react'

const Header = ({ logo = true }) => {
  let { orgId } = useAuth()
  return (
    <div className="  ">
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
