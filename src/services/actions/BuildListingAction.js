import {
  BUILD_LISTING_FAILED,
  BUILD_LISTING_REQUEST,
  BUILD_LISTING_SUCCESS,
  UPDATE_BUILD_BASELINE_FAILED,
  UPDATE_BUILD_BASELINE_REQUEST,
  UPDATE_BUILD_BASELINE_SUCCESS,
  DELETE_BUILD_LISTING_FAILED,
  DELETE_BUILD_LISTING_REQUEST,
  DELETE_BUILD_LISTING_SUCCESS,
  BUILDNAME_EDIT_FAILED,
  BUILDNAME_EDIT_REQUEST,
  BUILDNAME_EDIT_SUCCESS,
  SEARCH_BUILD_KEYWORD_REQUEST,
  SEARCH_BUILD_KEYWORD_SUCCESS,
  SEARCH_BUILD_KEYWORD_FAILED,
  BUILD_LISTING_LAZY_FAILED,
  BUILD_LISTING_LAZY_REQUEST,
  BUILD_LISTING_LAZY_SUCCESS,
  BUILD_LISTING_EMPTY,
} from "../constant/BuildListings/BuildListingConstant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getToken } from "../../Utilities/UserInfo";
const HOSTS = process.env.REACT_APP_HOST_TEST;
const HOST = `https://tsedl8yo75.execute-api.us-east-1.amazonaws.com/visualui/1.0`;

export const GetBuildListingAction =
  (projectId, offset, limit, loadingtype) => async (dispatch) => {
    try {
      dispatch({ type: BUILD_LISTING_REQUEST, payload: loadingtype });

      const token = getToken();
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${HOST}/build?projectId=${projectId}&status=created&offset=${offset}&limit=${limit}
    `,
        config
      );

      const res = {
        data: data?.data || [],
        loadingtype: loadingtype,
      };

      dispatch({
        type: BUILD_LISTING_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({ type: BUILD_LISTING_FAILED });
    }
  };

export const GetBuildListingLazyLoadAction =
  (projectId, offset, limit) => async (dispatch) => {
    try {
      dispatch({ type: BUILD_LISTING_LAZY_REQUEST });
      const token = getToken();
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${HOST}/build?projectId=${projectId}&status=created&offset=${offset}&limit=${limit}
    `,
        config
      );

      dispatch({
        type: BUILD_LISTING_LAZY_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({ type: BUILD_LISTING_LAZY_FAILED });
    }
  };

export const UpdateBaseLineAction =
  (projectId, buildId, baseline) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_BUILD_BASELINE_REQUEST,
      });
      const token = getToken();
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.put(
        `${HOST}/build/update?buildId=${buildId}&baseline=${baseline}&name=&projectId=${projectId}`,
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
        type: UPDATE_BUILD_BASELINE_SUCCESS,
        payload: buildId,
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
        type: UPDATE_BUILD_BASELINE_FAILED,
      });
    }
  };

export const DeleteBuildListingAction = (buildId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_BUILD_LISTING_REQUEST,
    });
    const token = getToken();
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.delete(`${HOST}/build/${buildId}`, config);

    toast.success("Deleted Successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: DELETE_BUILD_LISTING_SUCCESS,
      payload: buildId,
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
      type: DELETE_BUILD_LISTING_FAILED,
    });
  }
};

export const UpdateBuildNameAction =
  (buildId, buildname, projectId) => async (dispatch) => {
    try {
      dispatch({
        type: BUILDNAME_EDIT_REQUEST,
      });
      const token = getToken();
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.put(
        `${HOST}/build/update?buildId=${buildId}&baseline=&name=${buildname}&projectId=${projectId}`,
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
        type: BUILDNAME_EDIT_SUCCESS,
        payload: {
          buildId: buildId,
          buildname: buildname,
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
        type: BUILDNAME_EDIT_FAILED,
      });
    }
  };

export const SearchBuildsKeywordAction =
  (projectId, keyword) => async (dispatch) => {
    try {
      dispatch({
        type: SEARCH_BUILD_KEYWORD_REQUEST,
      });
      const token = getToken();
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${HOST}/build?projectId=${projectId}&status=created&name=${keyword}`,
        config
      );

      dispatch({
        type: SEARCH_BUILD_KEYWORD_SUCCESS,
        payload: data?.data || [],
      });
    } catch (error) {
      dispatch({
        type: SEARCH_BUILD_KEYWORD_FAILED,
      });
    }
  };

export const EmptyBuildReducerStateAction = () => {
  return {
    type: BUILD_LISTING_EMPTY,
  };
};
