import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import toiletReducer from "./toiletReducer";
import userReducer from "./userReducer";
import dateReducer from "../reducers/dateReducer";
import timeModeReducer from "../reducers/timeModeReducer";

const rootReducer = combineReducers({
  user: userReducer,
  toilet: toiletReducer,
  date: dateReducer,
  timeMode: timeModeReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type IRootState = ReturnType<typeof rootReducer>;
