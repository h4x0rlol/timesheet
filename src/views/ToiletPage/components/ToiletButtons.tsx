import React from "react";
import "../../styles/ToiletButtons.scss";
import { timeModeArray } from "../../../utils/constants";

const ToiletButtons = (props) => {
  return (
    <>
      <div className="toiletpage_buttons_mode">
        <i
          className="arrow left"
          style={
            !props.isLoading
              ? {
                  cursor: "pointer",
                }
              : {}
          }
          onClick={
            !props.isLoading
              ? () => {
                  props.handlePreviousTimeMode();
                }
              : () => {}
          }
        />
        <p className="mode_name">{props.timeMode}</p>
        <i
          className="arrow right"
          style={
            !props.isLoading
              ? {
                  cursor: "pointer",
                }
              : {}
          }
          onClick={
            !props.isLoading
              ? () => {
                  props.handleNextTimeMode();
                }
              : () => {}
          }
        />
        {(props.timeMode == timeModeArray[2] ||
          props.timeMode == timeModeArray[3]) && (
          <div className="toiletpage_buttons_mode">
            <i
              className="arrow left"
              style={
                !props.isLoading
                  ? {
                      cursor: "pointer",
                    }
                  : {}
              }
              onClick={
                !props.isLoading
                  ? props.timeMode == timeModeArray[2]
                    ? () => {
                        props.handlePreviousMonth();
                      }
                    : () => {
                        props.handlePreviousYear();
                      }
                  : () => {}
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
              style={
                !props.isLoading
                  ? {
                      cursor: "pointer",
                    }
                  : {}
              }
              onClick={
                !props.isLoading
                  ? props.timeMode == timeModeArray[2]
                    ? () => {
                        props.handleNextMonth();
                      }
                    : () => {
                        props.handleNextYear();
                      }
                  : () => {}
              }
            />
          </div>
        )}
      </div>
      <div className="toiletpage_button">
        <p
          className="mybtn_show"
          onClick={
            !props.isFullStats
              ? props.handleShowFullStats
              : props.handleShowGraph
          }
        >
          {!props.isFullStats ? "Полная статистика" : "График"}
        </p>
        <p className="mybtn_add" onClick={props.handleShowAddForm}>
          Добавить
        </p>
      </div>
    </>
  );
};

export default ToiletButtons;
