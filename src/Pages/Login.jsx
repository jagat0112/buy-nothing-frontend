import React, { useState, useContext, useEffect } from "react";
import GoogleLogIn from "./GoogleLogIn";
import { useHistory } from "react-router-dom";
import { loginSchema } from "../utils/validate";
import { UserContext } from "../context/UserContext/UserContext";

const Login = () => {
  let history = useHistory();

  const context = useContext(UserContext);
  const [loginCredit, setLoginCredit] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (context.error !== {}) {
      setError(context.error);
    }
    if (token) {
      history.push("/");
    }
  }, [context.error, context.user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loginCredit === "" || password === "")
      return context.validateUser("Please input the all the fields");
    const res = loginSchema.validate({ phone: loginCredit });
    if (res.error) context.validateUser(res.error.details[0].message);
    try {
      context.login({ loginCredit, password });
    } catch (error) {
      console.log(error.response);
    }
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
          placeholder="Phone Number"
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
