import React from "react";
import MainLayout from "./layouts/Main/Main";
import LoginPage from "./views/LoginPage/LoginPage";
import MainPage from "./views/MainPage/MainPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "./reducers/index";

const App = () => {
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);

  return (
    <BrowserRouter>
      {!isAuth ? (
        <Switch>
          <Route path="/login" component={LoginPage} />
        </Switch>
      ) : (
        <MainLayout>
          <MainPage />
        </MainLayout>
      )}
    </BrowserRouter>
  );
};

export default App;
