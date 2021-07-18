import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext/UserContext";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const context = useContext(UserContext);
  const token = localStorage.getItem("token");
  const [logged, setLogged] = useState(false);
  const history = useHistory();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!token) {
      setLogged(false);
    } else {
      setLogged(true);
      setUser(context.user);
    }
  }, [context.user]);

  const onHandleLogout = () => {
    context.logout();
    history.push("/login");
  };
  return (
    <div className="navbar">
      <ul className="navbar__lists">
        <li className="navbar__items navbar__items--brand">
          <Link to="/">
            <span className="buy">BUY</span>
            <span>NOTHING</span>
          </Link>
        </li>
        {!logged && (
          <React.Fragment>
            <li className="navbar__items">
              <Link to="/login">Log In</Link>
            </li>
            <li className="navbar__items">
              <Link to="/register">Register</Link>
            </li>
          </React.Fragment>
        )}
        {logged && (
          <React.Fragment>
            <li className="navbar__items">
              <p to="/login">Welcome {user.name}</p>
            </li>
            <li className="navbar__items">
              <button onClick={onHandleLogout}>Log Out</button>
            </li>
          </React.Fragment>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
