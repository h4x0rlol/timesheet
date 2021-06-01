import React from "react";
import { useDispatch } from "react-redux";
import { handleShowFullStats } from "../../../actions/toilet";
import "./index.scss";

const MainPageButtons = (props) => {
  const dispatch = useDispatch();
  return (
    <div className="mainpage_button">
      <div className="mainpage_button_activebtns">
        <div className="mainpage_button_activebtns_btn">
          <button
            className="mybtn"
            onClick={() => dispatch(handleShowFullStats())}
          >
            {!props.isFullStats ? "Полная статистика" : "График"}
          </button>
        </div>
        <div className="mainpage_button_activebtns_btn">
          <button className="mybtn">Добавить</button>
        </div>
      </div>
    </div>
  );
};

export default MainPageButtons;
