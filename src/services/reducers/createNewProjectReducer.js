import {
  CREATE_NEW_PROJECT_REQUEST,
  CREATE_NEW_PROJECT_SUCCESS,
  CREATE_NEW_PROJECT_FAILED,
  CREATE_NEWPROJECT_TAGS_SUCCESS,
  CREATE_NEWPROJECT_TAGS_FAILED,
  CREATE_NEWPROJECT_TAGS_REQUEST,
  CREATE_NEWPROJECT_APPROVERS_SUCCESS,
  CREATE_NEWPROJECT_APPROVERS_REQUEST,
  CREATE_NEWPROJECT_APPROVERS_FAILED,
  Empty_new_project_State,
} from "../constant/NewProject/NewProjectConstant";

const CreateNewProjectDefaultState = {
  loading: false,
  errorMsg: "",
  count: 0,
  data: {},
  status: 400,
};
export const createNewProjectReducer = (
  state = CreateNewProjectDefaultState,
  action
) => {
  switch (action.type) {
    case CREATE_NEW_PROJECT_REQUEST:
      return { ...state, loading: true };

    case CREATE_NEW_PROJECT_SUCCESS:
      return { ...state, loading: false, status: action.payload };

    case CREATE_NEW_PROJECT_FAILED:
      return { ...state, loading: false, errorMsg: "failed" };

    case Empty_new_project_State:
      return { ...state, loading: false, status: 400 };

    default:
      return state;
  }
};

const GetTagsDefaultState = {
  loading: false,
  errorMsg: "",
  count: 0,
  data: [],
};

export const GetTagListReducer = (state = GetTagsDefaultState, action) => {
  switch (action.type) {
    case CREATE_NEWPROJECT_TAGS_REQUEST:
      return { ...state, loading: true };

    case CREATE_NEWPROJECT_TAGS_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case CREATE_NEWPROJECT_TAGS_FAILED:
      return { ...state, loading: false, errorMsg: "Failed" };

    default:
      return state;
  }
};

const GetApproverListdefaultState = {
  loading: false,
  errorMsg: "",
  count: 0,
  data: [],
};

export const GetApproverListReducer = (
  state = GetApproverListdefaultState,
  action
) => {
  switch (action.type) {
    case CREATE_NEWPROJECT_APPROVERS_REQUEST:
      return { ...state, loading: true };
    case CREATE_NEWPROJECT_APPROVERS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case CREATE_NEWPROJECT_APPROVERS_FAILED:
      return { ...state, loading: false, errorMsg: "failed" };
    default:
      return state;
  }
};
