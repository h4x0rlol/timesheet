import React, { useEffect, useState } from "react";
import MainLayout from "./layouts/Main/Main";
import LoginPage from "./views/LoginPage/LoginPage";
import MainPage from "./views/MainPage/MainPage";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "./reducers/index";
import { checkAuth } from "./actions/user";
import NotFound from "./views/NotFound/NotFound";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./App.scss";

const App = () => {
  const [loading, setLoading] = useState<boolean>(false); // true
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);
  const dispatch = useDispatch();

  const isLoading = () => {
    setTimeout(() => {
      // setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    isLoading();
    dispatch(checkAuth(localStorage.getItem("token")));
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {loading ? (
            <div className="loader">
              <CircularProgress />
            </div>
          ) : (
            <>
              {!isAuth ? (
                <LoginPage />
              ) : (
                <MainLayout>
                  <MainPage />
                </MainLayout>
              )}
            </>
          )}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
