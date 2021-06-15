import React from "react";
import { useDispatch } from "react-redux";
import { showAddForm } from "../../../reducers/toiletReducer";
import "../../styles/index.scss";

const ToiletMainPageButtons = (props) => {
  return (
    <div className="mainpage_button">
      <p
        className="mybtn_show"
        onClick={
          !props.isFullStats ? props.handleShowFullStats : props.handleShowGraph
        }
      >
        {!props.isFullStats ? "Полная статистика" : "График"}
      </p>
      <p className="mybtn_add" onClick={props.handleShowAddForm}>
        Добавить
      </p>
    </div>
  );
};

export default ToiletMainPageButtons;
