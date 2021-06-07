const SHOW_FULL_STATS = "SHOW_FULL_STATS";
const SHOW_ADD_FORM = "SHOW_ADD_FORM";

const defaultState = {
  showFullStats: false,
  showAddForm: false,
};

export default function toiletReducer(state = defaultState, action) {
  switch (action.type) {
    case SHOW_FULL_STATS:
      return {
        ...state,
        showFullStats: !state.showFullStats,
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

export const showFullStats = () => ({ type: SHOW_FULL_STATS });
export const showAddForm = () => ({ type: SHOW_ADD_FORM });
