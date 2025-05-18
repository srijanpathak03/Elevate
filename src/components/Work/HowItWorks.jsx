import React from "react";
import { FaUserPlus, FaFileAlt, FaBullhorn, FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";

function HowItWorks() {
  const steps = [
    {
      title: "Create an Account",
      description:
        "Sign up for free, set up your profile, and get ready to showcase your skills.",
      icon: <FaUserPlus className="text-3xl sm:text-4xl text-green-500" />,
    },
    {
      title: "Post Your Gig",
      description:
        "Create a gig by providing details about the services you offer, including pricing, delivery time, and any additional options.",
      icon: <FaFileAlt className="text-3xl sm:text-4xl text-blue-500" />,
    },
    {
      title: "Attract Clients",
      description:
        "Once your gig is live, clients can find and hire you for the services you offer. Make sure to optimize your gig to stand out.",
      icon: <FaBullhorn className="text-3xl sm:text-4xl text-purple-500" />,
    },
    {
      title: "Deliver Great Work",
      description:
        "Communicate with your clients, deliver the work on time, and ensure they are satisfied with your service.",
      icon: <FaCheckCircle className="text-3xl sm:text-4xl text-yellow-500" />,
    },
    {
      title: "Get Paid",
      description:
        "After completing the job, you'll receive payment directly into your account. Continue to grow your business by delivering exceptional service.",
      icon: <FaMoneyBillWave className="text-3xl sm:text-4xl text-red-500" />,
    },
  ];

  return (
    <div className="py-10 sm:py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mt-4 rounded-full"></div>
        </div>
        
        {/* Mobile view: vertical steps */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-md">
              <div className="p-3 bg-white rounded-full shadow-md flex-shrink-0">
                {step.icon}
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Desktop view: horizontal steps */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="mb-4 p-4 bg-white rounded-full shadow-md">
                {step.icon}
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
