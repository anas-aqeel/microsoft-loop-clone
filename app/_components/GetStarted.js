import React, { useState, useRef } from 'react';

const GetStarted = () => {
  const [activeTab, setActiveTab] = useState(0);
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

  const tabs = [
    {
      title: 'Let Loop do the searching for you',
      text: 'Quickly kick off projects with intelligent suggestions, page templates, and an insert menu at your fingertips to easily add what you need to work together',
      videoSrc: "https://s7d2.scene7.com/is/content/microsoftcorp/00%20GetstartedHd_video_en-us"
    },
    {
      title: 'Save time with page templates',
      text: 'Use page templates to quickly provide context for your project, take meaningful notes, or make a team decision.',
      videoSrc: "https://s7d2.scene7.com/is/content/microsoftcorp/00%20TemplatesHd_video_en-us"
    },
    {
      title: 'Easily insert items in the flow of your page',
      text: 'Add items directly into your workspace, making it easier to organize and manage your tasks without switching between apps.',
      videoSrc: "https://s7d2.scene7.com/is/content/microsoftcorp/00%20SlashmenuHd_video_en-us"
    }
  ];

  return (
    <div className="max-w-[1380px] mx-auto p-4 lg:p-8 text-center">
      <h2 className="text-2xl lg:text-3xl font-medium text-gray-900 mb-4">
        Get started easily
      </h2>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto" >
        Quickly kick off projects with intelligent suggestions, page templates, and an insert menu at your fingertips to easily add what you need to work together.
      </p>

      <div className="flex flex-col lg:flex-row gap-x-10 mt-20 overflow-x-auto">
        {/* Tabs Section */}
        <div className="w-full lg:w-[30%] flex justify-center lg:justify-start mb-8 lg:flex-col gap-y-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`text-left px-4 py-2 font-medium ${activeTab === index ? 'text-blue-600 lg:border-l-4 border-l-0 lg:border-b-0 border-b-4  border-blue-600' : 'text-gray-900'
                }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-[70%] flex flex-col gap-y-4 items-center lg:items-end">

          <div className="relative">
            <video
              ref={videoRef}
              className="w-full h-auto"
              autoPlay
              loop
              muted
              playsInline
              poster="/images/poster.png"
              key={tabs[activeTab].videoSrc}  // Ensures video updates when tab changes
            >
              <source src={tabs[activeTab].videoSrc} type="video/mp4" />
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
                  className="w-6 h-6"
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
                  className="w-6 h-6"
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
          <div className="mb-4 text-lg text-start mt-5">
            <h2 className='text-2xl font-medium'>{tabs[activeTab].title}</h2>
            <p className='mt-3 text-gray-600'>

              {tabs[activeTab].text}
            </p>
          </div>


        </div>
      </div>
    </div>
  );
};

export default GetStarted;
