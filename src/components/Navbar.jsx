import React, { useEffect, useState } from "react";
import MyLogo from "./Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCookies } from "react-cookie";
import axios from "axios";
import { GET_USER_INFO, HOST } from "../utils/constants";
import ContextMenu from "./ContextMenu";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import { FaStar, FaBriefcase, FaUserTie } from "react-icons/fa"; // Added icons

function Navbar() {
  const [cookies] = useCookies();
  const router = useRouter();
  const [navFixed, setNavFixed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
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
  };

  const handleModeSwitch = () => {
    if (isSeller) {
      dispatch({ type: reducerCases.SWITCH_MODE });
      router.push("/");
    } else {
      dispatch({ type: reducerCases.SWITCH_MODE });
      router.push("/work");
    }
  };

  useEffect(() => {
    if (cookies.jwt && !userInfo) {
      const getUserInfo = async () => {
        try {
          const {
            data: { user },
          } = await axios.post(
            GET_USER_INFO,
            {},
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${cookies.jwt}`,
              },
            }
          );

          let projectedUserInfo = { ...user };
          if (user.image) {
            projectedUserInfo = {
              ...projectedUserInfo,
              imageName: HOST + "/" + user.image,
            };
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
          <ul className="flex gap-4 items-center relative">
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
                      src={userInfo.imageName}
                      alt="Profile"
                      width={28}
                      height={28}
                      className="rounded-full"
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
          {isContextMenuVisible && <ContextMenu data={ContextMenuData} />}
        </nav>
      )}
    </>
  );
}

export default Navbar;
