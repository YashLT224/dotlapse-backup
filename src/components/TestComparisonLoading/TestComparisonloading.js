import React from "react";
import thumb from "../../assets/testdetailicons/Thumb.svg";

const TestComparisonloading = () => {
  const listing = () => {
    let arr = [];
    for (let i = 0; i < 8; i++) {
      arr.push(
        <div
          key={i}
          className="box-border  bg-white-600 rounded-lg p-4   cursor-pointer animate-pulse"
        >
          <div className="flex flex-wrap  justify-between items-center border  border-t-0 border-l-0 border-r-0  border-gray-300 pb-3">
            <p className="text-xs text-gray-350 font-lato mb-2 bg-gray-350 py-1 px-2 rounded-lg">
              Test ID:1234567891011
            </p>
            <p className="text-xs text-gray-350 font-lato mb-2 bg-gray-350 py-1 px-2 rounded-lg">
              Test ID:1234
            </p>

            <div className="h-48 w-full bg-gray-350"></div>
          </div>
        </div>
      );
    }
    return arr;
  };
  return <> {listing()}</>;
};

export default TestComparisonloading;
