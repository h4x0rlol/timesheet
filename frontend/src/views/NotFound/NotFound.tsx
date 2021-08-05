import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.scss";

const NotFound = () => (
  <div className="not_found">
    <h1>404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
  </div>
);

export default NotFound;
