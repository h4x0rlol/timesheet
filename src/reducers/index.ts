import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import toiletReducer from "./toiletReducer";
import userReducer from "./userReducer";
import dateReducer from "../reducers/dateReducer";
import timeModeReducer from "../reducers/timeModeReducer";
import modeReducer from "./modeReducer";

const rootReducer = combineReducers({
  user: userReducer,
  toilet: toiletReducer,
  date: dateReducer,
  timeMode: timeModeReducer,
  mode: modeReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type IRootState = ReturnType<typeof rootReducer>;
