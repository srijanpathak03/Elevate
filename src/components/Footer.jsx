import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          {/* Social Links */}
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a
              href="https://www.linkedin.com/in/srijan-pathak-346981252/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-400 hover:text-yellow-500 transition duration-300"
            >
              <FaLinkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </a>
            <a
              href="https://github.com/Srijan-Pathak"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-400 hover:text-yellow-500 transition duration-300"
            >
              <FaGithub className="w-5 h-5 mr-2" />
              GitHub
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row md:space-x-8 mb-6 md:mb-0">
            <a href="/" className="hover:text-yellow-500 transition duration-300">Home</a>
            <a href="/" className="hover:text-yellow-500 transition duration-300">About</a>
            <a href="/" className="hover:text-yellow-500 transition duration-300">Contact</a>
            <a href="/" className="hover:text-yellow-500 transition duration-300">Privacy Policy</a>
          </div>
        </div>

        <div className="text-center text-gray-400">
          <p className="text-sm">&copy; {new Date().getFullYear()} Elevate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
