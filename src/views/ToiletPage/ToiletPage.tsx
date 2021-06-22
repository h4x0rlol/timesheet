import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState, store } from "../../reducers/index";
import { nextMonth, previousMonth } from "../../reducers/dateReducer";
import { showAddForm, showFullStats } from "../../reducers/toiletReducer";
import { monthsArray } from "../../utils/constants";
import ToiletFullStats from "./components/ToiletFullStats";
import ToiletButtons from "./components/ToiletButtons";
import Modal from "@material-ui/core/Modal";
import ToiletAddForm from "./components/ToiletAddForm";
import ToiletGraph from "./components/ToiletGraph";
import monthToiletData from "../../types/data";
import { CircularProgress } from "@material-ui/core";

const ToiletPage = () => {
  const dispatch = useDispatch();
  const date = useSelector((state: IRootState) => state.date);
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
    averageGoings: 0,
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
            console.log(monthData);
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

  // const changeMonth = async (token, month, tz) => {
  //   try {
  //     let res = await axios
  //       .post(`${process.env.BACKEND_URL}/api/getMonthToiletData`, {
  //         token: token,
  //         month: month,
  //         tz: tz,
  //       })
  //       .then(function (res) {
  //         if (res.status == 200) {
  //           setMonthData(res.data.monthToiletData);
  //           setError("");
  //           setIsLoading(false);
  //           console.log(res.data);
  //         }
  //       })
  //       .catch(function (error) {
  //         if (!error.response) {
  //           setError(error.message);
  //         } else {
  //           setError(error.response.data.message);
  //         }
  //         setIsLoading(false);
  //         console.log(error);
  //       });
  //   } catch (e) {
  //     console.log(e);
  //     setError(e.message);
  //   }
  // };

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTz(tz);
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const handleShowFullStats = async () => {
    setIsLoading(true);
    let month = (monthsArray.indexOf(date.month) + 1).toString();
    let year = date.year;
    if (month.length === 1) {
      month = `0${month}`;
    }
    await getMonthToiletData(token, month, year, tz);
    dispatch(showFullStats());
  };

  const handleShowGraph = async () => {
    dispatch(showFullStats());
  };

  const handleShowAddForm = () => {
    dispatch(showAddForm());
  };

  const select = (store) => {
    return store.date.month;
  };

  const handlePreviousMonth = async () => {
    dispatch(previousMonth());
    setIsLoading(true);
    let currentValue = select(store.getState());
    console.log(currentValue);
    let month = (monthsArray.indexOf(currentValue) + 1).toString();
    let year = date.year;
    if (month.length === 1) {
      month = `0${month}`;
    }
    await getMonthToiletData(token, month, year, tz);
  };

  const handleNextMonth = async () => {
    dispatch(nextMonth());
    let currentValue = select(store.getState());
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
            handlePreviousMonth={handlePreviousMonth}
            handleNextMonth={handleNextMonth}
            error={error}
            monthData={monthData}
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
