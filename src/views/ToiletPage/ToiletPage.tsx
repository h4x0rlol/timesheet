import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../reducers/index";
import { nextMonth, previousMonth } from "../../reducers/dateReducer";
import { showAddForm, showFullStats } from "../../reducers/toiletReducer";
import { monthsArray } from "../../utils/constants";
import ToiletFullStats from "./components/ToiletFullStats";
import ToiletMainPageButtons from "./components/ToiletMainPageButtons";
import Modal from "@material-ui/core/Modal";
import ToiletAddForm from "./components/ToiletAddForm";

const ToiletPage = () => {
  const dispatch = useDispatch();
  const date = useSelector((state: IRootState) => state.date);
  const isFullStats = useSelector(
    (state: IRootState) => state.toilet.showFullStats
  );
  const toiletState = useSelector((state: IRootState) => state.toilet);

  const [isLoading, setIsLoading] = useState(false);
  const [statsExist, setStatsExist] = useState(false);
  const [goings, setGoings] = useState(0);
  const [averageToiletTime, setAverageToiletTime] = useState("");
  const [successfull, setSuccessfull] = useState(0);
  const [notSuccessfull, setNotSuccessfull] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [successfullPercent, setSuccessfullPercent] = useState("");
  const [daysSkiped, setDaysSkiped] = useState(0);
  const [averageRating, setAverageRating] = useState("");
  const [diarrheas, setDiarrheas] = useState(0);
  const [constipations, setConstipations] = useState(0);
  const [normals, setNormals] = useState(0);
  const [enemas, setEnemas] = useState(0);
  const [laxatives, setLaxatives] = useState(0);
  const [monthTime, setMonthTime] = useState("");
  const [allToiletTime, setAllToiletTime] = useState("");

  const handleShowFullStats = async () => {
    setIsLoading(true);
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const token = localStorage.getItem("token");
    let month = (monthsArray.indexOf(date.month) + 1).toString();
    if (month.length === 1) {
      month = `0${month}`;
    }
    await getFullToiletStats(token, month, tz);
  };

  const getFullToiletStats = async (token, month, tz) => {
    try {
      let res = await axios
        .post(`${process.env.BACKEND_URL}/api/getToiletData`, {
          token: token,
          month: month,
          tz: tz,
        })
        .then(function (res) {
          if (res.status == 200) {
            setGoings(res.data.goings);
            let avg = res.data.averageToiletTime.split(":");
            setAverageToiletTime(`${avg[0]}ч ${avg[1]}м`);
            setSuccessfull(res.data.successfull);
            setNotSuccessfull(res.data.notSuccessfull);
            setNeutral(res.data.neutral);
            setSuccessfullPercent(`${res.data.successfullPercent} %`);
            setDaysSkiped(res.data.daysSkiped);
            setAverageRating(res.data.averageRating);
            setDiarrheas(res.data.diarrheas);
            setConstipations(res.data.constipations);
            setNormals(res.data.normals);
            setEnemas(res.data.enemas);
            setLaxatives(res.data.laxatives);
            let month = res.data.monthTime.split(":");
            setMonthTime(`${month[0]}ч ${month[1]}м`);
            let all = res.data.allToiletTime.split(":");
            setAllToiletTime(`${all[0]}ч ${all[1]}м`);
            setStatsExist(true);
            setIsLoading(false);
            dispatch(showFullStats());
            console.log(res.data);
          }
        })
        .catch(function (error) {
          setStatsExist(false);
          setIsLoading(false);
          dispatch(showFullStats());
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleShowAddForm = () => {
    dispatch(showAddForm());
  };

  return (
    <>
      <div className="mainpage_buttons">
        <div className="mainpage_buttons_month">
          <i
            className="arrow left"
            onClick={() => dispatch(previousMonth())}
          ></i>
          <p className="month_name">
            {date.month} ({date.year})
          </p>
          <i className="arrow right" onClick={() => dispatch(nextMonth())}></i>
        </div>
        <ToiletMainPageButtons
          isFullStats={isFullStats}
          handleShowFullStats={handleShowFullStats}
        />
      </div>
      <div className="mainpage_graph">
        {isLoading ? (
          <div className="loading">
            <CircularProgress style={{ color: "#67e6dc" }} />
          </div>
        ) : (
          <>
            {!isFullStats ? (
              <div>graph </div>
            ) : (
              <ToiletFullStats
                statsExist={statsExist}
                goings={goings}
                averageToiletTime={averageToiletTime}
                successfull={successfull}
                notSuccessfull={notSuccessfull}
                neutral={neutral}
                successfullPercent={successfullPercent}
                daysSkiped={daysSkiped}
                averageRating={averageRating}
                diarrheas={diarrheas}
                constipations={constipations}
                normals={normals}
                enemas={enemas}
                laxatives={laxatives}
                monthTime={monthTime}
                allToiletTime={allToiletTime}
              />
            )}
          </>
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
