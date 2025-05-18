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
        "Benefit from a secure escrow system that holds funds until the project is completed to your satisfaction. Pay only when you’re happy with the work.",
    },
    {
      title: "Advanced search & AI insights",
      subtitle:
        "Utilize our extensive search features and AI-powered recommendations to find the best opportunities or the right freelancer for your project.",
    },
  ];

  return (
    <div className="relative overflow-hidden py-20 px-24">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 opacity-20 -z-10"></div>
      <div className="relative z-10 p-8 bg-white rounded-3xl shadow-lg">
        <h2 className="text-4xl mb-5 text-[#404145] font-bold">
          Discover the best features of our freelancing platform
        </h2>
        <ul className="flex flex-col gap-10">
          {everythingData.map(({ title, subtitle }) => (
            <li key={title}>
              <div className="flex gap-2 items-center text-xl">
                <BsCheckCircle className="text-[#62646a]" />
                <h4>{title}</h4>
              </div>
              <p className="text-[#62646a]">{subtitle}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 -z-20">
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
    </div>
  );
}

export default Everything;
