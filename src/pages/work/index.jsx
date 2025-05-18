import React from "react";
import PopularServices from "../../components/Landing/PopularServices";
import WorkHeroBanner from "../../components/Work/WorkHeroBanner";
import FeaturedGigs from "../../components/Work/WorkFeaturedGigs";
import HowItWorks from "../../components/Work/HowItWorks";
import WorkFooter from "../../components/Work/WorkFooter";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import { useStateProvider } from "../../context/StateContext";
import AuthWrapper from "../../components/AuthWrapper";

function Work() {
  const [{ showLoginModal, showSignupModal }] = useStateProvider();
  
  return (
    <div style={{ margin: 0, padding: 0, position: 'absolute', top: 0, left: 0, right: 0 }}>
      <Head>
        <title>Elevate - Showcase Your Talent as a Freelancer</title>
        <meta name="description" content="Join Elevate as a freelancer and showcase your skills to clients worldwide. Create gigs and start earning." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <WorkHeroBanner />
          <div className="mx-auto max-w-7xl">
            <HowItWorks />
            <FeaturedGigs />
          </div>
        </main>
        <WorkFooter />
        {(showLoginModal || showSignupModal) && (
          <AuthWrapper type={showLoginModal ? "login" : "signup"} />
        )}
      </div>
    </div>
  );
}

export default Work;
