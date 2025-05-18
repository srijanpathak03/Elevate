import { useCookies } from "react-cookie";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "../utils/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useRouter } from "next/router";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AuthWrapper({ type }) {
  const [cookies, setCookies] = useCookies();
  const [{ showLoginModal, showSignupModal }, dispatch] = useStateProvider();
  const router = useRouter();
  const [values, setValues] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cookies.jwt) {
      dispatch({ type: reducerCases.CLOSE_AUTH_MODAL });
      router.push("/dashboard");
    }
  }, [cookies, dispatch, router]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const { email, password } = values;
      if (email && password) {
        const { data } = await axios.post(
          type === "login" ? LOGIN_ROUTE : SIGNUP_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        const { user, jwt } = data;
        setCookies("jwt", jwt);
        dispatch({ type: reducerCases.CLOSE_AUTH_MODAL });

        if (user) {
          dispatch({ type: reducerCases.SET_USER, userInfo: user });
          toast.success("Login Successful!");
          window.location.reload();
        }
      }
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        if (status === 401) {
          toast.error("Incorrect email or password.");
        } else if (status === 404) {
          toast.error("Email does not exist.");
        } else if (status === 409) {
          toast.error("Email already exists.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const html = document.querySelector("html");
    const authModal = document.querySelector("#auth-modal");
    const blurDiv = document.querySelector("#blur-div");
    html.style.overflowY = "hidden";
    const handleBlurDivClick = () => {
      // dispatch(closeAuthModal());
    };
    const handleAuthModalClick = (e) => {
      // e.stopPropagation();
    };
    authModal?.addEventListener("click", handleAuthModalClick);
    blurDiv?.addEventListener("click", handleBlurDivClick);

    return () => {
      const html = document.querySelector("html");
      html.style.overflowY = "initial";
      blurDiv?.removeEventListener("click", handleBlurDivClick);
      authModal?.removeEventListener("click", handleAuthModalClick);
    };
  }, [dispatch, showLoginModal, showSignupModal]);

  return (
    <div className="fixed top-0 z-[100]">
      <div
        className="h-[100vh] w-[100vw] backdrop-blur-md fixed top-0"
        id="blur-div"
      ></div>
      <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center">
        <div
          className="fixed z-[101] h-max w-max bg-white flex flex-col justify-center items-center"
          id="auth-modal"
        >
          <div className="flex flex-col justify-center items-center p-8 gap-7">
            <h3 className="text-2xl font-semibold text-slate-700">
              {type === "login" ? "Login" : "Sign"}
              in to Elevate
            </h3>
            <div className="flex flex-col gap-5">
              <button className="text-white bg-blue-500 p-3 font-semibold w-80 flex items-center justify-center relative">
                <MdFacebook className="absolute left-4 text-2xl" />
                Continue with Facebook
              </button>
              <button className="border border-slate-300 p-3 font-medium w-80 flex items-center justify-center relative">
                <FcGoogle className="absolute left-4 text-2xl" />
                Continue with Google
              </button>
            </div>
            <div className="relative w-full text-center">
              <span className="before:content-[''] before:h-[0.5px] before:w-80 before:absolute before:top-[50%] before:left-0 before:bg-slate-400">
                <span className="bg-white relative z-10 px-2">OR</span>
              </span>
            </div>
            <div className="flex flex-col gap-5">
              <input
                type="text"
                name="email"
                placeholder="Email / Username"
                className="border border-slate-300 p-3 w-80"
                onChange={handleChange}
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="border border-slate-300 p-3 w-80"
                  name="password"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <MdVisibilityOff className="text-2xl text-gray-500" />
                  ) : (
                    <MdVisibility className="text-2xl text-gray-500" />
                  )}
                </button>
              </div>
              <button
                className="bg-[#1DBF73] text-white px-12 text-lg font-semibold rounded-r-md p-3 w-80 flex items-center justify-center relative"
                onClick={handleClick}
                type="button"
                disabled={loading}
              >
                {loading ? (
                  <svg className="w-6 h-6 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12a8 8 0 1116 0A8 8 0 014 12zm0 0l-4-4m4 4l4-4m0 8l4-4m-4 4l-4-4" />
                  </svg>
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </div>
          <div className="py-5 w-full flex items-center justify-center border-t border-slate-400">
            <span className="text-sm text-slate-700">
              {type === "login" ? (
                <>
                  Not a member yet?&nbsp;
                  <span
                    className="text-[#1DBF73] cursor-pointer"
                    onClick={() => {
                      dispatch({
                        type: reducerCases.TOGGLE_SIGNUP_MODAL,
                        showSignupModal: true,
                      });
                      dispatch({
                        type: reducerCases.TOGGLE_LOGIN_MODAL,
                        showLoginModal: false,
                      });
                    }}
                  >
                    Join Now
                  </span>
                </>
              ) : (
                <>
                  Already a member?&nbsp;
                  <span
                    className="text-[#1DBF73] cursor-pointer"
                    onClick={() => {
                      dispatch({
                        type: reducerCases.TOGGLE_LOGIN_MODAL,
                        showLoginModal: true,
                      });
                      dispatch({
                        type: reducerCases.TOGGLE_SIGNUP_MODAL,
                        showSignupModal: false,
                      });
                    }}
                  >
                    Login
                  </span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AuthWrapper;
