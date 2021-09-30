//lib/packages import---------------------------------------------------------------------------------------------------------------------------
import React from "react";
//import assets/images/css files----------------------------------------------------------------------------------------------------
import User from "../assets/wh.gif";
import Breadcrum from "../components/Breadcrum/Breadcrum";
const FirstBuild = () => {
  return (
    <div className="flex-grow">
      <Breadcrum
        type=""
        projectname=""
        buildname=""
        projectid=""
        buildid=""
        totalbuilds=""
      />
      <div className="flex-col p-2 bg-gray-0">
        <div className="justify-center items-center flex">
          <img
            className="justify-center items-center h-80 w-96 "
            src={User}
            alt="text"
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="pb-8">
            <h1 className="text-4xl py-6 font-lato">
              Looking your first Build
            </h1>
            <div>
              <div class="relative h-1 rounded-lg">
                <div class="absolute w-full h-full bg-gray-200"></div>
                <div class="absolute w-2/6 h-full bg-blue-400"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="border border-gray-600 p-6 w-2/6 rounded-lg">
            <div className="flex mb-3">
              <div className="h-16.5 w-16 bg-gray-400 rounded-lg mr-3"></div>
              <h1 className="text-2xl font-bold font-lato ">
                Run your Visual <br />
                Regression Test
              </h1>
            </div>
            <h1 className="text-gray-500 font-lato">
              fetch the screenshots captured in you automation build and start
              regression testing
            </h1>

            <div className="flex items-center mt-4">
              <div className="bg-white-400 py-2 px-4 rounded-lg border border-gray-300 mr-2 font-lato cursor-pointer">
                Get Started
              </div>
              <div className="px-2 font-lato">See Docs</div>
            </div>
          </div>

          {/* <div className="border border-gray-600 p-6 w-2/6 rounded-lg">
            <div className="flex mb-3">
              <div className="h-16.5 w-16 bg-gray-400 rounded-lg mr-3"></div>
              <h1 className="text-2xl font-bold ">
                Import From <br />
                Your Automation Test
              </h1>
            </div>
            <h1 className="text-gray-500">
              fetch the screenshots captured in you automation build and start
              regression testing
            </h1>

            <div className="flex items-center mt-4">
              <div className="bg-white-400 py-2 px-4 rounded-lg border border-gray-300 mr-2">
                Select Builds
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FirstBuild;
