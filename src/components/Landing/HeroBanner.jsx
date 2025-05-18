import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

function HomeBanner() {
  const router = useRouter();
  const [searchData, setSearchData] = useState("");

  return (
    <div className="relative h-[680px] bg-gradient-to-r from-black to-gray-800">
    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900 opacity-40"></div>
    <div className="absolute inset-0">
  <svg
    className="absolute top-0 left-0 w-full h-full object-cover"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-30 10 500 100" // Shift viewBox to the left and adjust the dimensions
    fill="none"
    style={{ transform: 'scaleX(1.0) scaleY(5.0)' }} // Make it thinner and longer
  >
    <path
      d="M0,0 L100,0 L100,80 L50,60 L0,80 Z"
      fill="#1DBF73" 
    />
  </svg>
</div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6 md:px-12 lg:px-24 text-center">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Discover top&nbsp;
          <span className="italic text-yellow-400">freelancers</span>
          <br />
          for your next project
        </h1>
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-full sm:w-[450px] flex items-center">
            <input
              type="text"
              className="w-full h-12 pl-12 pr-4 rounded-l-lg border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
              placeholder='Try "building a website"'
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
            <IoSearchOutline className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-500 text-xl" />
          </div>
          <button
            className="bg-green-500 text-white px-6 py-3 text-lg font-semibold rounded-r-lg shadow-md hover:bg-green-600 transition-all duration-300"
            onClick={() => router.push(`/search?q=${searchData}`)}
          >
            Search
          </button>
        </div>
        <div className="text-white">
          <p className="text-lg mb-2">Popular:</p>
          <ul className="flex flex-wrap gap-4 justify-center">
            {["Website Design", "Wordpress", "Logo Design", "AI Solutions"].map((item) => (
              <li
                key={item}
                className="text-sm py-2 px-4 border border-white rounded-full cursor-pointer hover:bg-yellow-400 hover:text-black transition-all duration-300"
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
