import React from "react";
import NavBar from "../components/Navbar";

const MainLayout = ({ children }) => (
  <>
    <NavBar />
    <main>{children}</main>
  </>
);

export default MainLayout;
