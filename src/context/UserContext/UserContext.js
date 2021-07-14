import React, { useReducer, createContext } from "react";
import axios from "axios";

import userReducer from "./UserReducer";

const baseUrl = "http://localhost:5002/api";
const initialState = {
  user: {},
  error: "",
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const login = async (data) => {
    let phone, email;
    data.loginCredit[0] === "9"
      ? (phone = parseInt(data.loginCredit))
      : (email = data.loginCredit);

    axios
      .post(`${baseUrl}/auths/login`, {
        email: email,
        phone: phone,
        password: data.password,
      })
      .then((res) => {
        console.log(res.data.token);
        dispatch({
          type: "LOGIN",
          payload: res.data.token,
        });
      })
      .catch((err) => {
        console.log("errorrrr");
        dispatch({
          type: "LOGIN_ERROR",
          payload: err.response.data.message,
        });
        setTimeout(() => {
          dispatch({ type: "CLEAR_ERROR" });
        }, 5000);
      });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        error: state.error,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
