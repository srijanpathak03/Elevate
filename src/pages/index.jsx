import AuthWrapper from "../components/AuthWrapper";
import Footer from "../components/Footer";
import Everything from "../components/Landing/Everything";
import HeroBanner from "../components/Landing/HeroBanner";
import PopularServices from "../components/Landing/PopularServices";
import Services from "../components/Landing/Services";
import Navbar from "../components/Navbar";
import { useStateProvider } from "../context/StateContext";
import React from "react";

function Index() {
  const [{ showLoginModal, showSignupModal }] = useStateProvider();
  
  return (
    <div>
      <Navbar/>
      <HeroBanner />
      <Services />
      <PopularServices />
      <Everything />
      <Footer/>
      {(showLoginModal || showSignupModal) && (
        <AuthWrapper type={showLoginModal ? "login" : "signup"} />
      )}
    </div>
  );
}

export default Index;
