import { TOKEN_FOUND, TOKEN_NOT_FOUND } from "../constant/Auth/userinfotoken";
import { getToken } from "../../Utilities/UserInfo";
const defaultstate = {
  status: 404,
  token: getToken() || null,
};
export const UserInfoReducer = (state = defaultstate, action) => {
  switch (action.type) {
    case TOKEN_FOUND:
      return { status: 200, token: action.payload };
    case TOKEN_NOT_FOUND:
      return { status: action.payload, token: null };

    default:
      return state;
  }
};
