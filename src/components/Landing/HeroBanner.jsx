import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

function HomeBanner() {
  const router = useRouter();
  const [searchData, setSearchData] = useState("");

  return (
    <div className="relative h-[500px] sm:h-[580px] md:h-[680px] bg-gradient-to-r from-black to-gray-800">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900 opacity-40"></div>
      
      {/* Decorative SVG - hidden on small screens */}
      <div className="absolute inset-0 hidden sm:block">
        <svg
          className="absolute top-0 left-0 w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-30 10 500 100"
          fill="none"
          style={{ transform: 'scaleX(1.0) scaleY(5.0)' }}
        >
          <path
            d="M0,0 L100,0 L100,80 L50,60 L0,80 Z"
            fill="#1DBF73" 
          />
        </svg>
      </div>

      {/* Mobile decorative element */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#1DBF73]/30 to-transparent sm:hidden"></div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 sm:px-6 md:px-12 lg:px-24 text-center">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Discover top&nbsp;
          <span className="italic text-yellow-400">freelancers</span>
          <br className="hidden xs:block" />
          <span className="inline xs:hidden">&nbsp;</span>
          for your next project
        </h1>
        
        <div className="flex flex-col sm:flex-row items-center justify-center mb-6 w-full max-w-md sm:max-w-lg">
          <div className="relative w-full flex items-center mb-2 sm:mb-0">
            <input
              type="text"
              className="w-full h-12 pl-12 pr-4 rounded-lg sm:rounded-r-none border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
              placeholder='Try "building a website"'
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
            <IoSearchOutline className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-500 text-xl" />
          </div>
          <button
            className="bg-green-500 text-white px-6 py-3 text-lg font-semibold rounded-lg sm:rounded-l-none shadow-md hover:bg-green-600 transition-all duration-300 w-full sm:w-auto"
            onClick={() => router.push(`/search?q=${searchData}`)}
          >
            Search
          </button>
        </div>
        
        <div className="text-white">
          <p className="text-base sm:text-lg mb-2">Popular:</p>
          <ul className="flex flex-wrap gap-2 sm:gap-4 justify-center">
            {["Website Design", "Wordpress", "Logo Design", "AI Solutions"].map((item) => (
              <li
                key={item}
                className="text-xs sm:text-sm py-1 sm:py-2 px-3 sm:px-4 border border-white rounded-full cursor-pointer hover:bg-yellow-400 hover:text-black transition-all duration-300"
                onClick={() => router.push(`/search?q=${item}`)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
