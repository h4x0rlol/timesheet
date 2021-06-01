import React from "react";
import NavBar from "../components/Navbar";
import "./Main.scss";

const MainLayout = ({ children }) => (
  <>
    <NavBar />
    <main className="main">{children}</main>
  </>
);

export default MainLayout;
