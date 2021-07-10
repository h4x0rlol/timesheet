import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { timeModeArray } from "../../../utils/constants";
import { IRootState } from "../../../reducers/index";
import "../../styles/ToiletTimeButtons.scss";

const ToiletTimeButtons = (props) => {
  const timeMode = useSelector((state: IRootState) => state.timeMode.timeMode);

  return (
    <>
      <div className="toiletpage_buttons_month">
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
        ></i>
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
        ></i>
      </div>
      {(timeMode == timeModeArray[2] || timeMode == timeModeArray[3]) && (
        <div className="toiletpage_buttons_month">
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
                ? timeMode == timeModeArray[2]
                  ? () => {
                      props.handlePreviousMonth();
                    }
                  : () => {
                      props.handlePreviousYear();
                    }
                : () => {}
            }
          ></i>
          {timeMode == timeModeArray[2] ? (
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
                ? timeMode == timeModeArray[2]
                  ? () => {
                      props.handleNextMonth();
                    }
                  : () => {
                      props.handleNextYear();
                    }
                : () => {}
            }
          ></i>
        </div>
      )}
    </>
  );
};

export default ToiletTimeButtons;
