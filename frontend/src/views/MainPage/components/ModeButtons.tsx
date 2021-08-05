import React from "react";
import "../../styles/ModeButtons.scss";
import { useDispatch } from "react-redux";
import { nextMode, previousMode } from "../../../reducers/modeReducer";

const ModeButtons = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="mode_buttons">
      <i
        className="mode_buttons_arrowleft"
        onClick={() => dispatch(previousMode())}
      />
      <a>{props.modeState.mode}</a>
      <i
        className="mode_buttons_arrowright"
        onClick={() => dispatch(nextMode())}
      />
    </div>
  );
};

export default ModeButtons;
