import React from 'react';

const Copilot = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      <div className="flex flex-col md:flex-row items-center  bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="w-full md:1/2 lg:w-3/4">

          <img
            src="/images/copilot.png"
            alt="Copilot in Loop"
            className="w-full h-auto "
          />

        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 p-6 lg:p-10">
          <h2 className="text-4xl font-medium text-gray-900 mb-4">Copilot in Loop</h2>
          <p className="text-gray-600 mb-6">
            Unlock the power of shared thinking - co-create, get up-to-speed, and stay in sync with your teammates.
          </p>
          <a
            href="#"
            className="text-blue-600 hover:underline font-medium"
          >
            Learn what’s possible with Copilot &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

export default Copilot;
