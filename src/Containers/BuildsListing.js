//lib/packages import---------------------------------------------------------------------------------------------------------------------------
import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { DateRangePicker } from "react-date-range";
import { Link } from "react-router-dom";
//import components/variables/functions/constants----------------------------------------------------------------------------------------------------
import {
  GetBuildListingAction,
  UpdateBaseLineAction,
  DeleteBuildListingAction,
  UpdateBuildNameAction,
  SearchBuildsKeywordAction,
  EmptyBuildReducerStateAction,
} from "../services/actions/BuildListingAction";
import {
  GetTagsAction,
  GetApproversAction,
} from "../services/actions/createNewProjectAction";
import Filter from "../components/Filter/Filter";
import Buildlistloading from "../components/BuildListingLoading/BuildListLoading";
import ErrorHandling from "../components/ErrorHandling/Handling";
import Breadcrum from "../components/Breadcrum/Breadcrum";

//import assets/images/css files----------------------------------------------------------------------------------------------------
import Settings from "../assets/generic/Settings.svg";
import searchicon from "../assets/generic/search.svg";
import approval from "../assets/buildlisticons/approveed.svg";
import filter from "../assets/generic/whitefilter.svg";

import { ToastContainer } from "react-toastify";
const BuildsListing = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let queryparamprojectid = params.get("projectid");
  let queryparamprojectname = params.get("projectname");
  let queryparamtotalbuilds = params.get("totalbuilds");
  const dispatch = useDispatch();
  // ----------------------------------------------------reducer state open---------------------------------------------------------
  const {
    data: Buildlist,
    loading,
    lazyloading,
  } = useSelector((state) => state.getBuildsListingReducer);

  // ---------------------------------------------------reducer state closed-------------------------------------------------------

  // -----------------------------------------------local state open---------------------------------------------------------------
  const [editbuildname, setEditBuildName] = useState("");
  const [SearchBuildKeyword, setSearchBuild] = useState("");
  const [filteredBuilds, setFilteredBuilds] = useState([]);
  const [displayfilterbutton, setDisplayfilterButton] = useState(true);
  const [showcalender, setshowcalender] = useState(false);
  const [buttontext, setbuttontext] = useState("Date Range");
  const [selectedTagOption, setSelectedTagOption] = useState([]);
  const [selectedApproverOption, setSelectedApproverOption] = useState([]);
  const [offset, setoffset] = useState(0);
  const [limit, setlimit] = useState(10);
  const [totalEntries, settotalEntries] = useState(10);
  const [index, setindex] = useState(0);
  const [date, setdate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const selectionRange = {
    startDate: date.startDate,
    endDate: date.endDate,
    key: "selection",
  };

  // -------------------------------------------------local state closed-----------------------------------------------------------

  // --------------------------------------------------Use Effect Open---------------------------------------------------------------

  useEffect(() => {
    dispatch(
      GetBuildListingAction(queryparamprojectid, offset, limit, "defaultload")
    );
  }, []);

  useEffect(() => {
    setFilteredBuilds([
      ...Buildlist.map((e) => {
        return {
          ...e,
          enableEdit: false,
        };
      }),
    ]);
    if (Buildlist.length > 0) {
      const a = queryparamtotalbuilds;
      settotalEntries(Number(a));
    }
  }, [Buildlist]);

  useEffect(() => {
    dispatch(GetTagsAction());
    dispatch(GetApproversAction());
  }, []);

  useEffect(() => {
    var searchobject = {
      keyword: SearchBuildKeyword,
      Tags: selectedTagOption,
      Approvers: selectedApproverOption,
      startdate: date.startDate,
      endDate: date.endDate,
    };
    console.log(searchobject);
  }, [selectedTagOption, selectedApproverOption, date]);

  useEffect(() => {
    return () => {
      dispatch(EmptyBuildReducerStateAction());
    };
  }, []);

  // ---------------------------------------------------------Use Effect closed-----------------------------------------------------

  // ----------------------------------------------Defined functions open------------------------------------------------------------
  const UpdateBaseLineHandler = (projectId, buildId, baseline) => {
    dispatch(UpdateBaseLineAction(projectId, buildId, !baseline));
  };

  const DeleteBuildHandler = (buildId) => {
    dispatch(DeleteBuildListingAction(buildId));
  };

  const EnableEditHandler = (buildId, buildName) => {
    setFilteredBuilds(
      filteredBuilds.map((e) => {
        if (e.buildId === buildId) {
          e.enableEdit = true;
          setEditBuildName(buildName);
        } else {
          e.enableEdit = false;
        }
        return e;
      })
    );
  };

  const EditBuildNameHandler = (e) => {
    setEditBuildName(e.target.value);
  };

  const SubmitEditHandler = (
    buildId,
    newbuildname,
    projectId,
    mode,
    oldbuildName
  ) => {
    if (
      mode === "edit" &&
      oldbuildName !== newbuildname &&
      newbuildname !== "" &&
      newbuildname !== " " &&
      newbuildname.trim()
    ) {
      dispatch(UpdateBuildNameAction(buildId, newbuildname, projectId));
    } else {
    }
    setFilteredBuilds(
      filteredBuilds.map((e) => {
        if (e.buildId === buildId) {
          e.enableEdit = false;
        }
        return e;
      })
    );
  };

  const SetSearchHandler = (e) => {
    setSearchBuild(e.target.value);
  };

  const SubmitKeywordHandler = (e) => {
    e.preventDefault();

    dispatch(
      SearchBuildsKeywordAction(queryparamprojectid, SearchBuildKeyword)
    );
  };

  const selectDateRangeHandler = (item) => {
    let startDate = moment(item.selection.startDate).format("YYYY-MM-DD");
    let endDate = moment(item.selection.endDate).format("YYYY-MM-DD");

    setdate({
      startDate: startDate,
      endDate: endDate,
    });
    let s = `${startDate} to ${endDate}`;
    setbuttontext(s);
    setshowcalender(!showcalender);
  };

  const clearDateRangeHandler = () => {
    setbuttontext("Set Date Range");
    setdate({
      startDate: new Date(),
      endDate: new Date(),
    });
  };

  const clearAllFiltersHandler = () => {
    setSelectedTagOption([]);
    setSelectedApproverOption([]);
    setdate({
      startDate: null,
      endDate: null,
    });
    setbuttontext("Set Date Range");
  };

  const loadMoreHandle = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (bottom) {
      if (offset + limit < totalEntries) {
        console.log("api call", offset);
        dispatch(
          GetBuildListingAction(
            queryparamprojectid,
            offset + limit,
            limit,
            "lazyload"
          )
        );
        setoffset(offset + limit);
      } else {
        console.log("no api call");
      }
    }
  };

  const Listings = () => {
    if (loading === false && filteredBuilds.length > 0) {
      return filteredBuilds.map((e, i) => {
        return (
          <div
            key={i + 1}
            onClick={() => setshowcalender(false)}
            onMouseOver={() => setindex(i)}
            onMouseOut={() => setindex(-1)}
            className="flex hover:bg-gray-250 hover:opacity-100 border border-t-0 border-l-0 border-r-0 bg-white-600 border-gray-400 "
          >
            <div className="flex  justify-center items-center w-1/6  bg-white-600">
              <h1 className="text-teal-450 text-4xl font-dm">
                {filteredBuilds.length - i}
              </h1>
              {e.baseline ? (
                <div className="bg-teal-100 px-2 py-1 rounded-lg text-teal-600 text-xs mx-2 font-lato">
                  baseline
                </div>
              ) : (
                <div className="bg-teal-100 px-2 py-1  opacity-0 rounded-lg text-teal-600 text-xs mx-2 font-lato">
                  baseline
                </div>
              )}
            </div>
            <div className="flex-col flex-grow  py-5 bg-white-900 w-auto pl-12">
              <div className="flex items-center">
                {e.enableEdit ? (
                  <div className="flex border border-gray-200   items-center">
                    <input
                      type="text"
                      value={editbuildname}
                      onChange={EditBuildNameHandler}
                      autoComplete="off"
                    />
                    <svg
                      className="w-5 h-6 text-gray-700 bg-gray-400"
                      fill="none"
                      onClick={() =>
                        SubmitEditHandler(
                          e.buildId,
                          editbuildname,
                          e.projectId,
                          "edit",
                          e.name
                        )
                      }
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    <svg
                      onClick={() =>
                        SubmitEditHandler(
                          e.buildId,
                          editbuildname,
                          e.projectId,
                          "close",
                          e.name
                        )
                      }
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                ) : (
                  <Link
                    to={`/testdetail?projectid=${queryparamprojectid}&projectname=${queryparamprojectname}&buildid=${e.buildId}&buildname=${e.name}&totalbuilds=${queryparamtotalbuilds}`}
                    className="text-lg font-lato"
                  >
                    {e.name}{" "}
                  </Link>
                )}

                {!e.enableEdit ? (
                  <svg
                    className="w-4 h-4 text-gray-500 opacity-0 hover:opacity-100 "
                    fill="none"
                    onClick={() => EnableEditHandler(e.buildId, e.name)}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                ) : null}
              </div>
              <p className="text-xs text-gray-500 font-lato">
                Started 24m ago by {e.createdBy}
              </p>
            </div>
            <div className="flex py-5 bg-white-600  justify-center items-center w-1/5">
              <div className="flex-col">
                <p className="text-xs text-gray-700  font-lato">
                  {e.underReview} under Screening
                </p>
                <p className="text-xs  text-gray-700 text-right font-lato">
                  {" "}
                  {e.Snapshots} Snapshots
                </p>
              </div>
              <img className="w-10 h-10 mx-4" src={approval} alt="text" />
            </div>
            <div
              className={
                i === index
                  ? "flex py-5 w-1/5 justify-center items-center   bg-white-600 opacity-100"
                  : "flex py-5 w-1/5 justify-center items-center   bg-white-600 opacity-0"
              }
            >
              <button
                className={
                  e.baseline
                    ? "text-xs font-lato border border-gray-500 rounded-lg px-4 py-1 mx-1 cursor-not-allowed hidden"
                    : "text-xs font-lato border border-gray-500 rounded-lg px-4 py-1 mx-1 opacity-100"
                }
                disabled={e.baseline ? true : false}
                onClick={() =>
                  UpdateBaseLineHandler(e.projectId, e.buildId, e.baseline)
                }
              >
                Make as Baseline
              </button>
              {/* <svg
                className="w-8 h-8 border border-gray-500 rounded-lg p-2 mx-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg> */}
              <svg
                className="w-8 h-8 text-red-500 border border-gray-500 rounded-lg p-2 mx-1"
                onClick={() => DeleteBuildHandler(e.buildId)}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </div>
        );
      });
    } else if (!loading) {
      return <ErrorHandling></ErrorHandling>;
    } else if (loading) {
      return (
        <Buildlistloading
          value={queryparamtotalbuilds - offset}
        ></Buildlistloading>
      );
    }
  };

  // -----------------------------------------------Defined Functions closed-------------------------------------------------
  return (
    <div
      className={`flex-grow bg-gray-0 h-full
      ${!loading ? "overflow-scroll" : "overflow-hidden"}
      `}
      onScroll={loadMoreHandle}
    >
      <Breadcrum
        type="projectlisting"
        projectname={queryparamprojectname}
        buildname=""
        projectid=""
        buildid=""
        totalbuilds=""
      />
      <div>
        <div
          style={{ top: "30px", backgroundColor: "white" }}
          className="flex  sticky  items-center bg-gray-0 border border-gray-300 px-8 py-1.5 z-10"
        >
          <div
            className={`flex items-center  px-2 py-1 border border-gray-300   rounded-xl mr-4 min-w-max ${
              displayfilterbutton ? "w-1/5" : "w-2/6"
            }`}
          >
            <img className="w-4 h-4" src={searchicon} alt="text" />

            <form onSubmit={SubmitKeywordHandler}>
              <input
                style={{ width: " -webkit-fill-available" }}
                className="bg-gray-0 outline-none ml-2 "
                type="text"
                placeholder="Search in Tests..."
                value={SearchBuildKeyword}
                onChange={SetSearchHandler}
                autoComplete="off"
              />
            </form>
          </div>

          {displayfilterbutton ? (
            <div
              className="flex px-2 py-1 items-center  border border-gray-300 rounded-lg bg-teal-450"
              onClick={() => setDisplayfilterButton(!displayfilterbutton)}
            >
              <img className="w-4 h-4 mr-2" src={filter} alt="text" />
              <p className="text-sm text-gray-50 font-lato font-light cursor-pointer">
                Add Filter
              </p>
            </div>
          ) : (
            <Filter
              setDisplayfilterButton={setDisplayfilterButton}
              setshowcalender={setshowcalender}
              clearDateRangeHandler={clearDateRangeHandler}
              setSelectedTagOption={setSelectedTagOption}
              setSelectedApproverOption={setSelectedApproverOption}
              clearAllFiltersHandler={clearAllFiltersHandler}
              selectedApproverOption={selectedApproverOption}
              selectedTagOption={selectedTagOption}
              showcalender={showcalender}
              buttontext={buttontext}
            ></Filter>
          )}
          <div className="flex flex-grow justify-end items-center py-3 bg-white-500 w-auto">
            {/* <img
              className="w-8 h-6 ml-4 p-1 border rounded-2xl border-gray-300"
              src={Settings}
              alt="text"
            /> */}
          </div>
        </div>
        {showcalender && (
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={(range) => selectDateRangeHandler(range)}
          />
        )}
        {Listings()}
        {lazyloading && <Buildlistloading value={3}></Buildlistloading>}
      </div>
      <ToastContainer />
    </div>
  );
};

export default BuildsListing;
