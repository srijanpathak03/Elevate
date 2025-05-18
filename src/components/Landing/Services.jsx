import { categories } from "../../utils/categories";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function Services() {
  const router = useRouter();

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-10 md:py-16">
      <div className="text-center md:text-left mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-800 font-bold leading-tight">
          Discover Our Top Services
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#1DBF73] to-[#19A463] mx-auto md:mx-0 mt-4 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {categories.map(({ name, logo }) => (
          <div
            key={name}
            className="flex flex-col justify-center items-center cursor-pointer hover:shadow-xl hover:transform hover:scale-105 border border-gray-100 p-3 sm:p-4 md:p-6 rounded-lg transition-all duration-300 bg-white shadow-md hover:border-green-500"
            onClick={() => router.push(`/search?category=${name}`)}
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mb-2 sm:mb-3 md:mb-4">
              <Image
                src={logo}
                alt={name}
                fill
                className="object-contain transition-transform duration-300 transform hover:scale-110"
              />
            </div>
            <span className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-700 text-center">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
