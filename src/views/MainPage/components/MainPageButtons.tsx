import React from "react";
import "./index.scss";

const MainPageButtons = () => {
  return (
    <div className="mainpage_button">
      <div className="mainpage_button_activebtns">
        <div className="mainpage_button_activebtns_btn">
          <button className="mybtn">Полная статистика</button>
        </div>
        <div className="mainpage_button_activebtns_btn">
          <button className="mybtn">Добавить</button>
        </div>
      </div>
    </div>
  );
};

export default MainPageButtons;
