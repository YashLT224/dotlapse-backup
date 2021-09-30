import { combineReducers } from "redux";
import {
  createNewProjectReducer,
  GetTagListReducer,
  GetApproverListReducer,
} from "./createNewProjectReducer";

import { GetProjectListingsReducer } from "./ProjectListingsReducer";
import {
  getBuildsListingReducer,
  getBuildsListingLazyReducer,
} from "./BuildsListingReducer";
import { UserInfoReducer } from "./UserInfo";
import {
  GetTestComparisonListsReducer,
  GetTestComparisonResultReducer,
} from "./TestComparisonReducer";
import { UserInfodataReducer } from "./UserInfoReducer";

export default combineReducers({
  createNewProjectReducer: createNewProjectReducer,
  GetTagListReducer: GetTagListReducer,
  GetApproverListReducer: GetApproverListReducer,
  GetProjectListingsReducer: GetProjectListingsReducer,
  getBuildsListingReducer: getBuildsListingReducer,
  getBuildsListingLazyReducer: getBuildsListingLazyReducer,
  UserInfoReducer: UserInfoReducer,
  GetTestComparisonListsReducer: GetTestComparisonListsReducer,
  GetTestComparisonResultReducer: GetTestComparisonResultReducer,
  UserInfodataReducer: UserInfodataReducer,
});
