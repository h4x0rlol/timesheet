import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState, store } from "../../reducers/index";
import {
  nextMonth,
  nextYear,
  previousMonth,
  previousYear,
} from "../../reducers/dateReducer";
import { showAddForm, showFullStats } from "../../reducers/toiletReducer";
import { monthsArray, timeModeArray } from "../../utils/constants";
import ToiletFullStats from "./components/ToiletFullStats";
import ToiletButtons from "./components/ToiletButtons";
import Modal from "@material-ui/core/Modal";
import ToiletAddForm from "./components/ToiletAddForm";
import ToiletGraph from "./components/ToiletGraph";
import { dayToiletData, monthToiletData } from "../../types/data";
import { CircularProgress } from "@material-ui/core";
import { nextTimeMode, previousTimeMode } from "../../reducers/timeModeReducer";

const ToiletPage = () => {
  const dispatch = useDispatch();
  const date = useSelector((state: IRootState) => state.date);
  const timeMode = useSelector((state: IRootState) => state.timeMode.timeMode);
  const isFullStats = useSelector(
    (state: IRootState) => state.toilet.showFullStats
  );
  const toiletState = useSelector((state: IRootState) => state.toilet);

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

  const getMonthToiletData = async (token, month, year, tz) => {
    try {
      let res = await axios
        .post(`${process.env.BACKEND_URL}/api/getMonthToiletData`, {
          token: token,
          month: month,
          year: year,
          tz: tz,
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

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTz(tz);
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

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

  const selectTimeMode = (store) => {
    return store.timeMode.timeMode;
  };

  const selectYear = (store) => {
    return store.date.year;
  };

  const selectMonth = (store) => {
    return store.date.month;
  };

  const handleNextTimeMode = async () => {
    dispatch(nextTimeMode());
    // setIsLoading(true);
    let currentTimeMode = selectTimeMode(store.getState());
    if (currentTimeMode == timeModeArray[0]) {
      console.log("сегодня");
    } else if (currentTimeMode == timeModeArray[1]) {
      console.log("неделя");
    } else if (currentTimeMode == timeModeArray[2]) {
      console.log("месяц");
    } else if (currentTimeMode == timeModeArray[3]) {
      console.log("год");
    } else if (currentTimeMode == timeModeArray[4]) {
      console.log("всего");
    }
  };

  const handlePreviousTimeMode = async () => {
    dispatch(previousTimeMode());
    // setIsLoading(true);
    let currentTimeMode = selectTimeMode(store.getState());
    if (currentTimeMode == timeModeArray[0]) {
      console.log("сегодня");
    } else if (currentTimeMode == timeModeArray[1]) {
      console.log("неделя");
    } else if (currentTimeMode == timeModeArray[2]) {
      console.log("месяц");
    } else if (currentTimeMode == timeModeArray[3]) {
      console.log("год");
    } else if (currentTimeMode == timeModeArray[4]) {
      console.log("всего");
    }
  };

  const handlePreviousYear = async () => {
    dispatch(previousYear());
    // setIsLoading(true);
    let year = selectYear(store.getState());
    console.log(year);
  };

  const handleNextYear = async () => {
    dispatch(nextYear());
    // setIsLoading(true);
    let year = selectYear(store.getState());
    console.log(year);
  };

  const handlePreviousMonth = async () => {
    dispatch(previousMonth());
    setIsLoading(true);
    let currentValue = selectMonth(store.getState());
    let month = (monthsArray.indexOf(currentValue) + 1).toString();
    let year = selectYear(store.getState());
    if (month.length === 1) {
      month = `0${month}`;
    }
    await getMonthToiletData(token, month, year, tz);
  };

  const handleNextMonth = async () => {
    dispatch(nextMonth());
    let currentValue = selectMonth(store.getState());
    console.log(currentValue);
    setIsLoading(true);
    let month = (monthsArray.indexOf(currentValue) + 1).toString();
    let year = date.year;
    if (month.length === 1) {
      month = `0${month}`;
    }
    await getMonthToiletData(token, month, year, tz);
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
