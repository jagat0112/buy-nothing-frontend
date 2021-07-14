import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="navbar__lists">
        <li className="navbar__items navbar__items--brand">
          <Link to="/">
            <span className="buy">BUY</span>
            <span>NOTHING</span>
          </Link>
        </li>
        <li className="navbar__items">
          <Link to="/login">Log In</Link>
        </li>
        <li className="navbar__items">
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
