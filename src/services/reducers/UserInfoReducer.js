import {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILED,
} from "../constant/Auth/userinfotoken";
const defaultUSerInfoReducerState = {
  orgid: "",
  errormsg: "",
};

export const UserInfodataReducer = (
  state = defaultUSerInfoReducerState,
  action
) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state };
    case USER_DETAILS_SUCCESS:
      return { ...state, orgid: action.payload };
    case USER_DETAILS_FAILED:
      return { ...state, errorMsg: "failed!!" };
    default:
      return state;
  }
};
