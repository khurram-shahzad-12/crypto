/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const SellWithUs = () => {
  return (
    <div className="SellWithUs">
      <img className="sellwithusimg" src="Assets/sellwith-usimg.webp" alt="" />
      <h1 className="WhyToSell">Why To Sell With OurShopee</h1>

      <Row style={{ paddingTop: "5%" }}>
        <Col md={12} lg={2} style={{ textAlign: "center" }}>
          <div>
            <div className="backcimgcerle">
              <img className="imgcerle" src="Assets/dashboard1.svg" alt="" />
            </div>
          </div>
          <h6>Easy Dashboard</h6>
          <p>
            Manage your products, orders, account, payments, sales and
            statements by the very easy dashboard
          </p>
        </Col>

        <Col md={12} lg={3} style={{ textAlign: "center" }}>
          <div>
            <div className="backcolor">
              <img className="imgcerle" src="Assets/workimg.svg" alt="" />
            </div>
          </div>
          <h6>Facilitate Work</h6>
          <p className="paracenter">
            You don't have to worry about shipment and payment any more as
            OurShopee will take care of it.
          </p>
        </Col>

        <Col md={12} lg={2} style={{ textAlign: "center" }}>
          <div>
            <div className="backcimgcerle">
              <img className="imgcerle" src="Assets/teamimg.svg" alt="" />
            </div>
          </div>
          <h6>Reach People</h6>
          <p>
            Via OurShopee Platform and connections many people can easily find
            your products easily.
          </p>
        </Col>

        <Col md={12} lg={3} style={{ textAlign: "center" }}>
          <div>
            <div className="backcolor">
              <img className="imgcerle" src="Assets/boostimg.svg" alt="" />
            </div>
          </div>
          <h6>Boost Your Sale</h6>
          <p className="paracenter">
            Through OurShopee Many people are viewing your products, all you
            have to do is crafting more.
          </p>
        </Col>

        <Col md={12} lg={2} style={{ textAlign: "center" }}>
          <div>
            <div className="backcimgcerle">
              <img className="imgcerle" src="Assets/monitorimg.svg" alt="" />
            </div>
          </div>
          <h6>Monitor Performance</h6>
          <p>
            OurShopee provides you with the interface to monitor your
            performance, sale and payment.
          </p>
        </Col>
      </Row>

      <h1 className="WhyToSell">How It Works?</h1>
      <Row style={{ paddingTop: "5%" }}>
        <Col md={12} lg={2} style={{ textAlign: "center" }}>
          <div className="colorcerle">
            <img className="imgcerle" src="Assets/registered1.svg" alt="" />
          </div>
          <h6>Register</h6>
          <p>
            Fill the Registration Form & Read and accept our Seller Agreement
          </p>
        </Col>

        <Col md={12} lg={3} style={{ textAlign: "center" }}>
          <div className="backcolorcerle">
            <img className="imgcerle" src="Assets/boxes2.svg" alt="" />
          </div>
          <h6>Upload Products</h6>
          <p className="paracenter">Upload your products to start selling</p>
        </Col>

        <Col md={12} lg={2} style={{ textAlign: "center" }}>
          <div className="colorcerle">
            <img className="imgcerle" src="Assets/list3.svg" alt="" />
          </div>
          <h6>Get Orders</h6>
          <p>
            You'll be notified when your item is sold. Pack your item ready to
            send.
          </p>
        </Col>

        <Col md={12} lg={3} style={{ textAlign: "center" }}>
          <div className="backcolorcerle">
            <img className="imgcerle" src="Assets/delivery4.svg" alt="" />
          </div>
          <h6>Ship</h6>
          <p className="paracenter">
            Handover the packed item to our courier partner at your doorstep for
            shipping.
          </p>
        </Col>

        <Col md={12} lg={2} style={{ textAlign: "center" }}>
          <div className="colorcerle">
            <img className="imgcerle" src="Assets/profits5.svg" alt="" />
          </div>
          <h6>Earn</h6>
          <p>Get payments quickly through your account as per ourshopee T&C.</p>
        </Col>
      </Row>
      <Col lg={6} className="dashedbox">
        <h2>Registered Customers</h2>
        <p>If you have an account with us, please log in.</p>
        <div></div>
        <NavLink to="//www.seller.ourshopee.com/login">
          <Button className="submitbutton">Login With US</Button>
        </NavLink>

        <p style={{ paddingTop: "3%" }}>
          Don't have an account{" "}
          <NavLink to="//www.seller.ourshopee.com/signup">
            <strong style={{ color: "#0055B8" }}>sign up</strong>
          </NavLink>
        </p>
        <NavLink to="//www.seller.ourshopee.com/signup">
          {" "}
          <a className="RegisterNow">Register Now</a>
        </NavLink>
      </Col>
    </div>
  );
};

export default SellWithUs;
