import axios from "axios";
import { store } from "react-notifications-component";
import { User } from "../../types/user";

export const logoutFunc: (
  username
) => Promise<{ success: boolean; error: string }> = async (username) => {
  try {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(`${process.env.BACKEND_URL}/api/logout`, {
          username: username,
        })
        .then(function (res) {
          if (res.status == 200) {
            resolve({
              success: true,
              error: "",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
          resolve({
            success: false,
            error: error.message,
          });
        });
    });
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: e.message,
    };
  }
};

export const login: (username, password) => Promise<{ user: User }> = async (
  username,
  password
) => {
  try {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(`${process.env.BACKEND_URL}/api/authenticate`, {
          username: username,
          password: password,
        })
        .then(function (res) {
          if (res.status == 200) {
            console.log(res);
            resolve({
              user: <User>res.data,
            });
          }
        })
        .catch(function (error) {
          store.addNotification({
            title: "Произошла ошибка!",
            message: error.response
              ? error.response.data.message
              : error.message,
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
              onScreen: true,
            },
          });
          resolve({
            user: undefined,
          });
        });
    });
  } catch (e) {
    console.log(e);
    return {
      user: undefined,
    };
  }
};

export const register: (username, password) => Promise<{ user: User }> = async (
  username,
  password
) => {
  try {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(`${process.env.BACKEND_URL}/api/register`, {
          username: username,
          password: password,
        })
        .then(function (res) {
          if (res.status == 200) {
            console.log(res);
            store.addNotification({
              title: "Успешно!",
              message: "Аккаунт зарегестрирован",
              type: "success",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 3000,
                onScreen: true,
              },
            });
            resolve({
              user: <User>res.data,
            });
          }
        })
        .catch(function (error) {
          store.addNotification({
            title: "Произошла ошибка!",
            message: error.response
              ? error.response.data.message
              : error.message,
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
              onScreen: true,
            },
          });
          resolve({
            user: undefined,
          });
        });
    });
  } catch (e) {
    console.log(e);
    return {
      user: undefined,
    };
  }
};

export const checkAuth: (token) => Promise<{ user: User }> = async (token) => {
  try {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(`${process.env.BACKEND_URL}/api/checkAuth`, {
          token: token,
        })
        .then(function (res) {
          if (res.status == 200) {
            console.log(res);
            resolve({
              user: <User>res.data,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
          resolve({
            user: undefined,
          });
        });
    });
  } catch (e) {
    console.log(e);
    return {
      user: undefined,
    };
  }
};
