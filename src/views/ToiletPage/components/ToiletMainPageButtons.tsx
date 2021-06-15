import React from "react";
import { useDispatch } from "react-redux";
import { showAddForm } from "../../../reducers/toiletReducer";
import "../../styles/index.scss";

const ToiletMainPageButtons = (props) => {
  const dispatch = useDispatch();

  const handleShowAddForm = () => {
    dispatch(showAddForm());
  };

  return (
    <div className="mainpage_button">
      <p className="mybtn_show" onClick={props.handleShowFullStats}>
        {!props.isFullStats ? "Полная статистика" : "График"}
      </p>
      <p className="mybtn_add" onClick={handleShowAddForm}>
        Добавить
      </p>
    </div>
  );
};

export default ToiletMainPageButtons;
