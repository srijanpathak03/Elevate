import { categories } from "../../utils/categories";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function Services() {
  const router = useRouter();

  return (
    <div className="mx-6 md:mx-12 lg:mx-20 my-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl mb-12 text-gray-800 font-bold leading-tight">
      Discover Our Top Services
      </h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8">
        {categories.map(({ name, logo }) => (
          <li
            key={name}
            className="flex flex-col justify-center items-center cursor-pointer hover:shadow-xl hover:transform hover:scale-105 border-2 border-transparent p-6 rounded-lg transition-all duration-300 bg-white shadow-lg hover:border-green-500"
            onClick={() => router.push(`/search?category=${name}`)}
          >
            <Image
              src={logo}
              alt={name}
              height={60}
              width={60}
              className="mb-4 transition-transform duration-300 transform hover:scale-110"
            />
            <span className="text-lg font-medium text-gray-700">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Services;
