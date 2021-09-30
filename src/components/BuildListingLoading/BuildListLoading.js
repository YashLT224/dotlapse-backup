import React from "react";

const BuildListLoading = ({ value }) => {
  console.log(value);
  const listing = () => {
    let arr = [];
    for (let i = 0; i < value; i++) {
      arr.push(
        <div className="flex   hover:opacity-100 border border-t-0 border-l-0 border-r-0 bg-white-600 border-gray-400 animate-pulse">
          <div className="flex  justify-center items-center w-1/6  bg-white-600">
            <h1 className="text-gray-350 text-4xl font-dm bg-gray-350 p-3">
              {10}
            </h1>

            <div className=" px-2  bg-gray-350 opacity-100 rounded-xs text-gray-350 text-xs mx-2 font-lato">
              markbaseline
            </div>
          </div>
          <div className=" flex flex-col flex-grow justify-center bg-white-900 mr-4 ">
            <p className="text-xs text-gray-350 bg-gray-350  font-lato mb-3 px-2 py-2">
              10 under Screening pending
            </p>
            <p className="text-xs text-gray-350 bg-gray-350 font-lato py-1 w-8/12">
              Started 24m ago by Yash Verma
            </p>
          </div>
          <div className="flex  bg-white-600  justify-center items-center w-1/5">
            <div className="flex-col mr-4">
              <p className="text-xs text-gray-350 bg-gray-350  font-lato mb-3 px-2 py-2">
                10 under Screening pending
              </p>
              <p className="text-xs  text-gray-350 bg-gray-350 py-1 text-right font-lato w-10/12 ">
                {" "}
                10 Snapshots
              </p>
            </div>
            <div className="w-10 h-10 bg-gray-350 rounded-3xl"></div>
          </div>
          <div className="flex py-4  w-2/12 justify-center items-center   bg-white-600 opacity-100 mr-4">
            <p className="text-gray-350 text-4xl font-dm bg-gray-350 p-3">
              {" "}
              MAKEbase
            </p>
          </div>
        </div>
      );
    }
    return arr;
  };
  return <div className="overscroll-none"> {listing()}</div>;
};

export default BuildListLoading;
