import React, { useContext, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Checkout from "./Checkout";
import { GlobalCart } from "../App";

const Cart = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });
  const { quantity, showCart, isShown } = useContext(GlobalCart);

  useEffect(() => {}, [quantity]);

  return (
    <div className="cartSection">
      <button
        type="button"
        onClick={showCart}
        style={{ backgroundColor: "transparent", border: "none" }}
        className="dropbtn uio d-flex"
      >
        {isMobile ? (
          <div>
            <img
              src="/Assets/footerCart.svg"
              className="cartIcon"
              alt="cart logo"
            />{" "}
            <span className="badge1 ">{quantity}</span>
          </div>
        ) : (
          <div>
            <img src="/Assets/Cart.svg" className="cartIcon " alt="cart logo" />{" "}
            <span className="badge1 ">{quantity}</span>
          </div>
        )}
      </button>
      <div className="d-flex justify-content-end">
        {isShown && <Checkout />}
      </div>
    </div>
  );
};

export default Cart;
