import React, { useState, useRef } from 'react';

const Sync = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      <div className="flex flex-col lg:flex-row items-center gap-x-10">
        {/* Text Section */}
        <div className="w-full lg:w-[40%]">
          <h2 className="text-2xl lg:text-3xl font-medium text-gray-900 mb-4">
            Stay in sync without switching apps
          </h2>
          <p className="text-gray-600 mb-6">
            Get more done right where you are with Loop components that sync across apps in real time.
          </p>
        </div>

        {/* Image or Video Section */}
        <div className="relative w-full lg:w-[60%] flex justify-center items-center lg:justify-end">
          <video
            ref={videoRef}
            className="w-full h-auto"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="https://s7d2.scene7.com/is/content/microsoftcorp/00%20StayInSyncHd_video_en-us" type="video/mp4" />
          </video>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 bg-white p-2 rounded-full shadow-md hover:shadow-lg focus:outline-none"
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 9v6m4-6v6"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.752 11.168l-5.197-3.01A1 1 0 008 9v6a1 1 0 001.555.832l5.197-3.01a1 1 0 000-1.664z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sync;
