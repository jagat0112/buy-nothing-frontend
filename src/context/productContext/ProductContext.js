import React, { useReducer, createContext } from "react";
import productReducer from "./ProductReducer";
import axios from "axios";

const initialState = {
  products: [],
  product: {},
};

export const ProductContext = createContext(initialState);

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const getProducts = async () => {
    const { data } = await axios.get("http://localhost:5002/api/products");
    dispatch({
      type: "GET_PRODUCTS",
      payload: data,
    });
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        product: state.product,
        getProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
