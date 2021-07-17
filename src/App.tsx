import React, { useEffect, useState } from "react";
import LoginPage from "./views/LoginPage/LoginPage";
import MainPage from "./views/MainPage/MainPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "./views/NotFound/NotFound";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./App.scss";
import { setUser } from "./reducers/userReducer";
import { IRootState } from "./reducers";
import { checkAuth } from "./utils/Api/UserRequests";

const App = () => {
  const [loading, setLoading] = useState<boolean>(true); // true
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);
  const [tz, setTz] = useState("");
  const [token, setToken] = useState("");
  // const isAuth = true;
  const dispatch = useDispatch();

  const handleCheckAuth = async (token) => {
    const res = await checkAuth(token);
    if (res.user) {
      dispatch(setUser(res.user));
      localStorage.setItem("token", res.user.token);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ltoken = localStorage.getItem("token");
    handleCheckAuth(ltoken);
    setToken(ltoken);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTz(timeZone);
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {loading ? (
            <div className="loader">
              <CircularProgress style={{ color: "#67e6dc" }} />
            </div>
          ) : (
            <>{!isAuth ? <LoginPage /> : <MainPage tz={tz} token={token} />}</>
          )}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
