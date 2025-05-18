import AuthWrapper from "../components/AuthWrapper";
import Footer from "../components/Footer";
import Everything from "../components/Landing/Everything";
import HeroBanner from "../components/Landing/HeroBanner";
import PopularServices from "../components/Landing/PopularServices";
import Services from "../components/Landing/Services";
import Navbar from "../components/Navbar";
import { useStateProvider } from "../context/StateContext";
import React from "react";
import Head from "next/head";

function Index() {
  const [{ showLoginModal, showSignupModal }] = useStateProvider();
  
  return (
    <>
      <Head>
        <title>Elevate - Find Top Freelancers for Your Projects</title>
        <meta name="description" content="Elevate connects you with skilled freelancers for your business needs. Find the perfect match for your next project." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <HeroBanner />
          <div className="mx-auto max-w-7xl">
            <Services />
            <PopularServices />
            <Everything />
          </div>
        </main>
        <Footer />
        {(showLoginModal || showSignupModal) && (
          <AuthWrapper type={showLoginModal ? "login" : "signup"} />
        )}
      </div>
    </>
  );
}

export default Index;
