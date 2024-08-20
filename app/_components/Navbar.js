import { useRouter } from 'next/navigation';
import React from 'react';

const ActionButtons = () => {
  let { push } = useRouter()
  return (
    <div className="flex items-center space-x-4">
      {/* Search */}
      <div className="hidden sm:flex items-center space-x-1">
        <span className="text-gray-700">Search</span>
        <svg
          className="h-5 w-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35m2.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>

      {/* Try Now Button */}
      <button onClick={() => { push('/dashboard') }} className="border border-gray-500 text-gray-700 px-3 py-1 rounded hover:shadow-md transition duration-150 ease-in-out">
        Try now
      </button>

      {/* Sign In Button */}
      <button onClick={() => { push('/sign-in') }} className="border border-gray-500 text-gray-700 px-3 py-1 rounded hover:shadow-md transition duration-150 ease-in-out">
        Sign in
      </button>
    </div>
  );
};


const Navbar = () => {


  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-[1380px] mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="h-6 w-auto"
                src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31"
                alt="Microsoft"
              />

            </div>
            <div className="hidden -my-px sm:ml-6 lg:flex sm:space-x-8">
              <p
                className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
              >
                Microsoft Loop
              </p>
              <p
                className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
              >
                Overview
              </p>
              <p
                className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
              >
                More Microsoft 365
              </p>
            </div>
          </div>
          <ActionButtons />
          
        </div>
      </div>


    </nav>
  );
};

export default Navbar;
