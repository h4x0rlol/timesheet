import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextMonth, previousMonth } from "../../reducers/dateReducer";
import { IRootState } from "../../reducers/index";
import FullStats from "./components/FullStats";
import MainPageButtons from "./components/MainPageButtons";
import MainPageStats from "./components/MainPageStats";
import ModeButtons from "./components/ModeButtons";
import "./MainPage.scss";

const MainPage = () => {
  // const isFullStats = useSelector(
  //   (state: IRootState) => state.toilet.showFullStats
  // );
  const isFullStats = true;
  const date = useSelector((state: IRootState) => state.date);

  const dispatch = useDispatch();

  return (
    <div className="mainpage">
      <div className="mainpage_mode">
        <ModeButtons />
      </div>
      <div className="mainpage_buttons">
        <MainPageStats />
        <div className="mainpage_buttons_month">
          <div className="mainpage_buttons_month_arrows">
            <i
              className="arrow left"
              onClick={() => dispatch(previousMonth())}
            ></i>
          </div>
          <p className="month_name">
            {date.month} ({date.year})
          </p>
          <div className="mainpage_buttons_month_arrows">
            <i
              className="arrow right"
              onClick={() => dispatch(nextMonth())}
            ></i>
          </div>
        </div>
        <MainPageButtons isFullStats={isFullStats} />
      </div>
      <div className="mainpage_graph">
        {!isFullStats ? <div>graph </div> : <FullStats />}
      </div>
    </div>
  );
};

export default MainPage;
