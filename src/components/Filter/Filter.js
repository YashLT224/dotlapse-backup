import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import clearall from "../../assets/generic/clearall.svg";

import {
  GetTagsAction,
  GetApproversAction,
} from "../../services/actions/createNewProjectAction";
import "./filter.css";
const Filter = ({
  setDisplayfilterButton,
  setshowcalender,
  showcalender,
  buttontext,
  clearDateRangeHandler,
  setSelectedTagOption,
  setSelectedApproverOption,
  selectedApproverOption,
  selectedTagOption,
  clearAllFiltersHandler,
}) => {
  const dispatch = useDispatch();

  // reducer state
  const { data: ApproverLists } = useSelector(
    (state) => state.GetApproverListReducer
  );
  const { data: TagsList = [] } = useSelector(
    (state) => state.GetTagListReducer
  );

  const [ApproverList, setApproverList] = useState([]);
  // functions

  // useEffect
  useEffect(() => {
    dispatch(GetApproversAction());
    dispatch(GetTagsAction());
  }, []);

  useEffect(() => {
    setApproverList(
      ApproverLists.map((e) => {
        return { value: e.value, label: e.value };
      })
    );
  }, [ApproverLists]);

  return (
    <>
      <div className="flex  bg-white-300 rounded-xl   justify-start items-center py-0.5 ">
        <div className="flex items-center">
          <div
            className="flex mr-1  border border-gray-300 bg-white-400 rounded-lg items-center ml-2  px-0.5"
            onClick={() => setshowcalender(false)}
          >
            <ReactMultiSelectCheckboxes
              placeholderButtonLabel="Approvers..."
              options={ApproverList}
              value={selectedApproverOption}
              onChange={(e) => setSelectedApproverOption([...e])}
            />
            <div
              className=" px-1 text-xs   border-l  border-gray-300    font-semibold hover:text-red-600"
              onClick={() => setSelectedApproverOption([])}
            >
              X
            </div>
          </div>{" "}
          <div
            className="flex mr-1  border border-gray-300 rounded-lg items-center    px-0.5"
            onClick={() => setshowcalender(false)}
          >
            <ReactMultiSelectCheckboxes
              placeholderButtonLabel="Tags..."
              options={TagsList}
              value={selectedTagOption}
              onChange={(e) => setSelectedTagOption([...e])}
            />
            <div
              className=" px-1 text-xs    border-l-2  border-gray-300    hover:text-red-600 font-semibold"
              onClick={() => setSelectedTagOption([])}
            >
              X
            </div>
          </div>{" "}
          <div className="flex border border-gray-300 rounded-lg items-center mr-1  py-0.5   px-0.5">
            <button
              className="flex px-2 py-1 text-xs"
              onClick={() => setshowcalender(!showcalender)}
            >
              <span>
                <svg
                  className="w-4 h-3.5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </span>
              {buttontext}
            </button>
            <div
              className=" px-1 text-xs   border-l  border-gray-300    hover:text-red-600 font-semibold"
              onClick={clearDateRangeHandler}
            >
              X
            </div>
          </div>
          <div className="  py-0.5 px-2    rounded-lg">
            {" "}
            <img
              className="w-5 h-5 cursor-pointer"
              src={clearall}
              // onClick={clearAllFiltersHandler}
              onClick={() => {
                setDisplayfilterButton(true);
                setshowcalender(false);
              }}
              alt="text"
              title="Clear All"
            />
          </div>
        </div>

        {/* <div
          className="text-sm   ml-2  mx-1 rounded-3xl"
          onClick={() => setDisplayfilterButton(true)}
        >
          <p
            title="close"
            className="bg-white-400  font-xs font-xs rounded-xl px-2 cursor-pointer "
          >
            X
          </p>
        </div> */}
      </div>
    </>
  );
};

export default Filter;
