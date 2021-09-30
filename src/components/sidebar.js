import React from "react";
import { Link } from "react-router-dom";
const sidebar = () => {
  return (
    <div className=" flex flex-col h-screen bg-red-900">
      <Link className="px-4 py-4" to="/" label="create">
        Create
      </Link>
      <Link className="px-4 py-4" to="/list" label="create">
        list
      </Link>
      <Link className="px-4 py-4" to="/firstBuild" label="create">
        FirstBuild
      </Link>
      <Link className="px-4 py-4" to="/builds" label="create">
        Build
      </Link>
      <Link className="px-4 py-4" to="/testDetail" label="create">
        Test Detail
      </Link>
    </div>
  );
};

export default sidebar;
