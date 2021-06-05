import axios from "axios";
import { setError, setUser } from "../reducers/userReducer";

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
      dispatch(setError("Неверный логин или пароль"));
      console.log(e);
    }
  };
};

export const register = (username, password) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${process.env.BACKEND_URL}/api/register`, {
        username,
        password,
      });
      console.log(res);
      dispatch(setError("Аккаунт успешно зарегестрирован"));
    } catch (e) {
      dispatch(setError("Такое имя пользователя уже существует"));
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
