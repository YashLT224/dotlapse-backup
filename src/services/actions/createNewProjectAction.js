import {
  CREATE_NEW_PROJECT_REQUEST,
  CREATE_NEW_PROJECT_SUCCESS,
  CREATE_NEW_PROJECT_FAILED,
  CREATE_NEWPROJECT_TAGS_REQUEST,
  CREATE_NEWPROJECT_TAGS_SUCCESS,
  CREATE_NEWPROJECT_TAGS_FAILED,
  CREATE_NEWPROJECT_APPROVERS_FAILED,
  CREATE_NEWPROJECT_APPROVERS_REQUEST,
  CREATE_NEWPROJECT_APPROVERS_SUCCESS,
  Empty_new_project_State,
} from "../constant/NewProject/NewProjectConstant";

import axios from "axios";
import User from "../../assets/user1.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../../Utilities/UserInfo";
const HOSTs = process.env.REACT_APP_HOST_TEST;
const HOST = `https://tsedl8yo75.execute-api.us-east-1.amazonaws.com/visualui/1.0`;
export const CreateNewProjectAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_NEW_PROJECT_REQUEST,
    });
    const token = getToken();
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.post(`${HOST}/project`, data, config);

    toast.success("Project Successfully Created", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: CREATE_NEW_PROJECT_SUCCESS,
      payload: 200,
    });
  } catch (error) {
    console.log(error);
    toast.error(error, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: CREATE_NEW_PROJECT_FAILED,
      payload: "failed to Create",
    });
  }
};

export const GetTagsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_NEWPROJECT_TAGS_REQUEST,
    });
    const token = getToken();
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${HOST}/tags?limit=100`, config);

    dispatch({
      type: CREATE_NEWPROJECT_TAGS_SUCCESS,
      payload: data.data.map((e, i) => {
        return {
          id: i,
          label: e.name,
          value: e.name,
          colorCode: e.colorCode,
        };
      }),
    });
  } catch (error) {
    dispatch({
      type: CREATE_NEWPROJECT_TAGS_FAILED,
    });
  }
};

export const GetApproversAction = () => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_NEWPROJECT_APPROVERS_REQUEST,
    });
    const token = getToken();
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     authorization:
    //       "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI0IiwiZXhwIjoxNjYwNjMyOTY5LCJqdGkiOiJqVkl3bWtjWVBEbnh4WHk1clpCYVlLNVRoaW5uUk1DSEFSVG9WVmdXRmZrQjh5TW5sd1lEWUUyOG9ncHVnODY3Z3JwWHprZHhKNWw0SFFPZSIsImlhdCI6MTYyOTA5Njk2OSwibmJmIjoxNjI5MDk2OTY5LCJzdWIiOiI2MjE1MSIsInNjb3BlcyI6IltdIiwiaWQiOjYyMTUxLCJlbWFpbCI6Inlhc2h2QGxhbWJkYXRlc3QuY29tIiwidXNlcm5hbWUiOiJ5YXNodiIsIm5hbWUiOiJ5YXNoIHZlcm1hIiwib3JnYW5pemF0aW9uX2lkIjoxMTc5MzksIm9yZ2FuaXphdGlvbl9yb2xlIjoiQWRtaW4iLCJpbnRlcmNvbV91c2VyX2hhc2giOiI0Yzc3NDg5MjQ2ZDdjNTYwYWEzNGRjMTU0ZTEyZjk3ZGM4ZGMxODgzY2U0ZWVhMDkxZjcxYmRmNzUyYzQxNmVjIiwiY3JlYXRlZF9hdCI6IjIwMjEtMDgtMTJUMDg6MjI6NTFaIn0.j5KXy5WcIf7jZp_J026LfgnAg_lsHprfomXf_jAYsskmzvQ0ff9NqmSZYgcreSbR2tK98SvRIqTblx8PueavgP6moY-0i8Ud3Gyg1Jvlp7e7ukaRjnI50FyQenwRgwju0_6ZR3dbHhTOZQaV5IRYguJ9TQdF-SBDjcidfmc2kkSeE2TrJlEt6bOczlvzet7Zzj91JNn800VaZjFXOzP6OM19OKf5WJYWQsXj0x9P3PwGy2OnjBjs106KGE8bb-Xv5jQGVgAvnW6ZQ6U1evS5wDtwpnKIoRnvQj667aqSkvjasmpNtekLn5hL34hkL9I40yov1UpimG-sTWFKEYRifZ7mlhij99peXsQnTFS0RnOfi8FRYtSGTDzO0UwZR0sgMPkrmEQ9EDukO0BWe1nqBa0HO1PZr3va0jU4Rk71mL_ZgvO6kt9nM2VNdg-5RmzkOazbWDCBG9xSgdz52FaQjAfA2aCbrmyUHPq18WiA_hImRRh5D6NYzbUVu4P14brWKGy5IU0gSV6sywZeFyxJGGiCCO41iz3PQ2kNF6KHosx0pAbqpWOwjDFvssnwyESzi-ODjI6NtMJBKGU0s8k2IeLj4y-wBciBwGUsaNtoln5dp_-3ZX2CG6gmBh372405P7WadtnPZKKuehXErGACXH7wjm5Ck9Sxvk88vXFNZew",
    //   },
    // };
    const { data } = await axios.get(
      "https://stage-accounts.lambdatest.com/api/user/organization/team",
      config
    );

    dispatch({
      type: CREATE_NEWPROJECT_APPROVERS_SUCCESS,
      payload: data.data.map((e) => {
        return {
          value: e.name,
          avatar: e.avatar,
          label: (
            <div className="flex h-5">
              <img
                className="mr-2   rounded-xl"
                src={e.avatar || User}
                alt="text"
              />{" "}
              <span>{e.name}</span>{" "}
            </div>
          ),
        };
      }),
    });
  } catch (error) {
    dispatch({
      type: CREATE_NEWPROJECT_APPROVERS_FAILED,
    });
  }
};

export const EmptyReducernewprojectAction = () => async (dispatch) => {
  dispatch({
    type: Empty_new_project_State,
  });
};
