import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style/index.scss";
const app = document.getElementById("app");

if (app) {
  ReactDOM.render(<App />, app);
}
