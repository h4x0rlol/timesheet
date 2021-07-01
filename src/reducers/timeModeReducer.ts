import { timeModeArray } from "../utils/constants";

const NEXT_TIME_MODE = "NEXT_TIME_MODE";
const PREVIOUS_TIME_MODE = "PREVIOUS_TIME_MODE";

const defaultState = {
  timeMode: timeModeArray[0],
};

export default function timeModeReducer(state = defaultState, action) {
  switch (action.type) {
    case NEXT_TIME_MODE:
      let currentModeN = timeModeArray.indexOf(state.timeMode);
      let nextModeIndex = currentModeN + 1;
      if (nextModeIndex > 4) {
        nextModeIndex = 0;
      }
      let nextMode = timeModeArray[nextModeIndex];
      return {
        ...state,
        timeMode: nextMode,
      };
    case PREVIOUS_TIME_MODE:
      let currentModeP = timeModeArray.indexOf(state.timeMode);
      let previousModeIndex = currentModeP - 1;
      if (previousModeIndex < 0) {
        previousModeIndex = 4;
      }
      let previousMode = timeModeArray[previousModeIndex];
      return {
        ...state,
        timeMode: previousMode,
      };
    default:
      return state;
  }
}

export const nextTimeMode = () => ({ type: NEXT_TIME_MODE });
export const previousTimeMode = () => ({ type: PREVIOUS_TIME_MODE });
