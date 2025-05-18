import React from "react";
import { BsCheckCircle } from "react-icons/bs";

function Everything() {
  const everythingData = [
    {
      title: "Find the perfect freelance job",
      subtitle:
        "Browse a marketplace filled with short-term and project-based opportunities tailored to your skills and preferences.",
    },
    {
      title: "Showcase your skills",
      subtitle:
        "Create a detailed profile with your skills, experience, and portfolio. Let employers find you based on your expertise.",
    },
    {
      title: "Secure payments with escrow",
      subtitle:
        "Benefit from a secure escrow system that holds funds until the project is completed to your satisfaction. Pay only when you're happy with the work.",
    },
    {
      title: "Advanced search & AI insights",
      subtitle:
        "Utilize our extensive search features and AI-powered recommendations to find the best opportunities or the right freelancer for your project.",
    },
  ];

  return (
    <div className="relative overflow-hidden py-10 md:py-16 lg:py-20 px-4 sm:px-8 md:px-12 lg:px-24">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 opacity-20 -z-10"></div>
      <div className="relative z-10 p-5 sm:p-6 md:p-8 bg-white rounded-xl md:rounded-2xl lg:rounded-3xl shadow-xl backdrop-blur-sm bg-white/90">
        <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 md:mb-5 text-gray-800 font-bold text-center md:text-left">
          Discover the best features of our freelancing platform
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#1DBF73] to-[#19A463] mx-auto md:mx-0 mb-6 md:mb-8 rounded-full"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          {everythingData.map(({ title, subtitle }, index) => (
            <div 
              key={title} 
              className="feature-card p-5 rounded-lg border border-gray-100 hover:border-[#1DBF73]/30 transition-all duration-300 hover:shadow-md bg-white"
            >
              <div className="flex gap-3 items-start mb-2">
                <div className="mt-1 text-[#1DBF73]">
                  <BsCheckCircle size={20} />
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">{title}</h4>
                  <p className="text-gray-600 text-sm md:text-base">{subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 -z-20 hidden lg:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-[300px] h-[300px]"
          fill="none"
        >
          <path
            d="M0,0 C30,30 70,30 100,0 L100,100 L0,100 Z"
            fill="#1DBF73"
          />
        </svg>
      </div>
      
      {/* Mobile decorative elements */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#1DBF73]/10 -z-10 lg:hidden"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-yellow-400/10 -z-10 lg:hidden"></div>
    </div>
  );
}

export default Everything;
