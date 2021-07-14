import React, { useContext, useEffect } from "react";

import { ProductContext } from "../context/productContext/ProductContext";

const Items = () => {
  const { getProducts, products } = useContext(ProductContext);
  useEffect(() => {
    getProducts();
  }, []);

  const handleClaim = () => {};

  return (
    <div className="container">
      <h3>Give Away Available</h3>
      <div className="give-away give-away--grid">
        {products.map(
          (product, i) =>
            !product.giveAwayComplete && (
              <div className="card give-away__list" key={i}>
                <img
                  alt=" give away item"
                  className="give-away__img"
                  src={`http://localhost:5002/public/${product.photo}`}
                ></img>
                <p className="give-away__list--name ">{product.name}</p>
                <p className="give-away__desc">{product.descripton}</p>
                <p>
                  <i className="fas fa-map-marker-alt"></i>{" "}
                  {product.pickUpLocation}
                </p>
                <p>Owner: {product.author.name}</p>
                <button className=" give-away__btn" onClick={handleClaim}>
                  Claim Item
                </button>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Items;
