import React, { useState, useEffect, useContext } from "react";
import GoogleLogIn from "./GoogleLogIn";
import { registerSchema } from "../utils/validate";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext/UserContext";

const Register = () => {
  const history = useHistory();

  const token = localStorage.getItem("token");

  const [state, setState] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });
  const [error, setError] = useState("");

  const context = useContext(UserContext);

  useEffect(() => {
    if (context.error !== {}) {
      setError(context.error);
    }
    if (token) {
      history.push("/");
    }
  }, [context.error, context.user]);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    ["name", "phone", "email", "password", "email"].forEach((a) => {
      if (state[a] === "") {
        setError("Input all the fields");
        setTimeout(() => {
          setError("");
        }, 4000);
      }
    });
    context.register(state);
  };
  return (
    <div className="register container">
      <p className="login__header">
        Welcome to Buy Nothing Kathmandu! Please register.
      </p>
      <GoogleLogIn />
      <p className="login__or">OR</p>
      <p className="error_message">
        {error !== "" ? <span>{error}</span> : <span></span>}
      </p>
      <form className="login-in__form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        ></input>
        <input
          type="number"
          placeholder="Phone Number"
          name="phone"
          onChange={handleChange}
        ></input>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
        ></input>
        <button type="submit" className="register__btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
