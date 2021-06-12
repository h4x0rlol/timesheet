import { monthsArray, today } from "../utils/constants";

const NEXT_MONTH = "NEXT_MONTH";
const PREVIOUS_MONTH = "PREVIOUS_MONTH";

const defaultState = {
  year: today.getFullYear(),
  month: monthsArray[today.getMonth()],
};

export default function dateReducer(state = defaultState, action) {
  switch (action.type) {
    case NEXT_MONTH:
      let currentMonthN = monthsArray.indexOf(state.month);
      let nextMonthIndex = currentMonthN + 1;
      let yearN = state.year;
      if (nextMonthIndex > 11) {
        nextMonthIndex = 0;
        yearN += 1;
      }
      let nextMonth = monthsArray[nextMonthIndex];
      return {
        ...state,
        year: yearN,
        month: nextMonth,
      };
    case PREVIOUS_MONTH:
      let currentMonthP = monthsArray.indexOf(state.month);
      let previousMonthIndex = currentMonthP - 1;
      let yearP = state.year;
      if (previousMonthIndex < 0) {
        previousMonthIndex = 11;
        yearP -= 1;
      }
      let previousMonth = monthsArray[previousMonthIndex];
      return {
        ...state,
        year: yearP,
        month: previousMonth,
      };
    default:
      return state;
  }
}

export const nextMonth = () => ({ type: NEXT_MONTH });
export const previousMonth = () => ({ type: PREVIOUS_MONTH });
