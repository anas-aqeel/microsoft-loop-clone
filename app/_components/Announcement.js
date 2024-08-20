import React from 'react';

const Announcement = () => {
  return (
    <div className="bg-purple-900 text-white text-center py-14">
      <h2 className="text-xl lg:text-2xl font-semibold mb-2">
        See the Microsoft Loop announcement
      </h2>
      <a 
        href="https://techcommunity.microsoft.com/t5/microsoft-365-blog/microsoft-loop-built-for-the-new-way-of-work-generally-available/ba-p/3982247" 
        className="text-white hover:underline inline-flex items-center"
      >
        Read the blog 
        <svg
          className="ml-1 w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M12.293 4.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L13 6.414V17a1 1 0 11-2 0V6.414L4.707 10.707a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </div>
  );
};

export default Announcement;
