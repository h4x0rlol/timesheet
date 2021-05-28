import React from "react";
import "./Navbar.scss";

const NavBar = () => {
  return (
    <div className="header">
      <div className="header_container">
        <h1 className="header_name">TimeIs</h1>
        <div className="header_buttons">
          <h1 className="header_name"></h1>
          <a>Никнейм</a>
          <a>Выйти</a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
