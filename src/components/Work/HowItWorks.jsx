import React from "react";
import { FaUserPlus, FaFileAlt, FaBullhorn, FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";

function HowItWorks() {
  const steps = [
    {
      title: "Create an Account",
      description:
        "Sign up for free, set up your profile, and get ready to showcase your skills.",
      icon: <FaUserPlus className="text-4xl text-green-500" />,
    },
    {
      title: "Post Your Gig",
      description:
        "Create a gig by providing details about the services you offer, including pricing, delivery time, and any additional options.",
      icon: <FaFileAlt className="text-4xl text-blue-500" />,
    },
    {
      title: "Attract Clients",
      description:
        "Once your gig is live, clients can find and hire you for the services you offer. Make sure to optimize your gig to stand out.",
      icon: <FaBullhorn className="text-4xl text-purple-500" />,
    },
    {
      title: "Deliver Great Work",
      description:
        "Communicate with your clients, deliver the work on time, and ensure they are satisfied with your service.",
      icon: <FaCheckCircle className="text-4xl text-yellow-500" />,
    },
    {
      title: "Get Paid",
      description:
        "After completing the job, you’ll receive payment directly into your account. Continue to grow your business by delivering exceptional service.",
      icon: <FaMoneyBillWave className="text-4xl text-red-500" />,
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center flex flex-col items-center">
              <div className="mb-6 p-4 bg-white rounded-full shadow-lg">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
