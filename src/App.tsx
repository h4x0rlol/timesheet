import React, { useEffect, useState } from "react";
import LoginPage from "./views/LoginPage/LoginPage";
import MainPage from "./views/MainPage/MainPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "./views/NotFound/NotFound";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./App.scss";
import axios from "axios";
import { setUser } from "./reducers/userReducer";
import { IRootState } from "./reducers";

const App = () => {
  const [loading, setLoading] = useState<boolean>(true); // true
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);
  // const isAuth = true;
  const dispatch = useDispatch();

  const checkAuth = async (token) => {
    try {
      let res = await axios
        .post(`https://timeis-backend.herokuapp.com/api/checkAuth`, {
          token: token,
        })
        .then(function (res) {
          if (res.status == 200) {
            dispatch(setUser(res.data));
            localStorage.setItem("token", res.data.token);
            console.log(res);
            setLoading(false);
          }
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
        });
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    checkAuth(localStorage.getItem("token"));
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
            <>{!isAuth ? <LoginPage /> : <MainPage />}</>
          )}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
