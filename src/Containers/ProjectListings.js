//lib/packages import---------------------------------------------------------------------------------------------------------------------------
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { DateRangePicker } from "react-date-range";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

//import components/variables/functions/constants----------------------------------------------------------------------------------------------------
import {
  GetProjectListings,
  UpdateFavorite,
  UpdateProjectName,
  EmptyReducernewprojectAction,
  FilterProjectAction,
} from "../services/actions/ProjectListingsAction";
import { GetApproversAction } from "../services/actions/createNewProjectAction";
import Filter from "../components/Filter/Filter";
import ErrorHandling from "../components/ErrorHandling/Handling";
import ProjectListLoading from "../components/projectListingLoading/projectListloading";

//import assets/images/css files----------------------------------------------------------------------------------------------------
import "./filter.css";
import User from "../assets/user1.png";
import rectmenuicon from "../assets/projectListingicons/rectmenuicon.svg";
import sqmenuicon from "../assets/projectListingicons/sqmenuicon.svg";
import search from "../assets/generic/search.svg";
import Settings from "../assets/generic/Settings.svg";
import filter from "../assets/generic/whitefilter.svg";

const ProjectListings = () => {
  const dispatch = useDispatch();
  //--------------------------------------local state open------------------------------------------

  const [searchProject, setsearchProject] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [editprojectname, setEditProjectName] = useState("");
  const [displayfilterbutton, setDisplayfilterButton] = useState(true);
  const [showcalender, setshowcalender] = useState(false);
  const [buttontext, setbuttontext] = useState("Date Range");
  const [selectedTagOption, setSelectedTagOption] = useState([]);
  const [selectedApproverOption, setSelectedApproverOption] = useState([]);
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

  //--------------------------------------local state close------------------------------------------

  //--------------------------------------reducer state open----------------------------------

  const { data: ApproverList } = useSelector(
    (state) => state.GetApproverListReducer
  );
  const { data: projectList, loading } = useSelector(
    (state) => state.GetProjectListingsReducer
  );
  const { data: TagsList = [] } = useSelector(
    (state) => state.GetTagListReducer
  );

  //------------------------------------reducer state closed----------------------------------

  //---------------------------------------use Effects open-------------------------------------
  useEffect(() => {
    // dispatch(EmptyReducernewprojectAction());
  }, []);

  useEffect(() => {
    dispatch(GetApproversAction());
    dispatch(GetProjectListings());
  }, []);

  useEffect(() => {
    setFilteredProjects([
      ...projectList.map((e) => {
        return {
          ...e,
          enableEdit: false,
        };
      }),
    ]);
  }, [projectList]);

  useEffect(() => {
    setFilteredProjects(projectList.sort((a, b) => b.favorite - a.favorite));
  }, [projectList]);

  // useEffect(() => {
  //   const filteredResults = projectList.filter((e) => {
  //     return e.name.toLowerCase().includes(searchProject);
  //   });
  //   setFilteredProjects(filteredResults);
  // }, [searchProject]);

  useEffect(() => {
    const tags = [];
    const Approvers = [];

    if (selectedTagOption.length > 0) {
      selectedTagOption.map((e) => {
        tags.push(e.value);
      });
    }
    if (selectedApproverOption.length > 0) {
      selectedApproverOption.map((e) => {
        Approvers.push(e.value);
      });
    }

    var searchobject = {
      keyword: searchProject,
      Tags: tags,
      Approvers: Approvers,
      //  startdate: date.startDate,
      //  endDate: date.endDate,
    };
    //  console.log(searchobject);
    dispatch(FilterProjectAction(searchobject));
  }, [searchProject, selectedTagOption, selectedApproverOption, date]);
  //---------------------------------------use Effects closed--------------------------------------------

  //----------------------------------------defined Functions open---------------------------------------

  const updatefavorite = (projectId, favorite) => {
    dispatch(UpdateFavorite(projectId, !favorite));
  };

  const enableEditHandler = (projectId, projectname) => {
    setFilteredProjects(
      filteredProjects.map((e) => {
        if (e.projectId === projectId) {
          e.enableEdit = true;
          setEditProjectName(e.name);
        } else {
          e.enableEdit = false;
        }
        return e;
      })
    );
  };

  const submitEditHandler = (
    projectId,
    newprojectname,
    mode,
    oldprojectname
  ) => {
    if (
      mode === "edit" &&
      newprojectname != oldprojectname &&
      newprojectname !== "" &&
      newprojectname != " " &&
      newprojectname.trim()
    ) {
      dispatch(UpdateProjectName(projectId, newprojectname));
    } else {
    }
    setFilteredProjects(
      filteredProjects.map((e) => {
        if (e.projectId === projectId) {
          e.enableEdit = false;
        }
        return e;
      })
    );
  };

  const editProjectNameHandler = (e) => {
    setEditProjectName(e.target.value);
  };

  const clearDateRangeHandler = () => {
    setbuttontext("Set Date Range");
    setdate({
      startDate: new Date(),
      endDate: new Date(),
    });
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
  const clearAllFiltersHandler = () => {
    setSelectedTagOption([]);
    setSelectedApproverOption([]);
    setdate({
      startDate: null,
      endDate: null,
    });
    setbuttontext("Set Date Range");
  };

  const filtertagshandler = (tag) => {
    const tags = [];

    const Approvers = [];

    if (selectedTagOption.length > 0) {
      selectedTagOption.map((e) => {
        tags.push(e.value);
      });
    }
    if (selectedApproverOption.length > 0) {
      selectedApproverOption.map((e) => {
        Approvers.push(e.value);
      });
    }

    tags.push(tag);
    var searchobject = {
      keyword: searchProject,
      Tags: tags,
      Approvers: Approvers,
      //  startdate: date.startDate,
      //  endDate: date.endDate,
    };
    //  console.log(searchobject);
    dispatch(FilterProjectAction(searchobject));
  };
  const listings = () => {
    if (loading === false && filteredProjects.length > 0) {
      return filteredProjects.map((e, i) => {
        return (
          <div key={i} onClick={() => setshowcalender(false)}>
            <div
              onMouseOver={() => setindex(i)}
              onMouseOut={() => setindex(-1)}
              className="flex  hover:bg-gray-250 px-4 py-4 border  border-t-0 border-l-0 border-r-0  border-gray-300  bg-gray-0"
            >
              <div className=" flex-col  px-4 w-7/12">
                <div className="flex items-center">
                  {e.enableEdit ? (
                    <div className="flex border border-gray-200   items-center">
                      <input
                        type="text"
                        value={editprojectname}
                        onChange={editProjectNameHandler}
                        autoComplete="off"
                      />
                      <svg
                        className="w-5 h-6 text-gray-700 bg-gray-400"
                        fill="none"
                        onClick={() =>
                          submitEditHandler(
                            e.projectId,
                            editprojectname,
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
                          submitEditHandler(
                            e.projectId,
                            editprojectname,
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
                    <>
                      <Link
                        to={
                          e.total === 0
                            ? "/firstBuild"
                            : `/builds?projectid=${e.projectId}&projectname=${e.name}&totalbuilds=${e.total}`
                        }
                        className="text-xl font-lato"
                      >
                        {e.name}{" "}
                      </Link>
                      {!e.enableEdit ? (
                        <svg
                          className="w-4 h-4 text-gray-500 opacity-0 hover:opacity-100 "
                          fill="none"
                          onClick={() => enableEditHandler(e.projectId, e.name)}
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
                    </>
                  )}
                </div>

                <div className="flex flex-wrap">
                  {e.tag.map((t) => {
                    return (
                      <div
                        className={`text-${t.colorCode}-500 text-xs bg-${t.colorCode}-200 my-2 px-2 py-1 rounded-lg mr-1 font-lato`}
                        onClick={() => filtertagshandler(t.name)}
                      >
                        {t.name}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex-col  w-1/12  ">
                <p className="text-gray-500 text-center font-lato">Builds:</p>
                <p className="text-2xl text-center "> {e.total}</p>
              </div>
              <div className="flex-col items-center justify-center   w-2/12">
                <p className="text-gray-500 mb-2 text-center font-lato">
                  Approvers:
                </p>
                <div className="flex flex-wrap justify-center">
                  {e.approver.split(",").map((a) => {
                    const approveravtar = ApproverList.find((av) => {
                      if (av.value === a) {
                        return true;
                      }
                    });
                    return (
                      <img
                        className="h-6 w-6 mx-0.5 rounded-xl"
                        src={approveravtar?.avatar || User}
                        alt="text"
                      />
                    );
                  })}
                </div>
              </div>

              <div
                className={
                  e.favorite
                    ? "flex bg-white-800  justify-center items-center  opacity-100 w-2/12"
                    : i === index
                    ? "flex bg-white-800  justify-center items-center  opacity-100 w-2/12"
                    : "flex bg-white-800  justify-center items-center opacity-0  w-2/12"
                }
              >
                <div className="flex">
                  <svg
                    onClick={() => updatefavorite(e.projectId, e.favorite)}
                    className={` box-content w-4 h-4 p-2 border   border-gray-300 rounded-lg mr-1 text-3xl ${
                      e.favorite
                        ? "text-yellow-500 cursor-pointer"
                        : "text-black-600 cursor-pointer"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {/* <svg
                    className=" box-content w-4 h-4 border p-2 border-gray-300 rounded-lg mr-1 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg> */}
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else if (!loading) {
      return <ErrorHandling></ErrorHandling>;
    } else if (loading) {
      return <ProjectListLoading></ProjectListLoading>;
    }
  };
  //----------------------------------------defined Functions closed---------------------------------------
  return (
    <div className={`flex-grow bg-gray-0 h-full overflow-scroll`}>
      <div
        style={{ top: "0px", backgroundColor: "white" }}
        className="flex sticky   items-center  border border-gray-300 px-8 z-10 "
      >
        <div
          className={`flex items-center  px-2 py-0.5 border border-gray-300   rounded-xl mr-4 min-w-max ${
            displayfilterbutton ? "w-1/5" : "w-2/6"
          }`}
        >
          <img className="w-4 h-4" src={search} alt="text" />
          <input
            style={{ width: " -webkit-fill-available" }}
            className="bg-gray-0 outline-none ml-2 "
            type="text"
            placeholder="Search in Tests..."
            value={searchProject}
            onChange={(e) => setsearchProject(e.target.value)}
            autoComplete="off"
          />
        </div>
        {displayfilterbutton ? (
          <div
            className="flex px-2 py-1 items-center  border border-gray-300 rounded-lg bg-teal-450 hover:bg-teal-500"
            onClick={() => setDisplayfilterButton(false)}
          >
            <img
              className="w-4 h-4 mr-1 text-gray-50"
              src={filter}
              alt="text"
            />
            <p className="text-sm font-lato font-light text-gray-50 cursor-pointer">
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

        <div className="flex flex-grow justify-end items-center  py-3  w-auto  ">
          <Link to="/createproject" className="mx-4 text-teal-450 font-lato ">
            +New Project
          </Link>

          {/* <img className="w-5 h-5 mx-1" src={sqmenuicon} alt="text" />
          <img className="w-6 h-6 mx-1" src={rectmenuicon} alt="text" />
          <img
            className="w-8 h-6 ml-4 p-1 border rounded-2xl border-gray-300"
            src={Settings}
            alt="text"
          /> */}
        </div>
      </div>
      {!displayfilterbutton && showcalender && (
        <DateRangePicker
          ranges={[selectionRange]}
          onChange={(range) => selectDateRangeHandler(range)}
        />
      )}

      {listings()}

      <ToastContainer />
    </div>
  );
};

export default ProjectListings;
