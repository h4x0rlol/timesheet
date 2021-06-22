import React from "react";
import { useState } from "react";
import "../../styles/index.scss";

const ToiletTimeButtons = (props) => {
  const [kek, setkek] = useState(false);
  return (
    <>
      <div className="mainpage_buttons_month">
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
      <div className="mainpage_buttons_month">
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
                  props.handlePreviousMonth();
                }
              : () => {}
          }
        ></i>
        <p className="month_name">
          {props.date.month} ({props.date.year})
        </p>
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
                  props.handleNextMonth();
                }
              : () => {}
          }
        ></i>
      </div>
    </>
  );
};

export default ToiletTimeButtons;
