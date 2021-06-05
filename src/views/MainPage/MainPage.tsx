import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextMonth, previousMonth } from "../../reducers/dateReducer";
import { IRootState } from "../../reducers/index";
import FullStats from "./components/FullStats";
import MainPageButtons from "./components/MainPageButtons";
import MainPageStats from "./components/MainPageStats";
import ModeButtons from "./components/ModeButtons";
import "./MainPage.scss";
import NavBar from "./components/Navbar";

const MainPage = () => {
  // const isFullStats = useSelector(
  //   (state: IRootState) => state.toilet.showFullStats
  // );
  const isFullStats = true;
  const date = useSelector((state: IRootState) => state.date);

  const dispatch = useDispatch();

  return (
    <main className="mainpage">
      <NavBar />
      <div className="mainpage_mode">
        <ModeButtons />
      </div>
      <div className="mainpage_buttons">
        <p className="mainpage_buttons_all_time">
          Всего времени за месяц: 10ч 25м 10с
        </p>
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
        <MainPageButtons isFullStats={isFullStats} />
      </div>
      <div className="mainpage_graph">
        {!isFullStats ? <div>graph </div> : <FullStats />}
      </div>
    </main>
  );
};

export default MainPage;
