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

  const getMe = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { "x-auth-token": token } };
    const { data } = await axios.get(`${baseUrl}/auths/me`, config);
    dispatch({ type: "GET_ME", payload: data.user });
  };
  // LOGIN
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
        dispatch({
          type: "LOGIN",
          payload: res.data.token,
        });
        getMe();
      })
      .catch((err) => {
        dispatch({
          type: "LOGIN_ERROR",
          payload: err.response.data.message,
        });
        setTimeout(() => {
          clearError();
        }, 5000);
      });
  };

  // REGISTER
  const register = async (info) => {
    try {
      const data = await axios.post(`${baseUrl}/users/register`, info);
      getMe();
      dispatch({
        type: "LOGIN",
        payload: data.headers["x-auth-token"],
      });
      getMe();
    } catch (err) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: err.response.data.message,
      });
      setTimeout(() => {
        clearError();
      }, 5000);
    }
  };

  const validateUser = (error) => {
    dispatch({
      type: "LOGIN_ERROR",
      payload: error,
    });
    setTimeout(() => {
      clearError();
    }, 5000);
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        error: state.error,
        login,
        register,
        validateUser,
        logout,
        getMe,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
