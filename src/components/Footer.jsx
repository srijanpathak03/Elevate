import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white py-8 mt-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Elevate</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Connecting talented freelancers with clients worldwide. Find the perfect match for your project needs.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/srijan-pathak-346981252/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#1DBF73] transition duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://github.com/Srijan-Pathak"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#1DBF73] transition duration-300"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#1DBF73] transition duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#1DBF73] transition duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#1DBF73] transition duration-300">Home</Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-400 hover:text-[#1DBF73] transition duration-300">Find Services</Link>
              </li>
              <li>
                <Link href="/premium" className="text-gray-400 hover:text-[#1DBF73] transition duration-300">Premium</Link>
              </li>
              <li>
                <Link href="/work" className="text-gray-400 hover:text-[#1DBF73] transition duration-300">Become a Seller</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#1DBF73] transition duration-300">Help Center</Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#1DBF73] transition duration-300">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#1DBF73] transition duration-300">Terms of Service</Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#1DBF73] transition duration-300">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Elevate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
