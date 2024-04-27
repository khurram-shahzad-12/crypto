import React, { useEffect, useState, useRef, useContext } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { IoIosStarOutline } from "react-icons/io";
import call_apis from "../../services/Apis";
import { GoPrimitiveDot } from "react-icons/go";
import InfiniteScroll from "react-infinite-scroll-component";
import { BsFillStarFill } from "react-icons/bs";
import { AiTwotoneFolder } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { TiSpannerOutline } from "react-icons/ti";
import UseAddToCartHook from "../../componets/UseAddToCartHook";
import AddToCartAPI from "../../componets/AddToCartAPI";
import MyAccount from "./MyAccount";
import Cookies from "universal-cookie";
import LoginComponent from "../../componets/LoginComponent";


const refresh = (setItems) => {};
const MyOrders = () => {
  const { t } = useTranslation();
  const [orderData, setOrderData] = useState([]);
  const call_data = useRef(true);
  const [stop_Api, setstop_Api] = React.useState(true);
  const [page, setpage] = React.useState(1);
  const [orderId, setOrderId] = useState([]);
  const [show, setShow] = useState(false);
  const [rateData, setRatedata] = useState({});
  const [rate, setRate] = useState(0);
  const { cartClick, cartDetail, addToCart } = UseAddToCartHook();
  const cookies = new Cookies();

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setShow(true);
    setRatedata(data.items[0]);
  };

  const getOrderData = async () => {
    const response = await call_apis.getOrderData(page);
    if (response.data.data.length <= 0) {
      setstop_Api(false);
    }
    setpage(page + 1);
    setOrderData([...orderData, ...response.data.data]);
  };

  useEffect(() => {
    call_data.current = false;
    if (call_data) {
      getOrderData();
    }
  }, []);

  const handelOrderDeteil = (no) => {
    if (orderId.includes(no) === true) {
      setOrderId(orderId.filter((each) => each !== no));
    } else {
      setOrderId([...orderId, no]);
    }
  };

  const rateing = [
    {
      id: 0,
      name: "Horrible",
    },
    {
      id: 1,
      name: "Bad",
    },
    {
      id: 2,
      name: "Average",
    },
    {
      id: 3,
      name: "Good",
    },
    {
      id: 4,
      name: "Excellent",
    },
  ];

  //stepper

  let count = 0;

  const InnerProduct = ({ orderData }) => {
    return (
      <Container className=" MyOrders maxWidthContainerFluid" fluid>
        {orderData.length > 0 &&
          orderData.map((each, id) => (
            <div className="Reference" key={id}>
              <Row>
                <Col lg={9}>
                  <div className="refText">Reference No : {each.referenceNo},{" "} OrderID : {each.orderId} {" "}<span className="pleText">{" "}Placed on {each.placedOn}</span>
                  </div>    
                </Col>
                <Col lg={3} className="main-container">
                  {each.deliverydateOver === true && (
                    <a
                      href={`${each.invoice}`}
                      target="_blank"
                      className="invoice"
                    >
                      <AiTwotoneFolder size={16} className="invoiceIcon" /> View
                      Invoice
                    </a>
                  )}
                  <strong className="OrderTotal">
                    Order Total : AED {each.totalAmount}
                  </strong>
                </Col>
              </Row>
              
              <hr />
              {orderData.length > 0 &&
                each.hasOwnProperty("items") &&
                each.items.map((ele, i) => (
                  <Row key={i}>
                    
                      <Col lg={9}>
                        <Row>
                        {ele.hasOwnProperty("image") && (
                         <Col lg={2} className="main-container">
                          <img className="tvimg" src={ele.image} alt="order" />
                      </Col>
                    )}
                    <Col lg={7}>
                      {ele.hasOwnProperty("image") && (
                        <p className="Smart">{ele.name} </p>
                      )}

                      <p>
                        {ele.quantity} Item
                      </p>
                    </Col>
                    <Col lg={3}><span> AED {ele.price}</span></Col>
                        </Row>
                      
                      </Col>
                     <Col lg={3}>
                      {orderData.length > 0 &&
                      each.hasOwnProperty("cancelled") &&
                      each.cancelled === false ? (
                        <>
                          {each.deliverydateOver === true ? (
                            <>
                              <div className="Processing">
                                <GoPrimitiveDot className="doticon" />
                                Delivered
                              </div>
                              <p className="Afsal">Your Order delivered</p>
                              <button
                                type="button"
                                onClick={() => handleShow(each)}
                              >
                                <IoIosStarOutline className="invoiceIcon" />{" "}
                                Rate This Product
                              </button>
                            </>
                          ) : (
                            <>
                              <div className="Processing">
                                <GoPrimitiveDot className="doticon" />
                                Processing
                              </div>
                              <p className="Afsal">
                                Delivery expected by{" "}
                                {each.orderDetail.deliveryDate}
                              </p>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="OrderTotal">
                            <GoPrimitiveDot className="OrderTotal" />
                            Cancelled
                          </div>
                          <p className="Afsal">{each.cancelledText}</p>
                          {/* <button type='button' 
                          onClick={() => addToCart(each.id)} 
                          className="basicbutton mb-2">Re Order</button> */}
                        </>
                      )}
                     </Col>
                    
                    <hr />
                  </Row>
                ))}
              <Row>
                <Col lg={4}></Col>
                <Col lg={4}>
                  <p
                    className="basicbutton"
                    onClick={() => handelOrderDeteil(each.referenceNo)}
                  >
                    {t("order.Details")}
                  </p>
                </Col>

                <Col lg={4}></Col>
              </Row>

              {orderId.includes(each.referenceNo) === true && (
                <Row className="">
                  <Col xs={12} className="stepperCon d-none d-md-block">
                    {orderData.length > 0 &&
                      each.hasOwnProperty("orderDetail") && (
                        <div className="custom-stepper">
                          <div className="step-container">
                            {[
                              {
                                label: each.hasOwnProperty("cancelledDate")
                                  ? each.cancelledDate
                                  : each.orderDetail.orderedDate,
                                description:
                                  each.cancelled === false
                                    ? each.processDateOver === true
                                      ? "#26a541"
                                      : "#cfcfcf"
                                    : each.processDateOver === true
                                    ? "#26a541"
                                    : "#ff0000",
                                content: "Ordered",
                                circle: 0,
                              },
                              {
                                label: each.hasOwnProperty("cancelledDate")
                                  ? each.cancelledDate
                                  : each.orderDetail.processedDate,
                                description:
                                  each.cancelled === false
                                    ? each.packDateOver === true
                                      ? "#26a541"
                                      : "#cfcfcf"
                                    : each.packDateOver === true
                                    ? "#26a541"
                                    : "#ff0000",
                                content:
                                  each.cancelled === false
                                    ? "Processed"
                                    : each.processDateOver === true
                                    ? "Processed"
                                    : "Cancelled",
                                circle: each.processDateOver === true && 1,
                              },
                              {
                                label: each.hasOwnProperty("cancelledDate")
                                  ? each.cancelledDate
                                  : each.orderDetail.packedDate,
                                description:
                                  each.cancelled === false
                                    ? each.dispatchDateOver === true
                                      ? "#26a541"
                                      : "#cfcfcf"
                                    : each.dispatchDateOver === true
                                    ? "#26a541"
                                    : "#ff0000",
                                content:
                                  each.cancelled === false
                                    ? "Packed"
                                    : each.packDateOver === true
                                    ? "Packed"
                                    : "Cancelled",
                                circle: each.packDateOver === true && 2,
                              },
                              {
                                label: each.hasOwnProperty("cancelledDate")
                                  ? each.cancelledDate
                                  : each.orderDetail.dispatchedDate,
                                description:
                                  each.cancelled === false
                                    ? each.deliverydateOver === true
                                      ? "#26a541"
                                      : "#cfcfcf"
                                    : each.deliverydateOver === true
                                    ? "#26a541"
                                    : "#ff0000",
                                content:
                                  each.cancelled === false
                                    ? "Out For Delivery"
                                    : each.dispatchDateOver === true
                                    ? "Out For Delivery"
                                    : "Cancelled",
                                circle: each.dispatchDateOver === true && 3,
                              },
                              {
                                label: each.hasOwnProperty("cancelledDate")
                                  ? each.cancelledDate
                                  : each.orderDetail.deliveryDate,
                                description: "This is step 3",
                                content:
                                  each.cancelled === false
                                    ? "Delivered"
                                    : each.deliverydateOver === true
                                    ? "Delivered"
                                    : "Cancelled",
                                circle: each.deliverydateOver === true && 4,
                              },
                            ].map((step, index) => {
                              if (step.content !== "Cancelled") {
                                count = 0;
                                return (
                                  <React.Fragment key={index}>
                                    <div
                                      className={`step ${
                                        index === step.circle ? "active1" : ""
                                      }`}
                                      key={index}
                                    >
                                      <div className="subTitle">
                                        {step.content}{" "}
                                      </div>
                                      <div className="step-label">
                                        {step.label}
                                      </div>
                                    </div>
                                    {step.description === ''}
                                    <div class="progress progress-striped">
                                    <div class="progress-bar">
                                    </div>                       
                                  </div> 
                                    <hr
                                      className={
                                        index >= 4 ? "stepLineNone" : "stepLine"
                                      }
                                      style={{ color: step.description }}
                                    />
                                  </React.Fragment>
                                );
                              } else {
                                count++;
                                if (count === 1) {
                                  return (
                                    <React.Fragment key={index}>
                                      <div
                                        className={`step ${
                                          index === step.circle
                                            ? "Cancelled"
                                            : "Cancelled"
                                        }`}
                                        key={index}
                                      >
                                        <div className="subTitle">
                                          {step.content}{" "}
                                        </div>
                                        <div className="step-label">
                                          Order Cancelled {step.label}
                                        </div>
                                      </div>
                                    </React.Fragment>
                                  );
                                } else {
                                  count = -1;
                                }
                              }
                            })}
                          </div>
                        </div>
                      )}
                  </Col>
                  <Col xs={12} className="d-md-none">
                    {orderData.length > 0 &&
                      each.hasOwnProperty("orderDetail") && (
                        <div className="custom-stepper">
                          <div
                            className="step-container"
                            style={{ flexDirection: "column" }}
                          >
                            {[
                              {
                                label: each.hasOwnProperty("cancelledDate")
                                  ? each.cancelledDate
                                  : each.orderDetail.orderedDate,
                                description:
                                  each.cancelled === false
                                    ? each.processDateOver === true
                                      ? "#26a541"
                                      : "#cfcfcf"
                                    : each.processDateOver === true
                                    ? "#26a541"
                                    : "#ff0000",
                                content: "Ordered",
                                circle: 0,
                                text:
                                  each.cancelled === false
                                    ? each.processDateOver === true
                                      ? " Your order has been placed"
                                      : " Your order has been placed"
                                    : each.processDateOver === true
                                    ? "Your order has been placed"
                                    : " As per your request, your item has been cancelled",
                              },
                              {
                                label: each.hasOwnProperty("cancelledDate")
                                  ? each.cancelledDate
                                  : each.orderDetail.processedDate,
                                description:
                                  each.cancelled === false
                                    ? each.packDateOver === true
                                      ? "#26a541"
                                      : "#cfcfcf"
                                    : each.packDateOver === true
                                    ? "#26a541"
                                    : "#ff0000",
                                content:
                                  each.cancelled === false
                                    ? "Processed"
                                    : each.processDateOver === true
                                    ? "Processed"
                                    : "Cancelled",
                                circle: each.processDateOver === true && 1,
                                text:
                                  each.cancelled === false
                                    ? each.packDateOver === true
                                      ? " Your order has been Processed"
                                      : " Waiting to Processe your order"
                                    : each.packDateOver === true
                                    ? " Your order has been Processed"
                                    : " As per your request, your item has been cancelled",
                              },
                              {
                                label: each.hasOwnProperty("cancelledDate")
                                  ? each.cancelledDate
                                  : each.orderDetail.packedDate,
                                description:
                                  each.cancelled === false
                                    ? each.dispatchDateOver === true
                                      ? "#26a541"
                                      : "#cfcfcf"
                                    : each.dispatchDateOver === true
                                    ? "#26a541"
                                    : "#ff0000",
                                content:
                                  each.cancelled === false
                                    ? "Packed"
                                    : each.packDateOver === true
                                    ? "Packed"
                                    : "Cancelled",
                                circle: each.packDateOver === true && 2,
                                text:
                                  each.cancelled === false
                                    ? each.deliverydateOver === true
                                      ? "Your order has been Packed"
                                      : " Waiting to pack your order"
                                    : each.deliverydateOver === true
                                    ? "Your order has been Packed"
                                    : " As per your request, your item has been cancelled",
                              },
                              {
                                label: each.hasOwnProperty("cancelledDate")
                                  ? each.cancelledDate
                                  : each.orderDetail.dispatchedDate,
                                description:
                                  each.cancelled === false
                                    ? each.deliverydateOver === true
                                      ? "#26a541"
                                      : "#cfcfcf"
                                    : each.deliverydateOver === true
                                    ? "#26a541"
                                    : "#ff0000",
                                content:
                                  each.cancelled === false
                                    ? "Out For Delivery"
                                    : each.dispatchDateOver === true
                                    ? "Out For Delivery"
                                    : "Cancelled",
                                circle: each.dispatchDateOver === true && 3,
                                text:
                                  each.cancelled === false
                                    ? each.deliverydateOver === true
                                      ? "Your order has been dispatched"
                                      : " Waiting to dispatch your order"
                                    : each.deliverydateOver === true
                                    ? "Your order has been dispatched"
                                    : " As per your request, your item has been cancelled",
                              },
                              {
                                label: each.hasOwnProperty("cancelledDate")
                                  ? each.cancelledDate
                                  : each.orderDetail.deliveryDate,
                                description: "This is step 3",
                                content:
                                  each.cancelled === false
                                    ? " Delivery expected by"
                                    : each.deliverydateOver === true
                                    ? "Delivered"
                                    : "Cancelled",
                                circle: each.deliverydateOver === true && 4,
                                text:
                                  each.cancelled === false
                                    ? each.deliverydateOver === true
                                      ? " Your order has been delivered"
                                      : " Waiting to deliver your order"
                                    : each.deliverydateOver === true
                                    ? "Your order has been delivered"
                                    : " As per your request, your item has been cancelled",
                              },
                            ].map((step, index) => {
                              if (step.content !== "Cancelled") {
                                count = 0;
                                return (
                                  <React.Fragment key={index}>
                                    <div
                                      className={`step ${
                                        index === step.circle ? "active1" : ""
                                      } w-100`}
                                      key={index}
                                    >
                                      <div className="subTitleMobile">
                                        <strong>{step.content}</strong>{" "}
                                        {step.label}. {step.text}{" "}
                                      </div>
                                     
                                    </div>
                                    <div
                                      className={
                                        index >= 4
                                          ? "stepLineNoneMobile"
                                          : "stepLineMobile"
                                      }
                                      style={{
                                        borderLeftColor: step.description,
                                      }}
                                    />
                                  </React.Fragment>
                                );
                              } else {
                                count++;
                                if (count === 1) {
                                  return (
                                    <React.Fragment key={index}>
                                      <div
                                        className={`step ${
                                          index === step.circle
                                            ? "Cancelled"
                                            : "Cancelled"
                                        } w-100`}
                                        key={index}
                                      >
                                        <div className="subTitleMobile">
                                          <strong>
                                            Order {step.content} {step.label}
                                          </strong>
                                          .{step.text}{" "}
                                        </div>
                                      </div>
                                    </React.Fragment>
                                  );
                                } else {
                                  count = -1;
                                }
                              }
                            })}
                          </div>
                        </div>
                      )}
                  </Col>
                  <Row className="mt-3">
                    <Col xs={12} md={4}>
                      <div className="vrlion">
                        <strong> {t("order.Delivery")} </strong>
                        <div className="Afsal">
                          <b>{each.orderDetail.user_name}</b>{" "}
                        </div>
                        <div className="Afsal">
                          {/* {" "}{each.orderDetail.shipping_address}.{" "} */}
                          Phone number <b>{each.orderDetail.mobile}</b>{" "}
                        </div>
                        <strong>{t("order.Payment")}</strong>
                        <p className="Afsal">{each.orderDetail.paymode}</p>
                      </div>
                    </Col>
                    <Col xs={12} md={8}>
                      <Row className="mb-1">
                        <Col>
                          <strong>{t("order.Summary")}</strong>
                        </Col>
                      </Row>
                      <Row className="DescriptionName">
                        <Col xs={5} md={9} className="Afsal">
                          {t("order.Sub")}
                        </Col>
                        <Col xs={6} md={3} className="Afsal text-end">
                          AED{" "}
                          {each.orderDetail.total_amount -
                            each.orderDetail.shipping_charge -
                            +each.orderDetail.processing_fee -
                            +each.orderDetail.vat -
                            +each.orderDetail.discount}
                        </Col>
                      </Row>
                      <Row className="DescriptionName">
                        <Col xs={5} md={9} className="Afsal">
                          {t("order.Shipping")}
                        </Col>
                        <Col xs={6} md={3} className="Afsal text-end">
                          AED {each.orderDetail.shipping_charge}
                        </Col>
                      </Row>
                      <Row className="DescriptionName">
                        <Col xs={5} md={9} className="Afsal">
                          {t("order.Processing")}
                        </Col>
                        <Col xs={6} md={3} className="Afsal text-end">
                          AED {each.orderDetail.processing_fee}
                        </Col>
                      </Row>
                      <Row className="DescriptionName">
                        <Col xs={5} md={9} className="Afsal">
                          {t("order.Vat")}
                        </Col>
                        <Col xs={6} md={3} className="Afsal text-end">
                          AED {each.orderDetail.vat}
                        </Col>
                      </Row>
                      <Row className="DescriptionName">
                        <Col xs={5} md={9} className="Afsal">
                          {t("order.Discount")}{" "}
                        </Col>
                        <Col xs={6} md={3} className="Afsal text-end">
                          AED {each.orderDetail.discount}
                        </Col>
                      </Row>
                      <Row className="">
                        <Col xs={5} md={9} className="Afsal">
                          <strong className="OrderTotal">
                            {t("order.Grand")}
                          </strong>{" "}
                        </Col>
                        <Col xs={6} md={3} className="Afsal text-end">
                          <strong className="OrderTotal">
                            AED {each.orderDetail.total_amount}
                          </strong>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Row>
              )}
            </div>
          ))}

        <Modal show={show} onHide={handleClose} size="md" className="model">
          <Modal.Header closeButton className="modelTop" variant="white">
            <Modal.Title>{t("order.Review")}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <img src={rateData.image} alt="Rating" />
            <div className="rateName">{rateData.name}</div>
            <div className="rateProduct">{t("order.rate")}</div>
            <div className="ratePara">{t("order.how")}</div>
            <Row className="my-2">
              <Col xs={1}></Col>
              {rateing.map((each, index) => {
                const givenRating = index + 1;
                return (
                  <Col
                    xs={2}
                    key={index}
                    onMouseOver={() => setRate(givenRating)}
                  >
                    <BsFillStarFill
                      size={25}
                      className="rateStar"
                      color={
                        givenRating < rate || givenRating === rate
                          ? "#4aab00"
                          : "#d8d8d8"
                      }
                    />
                    <div>{each.name}</div>
                  </Col>
                );
              })}
              <Col xs={1}></Col>
            </Row>
            <textarea
              type="textarea"
              rows={3}
              placeholder={t("order.Type")}
              cols={45}
            ></textarea>
            <div>
              <Button variant="primary" onClick={handleClose}>
                {t("order.submit")}
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    );
  };

  return (
    <>
      <Container className="mt-2 MyAccount maxWidthContainerFluid" fluid>
        <Row>
          <Col lg="3">
            <MyAccount />
          </Col>
          <Col lg="9">

            {cookies.get("jwt_token") !== undefined ? <>
            {orderData !== undefined && Object.keys(orderData).length > 0 ? (
            <div>
              <Container
                fluid
                className="maxWidthContainerFluid categoryPage"
              >
                <div className="subCategoryTitle">My Orders</div>
                <InfiniteScroll
                  dataLength={orderData.length}
                  next={() => {
                    getOrderData();
                  }}
                  hasMore={stop_Api}
                  loader={
                    <div className="">
                      <div className="loading-indicator"></div>
                    </div>
                  }
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                    </p>
                  }
                  refreshFunction={refresh}
                  style={{ overflow: "hidden" }}
                >
                  <InnerProduct orderData={orderData} />
                </InfiniteScroll>
                
              </Container>
            </div>
            ) : (
              <div style={{ height: "50vh" }}>
                <div className="loading-indicator"></div>
              </div>
            )}
            </> :
            <div id="popover-basic" className="">
              <LoginComponent />
            </div>
            }
          </Col>
        </Row>
      </Container>
      
    </>
  );
};

export default MyOrders;
