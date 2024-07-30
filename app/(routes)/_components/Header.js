import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Header = () => {
  return (
    <div className=" border-b border-gray-200 ">
      <div className="flex justify-between py-2 px-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <img src="/images/loop.png" className="w-[60px] h-auto" />
          <h5 className="font-black text-3xl">Loop</h5>
        </div>
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'h-12 w-12 border border-gray-200 ',
              userButtonBox: ' shadow-none',
            },
          }}
        />
      </div>
    </div>
  )
}

export default Header
