import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { Linkedin } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Description */}
          <div className="flex items-center mb-6 md:mb-0">
            <img
              src="/images/anas-aqeel.png"
              alt="Anas Aqeel"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-semibold">Anas Aqeel</h2>
              <p className="mt-2 text-gray-400">Building seamless interfaces—Anas Aqeel, Frontend Developer.</p>
            </div>
          </div>
          {/* Links */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <a href="https://anasaqeel.vercel.app/about" target='_blank' className="hover:underline">About</a>
            <a href="https://anasaqeel.vercel.app/projects" target='_blank' className="hover:underline">Projects</a>
            <a href="https://anasaqeel.vercel.app/blog" target='_blank' className="hover:underline">Blogs</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com/in/anas452111/" className="hover:text-gray-400">
              <Linkedin
                className="w-5 h-5"

              />
            </a>
            <a href="https://github.com/anas-aqeel" className="hover:text-gray-400">
              <GitHubLogoIcon
                className="w-5 h-5"

              />
            </a>
            <a href="https://github.com/anas-aqeel" className="hover:text-gray-400">
              <TwitterLogoIcon
                className="w-5 h-5"

              />
            </a>


          </div>

          {/* Copyright */}
          <div className="text-gray-400 mt-6 md:mt-0">
            © {new Date().getFullYear()} Anas Aqeel. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
