import { typesOfStats } from "../utils/constants";

const NEXT_STATS_TYPE = "NEXT_STATS_TYPE";
const SHOW_ADD_FORM = "SHOW_ADD_FORM";

const defaultState = {
  typeOfStats: typesOfStats[0],
  showAddForm: false,
};

export default function statsReducer(state = defaultState, action) {
  switch (action.type) {
    case NEXT_STATS_TYPE:
      let current = typesOfStats.indexOf(state.typeOfStats);
      let next = current + 1;
      if (next > 2) {
        next = 0;
      }
      let nextType = typesOfStats[next];
      return {
        ...state,
        typeOfStats: nextType,
      };
    case SHOW_ADD_FORM:
      return {
        ...state,
        showAddForm: !state.showAddForm,
      };
    default:
      return state;
  }
}

export const nextTypeOfStats = () => ({ type: NEXT_STATS_TYPE });
export const showAddForm = () => ({ type: SHOW_ADD_FORM });
