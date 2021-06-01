import { showFullStats } from "../reducers/toiletReducer";

export const handleShowFullStats = () => {
  return async (dispatch) => {
    try {
      console.log("dsadsad");
      dispatch(showFullStats());
    } catch (e) {
      console.log(e);
    }
  };
};
