export default (state, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: "",
      };
    case "LOGIN":
      localStorage.setItem("token", action.payload);
      return { ...state };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        user: {},
      };
    case "GET_ME":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
