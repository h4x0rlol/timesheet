const SHOW_FULL_STATS = "SHOW_FULL_STATS";

const defaultState = {
  showFullStats: false,
};

export default function toiletReducer(state = defaultState, action) {
  switch (action.type) {
    case SHOW_FULL_STATS:
      return {
        ...state,
        showFullStats: !state.showFullStats,
      };
    default:
      return state;
  }
}

export const showFullStats = () => ({ type: SHOW_FULL_STATS });
