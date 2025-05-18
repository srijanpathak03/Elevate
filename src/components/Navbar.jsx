import React, { useEffect, useState } from "react";
import MyLogo from "./Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCookies } from "react-cookie";
import axios from "axios";
import { GET_USER_INFO, HOST } from "../utils/constants";
import apiClient from "../utils/apiClient";
import { imageLoader } from "../utils/imageLoader";
import ContextMenu from "./ContextMenu";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import { FaStar, FaBriefcase, FaUserTie, FaBars, FaTimes } from "react-icons/fa"; // Added icons

function Navbar() {
  const [cookies] = useCookies();
  const router = useRouter();
  const [navFixed, setNavFixed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [{ showLoginModal, showSignupModal, isSeller, userInfo }, dispatch] =
    useStateProvider();

  const handleLogin = () => {
    if (showSignupModal) {
      dispatch({
        type: reducerCases.TOGGLE_SIGNUP_MODAL,
        showSignupModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_LOGIN_MODAL,
      showLoginModal: true,
    });
    setMobileMenuOpen(false);
  };

  const handleSignup = () => {
    if (showLoginModal) {
      dispatch({
        type: reducerCases.TOGGLE_LOGIN_MODAL,
        showLoginModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_SIGNUP_MODAL,
      showSignupModal: true,
    });
    setMobileMenuOpen(false);
  };

  const links = [
    { linkName: "Log in", handler: handleLogin, type: "button" },
    { linkName: "Join", handler: handleSignup, type: "button2" },
  ];

  useEffect(() => {
    if (router.pathname === "/") {
      const positionNavbar = () => {
        window.pageYOffset > 0 ? setNavFixed(true) : setNavFixed(false);
      };
      window.addEventListener("scroll", positionNavbar);
      return () => window.removeEventListener("scroll", positionNavbar);
    } else {
      setNavFixed(true);
    }
  }, [router.pathname]);

  const handleOrdersNavigate = () => {
    if (isSeller) router.push("/seller/orders");
    router.push("/buyer/orders");
    setMobileMenuOpen(false);
  };

  const handleModeSwitch = () => {
    if (isSeller) {
      dispatch({ type: reducerCases.SWITCH_MODE });
      router.push("/");
    } else {
      dispatch({ type: reducerCases.SWITCH_MODE });
      router.push("/work");
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (cookies.jwt && !userInfo) {
      const getUserInfo = async () => {
        try {
          const {
            data: { user },
          } = await apiClient.post(GET_USER_INFO, {});

          let projectedUserInfo = { ...user };
          if (user.image) {
            if (user.image.startsWith('http')) {
              projectedUserInfo = {
                ...projectedUserInfo,
                imageName: user.image,
              };
            } else {
              projectedUserInfo = {
                ...projectedUserInfo,
                imageName: `${HOST}/${user.image}`,
              };
            }
          }
          delete projectedUserInfo.image;
          dispatch({
            type: reducerCases.SET_USER,
            userInfo: projectedUserInfo,
          });
          setIsLoaded(true);
          if (user.isProfileSet === false) {
            router.push("/profile");
          }
        } catch (err) {
          console.log(err);
        }
      };

      getUserInfo();
    } else {
      setIsLoaded(true);
    }
  }, [cookies, userInfo, dispatch]);

  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  useEffect(() => {
    const clickListener = (e) => {
      e.stopPropagation();
      if (isContextMenuVisible) setIsContextMenuVisible(false);
    };
    if (isContextMenuVisible) {
      window.addEventListener("click", clickListener);
    }
    return () => {
      window.removeEventListener("click", clickListener);
    };
  }, [isContextMenuVisible]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.pathname]);

  const ContextMenuData = [
    {
      name: "Profile",
      callback: (e) => {
        e.stopPropagation();
        setIsContextMenuVisible(false);
        router.push("/profile");
      },
    },
    {
      name: "Logout",
      callback: (e) => {
        e.stopPropagation();
        setIsContextMenuVisible(false);
        router.push("/logout");
      },
    },
  ];

  return (
    <>
      {isLoaded && (
        <nav
          className={`w-full px-4 flex justify-between items-center py-2 top-0 z-30 transition-all duration-300 ${
            navFixed || userInfo
              ? "fixed bg-black border-b border-gray-800 shadow-md"
              : "absolute bg-transparent border-transparent"
          }`}
        >
          <div>
            <Link href="/">
              <MyLogo
                fillColor={!navFixed && !userInfo ? "#ffffff" : "#ffffff"}
                className="h-6"
              />
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-4 items-center relative">
            <li className="relative group">
              <button
                className="flex items-center gap-2 text-yellow-400 font-semibold border border-yellow-400 py-1 px-3 rounded hover:bg-yellow-500 hover:text-white transition-colors duration-300"
                onClick={() => router.push("/premium")}
              >
                <FaStar /> Buy Premium
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-gray-800 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="p-3">
                  <p className="mb-2 font-semibold">Premium Benefits:</p>
                  <ul className="list-disc list-inside">
                    <li>Exclusive content</li>
                    <li>Priority support</li>
                    <li>Ad-free experience</li>
                  </ul>
                </div>
              </div>
            </li>
            {userInfo ? (
              <>
                {isSeller && (
                  <li
                    className="cursor-pointer text-[#1DBF73] text-sm font-medium flex items-center gap-1 hover:text-green-400 transition-colors duration-300"
                    onClick={() => router.push("/seller/gigs/create")}
                  >
                    <FaBriefcase />
                    Create Gig
                  </li>
                )}
                <li
                  className="cursor-pointer text-[#1DBF73] text-sm font-medium flex items-center gap-1 hover:text-green-400 transition-colors duration-300"
                  onClick={handleOrdersNavigate}
                >
                  <FaBriefcase />
                  My Orders
                </li>
                {isSeller ? (
                  <li
                    className="cursor-pointer text-sm font-medium text-gray-300 flex items-center gap-2 transition-colors duration-300 hover:text-[#1DBF73]"
                    onClick={handleModeSwitch}
                  >
                    <FaUserTie className="text-lg" /> Switch to Hiring
                  </li>
                ) : (
                  <li
                    className="cursor-pointer text-sm font-medium text-gray-300 flex items-center gap-2 transition-colors duration-300 hover:text-[#1DBF73]"
                    onClick={handleModeSwitch}
                  >
                    <FaBriefcase className="text-lg" /> Looking for Work?
                  </li>
                )}
                <li
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsContextMenuVisible(true);
                  }}
                  title="Profile"
                >
                  {userInfo?.imageName ? (
                    <Image
                      loader={imageLoader}
                      src={userInfo.imageName}
                      alt="Profile"
                      width={28}
                      height={28}
                      className="rounded-full"
                      unoptimized
                    />
                  ) : (
                    <div className="bg-purple-500 h-7 w-7 flex items-center justify-center rounded-full relative">
                      <span className="text-sm text-white">
                        {userInfo &&
                          userInfo?.email &&
                          userInfo?.email.split("")[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <>
                {links.map(({ linkName, handler, type }) => (
                  <li
                    key={linkName}
                    className={`${
                      navFixed ? "text-white" : "text-gray-300"
                    } font-medium`}
                  >
                    {type === "link" && <Link href={handler}>{linkName}</Link>}
                    {type === "button" && (
                      <button
                        onClick={handler}
                        className="text-white hover:text-gray-300 text-sm"
                      >
                        {linkName}
                      </button>
                    )}
                    {type === "button2" && (
                      <button
                        onClick={handler}
                        className={`border text-sm font-semibold py-1 px-2 rounded-sm ${
                          navFixed
                            ? "border-[#1DBF73] text-[#1DBF73]"
                            : "border-gray-600 text-gray-300"
                        } hover:bg-[#1DBF73] hover:text-white hover:border-[#1DBF73] transition-all duration-300`}
                      >
                        {linkName}
                      </button>
                    )}
                  </li>
                ))}
              </>
            )}
          </ul>
          
          {/* Mobile Navigation Menu */}
          <div 
            className={`fixed top-0 right-0 h-full w-full md:hidden bg-black bg-opacity-95 transform ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out z-40`}
          >
            <div className="flex flex-col p-8 pt-20">
              {userInfo ? (
                <>
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-800">
                    {userInfo?.imageName ? (
                      <Image
                        loader={imageLoader}
                        src={userInfo.imageName}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                        unoptimized
                      />
                    ) : (
                      <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full">
                        <span className="text-lg text-white">
                          {userInfo &&
                            userInfo?.email &&
                            userInfo?.email.split("")[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="text-white font-medium">{userInfo.fullName || userInfo.username || "User"}</p>
                      <p className="text-gray-400 text-sm">{userInfo.email}</p>
                    </div>
                  </div>
                  
                  <button
                    className="flex items-center justify-center gap-2 text-yellow-400 font-semibold border border-yellow-400 py-2 px-4 rounded mb-6 hover:bg-yellow-500 hover:text-white transition-colors duration-300 w-full"
                    onClick={() => {
                      router.push("/premium");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <FaStar /> Buy Premium
                  </button>
                  
                  <div className="flex flex-col gap-4">
                    <button
                      className="flex items-center gap-3 text-white py-2 hover:text-[#1DBF73] transition-colors"
                      onClick={() => {
                        router.push("/profile");
                        setMobileMenuOpen(false);
                      }}
                    >
                      <span className="w-6 text-center">👤</span> My Profile
                    </button>
                    
                    {isSeller && (
                      <button
                        className="flex items-center gap-3 text-white py-2 hover:text-[#1DBF73] transition-colors"
                        onClick={() => {
                          router.push("/seller/gigs/create");
                          setMobileMenuOpen(false);
                        }}
                      >
                        <span className="w-6 text-center"><FaBriefcase /></span> Create Gig
                      </button>
                    )}
                    
                    <button
                      className="flex items-center gap-3 text-white py-2 hover:text-[#1DBF73] transition-colors"
                      onClick={handleOrdersNavigate}
                    >
                      <span className="w-6 text-center">📋</span> My Orders
                    </button>
                    
                    <button
                      className="flex items-center gap-3 text-white py-2 hover:text-[#1DBF73] transition-colors"
                      onClick={handleModeSwitch}
                    >
                      <span className="w-6 text-center">
                        {isSeller ? <FaUserTie /> : <FaBriefcase />}
                      </span>
                      {isSeller ? "Switch to Hiring" : "Looking for Work?"}
                    </button>
                    
                    <button
                      className="flex items-center gap-3 text-white py-2 hover:text-[#1DBF73] transition-colors"
                      onClick={() => {
                        router.push("/logout");
                        setMobileMenuOpen(false);
                      }}
                    >
                      <span className="w-6 text-center">🚪</span> Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-4 items-center">
                    <button
                      onClick={handleLogin}
                      className="w-full py-3 text-white hover:text-[#1DBF73] text-lg font-medium transition-colors"
                    >
                      Log In
                    </button>
                    <button
                      onClick={handleSignup}
                      className="w-full py-3 border border-[#1DBF73] text-[#1DBF73] rounded-md hover:bg-[#1DBF73] hover:text-white transition-colors text-lg font-medium"
                    >
                      Join
                    </button>
                    <button
                      className="flex items-center justify-center gap-2 text-yellow-400 font-semibold border border-yellow-400 py-2 px-4 rounded mt-4 hover:bg-yellow-500 hover:text-white transition-colors duration-300 w-full"
                      onClick={() => {
                        router.push("/premium");
                        setMobileMenuOpen(false);
                      }}
                    >
                      <FaStar /> Buy Premium
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {isContextMenuVisible && <ContextMenu data={ContextMenuData} />}
        </nav>
      )}
    </>
  );
}

export default Navbar;
