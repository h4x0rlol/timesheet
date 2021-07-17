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
import {
  getAllTImeToiletData,
  getDayToiletData,
  getMonthToiletData,
  getWeekToiletData,
  getYearToiletData,
} from "../../utils/Api/ToiletRequests";

const ToiletPage = (props) => {
  // Utils

  const dispatch = useDispatch();
  const date = useSelector((state: IRootState) => state.date);
  const timeMode = useSelector((state: IRootState) => state.timeMode.timeMode);
  const isFullStats = useSelector(
    (state: IRootState) => state.toilet.showFullStats
  );
  const toiletState = useSelector((state: IRootState) => state.toilet);

  useEffect(() => {
    const currentTimeModeState = getTimeModeFromStore(store.getState());
    handleRequests(currentTimeModeState.timeMode);
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

  const handleRequests = async (timeMode) => {
    setIsLoading(true);
    const currentDateState = getDateFromStore(store.getState());
    const time = new Date().toLocaleString("ru-Ru", {
      timeZone: props.tz,
    });
    let month = (monthsArray.indexOf(currentDateState.month) + 1).toString();
    if (month.length === 1) {
      month = `0${month}`;
    }
    const year = currentDateState.year;
    if (timeMode == timeModeArray[0]) {
      const res = await getDayToiletData(props.token, time);
      setDayData(res.data);
      setError(res.error);
      setIsLoading(res.isLoading);
    } else if (timeMode == timeModeArray[1]) {
      const res = await getWeekToiletData(props.token, time);
      setWeekData(res.data);
      setError(res.error);
      setIsLoading(res.isLoading);
    } else if (timeMode == timeModeArray[2]) {
      const res = await getMonthToiletData(props.token, month, year);
      setMonthData(res.data);
      setError(res.error);
      setIsLoading(res.isLoading);
    } else if (timeMode == timeModeArray[3]) {
      const res = await getYearToiletData(props.token, time, year);
      setYearData(res.data);
      setError(res.error);
      setIsLoading(res.isLoading);
    } else if (timeMode == timeModeArray[4]) {
      const res = await getAllTImeToiletData(props.token);
      setAllTimeData(res.data);
      setError(res.error);
      setIsLoading(res.isLoading);
    }
  };

  const handleShowFullStats = async () => {
    const currentTimeModeState = getTimeModeFromStore(store.getState());
    await handleRequests(currentTimeModeState.timeMode);
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
    const currentTimeModeState = getTimeModeFromStore(store.getState());
    await handleRequests(currentTimeModeState.timeMode);
  };

  const handlePreviousTimeMode = async () => {
    dispatch(previousTimeMode());
    dispatch(setToday());
    const currentTimeModeState = getTimeModeFromStore(store.getState());
    await handleRequests(currentTimeModeState.timeMode);
  };

  const handlePreviousYear = async () => {
    dispatch(previousYear());
    const currentTimeModeState = getTimeModeFromStore(store.getState());
    await handleRequests(currentTimeModeState.timeMode);
  };

  const handleNextYear = async () => {
    dispatch(nextYear());
    const currentTimeModeState = getTimeModeFromStore(store.getState());
    await handleRequests(currentTimeModeState.timeMode);
  };

  const handlePreviousMonth = async () => {
    dispatch(previousMonth());
    const currentTimeModeState = getTimeModeFromStore(store.getState());
    await handleRequests(currentTimeModeState.timeMode);
  };

  const handleNextMonth = async () => {
    dispatch(nextMonth());
    const currentTimeModeState = getTimeModeFromStore(store.getState());
    await handleRequests(currentTimeModeState.timeMode);
  };

  return (
    <>
      <div className="toiletpage_buttons">
        <ToiletButtons
          isFullStats={isFullStats}
          handleShowFullStats={handleShowFullStats}
          handleShowGraph={handleShowGraph}
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
