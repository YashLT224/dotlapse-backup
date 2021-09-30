import {
  TEST_COMAPARISON_LIST_FAILED,
  TEST_COMAPARISON_LIST_REQUEST,
  TEST_COMAPARISON_LIST_SUCCESS,
  TEST_COMPARISON_RESULT_FAILED,
  TEST_COMPARISON_RESULT_SUCCESS,
  TEST_COMPARISON_RESULT_REQUEST,
  TEST_COMPARISON_RESULT_EMPTY,
} from "../constant/TestComparison/TestComaprison";

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getToken } from "../../Utilities/UserInfo";
const HOSTs = process.env.REACT_APP_HOST_TEST;
const HOST = `https://tsedl8yo75.execute-api.us-east-1.amazonaws.com/visualui/1.0`;
export const GetTestComparisonListAction =
  (projectid, buildid) => async (dispatch) => {
    try {
      dispatch({
        type: TEST_COMAPARISON_LIST_REQUEST,
      });

      const token = getToken();
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${HOST}/testinfo?projectId=${projectid}&buildId=${buildid}`,
        config
      );

      dispatch({
        type: TEST_COMAPARISON_LIST_SUCCESS,
        payload: data?.data || [],
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: TEST_COMAPARISON_LIST_FAILED,
      });
    }
  };

export const testcomparisonaction = (finalobject) => async (dispatch) => {
  try {
    dispatch({
      type: TEST_COMPARISON_RESULT_REQUEST,
    });
    const token = getToken();
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `https://stage-api.lambdatest.com/smartui/1.0/image/compare-pixels`,
      finalobject,
      config
    );

    dispatch({
      type: TEST_COMPARISON_RESULT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: TEST_COMPARISON_RESULT_FAILED,
    });
  }
};

export const EmptyTestComparisonreducerstate = () => async (dispatch) => {
  try {
    dispatch({
      type: TEST_COMPARISON_RESULT_EMPTY,
      payload: {},
    });
  } catch {}
};
