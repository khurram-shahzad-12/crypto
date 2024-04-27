import React, { useState, useContext, useEffect, useRef} from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import { GlobalCart } from "../App";
import { Modal, Dropdown } from "react-bootstrap";
import CartDesktopView from "./CartDesktopView";
import CartMobileView from "./CartMobileView";

const Cart = () => {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });
  const { quantity } = useContext(GlobalCart);
  const wrapperRef = useRef(null);
  const [isShown, setIsShown] = useState(false);
  
  const handleShow = (breackPoint) => {
    setFullscreen(breackPoint);
    setShow(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", showCart, false);
  }, []);

  const showCart = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setIsShown(false);
    }
  };

  useEffect(() => {}, [quantity]);

  //ref={wrapperRef}
  return (
    <>
      <div className="cartSection">
        <button
          type="button"
          onClick={() => setIsShown(!isShown)}
          style={{ backgroundColor: "transparent", border: "none" }}
          className="dropbtn uio d-flex"
        >
          {isMobile ? (
            <div>
              <img
                src="/Assets/footerCart.svg"
                className="cartIcon"
                alt="cart logo"
                onClick={handleShow}
              />{" "}
              <span className="badge1 ">{quantity}</span>
            </div>
          ) : (
            <div>
              <img
                src="/Assets/Cart.svg"
                className="cartIcon "
                alt="cart logo"
              />{" "}
              <span className="badge1 ">{quantity}</span>
            </div>
          )}
        </button>
        <div className="d-flex justify-content-end">
          {isMobile ? (
            <Modal
              show={show}
              fullscreen={fullscreen}
              onHide={() => setShow(false)}
              className="mobileCart"
            >
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                <CartMobileView isShown={isShown} setIsShown={setIsShown} />
              </Modal.Body>
            </Modal>
          ) : (
            isShown && (
              <CartDesktopView isShown={isShown} setIsShown={setIsShown} />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
