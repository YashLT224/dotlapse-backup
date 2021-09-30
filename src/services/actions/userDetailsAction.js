import { getToken } from "../../Utilities/UserInfo";
import axios from "axios";
import {
  TOKEN_FOUND,
  TOKEN_NOT_FOUND,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAILED,
  USER_DETAILS_SUCCESS,
} from "../constant/Auth/userinfotoken";
export const GetTokenAction = () => async (dispatch) => {
  try {
    const token = getToken();
    //console.log(token);
    if (token === null || token === undefined) {
      dispatch({
        type: TOKEN_NOT_FOUND,
        payload: 404,
      });
    } else {
      dispatch({
        type: TOKEN_FOUND,
        payload: token,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: TOKEN_NOT_FOUND,
      payload: 404,
    });
  }
};

export const UserInfoAction = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });
    const token = getToken();
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `https://stage-accounts.lambdatest.com/api/user`,
      config
    );

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.organization.id,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAILED,
    });
  }
};
