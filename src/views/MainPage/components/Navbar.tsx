import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../reducers/index";
import { logout } from "../../../reducers/userReducer";
import "./styles/NavBar.scss";
const NavBar = () => {
  const username = useSelector(
    (state: IRootState) => state.user.currentUser.username
  );
  const dispatch = useDispatch();

  return (
    <div className="header">
      <div className="header_container">
        <h1 className="header_name">TimeSheet</h1>
        <div className="header_buttons">
          <p>{username}</p>
          <a onClick={() => dispatch(logout())}>Выйти</a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
