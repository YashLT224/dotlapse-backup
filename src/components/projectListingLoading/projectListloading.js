import React from "react";

const ProjectListloading = () => {
  const listing = () => {
    let arr = [];
    for (let i = 0; i < 8; i++) {
      arr.push(
        <div
          key={i}
          className="flex px-4 py-4 border  border-t-0 border-l-0 border-r-0  border-gray-300 bg-white-500 animate-pulse"
        >
          <div className=" flex-col bg-white-800 px-4 w-7/12">
            <div className="flex items-center bg-gray-350 ">
              <p className="text-xl font-lato py-2 text-gray-300">
                Visual UI Regression Testing{" "}
              </p>
            </div>

            <div className="flex flex-wrap">
              <div className="bg-gray-350  text-gray-350 px-4 mr-2 py-0.5 mt-1">
                {" "}
                Magic Leap UI
              </div>
              <div className="bg-gray-350  text-gray-350 px-4 py-0.5 mr-2 mt-1">
                {" "}
                Magic Leap UI
              </div>
              <div className="bg-gray-350  text-gray-350 px-4 mr-2 py-0.5 mt-1">
                {" "}
                Magic Leap UI
              </div>
            </div>
          </div>

          <div className="flex-col bg-white-500 w-1/12 justify-center items-center ml-5 ">
            <p className="text-gray-350 text-center font-lato bg-gray-350 text-xl   py-2">
              Builds:
            </p>
            <p className="bg-gray-350  w-full  text-gray-350 px-4 py-0.5 mr-2 mt-1">
              {" "}
              100
            </p>
          </div>
          <div className="flex-col items-center justify-center  bg-white-500 w-2/12 ml-8">
            <p className="text-gray-350     text-center font-lato  bg-gray-350 text-xl   py-2">
              Approvers:
            </p>
            <div className="bg-gray-350  w-full  text-gray-350 px-4 py-0.5 mr-2 mt-1">
              Approvers
            </div>
          </div>

          <div className="flex bg-gray-350  justify-center items-center  opacity-100 w-2/12 ml-8">
            <div className="flex">
              <svg
                className="w-8 h-8 border p-2 border-gray-350 rounded-lg mr-1 text-gray-350"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                className="w-8 h-8 border p-2 border-gray-350 rounded-lg mr-1 text-gray-350"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
            </div>
          </div>
        </div>
      );
    }
    return arr;
  };

  return <> {listing()}</>;
};

export default ProjectListloading;
