import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.scss";
import { IRootState } from "../../reducers/index";
import { logout } from "../../reducers/userReducer";

const NavBar = () => {
  const username = useSelector(
    (state: IRootState) => state.user.currentUser.username
  );
  const dispatch = useDispatch();

  return (
    <div className="header">
      <div className="header_container">
        <h1 className="header_name">TimeIs</h1>
        <div className="header_buttons">
          <h1 className="header_name"></h1>
          <a>{username}</a>
          <a onClick={() => dispatch(logout())}>Выйти</a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;