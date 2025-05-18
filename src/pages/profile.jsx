import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import {
  HOST,
  IMAGES_URL,
  SET_USER_IMAGE,
  SET_USER_INFO,
} from "../utils/constants";
import axios from "axios";
import apiClient from "../utils/apiClient";
import Image from "next/image";
import { imageLoader } from "../utils/imageLoader";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function Profile() {
  const router = useRouter();
  const [cookies] = useCookies();
  const [{ userInfo }, dispatch] = useStateProvider();
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageHover, setImageHover] = useState(false);
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    userName: "",
    fullName: "",
    description: "",
  });

  useEffect(() => {
    if (userInfo) {
      setData({
        userName: userInfo.username || "",
        fullName: userInfo.fullName || "",
        description: userInfo.description || "",
      });

      if (userInfo.imageName) {
        fetch(userInfo.imageName).then(async (response) => {
          const contentType = response.headers.get("content-type");
          const blob = await response.blob();
          const file = new File([blob], userInfo.imageName, { type: contentType });
          setImage(file);
        });
      }

      setIsLoaded(true);
    }
  }, [userInfo]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (file && validImageTypes.includes(file.type)) {
      setImage(file);
    } else {
      setErrorMessage("Please select a valid image file (jpg, png, gif).");
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const setProfile = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const payload = { ...data };
      
      // Check if the username is the same as the existing one
      if (userInfo.username === data.userName) {
        // Send the profile update request without checking for username conflicts
        await apiClient.post(SET_USER_INFO, payload);
      } else {
        // Check for username conflicts
        const response = await apiClient.post(SET_USER_INFO, payload);

        if (response.data.userNameError) {
          setErrorMessage("Username already taken. Please choose another.");
          setLoading(false);
          return;
        }
      }

      let imageName = "";
      if (image) {
        const formData = new FormData();
        formData.append("images", image);
        const {
          data: { img },
        } = await apiClient.post(SET_USER_IMAGE, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${cookies.jwt}`,
          },
        });
        imageName = img;
      }

      // Handle image URL correctly based on environment
      let imageUrl = userInfo.image;
      if (imageName) {
        // Check if the image path already includes the host
        if (imageName.startsWith('http')) {
          imageUrl = imageName;
        } else {
          imageUrl = `${HOST}/${imageName}`;
        }
      }

      dispatch({
        type: reducerCases.SET_USER,
        userInfo: {
          ...userInfo,
          ...data,
          image: imageUrl,
        },
      });

      router.push("/");
    } catch (err) {
      console.error("Profile update failed:", err);
      setErrorMessage("An error occurred while updating your profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClassName =
    "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300";
  const labelClassName = "mb-2 text-lg font-medium text-gray-900";

  // Skeleton Loader Styles
  const skeletonClassName = "animate-pulse bg-gray-200 rounded-lg";

  return (
    <>
      {isLoaded ? (
        <div className="flex flex-col items-center justify-start min-h-[80vh] gap-6 max-w-4xl mx-auto px-4 py-8">
          {errorMessage && (
            <div className="text-red-600 font-bold bg-red-50 p-4 rounded-lg border border-red-200 w-full text-center">
              {errorMessage}
            </div>
          )}
          <div className="w-full text-center space-y-2 mb-4">
            <h2 className="text-4xl font-bold text-gray-800">Welcome to Elevate!</h2>
            <h4 className="text-xl font-medium text-gray-600">
              Complete your profile to showcase your talents
            </h4>
          </div>
          <div className="flex flex-col items-center w-full gap-8 bg-white p-8 rounded-xl shadow-md">
            <div
              className="relative flex flex-col items-center cursor-pointer"
              onMouseEnter={() => setImageHover(true)}
              onMouseLeave={() => setImageHover(false)}
            >
              <label className={`${labelClassName} text-center`} htmlFor="profileImage">
                Select a Profile Picture
              </label>
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 h-40 w-40 flex items-center justify-center rounded-full relative shadow-lg">
                {image ? (
                  <Image
                    loader={imageLoader}
                    src={URL.createObjectURL(image)}
                    alt="Profile"
                    fill
                    className="rounded-full object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="text-6xl text-white font-bold">
                    {userInfo.email && userInfo.email[0].toUpperCase()}
                  </span>
                )}
                <div
                  className={`absolute bg-black h-full w-full rounded-full flex items-center justify-center transition-opacity duration-300 ${
                    imageHover ? "opacity-60" : "opacity-0"
                  }`}
                >
                  <span className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-white absolute"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      type="file"
                      id="profileImage"
                      onChange={handleFileChange}
                      className="opacity-0 w-full h-full cursor-pointer"
                      accept="image/*"
                    />
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Click to upload a new image</p>
            </div>

            <div className="flex flex-col w-full md:flex-row md:gap-6 md:w-full">
              <div className="flex-1 mb-4 md:mb-0">
                <label className={labelClassName} htmlFor="userName">
                  Username
                </label>
                <input
                  className={inputClassName}
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="Username"
                  value={data.userName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <label className={labelClassName} htmlFor="fullName">
                  Full Name
                </label>
                <input
                  className={inputClassName}
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Full Name"
                  value={data.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label className={labelClassName} htmlFor="description">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={data.description}
                onChange={handleChange}
                className={`${inputClassName} h-32 resize-none`}
                placeholder="Tell us about yourself, your skills, and experience"
              ></textarea>
              <p className="text-sm text-gray-500 mt-1">
                A good description helps clients understand your expertise
              </p>
            </div>

            <button
              className={`w-full md:w-auto border text-lg font-semibold px-8 py-3 rounded-lg transition-all duration-300 ${
                loading
                  ? "bg-gray-500 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-[#1DBF73] to-[#19A463] text-white hover:shadow-lg hover:translate-y-[-2px]"
              }`}
              type="button"
              onClick={setProfile}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                "Save Profile"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-start min-h-[80vh] gap-6 max-w-4xl mx-auto px-4 py-8">
          <div className={`${skeletonClassName} h-10 w-64 mb-4`} />
          <div className={`${skeletonClassName} h-6 w-80 mb-8`} />
          <div className="bg-white p-8 rounded-xl shadow-md w-full">
            <div className="flex flex-col items-center">
              <div className={`${skeletonClassName} h-40 w-40 rounded-full mb-8`} />
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`${skeletonClassName} h-14 w-full`} />
                <div className={`${skeletonClassName} h-14 w-full`} />
              </div>
              <div className={`${skeletonClassName} h-32 w-full mt-6 mb-6`} />
              <div className={`${skeletonClassName} h-12 w-40 mt-4`} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
