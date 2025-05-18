import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function DiscountedServices() {
  const router = useRouter();
  const discountedServicesData = [
    { name: "Ai Artists", label: "Add talent to AI", image: "/service1.png" },
    { name: "Logo Design", label: "Build your brand", image: "/service2.jpeg" },
    {
      name: "Wordpress",
      label: "Customize your site",
      image: "/service3.jpeg",
    },
    {
      name: "Voice Over",
      label: "Share your message",
      image: "/service4.jpeg",
    },
    {
      name: "Social Media",
      label: "Reach more customers",
      image: "/service5.jpeg",
    },
    { name: "SEO", label: "Unlock growth online", image: "/service6.jpeg" },
    {
      name: "Illustration",
      label: "Color your dreams",
      image: "/service7.jpeg",
    },
    { name: "Translation", label: "Go global", image: "/service8.jpeg" },
  ];
  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-10 md:py-16">
      <div className="text-center md:text-left mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-800 font-bold leading-tight">
          Exclusive Discounted Services
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#1DBF73] to-[#19A463] mx-auto md:mx-0 mt-4 rounded-full"></div>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto md:mx-0">
          Explore our premium services at special rates designed to help you grow your business
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {discountedServicesData.map(({ name, label, image }) => {
          return (
            <div
              key={name}
              className="relative cursor-pointer group overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl"
              onClick={() => router.push(`/search?q=${name.toLowerCase()}`)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 transition-opacity duration-300"></div>
              <div className="absolute z-20 text-white p-5 bottom-0 w-full transition-all duration-300 group-hover:bottom-2">
                <span className="text-sm font-medium opacity-90">{label}</span>
                <h6 className="font-bold text-xl md:text-2xl mt-1">{name}</h6>
                <div className="h-0 overflow-hidden group-hover:h-6 transition-all duration-300">
                  <span className="inline-flex items-center text-sm mt-2 text-white/90">
                    <span>View services</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="h-60 sm:h-64 md:h-72 w-full relative transform transition-transform duration-500 group-hover:scale-105">
                <Image 
                  src={image} 
                  fill 
                  alt={`${name} service`}
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute top-3 right-3 z-20 bg-[#1DBF73] text-white text-xs font-bold px-2 py-1 rounded-full opacity-90">
                SALE
              </div>
            </div>
          );
        })}
      </div>
      
      {/* <div className="mt-10 text-center">
        <button 
          onClick={() => router.push('/search')}
          className="px-6 py-3 bg-gradient-to-r from-[#1DBF73] to-[#19A463] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
        >
          Explore All Services
        </button>
      </div> */}
    </div>
  );
}

export default DiscountedServices;
