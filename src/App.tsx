import React, { useEffect } from "react";
import MainLayout from "./layouts/Main/Main";
import LoginPage from "./views/LoginPage/LoginPage";
import MainPage from "./views/MainPage/MainPage";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "./reducers/index";
import { checkAuth } from "./actions/user";

const App = () => {
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth(localStorage.getItem("token")));
  }, []);

  return (
    <BrowserRouter>
      <Route exact path="/">
        {!isAuth ? (
          <LoginPage />
        ) : (
          <MainLayout>
            <MainPage />
          </MainLayout>
        )}
      </Route>
    </BrowserRouter>
  );
};

export default App;
