import React, { useEffect } from "react";

const Pagination = ({
  currentpage,
  postsPerPage,
  totalPosts,
  paginate,
  previouspage,
  nextpage,
}) => {
  console.log(currentpage, postsPerPage, totalPosts);
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <>
      <div className="flex bg-white-500 items-center justify-center pb-8 pt-4">
        <div
          className="border border-gray-300 px-2 py-2 mx-0.5 text-xs hover:bg-gray-300"
          onClick={() => previouspage(currentpage)}
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
        </div>
        {pageNumber.map((number) => (
          <div
            className={
              number === currentpage
                ? "border border-gray-300 bg-teal-400 text-white px-4 py-2 mx-0.5 text-xs "
                : "border border-gray-300 px-4 py-2 mx-0.5 text-xs "
            }
            key={number}
            onClick={() => paginate(number)}
          >
            {number}
          </div>
        ))}
        <div
          className="border border-gray-300 px-2 py-2 mx-0.5 text-xs hover:bg-gray-300"
          onClick={() => nextpage(currentpage)}
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Pagination;
