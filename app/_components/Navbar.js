import React, { useState } from 'react';

const ActionButtons = () => {
  return (
    <div className="hidden sm:flex items-center space-x-4">
      {/* Search */}
      <div className="flex items-center space-x-1">
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
      <button className="border border-gray-500 text-gray-700 px-3 py-1 rounded hover:shadow-md transition duration-150 ease-in-out">
        Try now
      </button>

      {/* Sign In Button */}
      <button className="border border-gray-500 text-gray-700 px-3 py-1 rounded hover:shadow-md transition duration-150 ease-in-out">
        Sign in
      </button>
    </div>
  );
};


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-[1440px] mx-auto px-4">
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
              <a
                href="#"
                className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
              >
                Microsoft Loop
              </a>
              <a
                href="#"
                className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
              >
                Overview
              </a>
              <a
                href="#"
                className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
              >
                More Microsoft 365
              </a>
            </div>
          </div>
          <ActionButtons />
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className={`${isOpen ? 'hidden' : 'inline-flex'}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  className={`${isOpen ? 'inline-flex' : 'hidden'}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <a
            href="#"
            className="block pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base font-medium text-gray-900 bg-indigo-50 focus:outline-none focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out"
          >
            Microsoft Loop
          </a>
          <a
            href="#"
            className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-900 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
          >
            Overview
          </a>
          <a
            href="#"
            className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-900 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
          >
            More Microsoft 365
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
