import { modeArray } from "../utils/constants";

const NEXT_MODE = "NEXT_MODE";
const PREVIOUS_MODE = "PREVIOUS_MODE";

const defaultState = {
  mode: modeArray[0],
};

export default function modeReducer(state = defaultState, action) {
  switch (action.type) {
    case NEXT_MODE:
      let currentModeN = modeArray.indexOf(state.mode);
      let nextModeIndex = currentModeN + 1;
      if (nextModeIndex > 1) {
        nextModeIndex = 0;
      }
      let nextMode = modeArray[nextModeIndex];
      return {
        ...state,
        mode: nextMode,
      };
    case PREVIOUS_MODE:
      let currentModeP = modeArray.indexOf(state.mode);
      let previousModeIndex = currentModeP - 1;
      if (previousModeIndex < 0) {
        previousModeIndex = 1;
      }
      let previousMode = modeArray[previousModeIndex];
      return {
        ...state,
        mode: previousMode,
      };
    default:
      return state;
  }
}

export const nextMode = () => ({ type: NEXT_MODE });
export const previousMode = () => ({ type: PREVIOUS_MODE });
