import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../reducers/index";
import MainPageButtons from "./components/MainPageButtons";
import MainPageStats from "./components/MainPageStats";
import ModeButtons from "./components/ModeButtons";
import "./MainPage.scss";

const MainPage = () => {
  const isFullStats = useSelector(
    (state: IRootState) => state.toilet.showFullStats
  );

  return (
    <div className="mainpage">
      <div className="mainpage_mode">
        <ModeButtons />
      </div>
      <div className="mainpage_buttons">
        <MainPageStats />
        <div className="mainpage_buttons_month">
          <div className="mainpage_buttons_month_arrows">
            <i className="arrow left"></i>
          </div>
          <p className="month_name">Июнь</p>
          <div className="mainpage_buttons_month_arrows">
            <i className="arrow right"></i>
          </div>
        </div>
        <MainPageButtons isFullStats={isFullStats} />
      </div>
      <div className="mainpage_graph">
        {!isFullStats ? <div>graph </div> : <div> full stats</div>}
      </div>
    </div>
  );
};

export default MainPage;
