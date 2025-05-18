import ImageUpload from "../../../components/ImageUpload";
import { categories } from "../../../utils/categories";
import { ADD_GIG_ROUTE } from "../../../utils/constants";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateGigs() {
  const [cookies] = useCookies();
  const router = useRouter();
  const [files, setFile] = useState([]);
  const [features, setFeatures] = useState([]);
  const [data, setData] = useState({
    title: "",
    category: "",
    description: "",
    time: 0,
    revisions: 0,
    feature: "",
    price: 0,
    shortDesc: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const inputClassName =
    "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300";
  const labelClassName = "mb-2 text-lg font-medium text-gray-900";

  const removeFeature = (index) => {
    const clonedFeatures = [...features];
    clonedFeatures.splice(index, 1);
    setFeatures(clonedFeatures);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addFeature = () => {
    if (data.feature) {
      setFeatures([...features, data.feature]);
      setData({ ...data, feature: "" });
    }
  };

  const validateFields = () => {
    const { category, description, price, revisions, time, title, shortDesc } = data;
    return (
      category &&
      description &&
      title &&
      features.length &&
      files.length &&
      price > 0 &&
      shortDesc.length &&
      revisions > 0 &&
      time > 0
    );
  };

  const addGig = async () => {
    setLoading(true);
    setError(null);

    if (validateFields()) {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));
      const gigData = {
        title: data.title,
        description: data.description,
        category: data.category,
        features: data.features,
        price: data.price,
        revisions: data.revisions,
        time: data.time,
        shortDesc: data.shortDesc,
      };
      
      try {
        const response = await axios.post(ADD_GIG_ROUTE, formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies.jwt}`,
          },
          params: gigData,
        });
        if (response.status === 201) {
          toast.success("Gig created successfully!");
          router.push("/seller/gigs");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong!");
        toast.error("Failed to create gig. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please fill all required fields.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-4 md:px-8 lg:px-16 xl:px-32 max-w-7xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick pauseOnHover />
      
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
          <div className="bg-white p-5 rounded-lg flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-4 border-green-500 border-solid rounded-full animate-spin mb-3"></div>
            <p className="text-gray-700">Creating your gig...</p>
          </div>
        </div>
      )}
      
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-3">Create a New Gig</h1>
        <h3 className="text-xl md:text-2xl text-gray-600">
          Showcase your skills and services to potential clients
        </h3>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <form className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className={labelClassName}>
                Gig Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                value={data.title}
                onChange={handleChange}
                type="text"
                id="title"
                className={inputClassName}
                placeholder="e.g. I will design a professional logo for your business"
                required
              />
              <p className="text-sm text-gray-500">
                A catchy title will attract more clients
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="categories" className={labelClassName}>
                Select a Category <span className="text-red-500">*</span>
              </label>
              <select
                id="categories"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 transition-all duration-200 hover:border-blue-300"
                name="category"
                onChange={handleChange}
                defaultValue="Choose a Category"
              >
                <option value="" disabled>Choose a Category</option>
                {categories.map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500">
                Choose the most relevant category for your service
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className={labelClassName}>
              Gig Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 min-h-[150px]"
              placeholder="Describe your services in detail. What makes your offering unique? What can clients expect?"
              name="description"
              value={data.description}
              onChange={handleChange}
            ></textarea>
            <p className="text-sm text-gray-500">
              A detailed description helps clients understand what you offer
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="delivery" className={labelClassName}>
                Delivery Time (days) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className={inputClassName}
                id="delivery"
                name="time"
                value={data.time}
                onChange={handleChange}
                placeholder="Delivery time in days"
                min="1"
              />
              <p className="text-sm text-gray-500">
                Be realistic about how long your service will take
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="revision" className={labelClassName}>
                Number of Revisions <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="revision"
                className={inputClassName}
                placeholder="Number of revisions included"
                name="revisions"
                value={data.revisions}
                onChange={handleChange}
                min="0"
              />
              <p className="text-sm text-gray-500">
                How many changes will you offer after initial delivery?
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label htmlFor="features" className={labelClassName}>
                Features <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  id="features"
                  className={inputClassName}
                  placeholder="e.g. Source files included"
                  name="feature"
                  value={data.feature}
                  onChange={handleChange}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                />
                <button
                  type="button"
                  className="focus:outline-none text-white bg-blue-600 hover:bg-blue-700 font-medium text-lg px-6 py-3 rounded-lg transition-all duration-200 whitespace-nowrap flex-shrink-0"
                  onClick={addFeature}
                >
                  Add
                </button>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-3">
                  List what's included in your service (minimum 1 feature)
                </p>
                <ul className="flex gap-2 flex-wrap">
                  {features.map((feature, index) => (
                    <li
                      key={feature + index.toString()}
                      className="flex gap-2 items-center py-2 px-4 mr-2 mb-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-200 transition-all duration-200"
                    >
                      <span>{feature}</span>
                      <span
                        className="text-red-600 hover:text-red-800 cursor-pointer ml-1"
                        onClick={() => removeFeature(index)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="image" className={labelClassName}>
                Gig Images <span className="text-red-500">*</span>
              </label>
              <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                <ImageUpload files={files} setFile={setFile} />
              </div>
              <p className="text-sm text-gray-500">
                High-quality images increase your chances of getting hired
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="shortDesc" className={labelClassName}>
                Short Description <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={inputClassName}
                id="shortDesc"
                placeholder="Brief summary of your service"
                name="shortDesc"
                value={data.shortDesc}
                onChange={handleChange}
              />
              <p className="text-sm text-gray-500">
                A concise summary that appears in search results
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="price" className={labelClassName}>
                Gig Price ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className={inputClassName}
                id="price"
                placeholder="Enter your price"
                name="price"
                value={data.price}
                onChange={handleChange}
                min="1"
              />
              <p className="text-sm text-gray-500">
                Set a competitive price for your services
              </p>
            </div>
          </div>
          
          <div className="pt-4">
            <button
              className="border text-lg font-semibold px-8 py-3 bg-gradient-to-r from-[#1DBF73] to-[#19A463] text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] flex items-center justify-center"
              type="button"
              onClick={addGig}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                "Create Gig"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGigs;
