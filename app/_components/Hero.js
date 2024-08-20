"use client"
import React from 'react';

import { useEffect, useRef } from 'react';

const VideoPlayer = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(error => {
        console.log('Autoplay failed:', error);
      });
    }
  }, []);

  return (
    <div className="shadow-xl rounded-lg">
      <video
        ref={videoRef}
        className="w-full h-auto z-[5000]"
        loop
        poster="/images/poster.png"
        muted
        autoPlay
        playsInline
      >
        <source src="/videos/loop.mp4" type="video/mp4" />
      </video>
    </div>
  );
};





const Hero = () => {
  return (
    <div className="bg-white">
      {/* Top section with text */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Microsoft Loop
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Think, plan, and create together
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href="#"
            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Get started with Loop
          </a>

        </div>
      </div>

      {/* Bottom section with image */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VideoPlayer />
        </div>
      </div>
    </div>
  );
};

export default Hero;
