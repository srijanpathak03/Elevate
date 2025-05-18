// @ts-nocheck
import Image from "next/image";
import React from "react";

function ImageUpload({ files, setFile }) {
  const { useState } = React;

  const [message, setMessage] = useState();
  const [isDragging, setIsDragging] = useState(false);
  
  const handleFile = (e) => {
    setMessage("");
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setFile([...files, file[i]]);
      } else {
        setMessage("Only images accepted (JPG, PNG, GIF)");
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setMessage("");
    
    const droppedFiles = e.dataTransfer.files;
    
    for (let i = 0; i < droppedFiles.length; i++) {
      const fileType = droppedFiles[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setFile([...files, droppedFiles[i]]);
      } else {
        setMessage("Only images accepted (JPG, PNG, GIF)");
      }
    }
  };

  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
  };
  
  return (
    <div className="w-full">
      {message && (
        <div className="text-red-500 bg-red-50 p-2 rounded-md mb-2 text-sm text-center">
          {message}
        </div>
      )}
      
      <div 
        className={`flex flex-col items-center justify-center w-full h-32 border-2 rounded-lg ${
          isDragging 
            ? "border-blue-400 bg-blue-50" 
            : "border-dashed border-gray-300 hover:bg-gray-50 hover:border-gray-400"
        } transition-all duration-200 cursor-pointer`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
          <div className="flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-10 h-10 ${isDragging ? "text-blue-500" : "text-gray-400"} transition-colors duration-200`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            <p className={`mt-2 text-sm ${isDragging ? "text-blue-500" : "text-gray-500"} transition-colors duration-200`}>
              {isDragging ? "Drop images here" : "Drag and drop or click to upload"}
            </p>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG, GIF</p>
          </div>
          <input
            type="file"
            onChange={handleFile}
            className="hidden"
            multiple={true}
            accept="image/*"
            name="files[]"
          />
        </label>
      </div>
      
      {files.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">{files.length} image{files.length !== 1 ? 's' : ''} selected</p>
          <div className="flex flex-wrap gap-3">
            {files.map((file, key) => (
              <div key={key} className="relative group">
                <div className="relative h-20 w-20 rounded-md overflow-hidden border border-gray-200">
                  <Image 
                    src={URL.createObjectURL(file)} 
                    fill 
                    alt="Gig preview" 
                    className="object-cover"
                  />
                </div>
                <button
                  onClick={() => removeImage(file.name)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md hover:bg-red-600 transition-colors duration-200"
                  title="Remove image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
