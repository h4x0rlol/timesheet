import "../styles/ToiletPage.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState, store } from "../../reducers";
import {
  nextMonth,
  nextYear,
  previousMonth,
  previousYear,
  setToday,
} from "../../reducers/dateReducer";
import {
  monthsArray,
  timeModeArray,
  typesOfStats,
} from "../../utils/constants";
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
import {
  getDateFromStore,
  getStatsTypeFromStore,
  getTimeModeFromStore,
  getUserFromStore,
} from "../../utils/functions";
import {
  getAllTImeToiletData,
  getDayToiletData,
  getMonthToiletData,
  getWeekToiletData,
  getYearToiletData,
} from "../../utils/Api/ToiletRequests";
import { nextTypeOfStats, showAddForm } from "../../reducers/statsReducer";

const ToiletPage = (props) => {
  // Utils

  const dispatch = useDispatch();

  const date = useSelector((state: IRootState) => state.date);
  const timeMode = useSelector((state: IRootState) => state.timeMode.timeMode);
  const stats = useSelector((state: IRootState) => state.stats);

  useEffect(() => {
    const stats = getStatsTypeFromStore(store.getState());
    checkForStatsType(stats.typeOfStats);
  }, []);

  const [isLoading, setIsLoading] = useState(true);
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

  // Handlers

  const makeFullStatsRequests = async (timeMode: string) => {
    setIsLoading(true);
    const token = await getUserFromStore(store.getState()).currentUser.token;
    const currentDateState = await getDateFromStore(store.getState());
    const time = new Date().toLocaleString("ru-Ru", {
      timeZone: props.tz,
    });
    let month = (monthsArray.indexOf(currentDateState.month) + 1).toString();
    if (month.length === 1) {
      month = `0${month}`;
    }
    const year = currentDateState.year;
    if (timeMode == timeModeArray[0]) {
      const res = await getDayToiletData(token, time);
      setDayData(res.data);
      setError(res.error);
      setIsLoading(res.isLoading);
    } else if (timeMode == timeModeArray[1]) {
      const res = await getWeekToiletData(token, time);
      setWeekData(res.data);
      setError(res.error);
      setIsLoading(res.isLoading);
    } else if (timeMode == timeModeArray[2]) {
      const res = await getMonthToiletData(token, month, year);
      setMonthData(res.data);
      setError(res.error);
      setIsLoading(res.isLoading);
    } else if (timeMode == timeModeArray[3]) {
      const res = await getYearToiletData(token, time, year);
      setYearData(res.data);
      setError(res.error);
      setIsLoading(res.isLoading);
    } else if (timeMode == timeModeArray[4]) {
      const res = await getAllTImeToiletData(token);
      setAllTimeData(res.data);
      setError(res.error);
      setIsLoading(res.isLoading);
    }
  };

  const makeGraphRequests = async (timeMode: string) => {
    console.log("Graph data");
    setIsLoading(false);
  };

  const makeTablesFromDbRequests = async () => {
    console.log("Tables from DB data");
    setIsLoading(false);
  };

  const checkForStatsType = async (type: string) => {
    const currentTimeModeState = await getTimeModeFromStore(store.getState());
    if (type === typesOfStats[0]) {
      await makeGraphRequests(currentTimeModeState.timeMode);
    } else if (type === typesOfStats[1]) {
      await makeFullStatsRequests(currentTimeModeState.timeMode);
    } else if (type === typesOfStats[2]) {
      await makeTablesFromDbRequests();
    }
  };

  const handleSwitchStatsTypes = async () => {
    dispatch(nextTypeOfStats());
    const stats = getStatsTypeFromStore(store.getState());
    await checkForStatsType(stats.typeOfStats);
  };

  const handleShowAddForm = () => {
    dispatch(showAddForm());
  };

  const handleNextTimeMode = async () => {
    dispatch(nextTimeMode());
    dispatch(setToday());
    const stats = getStatsTypeFromStore(store.getState());
    await checkForStatsType(stats.typeOfStats);
  };

  const handlePreviousTimeMode = async () => {
    dispatch(previousTimeMode());
    dispatch(setToday());
    const stats = getStatsTypeFromStore(store.getState());
    await checkForStatsType(stats.typeOfStats);
  };

  const handlePreviousYear = async () => {
    dispatch(previousYear());
    const stats = getStatsTypeFromStore(store.getState());
    await checkForStatsType(stats.typeOfStats);
  };

  const handleNextYear = async () => {
    dispatch(nextYear());
    const stats = getStatsTypeFromStore(store.getState());
    await checkForStatsType(stats.typeOfStats);
  };

  const handlePreviousMonth = async () => {
    dispatch(previousMonth());
    const stats = getStatsTypeFromStore(store.getState());
    await checkForStatsType(stats.typeOfStats);
  };

  const handleNextMonth = async () => {
    dispatch(nextMonth());
    const stats = getStatsTypeFromStore(store.getState());
    await checkForStatsType(stats.typeOfStats);
  };

  return (
    <>
      <div className="toiletpage_buttons">
        <ToiletButtons
          handleSwitchStatsTypes={handleSwitchStatsTypes}
          stats={stats}
          handleShowAddForm={handleShowAddForm}
          isLoading={isLoading}
          date={date}
          timeMode={timeMode}
          handleNextYear={handleNextYear}
          handlePreviousYear={handlePreviousYear}
          handleNextMonth={handleNextMonth}
          handlePreviousMonth={handlePreviousMonth}
          handleNextTimeMode={handleNextTimeMode}
          handlePreviousTimeMode={handlePreviousTimeMode}
        />
      </div>
      <div className="toiletpage_graph">
        {!isLoading ? (
          stats.typeOfStats == typesOfStats[0] ? (
            <ToiletGraph />
          ) : stats.typeOfStats == typesOfStats[1] ? (
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
          ) : stats.typeOfStats == typesOfStats[2] ? (
            <div>Таблицы из БД</div>
          ) : (
            <div className="graph_loader">
              <CircularProgress style={{ color: "#67e6dc" }} />
            </div>
          )
        ) : (
          <div className="graph_loader">
            <CircularProgress style={{ color: "#67e6dc" }} />
          </div>
        )}
      </div>
      <Modal
        open={stats.showAddForm}
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
