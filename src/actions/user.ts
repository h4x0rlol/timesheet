import axios from "axios";
import { setUser } from "../reducers/userReducer";

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/authenticate`, {
        username,
        password,
      });
      dispatch(setUser(res.data));
      localStorage.setItem("token", res.data.token);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
};
