export default (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return localStorage.setItem("token", action.payload);
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
    default:
      return state;
  }
};
