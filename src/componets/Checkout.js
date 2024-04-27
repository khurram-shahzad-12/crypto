import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Accordion, Form, Row, Col } from "react-bootstrap";
import ModalCommonHook from "./ModalCommonHook";
import AddressModel from "./AddressModel";
import { HiMinusSm } from "react-icons/hi";
import { BsPlus } from "react-icons/bs";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import AddressCarosule from "./AddressCarosule";
import { GlobalUserStatus } from "../App";
import { GlobalCart } from "../App";
import axios from "axios";
import call_apis from "../services/Apis";
import ClipLoader from "react-spinners/ClipLoader";
import jwt_decode from "jwt-decode";
import OtpVerify from "./OtpVerify";
import CryptoModal from "./CryptoModal";


const Checkout = ({ isShown, setIsShown }) => {
  const { showModal } = ModalCommonHook();
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });
  const [view, SetView] = useState(false);
  const [showaddressModal, setShowaddressModal] = useState(false);
  const [placeOrder, SetPlaceOrder] = useState({});
  const [errors, SetErrors] = useState({});
  const [link, SetLink] = useState("");
  const [addModel, setAddModel] = useState(false);
  const { status, token } = useContext(GlobalUserStatus);
  const { userId, cartList, getCartData, carterrMsg, userAddress, setcarterrMsg, getAddressList, carterrStatus, selectAddress, mobile, precheckoutno, postcheckoutno, setSelectAddress, setMobile, setPrecheckoutno, setPostcheckoutno, idaddress, setIdaddress, selectAddressError, setSelectAddressError } = useContext(GlobalCart);
  const [invoice, SetInvoice] = useState(false);
  const [discount, SetDiscount] = useState(0);
  const [loader, SetLoader] = useState(false);
  const [disabled, Setdisabled] = useState(false);
  const [iduser, SetIduser] = useState(0)
  const [otpVarify, setOtpVarify] = useState("");
  const [phoneVerify, setPhoneVerify] = useState("");
  const [successMpbile, setSuccessMpbile] = useState("")
  const [showmobileverifymsz, setShowmobileverifymsz] = useState("");
  const [networkError, setNetworkError] = useState("");
  const [updatemob, setUpdatemob] = useState("");
  const [paymentMethod, setPaymentMethod] = useState({});
  const [cryptoUrl,setCryptoUrl]=useState(null);
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const cookies = new Cookies();

console.log(cryptoUrl)
  const handelLoginShow = (data) => {
    showModal(data);
  };

  const handelSignShow = (data) => {
    showModal(data);
  };

  const handelNewAddress = () => {
    setShowaddressModal(true);
    setAddModel(true);
  };


  const [activeId, SetActiveId] = useState(0);
  const [processingFee, SetprocessingFee] = useState(0);
  const [finalAmount, SetFinalAmount] = useState(0);
  const [updateDonate, SetUpdateDonate] = useState(1);
  const [donateAmt, SetDonateAmt] = useState(0);

  const [couponCode, setcouponCode] = useState({
    coupon_code: ""
  });



  const varifyMobileNumber = async (input) => {
    const resp = await call_apis.checkMobileNumber(input);
    if (resp.status === 200) {
      if (resp.data.status == 'success') {
        setShowmobileverifymsz(resp.data.message)
        setPhoneVerify(true);
      } else if (resp.data.status == "invalid") {
        setShowmobileverifymsz(resp.data.message)
      }
    }
  }


  const varifyMobileNumberResend = async (input) => {
    const resp = await call_apis.reSendOtp(input);

    if (resp.status === 200) {
      if (resp.data.status == 'success') {
        setPhoneVerify(true)
      } else if (resp.data.status == "exits") {
        setPhoneVerify(false)
      }
    }
  }

  const varifyMobileNumberWhtsap = async (input) => {
    const resp = await call_apis.reSendOtpWhatsapp(input);
    if (resp.status === 200) {
      if (resp.data.status == 'success') {
        setPhoneVerify(true)

      } else if (resp.data.status == "exits") {
        setPhoneVerify(false)
      }
    }
  }

  const handleverifycheck = () => setPhoneVerify(false);

  const getResendOtp = async () => {
    const input = {
      mobile: mobile,
    };
    varifyMobileNumberResend(input)
  };

  const getResendOtpWhatsapp = async () => {
    const input = {
      mobile: mobile,
    };
    varifyMobileNumberWhtsap(input)

  };


  const getActiveStatus = async (e) => {
    e.preventDefault();
    
    let resdata = userAddress && Array.isArray(userAddress) && userAddress?.find(address => address.select_address === 1);
    if(resdata === undefined || resdata === null || resdata === ""){ 
      SetActiveId(1);
      setSelectAddressError("Please select your Delivery Address");
      return;
    }
    let findselectaddress = resdata;
    if (resdata && typeof resdata === 'object' && Object.keys(resdata).length > 0) {
      let idadres = resdata.id;
      let mobile = resdata.mobile;
      let mobileStr = mobile.toString();
      let prenumber = mobileStr.slice(0, 2);
      let postnumber = mobileStr.slice(2, 9);
      setIdaddress(idadres);
      setSelectAddress(resdata);
      setPrecheckoutno(prenumber)
      setPostcheckoutno(postnumber)
      setMobile(mobile);
    } else {
      setSelectAddress("");
      setPrecheckoutno("");
      setPostcheckoutno("");
      setMobile("");
      setIdaddress("");
    
    }

    let statusCheck;
    
    if (findselectaddress !== undefined && findselectaddress !== null && findselectaddress !== "") {
      if (findselectaddress.status === 1) {
        setSelectAddressError("")
        statusCheck = 1
      } else {
        setSelectAddressError("")
        statusCheck = 1
        // const input={"mobile":mobile};

        // varifyMobileNumber(input)

      }
    } else {
      setSelectAddressError("Please select your Delivery Address")
    }
    if (statusCheck === 1) {
      if (activeId <= 2) {
        if (activeId == 2) {
          SetActiveId(activeId);
        } else {
          SetActiveId(activeId + 1);
        }
      }
      updateStatue(activeId);
    }


  };

  //post place order
  const postPlaceOrder = async () => {

    if (userAddress.length <= 0) {
      SetActiveId(1)
    } else {

      SetLoader(true);
      const ip_address = cookies.get("oscad")
      const post_data = {
        "ip_address": ip_address,
        "payment_method": paymentMethod.payment_method,
        "tabbyType": Object.keys(placeOrder).length > 0 && placeOrder.tabbyType,
        "donation_fee": updateDonate,
        "processing_fee": processingFee,
        "coupon_code": couponCode.coupon_code,
        "notes": "Write user note here...",
      }
      const resp = await call_apis.postPlaceOrder(post_data);
      console.log(resp)
      if (resp.status === 200) {
        Setdisabled(true);
        setCryptoUrl(resp.data.data[0].hostedurl);
        var cartIds = '';
        cartList.result.map((each, id) => {
          cartIds = cartIds + each.product_id + '|' + each.quantity + ',';
        });

        // const order_detail = resp.data.data[0];
        // if (order_detail.ourshopee_order_id != 0) {
        //   var redirectUrl = process.env.REACT_APP_SUBMIT_ORDER_URL;
        //   var urlVariable = '';
        //   urlVariable = urlVariable + '&' + 'ourshopee_order_id=' + order_detail.ourshopee_order_id;
        //   urlVariable = urlVariable + '&' + 'pmode=' + paymentMethod.payment_method;
        //   urlVariable = urlVariable + '&' + 'tabbyType=' + order_detail.tabbyType;
        //   urlVariable = urlVariable + '&' + 'totalAmount=' + order_detail.totalAmount;
        //   urlVariable = urlVariable + '&' + 'ip_address=' + order_detail.ip_address;
        //   urlVariable = urlVariable + '&' + 'cartids=' + cartIds;
        //   var encodedUrlVariable = btoa(urlVariable);
        //   window.location.href = redirectUrl + 'osopd=' + encodedUrlVariable;
        // }

      } else {
        Setdisabled(false);
        SetLoader(false);
      }
    }
  }

  const updateStatue = (activeId) => {

    if (activeId === 2) {
      if (!loader) {
        postPlaceOrder()
      }
    }


  }

  //place order
  const getPlaceOrder = async () => {
    const ip_address = cookies.get("oscad");
    if (cookies.get("jwt_token") !== undefined) {
      const resp = await call_apis.getPlaceOrder(ip_address);
      if (resp.status === 200) {
        SetPlaceOrder(resp.data.data);
        setPaymentMethod(resp.data.data.payment_method.filter(ele => ele.selected == true)[0])
        SetUpdateDonate(resp.data.data.donation);
        SetDonateAmt(resp.data.data.donation);
        SetprocessingFee(resp.data.data.processing_fee.split("AED")[1]);
        SetFinalAmount((resp.data.data.final_total.split("AED")[1]).trim());
      }
    }

  };

  const handleChange = async (event, i) => {
    if (event.target.value == '') {
      SetDiscount(0)
      SetLink("");
    }
    setcouponCode((couponCode) => ({
      ...couponCode,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCoupon = async () => {
    if (couponCode.coupon_code === "") {
      SetErrors((errors) => ({
        ...errors,
        ["coupon_code"]: "Invalid Coupon Code",
      }));
      SetDiscount(0)
      SetLink("");

    } else {
      var jsonData = {
        coupon: couponCode.coupon_code,
        tamount: (cartList.grand_total.split("AED")[1]).trim(),
        offer: 0,
        skulist: cartList.result.map(obj => obj.sku)
      }
      const resp = await call_apis.saveCouponCode(jsonData);
      if (resp.status == 200) {
        if (resp.data.data.msg == '') {
          SetErrors((errors) => ({
            ...errors,
            ["coupon_code"]: "",
          }));
          SetDiscount(resp.data.data.discount)
          // SetFinalAmount("AED " + (parseFloat(total) + resp.data.data.discount));

        } else {
          SetErrors((errors) => ({
            ...errors,
            ["coupon_code"]: resp.data.data.msg,
          }));
          if (resp.data.data.link != '') {
            SetLink(resp.data.data.link);
          } else {
            SetLink("");
          }

          if (!resp.data.data.hasOwnProperty("link")) {
            SetLink("");
          }
          // SetFinalAmount("AED " + (total + 0));

          SetDiscount(0)
        }
      }
    }
  };

  React.useEffect(() => {
    if (!carterrStatus) {
      setcarterrMsg("")
    }
  }, [carterrStatus])

  const handleDonate = (e) => {
    if (e.target.value == 0 || e.target.value == '') {
      SetUpdateDonate(0);
    } else {
      SetUpdateDonate(e.target.value);
    }
  };

  const applydonate = () => {
    SetDonateAmt(updateDonate);
  };

  const handleRadioChange = (data, each) => {
    setPaymentMethod(each)
    SetprocessingFee(data);

  };

  const removeCart = (id) => {

    const inputData = {
      cart_id: id,
    };
    axios
      .post("/api/removeFromCart", inputData)
      .then((response) => {
        getCartData(userId);
        getPlaceOrder()
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const quantityIncrease = (quan, id) => {

    const inputData = {
      cart_id: id,
      quantity: quan + 1,
    };
    axios
      .post("/api/changeCartQuantity", inputData)
      .then((response) => {
        getCartData(userId);
        getPlaceOrder();
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const quantityDecrease = (quan, id) => {

    const inputData = {
      cart_id: id,
      quantity: quan - 1,
    };
    axios
      .post("/api/changeCartQuantity", inputData)
      .then((response) => {
        getCartData(userId);
        getPlaceOrder();
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const saveupdatestatus = async () => {
    let input = {
      status: 1,
      idaddress: idaddress,
    }

    const resp = await call_apis.updatestatus(input);
    if (resp.status === 200) {
      getuserdefaultaddress();
      getAddressList();
      setUpdatemob("Verify successfully")

    } else {
      setNetworkError("network Error")
    }

  };



  const getuserdefaultaddress = async () => {

    const resp = await call_apis.getuserdefaultaddress();
    let resdata = resp.data.data[0];
    if (resdata && typeof resdata === 'object' && Object.keys(resdata).length > 0) {
      let idadres = resdata.id;
      let mobile = resdata.mobile;
      let mobileStr = mobile.toString();
      let prenumber = mobileStr.slice(0, 2);
      let postnumber = mobileStr.slice(2, 9);
      setIdaddress(idadres);
      setSelectAddress(resdata);

      setPrecheckoutno(prenumber)
      setPostcheckoutno(postnumber)
      setMobile(mobile);
    } else {
      setSelectAddress("");
      setPrecheckoutno("");
      setPostcheckoutno("");
      setMobile("");
      setIdaddress("")
    }

  }


  useEffect(() => {
    getCartData(userId);
  }, []);

  useEffect(() => {
    if (token !== "") {
      getPlaceOrder();
      getAddressList();
    }
  }, [token]);

  useEffect(() => {
    if (otpVarify === true) { saveupdatestatus() }
  }, [otpVarify])

  const getdefaddress = async () => {
    let defaultaddress = userAddress && Array.isArray(userAddress) && userAddress.find(address => address.default_address === 1);
    if (defaultaddress) {
      const inputData = {
        idaddress: defaultaddress.idaddress,
      };
      const resp = await call_apis.selectAddress(inputData);
      if (resp.status === 200) {
        await getAddressList();
      }
    } else {
      console.log("no default address found")
    }
  }
  useEffect(() => {
    getdefaddress()
  }, [])
  useEffect(()=>{
    if(selectAddress !== "" || selectAddress !== undefined ||selectAddress !==null){
      setSelectAddressError("")
    }

  },[selectAddress])
  useEffect(()=>{setShowCryptoModal(true)},[cryptoUrl])
  return (
    <>
      <div className="logincontainer">
        <div className="avatarCon mt-3">
          <img
            src="/Assets/account_circle.svg"
            alt="Account_Circle"
            className="avatarlogin"
          />
        </div>
        <div className="logincontainer">
          {!status ? (
            <>
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
                  className="loginsign p-0"
                >
                  Sign Up
                </button>
              </div>
            </>
          ) : (
            <div className="userName">
              {jwt(cookies.get("jwt_token")).first_name}

            </div>
          )}
        </div>
        <hr className="logiHorzental" />
      </div>
      {Object.keys(cartList).length > 0 && cartList.result.length > 0 && (
        <div className="w-100 h-100">
          <div className="accordionHeight">
            <Accordion
              onSelect={(e) => {
                if (e != null) {
                  SetActiveId(parseInt(e))
                }
              }}
              defaultActiveKey={`${activeId}`}
              key={activeId}
            >
              <Accordion.Item eventKey="0">
                <Accordion.Header>My Cart</Accordion.Header>
                <Accordion.Body className="productsScroll">
                  {cartList.result.map((each, id) => (
                    <React.Fragment key={id}>
                      <div
                        className="singleCart"
                        style={
                          each.outofstock === 1
                            ? { pointerEvents: "none", opacity: "0.4" }
                            : {}
                        }
                      >
                        <div className="">
                          <NavLink to={`/details/${each.url}/${each.sku}`} className="cartlinkCon d-flex" onClick={() => setIsShown(false)}>
                            <div className="cartimage" style={{ marginRight: '15px' }}>
                              <img
                                src={each.image}
                                alt=""
                                className="navCartImage"
                              />
                            </div>
                            <div className="cartText">{each.name}</div>
                          </NavLink>
                          <div className="d-flex justify-content-between">
                            {/* {each.outofstock === 1 && <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>} */}
                            <button
                              type="button"
                              className="cartRemove"
                              onClick={(e) => removeCart(each.cart_id)} style={{ marginLeft: '10px' }}
                            >
                              Remove
                            </button>{" "}
                            {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                            {each.outofstock === 1 && (
                              <button type="button" className="cartRemove pt-1">
                                Out Of Stock
                              </button>
                            )}
                          </div>

                        </div>
                        <div className="loginquantity">
                          <div className="quantityContainer">
                            {each.quantity !== 0 ? (
                              <button
                                type="button"
                                className="plusButton"
                                onClick={(e) =>
                                  quantityDecrease(each.quantity, each.cart_id)
                                }
                              >
                                <HiMinusSm />
                              </button>
                            ) : (
                              ""
                            )}
                            <button type="button" className="quantity">
                              {each.quantity}
                            </button>
                            {each.quantity <= each.available_quantity ? (
                              <button
                                type="button"
                                className="plusButton"
                                onClick={(e) =>
                                  quantityIncrease(each.quantity, each.cart_id)
                                }
                              >
                                <BsPlus />
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="cartTextdisplayName">
                          AED {each.total}
                        </div>
                      </div>
                      <div className="logiHorzental"></div>
                    </React.Fragment>
                  ))}
                  <div className="w-100">
                    <div className="logincontainer">
                      <p className="error" >
                        {carterrMsg}
                      </p>
                      {
                        (carterrMsg != "" || carterrMsg == "undefined")
                        &&
                        <p style={{ fontSize: "11px" }}>read more...</p>
                      }
                      <button type="button" className="loginshoppingbutton">
                        <NavLink /* to="/" */ onClick={() => setIsShown(false)}>
                          <span className="loginshopping">
                            Continue Shopping
                          </span>
                        </NavLink>
                        <span className="loginAddMore"> to add more items </span>
                      </button>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Select Your Address</Accordion.Header>
                <Accordion.Body>
                  {status && (
                    <AddressCarosule
                      getPlaceOrder={getPlaceOrder}

                    />
                  )}

                  <div className="addAddressButton">
                    {status ? (
                      <button
                        type="button"
                        className="addAddress"
                        onClick={(e) => handelNewAddress()}
                      >
                        + Add A New Address
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="addAddress"
                        onClick={(e) => handelLoginShow("login")}
                      >
                        Login/SignUp
                      </button>
                    )}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <p className="error">{selectAddressError ? selectAddressError : ""}</p>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Payment Method</Accordion.Header>
                <Accordion.Body>
                  {status ? (
                    <>
                      {Object.keys(placeOrder).length > 0 ? (
                        <div className="payment_section">
                          <div className="text-left">
                            {placeOrder.payment_method.length > 0 &&
                              placeOrder.payment_method.map((each, i) => (
                                <React.Fragment key={i}>
                                  <div className="payment_option d-flex gap-3 border-bottom py-2 ">
                                    <div className="form-check">
                                      <Form.Check
                                        type="radio"
                                        name="paymentType"
                                        defaultChecked={
                                          Object.keys(paymentMethod).length > 0 ? ((paymentMethod.id == each.id) && true) : each.selected
                                        }
                                        aria-label="radio 1"
                                        onChange={(e) =>
                                          handleRadioChange(each.processing_fee, each)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <div className="paymentBy">
                                        {each.label} &nbsp;{" "}
                                        {each.type === "tabby_debit" && (
                                          <img
                                            src={each.image}
                                            className="payfortimg"
                                            alt="tabbyLogo"
                                          />
                                        )}
                                      </div>
                                      <div className="paymentDiscp">
                                        {each.easy_installments !== undefined &&
                                          each.easy_installments ===
                                          "plan_credit" && (
                                            <>
                                              <span>
                                                {each.easy_installments}
                                              </span>{" "}
                                              <span
                                                className="learnMore"
                                                style={{
                                                  color: "rgb(240, 82, 82)",
                                                }}
                                              >
                                                Learn More
                                              </span>
                                              <br />
                                            </>
                                          )}
                                        {each.sub_label}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="creditCardOption">
                                    {each.type === "plan_credit" &&
                                      each.available_plane.map((item, e) => (
                                        <div key={e}>
                                          <div className="d-flex justify-content-between ">
                                            <div className="creditDes">{item.label}</div>
                                          </div>
                                          <div>
                                            <ul>
                                              {item.bank_offer_list.map(
                                                (row, ie) => (
                                                  <li key={ie}>
                                                    <img src={row} alt="bank" className="bank-offer" />
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                </React.Fragment>
                              ))}
                          </div>
                          <div className="payment-card">
                            <Row className="d-flex justify-content-between p-2">
                              <Col xs={6} className="priceDetailTitle">
                                Enter Coupon Code
                              </Col>
                              <Col xs={6} className="input-group d-flex justify-content-end w-50">
                                <input
                                  placeholder="Coupon Code"
                                  onChange={handleChange}
                                  defaultValue={couponCode.coupon_code}
                                  name="coupon_code"
                                  className="form-control CoupanCode"
                                  style={{ maxWidth: "140px", height: "28px" }}
                                />
                                <span className="frameicon input-group-text coupanText"
                                  onClick={handleCoupon}

                                >
                                  Apply
                                </span>
                              </Col>
                            </Row>
                          </div>
                          {Object.keys(errors).length > 0 &&
                            errors.coupon_code != '' &&
                            <div className="payment-card" style={{ display: "flex", width: "100%", justifyContent: "flex-end", paddingRight: "10PX" }}>
                              <p className="error">{errors.coupon_code}</p>
                              {" "}
                              {
                                link != "" &&
                                <a
                                  href={link}
                                  style={{ fontSize: "12px" }}
                                  target="_blank"
                                  rel="noreferrer"
                                  title="downloadapp"
                                >
                                  Download here
                                </a>
                              }
                            </div>
                          }
                          {
                            discount > 0 &&
                            <div className="payment-card d-flex justify-content-between p-1">
                              <div
                                className="priceDetailTitle"
                                style={{ color: "#219653" }}
                              >
                                Discount
                              </div>
                              <div
                                className="priceDetailValue"
                                style={{ color: "#219653" }}
                              >
                                {discount}
                              </div>
                            </div>
                          }



                          <div className="payment-card d-flex justify-content-between p-1">
                            <div>
                              <div className="priceDetailTitle">
                                Would you like to donate today?
                              </div>
                              <img src="/Assets/donate.svg" alt="" />
                            </div>
                            <div className="input-group justify-content-end">
                              <input
                                placeholder="AED"
                                className="form-control"
                                defaultValue={updateDonate}
                                onInput={(e) => {
                                  const re = /^[0-9\b]+$/;
                                  e.target.value = ((re.test(e.target.value)) ? e.target.value : '')
                                }}
                                style={{ maxWidth: "140px", height: "28px" }}
                                onChange={(e) => handleDonate(e)}
                              />
                              <span
                                className="frameicon input-group-text coupanText"
                                onClick={applydonate}
                              >
                                Apply
                              </span>
                            </div>
                          </div>
                        </div>

                      ) : (
                        <div style={{ height: "50vh" }}>
                          <div className="loading-indicator"></div>
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      type="button"
                      className="addAddress text-center"
                      onClick={(e) => handelLoginShow("login")}
                    >
                      Login/SignUp
                    </button>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>

          <div className={isMobile ? "totalContinueMob" : "totalContinue"} style={{ background: "#F7F7F7" }}>
            <div className="d-flex justify-content-between p-1">
              <div className="cartSubTotal">
                Sub Total
              </div>
              <div className="priceDetailValue">
                {!status ? cartList.grand_total : placeOrder.sub_total}
              </div>
            </div>
            {donateAmt > 0 &&
              <div className="d-flex justify-content-between p-1">
                <div className="cartSubTotal">
                  Donation
                </div>
                <div className="priceDetailValue">
                  AED {donateAmt}
                </div>
              </div>
            }
            {
              status &&
              <>
                <div className="d-flex justify-content-between p-1">
                  <div className="cartSubTotal">
                    Processing Fee
                  </div>
                  <div className="priceDetailValue">
                    AED {processingFee}
                  </div>
                </div>

                <div className="d-flex justify-content-between p-1">
                  <div className="cartSubTotal">Shipping</div>
                  <div className="priceDetailValue">
                    {placeOrder.shipping_charge}
                  </div>
                </div>
              </>
            }
            {
              activeId === 2 &&
              <div
                className="d-flex justify-content-between p-2"
                style={{ background: "#F7F7F7" }}
              >
                <div className="cartSub-total">
                  Order Total {status && "(Inclusive Of VAT)"}
                </div>
                <div className="subTotal">AED {
                  !status ? cartList.grand_total.split("AED")[1] :
                    (parseFloat(finalAmount) + parseFloat(donateAmt) + parseFloat(processingFee) - parseFloat(discount))}</div>
              </div>
            }

            <div className="cartComplete">
              {
                !status ?
                  <div className="loginbutton" onClick={(e) => handelLoginShow("login")}
                  >
                    Login/SignUp
                  </div>
                  :
                  !carterrStatus ?
                    <div onClick={getActiveStatus} style={{
                      display: "flex",
                      justifyContent: "center",
                      cursor: "pointer",
                      pointerEvents: (loader) ? 'none' : 'cursor'
                    }}>
                      <ClipLoader
                        color={"#ffffff"}
                        loading={loader}
                        size={20}
                        cssOverride={{
                          marginTop: "12px",
                          marginRight: "5px"
                        }}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                      <div className="loginbutton" >
                        {activeId === 2 ? "Place Order" : "Continue"}
                      </div>
                    </div>
                    :
                    <div style={{
                      display: "flex",
                      justifyContent: "center",
                    }}>

                      <div className="loginbutton" onClick={() => setIsShown(false)}>
                        Continue Shopping
                      </div>
                    </div>



              }
            </div>



          </div>

        </div >
      )}
      {
        Object.keys(cartList).length === 0 && (
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
      }
      {

      }
      {showaddressModal && (
        <AddressModel
          showAddress={showaddressModal}
          setShowaddressModal={setShowaddressModal}
        />
      )}
      {phoneVerify &&
        <OtpVerify phoneVerify={phoneVerify} setPhoneVerify={setPhoneVerify} handleClose={handleverifycheck}
          prephone={precheckoutno} phone={postcheckoutno} getResendOtp={getResendOtp} getResendOtpWhatsapp={getResendOtpWhatsapp} setOtpVarify={setOtpVarify} setSuccessMpbile={setSuccessMpbile}
          type="header" otpcheck="continue" />
      }
      {showCryptoModal && cryptoUrl && (
        <CryptoModal
          showCryptoModal={showCryptoModal}
          setShowCryptoModal={setShowCryptoModal}
          cryptoUrl={cryptoUrl}
          setCryptoUrl={setCryptoUrl}
          Setdisabled={Setdisabled}
        />
)}
    </>
  );
};

export default Checkout;
