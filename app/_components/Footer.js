import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Description */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold">Microsoft Loop</h2>
            <p className="mt-2 text-gray-400">Transform your work, together.</p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Blog</a>
            <a href="#" className="hover:underline">Support</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.04c-5.52 0-10 4.48-10 10 0 5 3.66 9.13 8.44 9.88v-6.99h-2.54v-2.88h2.54v-2.19c0-2.5 1.5-3.88 3.76-3.88 1.07 0 2.22.19 2.22.19v2.43h-1.25c-1.23 0-1.62.76-1.62 1.53v1.91h2.77l-.44 2.88h-2.33v6.99c4.78-.75 8.44-4.88 8.44-9.88 0-5.52-4.48-10-10-10z" />
              </svg>
            </a>
            <a href="#" className="hover:text-gray-400">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.633 7.997c.014.202.014.403.014.605 0 6.146-4.68 13.226-13.226 13.226a13.2 13.2 0 01-7.123-2.087c.352.041.703.068 1.068.068a9.32 9.32 0 005.771-1.99 4.654 4.654 0 01-4.348-3.23c.277.041.554.068.845.068.403 0 .805-.054 1.18-.15a4.65 4.65 0 01-3.725-4.559v-.059a4.58 4.58 0 002.103.591 4.651 4.651 0 01-2.067-3.874c0-.853.218-1.648.603-2.338a13.194 13.194 0 009.558 4.847 5.241 5.241 0 01-.114-1.065 4.653 4.653 0 014.653-4.653 4.63 4.63 0 013.397 1.471 9.298 9.298 0 002.956-1.13 4.67 4.67 0 01-2.041 2.571 9.326 9.326 0 002.686-.732 10.079 10.079 0 01-2.335 2.43z" />
              </svg>
            </a>
            <a href="#" className="hover:text-gray-400">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.004 2c-5.521 0-9.996 4.476-9.996 9.996 0 5.522 4.475 9.996 9.996 9.996s9.996-4.474 9.996-9.996c0-5.521-4.475-9.996-9.996-9.996zm0 18.11a8.118 8.118 0 01-8.114-8.114 8.118 8.118 0 018.114-8.114 8.118 8.118 0 018.114 8.114 8.118 8.118 0 01-8.114 8.114zm0-13.4a5.273 5.273 0 00-5.27 5.27 5.273 5.273 0 005.27 5.271 5.273 5.273 0 005.27-5.27 5.273 5.273 0 00-5.27-5.271zm0 8.542a3.272 3.272 0 01-3.27-3.27 3.272 3.272 0 013.27-3.27 3.272 3.272 0 013.27 3.27 3.272 3.272 0 01-3.27 3.27zm4.687-8.062a1.16 1.16 0 100-2.32 1.16 1.16 0 000 2.32z" />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-gray-400 mt-6 md:mt-0">
            © {new Date().getFullYear()} Microsoft Loop. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
