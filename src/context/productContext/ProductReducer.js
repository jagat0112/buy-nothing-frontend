export default (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      console.log(action.payload);
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};
