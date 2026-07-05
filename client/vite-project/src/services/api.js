import axios from "axios";
import { serverUrl } from "../config/config.js";
import { setUserData } from "../redux/userSlice";

export const getCurrentUser = async (dispatch) => {
  try {
    const result = await axios.get(
      `${serverUrl}/api/user/currentuser`,
      {
        withCredentials: true,
      }
    );

    console.log("Current User:", result.data);

    dispatch(setUserData(result.data));
  } catch (error) {
    console.log("Current User Error:", error.response?.status);
    console.log("Current User Error:", error.response?.data);
  }
};