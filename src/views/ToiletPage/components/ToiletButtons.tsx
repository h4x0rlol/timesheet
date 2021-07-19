import React from "react";
import "../../styles/ToiletButtons.scss";
import { timeModeArray, typesOfStats } from "../../../utils/constants";
import { useDispatch } from "react-redux";

const ToiletButtons = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      {props.stats.typeOfStats != typesOfStats[2] ? (
        <div className="toiletpage_buttons_mode">
          <i className="arrow left" onClick={props.handlePreviousTimeMode} />
          <p className="mode_name">{props.timeMode}</p>
          <i className="arrow right" onClick={props.handleNextTimeMode} />
          {(props.timeMode == timeModeArray[2] ||
            props.timeMode == timeModeArray[3]) && (
            <div className="toiletpage_buttons_mode">
              <i
                className="arrow left"
                onClick={
                  props.timeMode == timeModeArray[2]
                    ? () => {
                        props.handlePreviousMonth();
                      }
                    : () => {
                        props.handlePreviousYear();
                      }
                }
              />
              {props.timeMode == timeModeArray[2] ? (
                <p className="month_name">
                  {props.date.month} ({props.date.year})
                </p>
              ) : (
                <p className="month_name">{props.date.year}</p>
              )}
              <i
                className="arrow right"
                onClick={
                  props.timeMode == timeModeArray[2]
                    ? () => {
                        props.handleNextMonth();
                      }
                    : () => {
                        props.handleNextYear();
                      }
                }
              />
            </div>
          )}
        </div>
      ) : (
        <div className="table_desc">
          <p>Полная таблица из БД</p>
        </div>
      )}
      <div className="toiletpage_button">
        <p className="mybtn_show" onClick={props.handleSwitchStatsTypes}>
          {props.stats.typeOfStats}
        </p>
        <p className="mybtn_add" onClick={props.handleShowAddForm}>
          Добавить
        </p>
      </div>
    </>
  );
};

export default ToiletButtons;
