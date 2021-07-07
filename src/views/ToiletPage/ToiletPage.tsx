import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState, store } from "../../reducers/index";
import {
  nextMonth,
  nextYear,
  previousMonth,
  previousYear,
  setToday,
} from "../../reducers/dateReducer";
import { showAddForm, showFullStats } from "../../reducers/toiletReducer";
import { monthsArray, timeModeArray } from "../../utils/constants";
import ToiletFullStats from "./components/ToiletFullStats";
import ToiletButtons from "./components/ToiletButtons";
import Modal from "@material-ui/core/Modal";
import ToiletAddForm from "./components/ToiletAddForm";
import ToiletGraph from "./components/ToiletGraph";
import {
  allTimeToiletData,
  dayToiletData,
  monthToiletData,
  weekToiletData,
  yearToiletData,
} from "../../types/data";
import { CircularProgress } from "@material-ui/core";
import { nextTimeMode, previousTimeMode } from "../../reducers/timeModeReducer";
import { getDateFromStore, getTimeModeFromStore } from "../../utils/functions";

const ToiletPage = () => {
  // Utils

  const dispatch = useDispatch();
  const date = useSelector((state: IRootState) => state.date);
  const timeMode = useSelector((state: IRootState) => state.timeMode.timeMode);
  const isFullStats = useSelector(
    (state: IRootState) => state.toilet.showFullStats
  );
  const toiletState = useSelector((state: IRootState) => state.toilet);

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTz(tz);
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const [tz, setTz] = useState("");
  const [error, setError] = useState("");
  const [monthData, setMonthData] = useState<monthToiletData>({
    goings: 0,
    days: 0,
    averageGoings: "",
    averageToiletTime: "",
    successfull: 0,
    notSuccessfull: 0,
    neutral: 0,
    successfullPercent: "",
    daysSkiped: 0,
    averageRating: "",
    diarrheas: 0,
    constipations: 0,
    normals: 0,
    enemas: 0,
    laxatives: 0,
    monthTime: "",
  });

  const [dayData, setDayData] = useState<dayToiletData>({
    goings: 0,
    dayTime: "",
    averageRating: "",
    diarrheas: 0,
    constipations: 0,
    normals: 0,
    enemas: 0,
    laxatives: 0,
    comments: [],
  });

  const [weekData, setWeekData] = useState<weekToiletData>({
    goings: 0,
    days: 0,
    averageGoings: "",
    averageToiletTime: "",
    successfull: 0,
    notSuccessfull: 0,
    neutral: 0,
    successfullPercent: "",
    daysSkiped: 0,
    averageRating: "",
    diarrheas: 0,
    constipations: 0,
    normals: 0,
    enemas: 0,
    laxatives: 0,
    weekTime: "",
  });

  const [yearData, setYearData] = useState<yearToiletData>({
    goings: 0,
    days: 0,
    averageGoings: "",
    averageToiletTime: "",
    successfull: 0,
    notSuccessfull: 0,
    neutral: 0,
    successfullPercent: "",
    daysSkiped: 0,
    averageRating: "",
    diarrheas: 0,
    constipations: 0,
    normals: 0,
    enemas: 0,
    laxatives: 0,
    yearTime: "",
  });

  const [allTimeData, setAllTimeData] = useState<allTimeToiletData>({
    goings: 0,
    days: 0,
    averageGoings: "",
    averageToiletTime: "",
    successfull: 0,
    notSuccessfull: 0,
    neutral: 0,
    successfullPercent: "",
    averageRating: "",
    diarrheas: 0,
    constipations: 0,
    normals: 0,
    enemas: 0,
    laxatives: 0,
    allTime: "",
  });

  // API calls

  const getMonthToiletData = async (token, month, year) => {
    try {
      let res = await axios
        .post(`${process.env.BACKEND_URL}/api/getMonthToiletData`, {
          token: token,
          month: month,
          year: year,
        })
        .then(function (res) {
          if (res.status == 200) {
            setMonthData(res.data.monthToiletData);
            setError("");
            setIsLoading(false);
            console.log(res.data.monthToiletData);
          }
        })
        .catch(function (error) {
          if (!error.response) {
            setError(error.message);
          } else {
            setError(error.response.data.message);
          }
          setIsLoading(false);
          console.log(error);
        });
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  const getDayToiletData = async (token, time) => {
    try {
      let res = await axios
        .post(`${process.env.BACKEND_URL}/api/getDayToiletData`, {
          token: token,
          time: time,
        })
        .then(function (res) {
          if (res.status == 200) {
            setDayData(res.data.dayToiletData);
            setError("");
            setIsLoading(false);
            console.log(res.data.dayToiletData);
          }
        })
        .catch(function (error) {
          if (!error.response) {
            setError(error.message);
          } else {
            setError(error.response.data.message);
          }
          setIsLoading(false);
          console.log(error);
        });
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  const getWeekToiletData = async (token, time) => {
    try {
      let res = await axios
        .post(`${process.env.BACKEND_URL}/api/getWeekToiletData`, {
          token: token,
          time: time,
        })
        .then(function (res) {
          if (res.status == 200) {
            setWeekData(res.data.weekToiletData);
            setError("");
            setIsLoading(false);
            console.log(res.data.weekToiletData);
          }
        })
        .catch(function (error) {
          if (!error.response) {
            setError(error.message);
          } else {
            setError(error.response.data.message);
          }
          setIsLoading(false);
          console.log(error);
        });
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  const getYearToiletData = async (token, time, year) => {
    try {
      let res = await axios
        .post(`${process.env.BACKEND_URL}/api/getYearToiletData`, {
          token: token,
          time: time,
          year: year,
        })
        .then(function (res) {
          if (res.status == 200) {
            setYearData(res.data.yearToiletData);
            setError("");
            setIsLoading(false);
            console.log(res.data.yearToiletData);
          }
        })
        .catch(function (error) {
          if (!error.response) {
            setError(error.message);
          } else {
            setError(error.response.data.message);
          }
          setIsLoading(false);
          console.log(error);
        });
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  const getAllTImeToiletData = async (token) => {
    try {
      let res = await axios
        .post(`${process.env.BACKEND_URL}/api/geAllTimeToiletData`, {
          token: token,
        })
        .then(function (res) {
          if (res.status == 200) {
            setAllTimeData(res.data.allTImeToiletData);
            setError("");
            setIsLoading(false);
            console.log(res.data.allTImeToiletData);
          }
        })
        .catch(function (error) {
          if (!error.response) {
            setError(error.message);
          } else {
            setError(error.response.data.message);
          }
          setIsLoading(false);
          console.log(error);
        });
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  // Handlers

  const handleShowFullStats = async () => {
    setIsLoading(true);
    let time = new Date().toLocaleString("ru-Ru", {
      timeZone: tz,
    });
    await getDayToiletData(token, time);
    dispatch(showFullStats());
  };

  const handleShowGraph = async () => {
    dispatch(showFullStats());
  };

  const handleShowAddForm = () => {
    dispatch(showAddForm());
  };

  const handleNextTimeMode = async () => {
    dispatch(nextTimeMode());
    dispatch(setToday());
    setIsLoading(true);
    let currentTimeModeState = getTimeModeFromStore(store.getState());
    let currentDateState = getDateFromStore(store.getState());
    let time = new Date().toLocaleString("ru-Ru", {
      timeZone: tz,
    });
    let month = (monthsArray.indexOf(currentDateState.month) + 1).toString();
    if (month.length === 1) {
      month = `0${month}`;
    }
    let year = currentDateState.year;
    if (currentTimeModeState.timeMode == timeModeArray[0]) {
      await getDayToiletData(token, time);
    } else if (currentTimeModeState.timeMode == timeModeArray[1]) {
      await getWeekToiletData(token, time);
    } else if (currentTimeModeState.timeMode == timeModeArray[2]) {
      await getMonthToiletData(token, month, year);
    } else if (currentTimeModeState.timeMode == timeModeArray[3]) {
      await getYearToiletData(token, time, year);
    } else if (currentTimeModeState.timeMode == timeModeArray[4]) {
      await getAllTImeToiletData(token);
    }
  };

  const handlePreviousTimeMode = async () => {
    dispatch(previousTimeMode());
    dispatch(setToday());
    setIsLoading(true);
    let currentTimeModeState = getTimeModeFromStore(store.getState());
    let currentDateState = getDateFromStore(store.getState());
    let time = new Date().toLocaleString("ru-Ru", {
      timeZone: tz,
    });
    let month = (monthsArray.indexOf(currentDateState.month) + 1).toString();
    if (month.length === 1) {
      month = `0${month}`;
    }
    let year = currentDateState.year;
    if (currentTimeModeState.timeMode == timeModeArray[0]) {
      await getDayToiletData(token, time);
    } else if (currentTimeModeState.timeMode == timeModeArray[1]) {
      await getWeekToiletData(token, time);
    } else if (currentTimeModeState.timeMode == timeModeArray[2]) {
      await getMonthToiletData(token, month, year);
    } else if (currentTimeModeState.timeMode == timeModeArray[3]) {
      await getYearToiletData(token, time, year);
    } else if (currentTimeModeState.timeMode == timeModeArray[4]) {
      await getAllTImeToiletData(token);
    }
  };

  const handlePreviousYear = async () => {
    dispatch(previousYear());
    setIsLoading(true);
    let time = new Date().toLocaleString("ru-Ru", {
      timeZone: tz,
    });
    let currentDateState = getDateFromStore(store.getState());
    let year = currentDateState.year;
    await getYearToiletData(token, time, year);
  };

  const handleNextYear = async () => {
    dispatch(nextYear());
    setIsLoading(true);
    let time = new Date().toLocaleString("ru-Ru", {
      timeZone: tz,
    });
    let currentDateState = getDateFromStore(store.getState());
    let year = currentDateState.year;
    await getYearToiletData(token, time, year);
  };

  const handlePreviousMonth = async () => {
    dispatch(previousMonth());
    setIsLoading(true);
    let currentDateState = getDateFromStore(store.getState());
    let month = (monthsArray.indexOf(currentDateState.month) + 1).toString();
    let year = currentDateState.year;
    if (month.length === 1) {
      month = `0${month}`;
    }
    await getMonthToiletData(token, month, year);
  };

  const handleNextMonth = async () => {
    dispatch(nextMonth());
    let currentDateState = getDateFromStore(store.getState());
    setIsLoading(true);
    let month = (monthsArray.indexOf(currentDateState.month) + 1).toString();
    let year = currentDateState.year;
    if (month.length === 1) {
      month = `0${month}`;
    }
    await getMonthToiletData(token, month, year);
  };

  return (
    <>
      <div className="mainpage_buttons">
        <ToiletButtons
          isFullStats={isFullStats}
          handleShowFullStats={handleShowFullStats}
          handleShowGraph={handleShowGraph}
          handleShowAddForm={handleShowAddForm}
        />
      </div>
      <div className="mainpage_graph">
        {!isFullStats ? (
          <>
            {!isLoading ? (
              <ToiletGraph />
            ) : (
              <div className="graph_loader">
                <CircularProgress style={{ color: "#67e6dc" }} />
              </div>
            )}
          </>
        ) : (
          <ToiletFullStats
            isLoading={isLoading}
            date={date}
            timeMode={timeMode}
            handleNextYear={handleNextYear}
            handlePreviousYear={handlePreviousYear}
            handleNextMonth={handleNextMonth}
            handlePreviousMonth={handlePreviousMonth}
            handleNextTimeMode={handleNextTimeMode}
            handlePreviousTimeMode={handlePreviousTimeMode}
            error={error}
            monthData={monthData}
            dayData={dayData}
            weekData={weekData}
            yearData={yearData}
            allTimeData={allTimeData}
          />
        )}
      </div>
      <Modal
        open={toiletState.showAddForm}
        onClose={handleShowAddForm}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ToiletAddForm />
      </Modal>
    </>
  );
};

export default ToiletPage;
