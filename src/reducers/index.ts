import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import dateReducer from "../reducers/dateReducer";
import timeModeReducer from "../reducers/timeModeReducer";
import modeReducer from "./modeReducer";
import statsReducer from "./statsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  date: dateReducer,
  timeMode: timeModeReducer,
  mode: modeReducer,
  stats: statsReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type IRootState = ReturnType<typeof rootReducer>;
