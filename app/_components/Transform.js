import React from 'react';

const Transform = () => {
  return (
    <div className="">
      {/* Text Section */}
      <div className='max-w-[1380px] mx-auto text-center p-4 lg:p-8'>
        <h2 className="text-2xl lg:text-3xl font-medium text-gray-900 mb-4">
          Time to transform your work together
        </h2>
        <a
          href="/dashboard"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mb-4"
        >
          Get started with Loop
        </a>


      </div>

      {/* Image Section */}
      <div className="flex justify-center">
        <img
          src="/images/workspace.png"
          alt="Workspace"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Transform;
