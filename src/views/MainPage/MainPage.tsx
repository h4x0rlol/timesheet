import React from "react";
import MainPageButtons from "./components/MainPageButtons";
import MainPageStats from "./components/MainPageStats";
import ModeButtons from "./components/ModeButtons";
import "./MainPage.scss";

const MainPage = () => {
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
        <MainPageButtons />
      </div>
      <div className="mainpage_graph">
        {/* graph comp */}
        dsda
      </div>
    </div>
  );
};

export default MainPage;
