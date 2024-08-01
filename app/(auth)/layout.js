import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className=" m-0  bg-[#52bced1f] lg:bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/212 p-6 sm:p-12">
          <div className="flex gap-4 items-center justify-center md:justify-start mt-8 md:mt-0">
            <img src="/images/Sync.png" className="w-[80px] h-auto" />
            <h4 className="text-3xl font-bold">Microsoft Sync</h4>
          </div>

          <div className="mt-12 flex flex-col items-center">{children}</div>
        </div>
        <div className="flex-1 bg-[#529bed1f] text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("/images/login.svg")',
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default Layout
