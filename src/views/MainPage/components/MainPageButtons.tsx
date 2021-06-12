import React from "react";
import { useDispatch } from "react-redux";
import { showAddForm, showFullStats } from "../../../reducers/toiletReducer";
import "./styles/index.scss";

const MainPageButtons = (props) => {
  const dispatch = useDispatch();

  const handleShow = () => {
    dispatch(showAddForm());
  };

  return (
    <div className="mainpage_button">
      <p className="mybtn_show" onClick={() => dispatch(showFullStats())}>
        {!props.isFullStats ? "Полная статистика" : "График"}
      </p>
      <p className="mybtn_add" onClick={handleShow}>
        Добавить
      </p>
    </div>
  );
};

export default MainPageButtons;
