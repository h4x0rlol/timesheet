import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../reducers";
import { logout } from "../../reducers/userReducer";
import "../styles/NavBar.scss";
import { daysOfWeek, monthsForTime } from "../../utils/constants";

const NavBar = () => {
  const username = useSelector(
    (state: IRootState) => state.user.currentUser.username
  );
  const dispatch = useDispatch();
  const [clock, setClock] = useState("");
  const [width, setWidth] = useState(0);
  const [onlyTime, setOnlyTime] = useState("");

  useEffect(() => {
    const { innerWidth: width } = window;
    setWidth(width);
    clockTimer(width);
  }, []);

  const handleLogout = async () => {
    try {
      let res = await axios
        .post(`${process.env.BACKEND_URL}/api/logout`, {
          username: username,
        })
        .then(function (res) {
          if (res.status == 200) {
            dispatch(logout());
            console.log(res);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const clockTimer = async (width) => {
    const date = new Date();
    const time = [date.getHours(), date.getMinutes()];
    const dayOfWeek = date.getDay();
    const day = date.getDate();
    const month = date.getMonth();

    if (time[0] < 10) {
      // @ts-ignore
      time[0] = "0" + time[0];
    }
    if (time[1] < 10) {
      // @ts-ignore
      time[1] = "0" + time[1];
    }

    if (width > 480) {
      const current = `${daysOfWeek[dayOfWeek - 1]}, ${day} ${
        monthsForTime[month]
      } - ${time[0]}:${time[1]}`;
      setClock(current);
    } else {
      setOnlyTime(`${time[0]}:${time[1]}`);
    }

    setTimeout(() => clockTimer(width), 1000);
  };

  return (
    <div className="header">
      <div className="header_container">
        <h1 className="header_name">TimeSheet</h1>
        {width < 480 ? (
          <p className="header_time">{onlyTime}</p>
        ) : (
          <p className="header_time">{clock}</p>
        )}
        <div className="header_buttons">
          <p>{username}</p>
          <a onClick={handleLogout}>Выйти</a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
