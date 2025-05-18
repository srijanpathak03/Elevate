import React from "react";
import { useRouter } from "next/router";

function BuyPremium() {
  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push("/");
  };

  return (
    <div style={{ margin: 0, padding: 0, position: 'absolute', top: 70, left: 0, right: 0 }}>
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Header Section */}
      <div className="bg-black text-white w-full text-center py-12">
        <h1 className="text-4xl font-bold">Unlock Premium Features</h1>
        <p className="mt-4 text-lg">Choose the plan that suits you best and take your freelancing to the next level.</p>
      </div>
      {/* Plan Section */}
      <div className="flex flex-col md:flex-row gap-8 my-12 px-4 md:px-12">
        {/* Free Tier */}
        <div className="bg-white shadow-md rounded-lg p-8 flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">Free Tier</h2>
          <p className="mt-4 text-gray-600">Access essential features for freelancers starting their journey.</p>
          <ul className="mt-6 space-y-4 text-gray-600">
            <li>Basic Gig Creation</li>
            <li>Standard Profile</li>
            <li>Access to Job Listings</li>
            <li>Limited AI-Based Matching</li>
          </ul>
          <button
            onClick={handleGetStartedClick}
            className="mt-8 w-full py-3 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition duration-300"
          >
            Get Started for Free
          </button>
        </div>

        {/* Premium Tier */}
        <div className="bg-white shadow-md rounded-lg p-8 flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">Premium Tier</h2>
          <p className="mt-4 text-gray-600">Unlock all features and maximize your freelancing potential.</p>
          <ul className="mt-6 space-y-4 text-gray-600">
            <li>Unlimited Gig Creation</li>
            <li>AI-Based Search & Matching</li>
            <li>Priority Profile Customization</li>
            <li>Advanced Analytics & Insights</li>
            <li>Priority Support</li>
            <li>Ad-Free Experience</li>
          </ul>
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700">Choose Your Plan</h3>
            <div className="flex gap-4 mt-4">
              <button className="w-1/2 py-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition duration-300">
                $12.99 / Month
              </button>
              <button className="w-1/2 py-3 bg-blue-700 text-white font-bold rounded hover:bg-blue-800 transition duration-300">
                $129.99 / Year
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default BuyPremium;
