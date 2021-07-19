import axios from "axios";
import {
  allTimeToiletData,
  dayToiletData,
  monthToiletData,
  weekToiletData,
  yearToiletData,
} from "../../types/data";
import { store } from "react-notifications-component";

export const getMonthToiletData: (
  token,
  month,
  year
) => Promise<{ isLoading: boolean; data: monthToiletData; error: string }> =
  async (token: string, month: string, year: number) => {
    try {
      return new Promise(async (resolve, reject) => {
        await axios
          .get(`${process.env.BACKEND_URL}/api/getMonthToiletData`, {
            params: {
              token: token,
              month: month,
              year: year,
            },
          })
          .then(function (res) {
            if (res.status == 200) {
              console.log(res.data.monthToiletData);
              resolve({
                data: <monthToiletData>res.data.monthToiletData,
                error: "",
                isLoading: false,
              });
            }
          })
          .catch(function (error) {
            if (!error.response) {
              resolve({
                data: <monthToiletData>{},
                error: error.message,
                isLoading: false,
              });
            } else {
              resolve({
                data: <monthToiletData>{},
                error: error.response.data.message,
                isLoading: false,
              });
            }
          });
      });
    } catch (e) {
      console.log(e);
      return {
        data: <monthToiletData>{},
        error: e.message,
        isLoading: false,
      };
    }
  };

export const getDayToiletData: (
  token,
  time
) => Promise<{ isLoading: boolean; data: dayToiletData; error: string }> =
  async (token: string, time: string) => {
    try {
      return new Promise(async (resolve, reject) => {
        await axios
          .get(`${process.env.BACKEND_URL}/api/getDayToiletData`, {
            params: {
              token: token,
              time: time,
            },
          })
          .then(function (res) {
            if (res.status == 200) {
              console.log(res.data.dayToiletData);
              resolve({
                data: <dayToiletData>res.data.dayToiletData,
                error: "",
                isLoading: false,
              });
            }
          })
          .catch(function (error) {
            if (!error.response) {
              resolve({
                data: <dayToiletData>{},
                error: error.message,
                isLoading: false,
              });
            } else {
              resolve({
                data: <dayToiletData>{},
                error: error.response.data.message,
                isLoading: false,
              });
            }
          });
      });
    } catch (e) {
      console.log(e);
      return {
        data: <dayToiletData>{},
        error: e.message,
        isLoading: false,
      };
    }
  };

export const getWeekToiletData: (
  token,
  time
) => Promise<{ isLoading: boolean; data: weekToiletData; error: string }> =
  async (token: string, time: string) => {
    try {
      return new Promise(async (resolve, reject) => {
        await axios
          .get(`${process.env.BACKEND_URL}/api/getWeekToiletData`, {
            params: {
              token: token,
              time: time,
            },
          })
          .then(function (res) {
            if (res.status == 200) {
              console.log(res.data.weekToiletData);
              resolve({
                data: <weekToiletData>res.data.weekToiletData,
                error: "",
                isLoading: false,
              });
            }
          })
          .catch(function (error) {
            if (!error.response) {
              resolve({
                data: <weekToiletData>{},
                error: error.message,
                isLoading: false,
              });
            } else {
              resolve({
                data: <weekToiletData>{},
                error: error.response.data.message,
                isLoading: false,
              });
            }

            console.log(error);
          });
      });
    } catch (e) {
      console.log(e);
      return {
        data: <weekToiletData>{},
        error: e.message,
        isLoading: false,
      };
    }
  };

export const getYearToiletData: (
  token,
  time,
  year
) => Promise<{ isLoading: boolean; data: yearToiletData; error: string }> =
  async (token: string, time: string, year: number) => {
    try {
      return new Promise(async (resolve, reject) => {
        await axios
          .get(`${process.env.BACKEND_URL}/api/getYearToiletData`, {
            params: {
              token: token,
              time: time,
              year: year,
            },
          })
          .then(function (res) {
            if (res.status == 200) {
              console.log(res.data.yearToiletData);
              resolve({
                data: <yearToiletData>res.data.yearToiletData,
                error: "",
                isLoading: false,
              });
            }
          })
          .catch(function (error) {
            if (!error.response) {
              resolve({
                data: <yearToiletData>{},
                error: error.message,
                isLoading: false,
              });
            } else {
              resolve({
                data: <yearToiletData>{},
                error: error.response.data.message,
                isLoading: false,
              });
            }
          });
      });
    } catch (e) {
      console.log(e);
      return {
        data: <yearToiletData>{},
        error: e.message,
        isLoading: false,
      };
    }
  };

export const getAllTImeToiletData: (
  token
) => Promise<{ isLoading: boolean; data: allTimeToiletData; error: string }> =
  async (token: string) => {
    try {
      return new Promise(async (resolve, reject) => {
        await axios
          .get(`${process.env.BACKEND_URL}/api/geAllTimeToiletData`, {
            params: {
              token: token,
            },
          })
          .then(function (res) {
            if (res.status == 200) {
              console.log(res.data.allTimeToiletData);
              resolve({
                data: <allTimeToiletData>res.data.allTimeToiletData,
                error: "",
                isLoading: false,
              });
            }
          })
          .catch(function (error) {
            if (!error.response) {
              resolve({
                data: <allTimeToiletData>{},
                error: error.message,
                isLoading: false,
              });
            } else {
              resolve({
                data: <allTimeToiletData>{},
                error: error.response.data.message,
                isLoading: false,
              });
            }
          });
      });
    } catch (e) {
      console.log(e);
      return {
        data: <allTimeToiletData>{},
        error: e.message,
        isLoading: false,
      };
    }
  };

export const sendToiletData: (
  token,
  start,
  end,
  enema,
  laxative,
  diarrhea,
  constipation,
  normal,
  commentary,
  rating
) => Promise<{ success: boolean }> = async (
  token: string,
  start: string,
  end: string,
  enema: boolean,
  laxative: boolean,
  diarrhea: boolean,
  constipation: boolean,
  normal: boolean,
  commentary: string,
  rating: number
) => {
  try {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(`${process.env.BACKEND_URL}/api/sendToiletData`, {
          token: token,
          start: start,
          end: end,
          enema: +enema,
          laxative: +laxative,
          diarrhea: +diarrhea,
          constipation: +constipation,
          normal: +normal,
          commentary: commentary,
          rating: rating,
        })
        .then(function (res) {
          if (res.status == 200) {
            console.log(res);
            store.addNotification({
              title: "Успешно!",
              message: "Данные отправлены",
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
              success: true,
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
            success: false,
          });
        });
    });
  } catch (e) {
    console.log(e);
    return {
      success: false,
    };
  }
};
