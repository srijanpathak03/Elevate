import React from "react";
import { useRouter } from "next/router";
import { FaPenNib, FaPlus } from "react-icons/fa";

function WorkHeroBanner() {
  const router = useRouter();

  return (
    <div className="relative bg-black text-white h-[500px] sm:h-[580px] md:h-[680px] flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-500 opacity-40"></div>
      
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
            fill="#FFD900" 
          />
        </svg>
      </div>
      
      {/* Mobile decorative element */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-yellow-500/30 to-transparent sm:hidden"></div>
      
      {/* Content Container */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Stand Out with Your <span className="italic text-yellow-400">Gig</span>
          <br className="hidden xs:block" />
          <span className="inline xs:hidden">&nbsp;</span>
          Showcase Your Talent
        </h1>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <button
            className="bg-green-500 text-white px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
            onClick={() => router.push('/seller/gigs/create')}
          >
            <FaPlus className="text-xl" />
            Create Gig
          </button>
          <button
            className="bg-yellow-400 text-black px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
            onClick={() => router.push('/seller/gigs')}
          >
            <FaPenNib className="text-xl" />
            My Gigs
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkHeroBanner;
