import React from 'react';

const WorkTogether = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8 flex flex-col lg:flex-row items-center gap-x-8">
      {/* Text Section */}
      <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
        <h2 className="text-2xl lg:text-3xl font-medium text-gray-900 mb-4">
          Work together wherever, whenever
        </h2>
        <p className="text-gray-600">
          Communicate ideas asynchronously, collaborate, and stay in touch wherever you are despite time zone differences, commutes, and work style preferences.
        </p>
      </div>

      {/* Image Section */}
      <div className="relative w-full lg:w-2/3 flex justify-center lg:justify-end">
        <img
          src="/images/comment.png"
          alt="Work together wherever, whenever"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default WorkTogether;
