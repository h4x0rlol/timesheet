import React from "react";
import "../../styles/ToiletButtons.scss";

const ToiletButtons = (props) => {
  return (
    <div className="toiletpage_button">
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

export default ToiletButtons;
