import {
  PROJECT_LISTINGS_FAILED,
  PROJECT_LISTINGS_REQUEST,
  PROJECT_LISTINGS_SUCCESS,
  PROJECT_FAVORITE_REQUEST,
  PROJECT_FAVORITE_SUCCESS,
  PROJECT_FAVORITE_FAILED,
  PROJECTNAME_EDIT_REQUEST,
  PROJECTNAME_EDIT_SUCCESS,
  PROJECTNAME_EDIT_FAILED,
  PROJECT_FILTER_REQUEST,
  PROJECT_FILTER_SUCCESS,
  PROJECT_FILTER_FAILED,
} from "../constant/ProjectListings/ProjectListingConstant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getToken } from "../../Utilities/UserInfo";

const HOST = process.env.REACT_APP_HOST_TEST;

export const GetProjectListings = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_LISTINGS_REQUEST,
    });

    const token = getToken();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${HOST}/project?limit=100`, config);
    const res = data.data;
    const res1 = res.sort((a, b) => b.favorite - a.favorite);
    dispatch({
      type: PROJECT_LISTINGS_SUCCESS,
      payload: res1,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_LISTINGS_FAILED,
    });
  }
};

export const UpdateFavorite = (projectId, favorite) => async (dispatch) => {
  try {
    dispatch({
      type: PROJECT_FAVORITE_REQUEST,
    });
    const token = getToken();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.put(
      `${HOST}/project/update?projectId=${projectId}&name=&favorite=${favorite}`,
      {},
      config
    );
    toast.success("Updated Successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: PROJECT_FAVORITE_SUCCESS,
      payload: projectId,
    });
  } catch (error) {
    toast.error("Failed !!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: PROJECT_FAVORITE_FAILED,
    });
  }
};

export const UpdateProjectName =
  (projectId, projectname) => async (dispatch) => {
    try {
      dispatch({
        type: PROJECTNAME_EDIT_REQUEST,
      });
      const token = getToken();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.put(
        `${HOST}/project/update?projectId=${projectId}&name=${projectname}&favorite=`,
        {},
        config
      );
      toast.success("Updated Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({
        type: PROJECTNAME_EDIT_SUCCESS,
        payload: {
          projectId: projectId,
          projectname: projectname,
        },
      });
    } catch (error) {
      toast.error("Failed !!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({
        type: PROJECTNAME_EDIT_FAILED,
      });
    }
  };

export const FilterProjectAction = (filterobject) => async (dispatch) => {
  try {
    dispatch({
      type: PROJECT_FILTER_REQUEST,
    });
    const token = getToken();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `
      https://tsedl8yo75.execute-api.us-east-1.amazonaws.com/visualui/1.0/filter/project`,
      filterobject,
      config
    );
    console.log(data.data);

    dispatch({
      type: PROJECT_FILTER_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_FILTER_FAILED,
    });
  }
};
