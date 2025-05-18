import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import {
  HOST,
  IMAGES_URL,
  SET_USER_IMAGE,
  SET_USER_INFO,
} from "../utils/constants";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Profile() {
  const router = useRouter();
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
        await axios.post(
          SET_USER_INFO,
          payload,
          { withCredentials: true }
        );
      } else {
        // Check for username conflicts
        const response = await axios.post(
          SET_USER_INFO,
          payload,
          { withCredentials: true }
        );

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
        } = await axios.post(SET_USER_IMAGE, formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        imageName = img;
      }

      dispatch({
        type: reducerCases.SET_USER,
        userInfo: {
          ...userInfo,
          ...data,
          image: imageName ? `${HOST}/${imageName}` : userInfo.image,
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
    "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500";
  const labelClassName = "mb-2 text-lg font-medium text-gray-900";

  // Skeleton Loader Styles
  const skeletonClassName = "animate-pulse bg-gray-200 rounded-lg";

  return (
    <>
      {isLoaded ? (
        <div className="flex flex-col items-center justify-start min-h-[80vh] gap-6">
          {errorMessage && (
            <div className="text-red-600 font-bold">{errorMessage}</div>
          )}
          <h2 className="text-3xl font-bold">Welcome to Elevate !</h2>
          <h4 className="text-xl font-medium text-gray-700">
            Please complete your profile to get started
          </h4>
          <div className="flex flex-col items-center w-full gap-5">
            <div
              className="relative flex flex-col items-center cursor-pointer"
              onMouseEnter={() => setImageHover(true)}
              onMouseLeave={() => setImageHover(false)}
            >
              <label className={labelClassName} htmlFor="profileImage">
                Select a Profile Picture
              </label>
              <div className="bg-purple-500 h-36 w-36 flex items-center justify-center rounded-full relative">
                {image ? (
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="Profile"
                    fill
                    className="rounded-full object-cover"
                  />
                ) : (
                  <span className="text-6xl text-white">
                    {userInfo.email[0].toUpperCase()}
                  </span>
                )}
                <div
                  className={`absolute bg-slate-400 h-full w-full rounded-full flex items-center justify-center transition-opacity duration-200 ${
                    imageHover ? "opacity-80" : "opacity-0"
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
                      className="opacity-0"
                      accept="image/*"
                    />
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full md:flex-row md:gap-4 md:w-[600px]">
              <div className="flex-1">
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

            <div className="flex flex-col w-full md:w-[600px]">
              <label className={labelClassName} htmlFor="description">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={data.description}
                onChange={handleChange}
                className={`${inputClassName} h-24 resize-none`}
                placeholder="Tell us about yourself"
              ></textarea>
            </div>

            <button
              className={`border text-lg font-semibold px-6 py-3 rounded-md transition-all duration-200 ${
                loading
                  ? "bg-gray-500 text-white cursor-not-allowed"
                  : "bg-[#1DBF73] text-white hover:bg-[#17a363]"
              }`}
              type="button"
              onClick={setProfile}
              disabled={loading}
            >
              {loading ? "Updating..." : "Set Profile"}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-start min-h-[80vh] gap-6">
          <div className={`${skeletonClassName} h-8 w-64 mb-4`} />
          <div className={`${skeletonClassName} h-8 w-64 mb-4`} />
          <div className={`${skeletonClassName} h-36 w-36 mb-4`} />
          <div className={`${skeletonClassName} h-12 w-full mb-4`} />
          <div className={`${skeletonClassName} h-12 w-full mb-4`} />
          <div className={`${skeletonClassName} h-24 w-full`} />
        </div>
      )}
    </>
  );
}

export default Profile;
