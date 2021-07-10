import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../reducers/index";
import { logout } from "../../reducers/userReducer";
import "../styles/NavBar.scss";

const NavBar = () => {
  const username = useSelector(
    (state: IRootState) => state.user.currentUser.username
  );
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      let res = await axios
        .post(`https://timeis-backend.herokuapp.com/api/logout`, {
          username: username,
        })
        .then(function (res) {
          if (res.status == 200) {
            localStorage.removeItem("token");
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

  return (
    <div className="header">
      <div className="header_container">
        <h1 className="header_name">TimeSheet</h1>
        <div className="header_buttons">
          <p>{username}</p>
          <a onClick={handleLogout}>Выйти</a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
