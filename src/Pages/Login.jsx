import React, { useState, useContext, useEffect } from "react";
import GoogleLogIn from "./GoogleLogIn";
import { UserContext } from "../context/UserContext/UserContext";

const Login = () => {
  const context = useContext(UserContext);

  const [loginCredit, setLoginCredit] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (context.error !== {}) {
      setError(context.error);
    }
  }, [context.error]);

  const onSubmit = (e) => {
    e.preventDefault();
    context.login({ loginCredit, password });
  };
  return (
    <div className="log-in container">
      <p className="login__header">
        Welcome to Buy Nothing Kathmandu! Please login.
      </p>
      <GoogleLogIn />
      <p className="login__or">OR</p>
      <p className="error_message">
        {error !== "" ? <span>{error}</span> : <span></span>}
      </p>
      <form className="login-in__form" onSubmit={onSubmit}>
        <input
          name="phone"
          type="text"
          placeholder="Email or Phone Number"
          onChange={(e) => setLoginCredit(e.target.value)}
        ></input>
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="login-btn" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
