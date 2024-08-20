import React from 'react';

const Control = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8 flex flex-col lg:flex-row items-center gap-x-8">
      {/* Image Section */}
      <div className="relative w-full lg:w-2/3 flex justify-center lg:justify-start">
        <img
          src="/images/chatbot.png"
          alt="Notifications"
          className="w-full h-auto"
        />
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-1/3">
        <h2 className="text-2xl lg:text-3xl font-medium text-gray-900 mb-4">
          Stay in control
        </h2>
        <p className="text-gray-600">
          Get only the notifications you care about and stay focused on what needs your attention.
        </p>
      </div>
    </div>
  );
};

export default Control;
