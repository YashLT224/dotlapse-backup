import React from "react";
import errorbot from "../../assets/generic/errorbot.svg";
const Handling = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-16">
      <img src={errorbot} alt="text" />
      <p className="mt-4 text-gray-600 text-xl">
        Nothing Found in this criteria
      </p>
    </div>
  );
};

export default Handling;
