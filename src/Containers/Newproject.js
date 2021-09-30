//lib/packages import---------------------------------------------------------------------------------------------------------------------------
import React, { useState, useEffect } from "react";
import person from "../assets/createnewprojecticons/Comparison.svg";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
//import components/variables/functions----------------------------------------------------------------------------------------------------
import {
  CreateNewProjectAction,
  GetTagsAction,
  GetApproversAction,
  EmptyReducernewprojectAction,
} from "../services/actions/createNewProjectAction";

const Newproject = ({ history }) => {
  /**
   * PurgeCSS:
   * text-yellow-500
   * text-purple-500
   * text-green-500
   * text-red-500
   * text-pink-500
   * text-teal-500
   * text-orange-500
   * text-blue-500
   * text-indigo-500
   * text-gray-500
   * bg-yellow-200
   * bg-purple-200
   * bg-green-200
   * bg-red-200
   * bg-pink-200
   * bg-teal-200
   * bg-orange-200
   * bg-blue-200
   * bg-indigo-200
   * bg-gray-200
   */

  const dispatch = useDispatch();
  const colors = [
    "red",
    "yellow",
    "purple",
    "green",
    "pink",
    "teal",
    "orange",
    "blue",
    "indigo",
  ];
  //-------------------------------------------Local state open---------------------------------------------------------

  const [selectedApprovers, setApprovers] = useState([]);
  const [projectName, setprojectName] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [error, setError] = useState({
    projectname: "p",
    approvers: "p",
  });

  //-------------------------------------------Local state Closed---------------------------------------------------------

  //-------------------------------------------Reducer state open---------------------------------------------------------

  const { data: TagsList = [] } = useSelector(
    (state) => state.GetTagListReducer
  );

  const { data: ApproverList = [] } = useSelector(
    (state) => state.GetApproverListReducer
  );
  const { status } = useSelector((state) => state.createNewProjectReducer);
  //-------------------------------------------Reducer state Closed---------------------------------------------------------

  //------------------------------------------Defined Functions open---------------------------------------------------------

  function Findcolor(tagname) {
    var a = TagsList.find((i) => i.label === tagname);
    if (a === undefined) {
      var theRandomNumber = Math.floor(Math.random() * colors.length);
      return colors[theRandomNumber];
    } else {
      return a.colorCode;
    }
  }

  const SelectprojectName = (e) => {
    setprojectName(e.target.value);
    setError({ ...error, projectname: e.target.value });
  };

  const HandleApproversChange = (selectedOption) => {
    setApprovers([...selectedOption]);
    setError({ ...error, approvers: selectedOption.length });
  };
  const HandleTagschange = (selectedOption) => {
    setSelectedTags([...selectedOption]);
  };

  const Submit = () => {
    setError({ projectname: projectName, approvers: selectedApprovers.length });

    var ApproversArray = [];
    selectedApprovers.forEach((element) => {
      ApproversArray.push(element.value);
    });

    let final = {
      name: projectName,
      approver: ApproversArray.join(),
      tag:
        selectedTags.length > 0
          ? selectedTags.map((e) => {
              return {
                name: e.label,
                colorCode: Findcolor(e.label),
              };
            })
          : null,
    };
    if (projectName !== "" || selectedApprovers.length > 0) {
      dispatch(CreateNewProjectAction(final));
    }
  };

  const Cancel = () => {
    setprojectName("");
    setApprovers([]);
    setSelectedTags([]);
    history.push("/");
  };
  //----------------------------------------- Defined Functions closed---------------------------------------------------------

  //-------------------------------------------Use Effect open--------------------------------------------------------------------

  useEffect(() => {
    dispatch(GetTagsAction());
    dispatch(GetApproversAction());
  }, []);

  useEffect(() => {
    console.log(status);
    if (status === 200) {
      dispatch(EmptyReducernewprojectAction());
      history.push("/");
    }
  }, [status]);
  //-------------------------------------------Use Effect Closed---------------------------------------------------------

  return (
    <div className="flex-grow">
      <div className="bg-white-400 h-auto">
        <div className="bg-white-500 px-6 py-4 md:bg-white-400">
          <h1 className="text-3xl leading-normal  font-dm font-normal tracking-normal">
            Create a New Project
          </h1>
        </div>
        <div className="flex justify-between bg-white-600 px-8">
          <div className="bg-white-600 pt-12 px-10">
            <div className="bg-white-200 2xl:bg-white-600">
              <label
                className="block text-xl font-normal font-dm"
                htmlFor="username"
              >
                Project Name<span className="text-red-600 "> *</span>
              </label>

              <input
                className=" w-96 h-10 mt-2 appearance-none border border-gray-400 rounded    py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                value={projectName}
                onChange={SelectprojectName}
                autoComplete="off"
                placeholder="Basic One"
              />
              {!error.projectname ? (
                <p className="text-red-600 text-base font-dm">
                  Project name is mandatory
                </p>
              ) : null}
            </div>

            <div className="mt-8">
              <label
                className="block text-xl font-dm font-normal"
                htmlFor="username"
              >
                Add Approvers<span className="font-thin text-lg">(s)</span>
                <span className="text-red-600 font-dm "> *</span>
              </label>

              <Select
                className="w-96   mt-2"
                isMulti
                placeholder="Select..."
                value={selectedApprovers}
                onChange={HandleApproversChange}
                options={ApproverList}
              />
              {!error.approvers ? (
                <p className="text-red-600 text-base font-dm">
                  Approver's List Cannot be Empty
                </p>
              ) : null}
            </div>

            <div className="mt-8  mb-8">
              <label
                className="block text-xl font-normal font-dm"
                htmlFor="username"
              >
                Add Tags<span className="font-thin text-lg">(optional)</span>
              </label>

              <CreatableSelect
                className="w-96  mt-2"
                isMulti
                placeholder="Select..."
                value={selectedTags}
                onChange={HandleTagschange}
                options={TagsList}
                style={{
                  chips: { background: "red" },
                  searchBox: {
                    border: "none",
                    "border-bottom": "1px solid blue",
                    "border-radius": "0px",
                  },
                }}
              />
            </div>
          </div>

          <div className="flex  flex-col  justify-between bg-white-400 mr-8">
            <div className="mt-4">
              <img className="w-100 h-96" src={person} alt="text" />
            </div>
            <div className="flex justify-end bg-white-800 mt-16">
              <button
                className="bg-white-300  m-3  px-6 py-1 text-xl hover:bg-gray-300 rounded-lg font-lato active:bg-gray-400"
                onClick={Cancel}
              >
                Cancel
              </button>
              <button
                className="bg-teal-450  text-gray-100 text-xl m-3 px-6 py-1 rounded-lg hover:bg-teal-400 font-lato"
                onClick={Submit}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>{" "}
      <ToastContainer />
    </div>
  );
};

export default Newproject;
