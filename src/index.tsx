import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./reducers";
import "./style/index.scss";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("app")
);
