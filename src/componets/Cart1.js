import React, { useState, useContext, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { GlobalCart } from "../App";
import { NavLink } from "react-router-dom";
import { GlobalUserStatus } from "../App";
import ModalCommonHook from "./ModalCommonHook";
import {
  Modal,
  Popover,
  Button,
  OverlayTrigger,
} from "react-bootstrap";
import CartDesktopView from "./CartDesktopView";
import CartMobileView from "./CartMobileView";
import Checkout from "./Checkout";
import AOS from "aos";

const Cart1 = () => {
  const { showModal } = ModalCommonHook();
  const { cartList } = useContext(GlobalCart);
  const [fullscreen, setFullscreen] = useState(true);
  const { status, token } = useContext(GlobalUserStatus);
  const [show, setShow] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });
  const { quantity } = useContext(GlobalCart);
  const wrapperRef = useRef(null);
  const [isShown, setIsShown] = useState(false);


  //for cart button shake
  const [isShaking, setIsShaking] = useState(false); 
  useEffect(() => {
    //Add shaking effect when cart value changes and meets the conditions
    if ((status || Object.keys(cartList).length !== 0) && quantity > 0) {
      setIsShaking(true);

      const timer = setTimeout(() => {
        setIsShaking(false);
      }, 300);

      return () => clearTimeout(timer); 
    }
  }, [status, cartList, quantity]);  

  //End cart button shake

  
  const handleShow = (breackPoint) => {
    setFullscreen(breackPoint);
    setShow(true);
  };

  const handelLoginShow = (data) => {
    showModal(data);
  };

  const handelSignShow = (data) => {
    showModal(data);
  };

  React.useEffect(() => {
    AOS.init();
    // AOS.refresh();
  }, [])


  const popover = (
    <Popover id="popover" data-aos='fade-right' data-aos-duration="700" data-aos-delay="400">
      <Popover.Body className="login">
        <div className="logincontainer">
          <div className="avatarCon mt-3">
            <img
              src="/Assets/account_circle.svg"
              alt="Account_Circle"
              className="avatarlogin"
            />
          </div>
          <div className="logincontainer">
            <button
              type="button"
              className="avatarButton"
              onClick={(e) => handelLoginShow("login")}
            >
              Login
            </button>
            <div className="loginText d-flex">
              Don’t have an account?
              <button
                type="button"
                onClick={(e) => handelSignShow("signup")}
                className="loginsign"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
        {Object.keys(cartList).length === 0 && (
          <div className="logincontainer">
            <div className="loginText text-center">
              Cart is empty, add your items and continue place the order
            </div>
            <NavLink to="/" onClick={() => setIsShown(false)}>
              <button type="button" className="loginshopping">
                Continue Shopping
              </button>
            </NavLink>
          </div>
         ) 
        //: (
        //   <div>
        //     <hr />
        //     <div className="loginText text-center mb-2">Log In to view the cart</div>
            
        //   </div>
        // )
        }
      </Popover.Body>
    </Popover>
  );


  return (
    <>
      {!isMobile ? (
        <>
          {!status && Object.keys(cartList).length === 0 && (
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              className="custom-dialog"
              overlay={popover}
              rootClose
            >
              <Button
                onClick={() => setIsShown(true)}
                className="dropbtn uio d-flex cartSection"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <div>
                  <img
                    src="/Assets/Cart.svg"
                    className="cartIcon "
                    alt="cart logo"
                  />{" "}
                  <span className="badge1 ">{quantity}</span>
                </div>
              </Button>
            </OverlayTrigger>
          )} 
            <>
            {(status || Object.keys(cartList).length !== 0) && (
              <>
              <div className="cartSection">
                 <button id="shopCart"
                  type="button"
                  onClick={() => setIsShown(!isShown)}
                  style={{ backgroundColor: "transparent", border: "none", color: "#ddd" }}
                  className={`dropbtn uio d-flex ${isShaking ? 'shake-effect' : ''}`} 
                >
                  {" "}
                  <div>
                    <img
                      src="/Assets/Cart.svg"
                      className="cartIcon "
                      alt="cart logo"
                    />{" "}
                    <span className="badge1 ">{quantity}</span>
                  </div>
                </button>
              </div>
              
              <div data-aos='fade-right' data-aos-duration="700" data-aos-delay="400">
                <Modal id="checkoutModel" 
                className={Object.keys(cartList).length === 0 && "emptycart"}
                  dialogClassName="custom-dialog"
                  show={isShown}
                  onHide={() => setIsShown(false)}
                  aria-labelledby="example-modal-sizes-title-lg"
                >
                  <Modal.Body className="scroll"> 
                 <div className="d-flex justify-content-center login">
                      <div className="cartHoverContainer w-100">
                        <div className="d-flex flex-column HoverContainer">
                          <Checkout isShown={isShown} setIsShown={setIsShown} />
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </>
          )}
        </>
        </>
      ) : (
              <div className="cartSection">
                <img
                  src="/Assets/footerCart.svg"
                  className="cartIcon"
                  alt="cart logo"
                  onClick={handleShow}
                />{" "}
                <span className="badge1 ">{quantity}</span>             
              <div className="d-flex justify-content-end">
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
              </div>
              </div>
      )}
    </>
  );
};

export default Cart1;


