import { Switch } from "react-router-dom";
import {
  BUILD_LISTING_REQUEST,
  BUILD_LISTING_SUCCESS,
  BUILD_LISTING_FAILED,
  UPDATE_BUILD_BASELINE_FAILED,
  UPDATE_BUILD_BASELINE_REQUEST,
  UPDATE_BUILD_BASELINE_SUCCESS,
  DELETE_BUILD_LISTING_SUCCESS,
  DELETE_BUILD_LISTING_REQUEST,
  DELETE_BUILD_LISTING_FAILED,
  BUILDNAME_EDIT_FAILED,
  BUILDNAME_EDIT_REQUEST,
  BUILDNAME_EDIT_SUCCESS,
  SEARCH_BUILD_KEYWORD_REQUEST,
  SEARCH_BUILD_KEYWORD_SUCCESS,
  SEARCH_BUILD_KEYWORD_FAILED,
  BUILD_LISTING_LAZY_SUCCESS,
  BUILD_LISTING_LAZY_REQUEST,
  BUILD_LISTING_LAZY_FAILED,
  BUILD_LISTING_EMPTY,
} from "../constant/BuildListings/BuildListingConstant";

const BuildsListingsDefaultState = {
  loading: false,
  lazyloading: false,
  favoriteloading: false,
  errorMsg: "",
  count: 0,
  data: [],
};

export const getBuildsListingReducer = (
  state = BuildsListingsDefaultState,
  action
) => {
  switch (action.type) {
    case BUILD_LISTING_REQUEST:
      return {
        ...state,
        loading: action.payload === "defaultload" ? true : false,
        lazyloading: action.payload === "defaultload" ? false : true,
      };
    case BUILD_LISTING_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        lazyloading: false,
        data: [...state.data, ...action.payload.data],
      };
    case BUILD_LISTING_FAILED:
      return { ...state, loading: false, errorMsg: "failed" };

    case BUILD_LISTING_EMPTY:
      return { ...state, data: [] };
    case UPDATE_BUILD_BASELINE_REQUEST:
      return { ...state, loading: true };
    case UPDATE_BUILD_BASELINE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map((e) => {
          if (e.buildId === action.payload) {
            return {
              ...e,
              baseline: !e.baseline,
            };
          } else {
            return {
              ...e,
              baseline: false,
            };
          }
          //return e;
        }),
      };
    case UPDATE_BUILD_BASELINE_FAILED:
      return { ...state, loading: false, errorMsg: "failed" };
    case DELETE_BUILD_LISTING_REQUEST:
      return { ...state, loading: true };
    case DELETE_BUILD_LISTING_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.filter((e) => e.buildId !== action.payload),
      };
    case DELETE_BUILD_LISTING_FAILED:
      return { ...state, loading: false, errorMsg: "failed" };
    case BUILDNAME_EDIT_REQUEST:
      return { ...state, loading: true };
    case BUILDNAME_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map((e) => {
          if (e.buildId === action.payload.buildId) {
            return {
              ...e,
              name: action.payload.buildname,
            };
          }
          return e;
        }),
      };
    case BUILDNAME_EDIT_FAILED:
      return { ...state, loading: false, errorMsg: "failed" };
    case SEARCH_BUILD_KEYWORD_REQUEST:
      return { ...state, loading: true };
    case SEARCH_BUILD_KEYWORD_SUCCESS:
      console.log(action.payload);
      return { ...state, loading: false, data: [...action.payload] };
    case SEARCH_BUILD_KEYWORD_FAILED:
      return { ...state, loading: false, errorMsg: "failed" };

    case "Empty_State":
      return { ...state, data: [] };

    default:
      return state;
  }
};

const BuildsListingslazyState = {
  loading: false,
  favoriteloading: false,
  errorMsg: "",
  count: 0,
  data: [],
};

export const getBuildsListingLazyReducer = (
  state = BuildsListingslazyState,
  action
) => {
  switch (action.type) {
    case BUILD_LISTING_LAZY_REQUEST:
      return { ...state, loading: true };
    case BUILD_LISTING_LAZY_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case BUILD_LISTING_LAZY_FAILED:
      return { ...state, loading: false, errorMsg: "failed" };
    default:
      return state;
  }
};
