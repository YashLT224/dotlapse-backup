import React from "react";
import { Link } from "react-router-dom";
const Breadcrum = ({
  projectname,
  buildname,
  projectid,
  buildid,
  totalbuilds,
  type,
}) => {
  return (
    <div
      style={{ top: "0px" }}
      className="flex items-center  sticky w-full bg-gray-0  pb-0.5 pt-3 pl-4 z-10"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <Link to="/" className="text-teal-450 font-light text-sm  ">
        Projects{" "}
      </Link>

      {type === "projectlisting" && projectname !== "" && (
        <p className="text-gray-600 font-light text-sm"> /{projectname}</p>
      )}

      {type === "buildlisting" && projectname !== "" && (
        <Link
          to={`/builds?projectid=${projectid}&projectname=${projectname}&totalbuilds=${totalbuilds}`}
          className="text-gray-600 font-light text-sm"
        >
          /{projectname}
        </Link>
      )}

      {type === "buildlisting" && buildname !== "" && (
        <p className="text-gray-600 font-light text-sm"> /{buildname}</p>
      )}
    </div>
  );
};

export default Breadcrum;
