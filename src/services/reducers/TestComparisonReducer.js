import {
  TEST_COMAPARISON_LIST_REQUEST,
  TEST_COMAPARISON_LIST_SUCCESS,
  TEST_COMAPARISON_LIST_FAILED,
  TEST_COMPARISON_RESULT_FAILED,
  TEST_COMPARISON_RESULT_SUCCESS,
  TEST_COMPARISON_RESULT_REQUEST,
  TEST_COMPARISON_RESULT_EMPTY,
} from "../constant/TestComparison/TestComaprison";

const TestComaprisonDefaultState = {
  loading: false,
  favoriteloading: false,
  errorMsg: "",
  count: 0,
  data: [],
};

export const GetTestComparisonListsReducer = (
  state = TestComaprisonDefaultState,
  action
) => {
  switch (action.type) {
    case TEST_COMAPARISON_LIST_REQUEST:
      return { ...state, loading: true };
    case TEST_COMAPARISON_LIST_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case TEST_COMAPARISON_LIST_FAILED:
      return { ...state, loading: false, errorMsg: "failed!!" };
    default:
      return state;
  }
};

const TestComaprisonListDefaultState = {
  resultloading: false,
  errorMsg: "",
  count: 0,
  data: {},
};

export const GetTestComparisonResultReducer = (
  state = TestComaprisonListDefaultState,
  action
) => {
  switch (action.type) {
    case TEST_COMPARISON_RESULT_REQUEST:
      return { ...state, resultloading: true };
    case TEST_COMPARISON_RESULT_SUCCESS:
      return { ...state, resultloading: false, data: action.payload };
    case TEST_COMPARISON_RESULT_FAILED:
      return { ...state, resultloading: false, errorMsg: "failed!!" };
    case TEST_COMPARISON_RESULT_EMPTY:
      return { ...state, resultloading: false, data: action.payload };
    default:
      return state;
  }
};
