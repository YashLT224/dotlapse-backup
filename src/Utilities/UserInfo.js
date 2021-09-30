import Cookies from "universal-cookie";

export function getToken() {
  const cookies = new Cookies();

  const token = cookies.get("stageAccessToken");
  return token || null;
}
