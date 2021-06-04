import axios from "axios";
import { setUser } from "../reducers/userReducer";

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.BACKEND_URL}/api/authenticate`,
        {
          username,
          password,
        }
      );
      dispatch(setUser(res.data));
      localStorage.setItem("token", res.data.token);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
};

export const checkAuth = (token) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${process.env.BACKEND_URL}/api/checkAuth`, {
        token,
      });
      dispatch(setUser(res.data));
      localStorage.setItem("token", res.data.token);
      console.log(res);
    } catch (e) {
      console.log(e);
      localStorage.removeItem("token");
    }
  };
};
