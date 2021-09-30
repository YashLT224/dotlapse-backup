import {
  PROJECT_LISTINGS_SUCCESS,
  PROJECT_LISTINGS_REQUEST,
  PROJECT_LISTINGS_FAILED,
  PROJECT_FAVORITE_SUCCESS,
  PROJECT_FAVORITE_REQUEST,
  PROJECT_FAVORITE_FAILED,
  PROJECTNAME_EDIT_SUCCESS,
  PROJECTNAME_EDIT_REQUEST,
  PROJECTNAME_EDIT_FAILED,
  PROJECT_FILTER_REQUEST,
  PROJECT_FILTER_SUCCESS,
  PROJECT_FILTER_FAILED,
} from "../constant/ProjectListings/ProjectListingConstant";

const ProjectListingsDefaultState = {
  loading: false,
  favoriteloading: false,
  errorMsg: "",
  count: 0,
  data: [],
};

export const GetProjectListingsReducer = (
  state = ProjectListingsDefaultState,
  action
) => {
  switch (action.type) {
    case PROJECT_LISTINGS_REQUEST:
      return { ...state, loading: true };
    case PROJECT_LISTINGS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case PROJECT_LISTINGS_FAILED:
      return { ...state, loading: false, errorMsg: "failed" };
    case PROJECT_FAVORITE_REQUEST:
      return { ...state, favoriteloading: true };
    case PROJECT_FAVORITE_SUCCESS:
      return {
        ...state,
        favoriteloading: false,
        data: state.data.map((e) => {
          if (e.projectId === action.payload) {
            return {
              ...e,
              favorite: !e.favorite,
            };
          }
          return e;
        }),
      };
    case PROJECT_FAVORITE_FAILED:
      return { ...state, favoriteloading: false, errorMsg: "failed" };
    case PROJECTNAME_EDIT_REQUEST:
      return { ...state, loading: true };
    case PROJECTNAME_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map((e) => {
          if (e.projectId === action.payload.projectId) {
            return {
              ...e,
              name: action.payload.projectname,
            };
          }
          return e;
        }),
      };
    case PROJECTNAME_EDIT_FAILED:
      return { ...state, loading: false, errorMsg: "failed" };
    case PROJECT_FILTER_REQUEST:
      return { ...state, loading: true };
    case PROJECT_FILTER_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case PROJECT_LISTINGS_FAILED:
      return { ...state, loading: false, errorMsg: "failed" };
    default:
      return state;
  }
};
