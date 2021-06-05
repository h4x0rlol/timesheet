import React from "react";
import { useDispatch } from "react-redux";
import { handleShowFullStats } from "../../../actions/toilet";
import "./styles/index.scss";

const MainPageButtons = (props) => {
  const dispatch = useDispatch();
  return (
    <div className="mainpage_button">
      <p className="mybtn_show" onClick={() => dispatch(handleShowFullStats())}>
        {!props.isFullStats ? "Полная статистика" : "График"}
      </p>
      <p className="mybtn_add">Добавить</p>
    </div>
  );
};

export default MainPageButtons;
