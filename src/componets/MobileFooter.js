import React from "react";
import { Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Cart1 from "./Cart1";

const MobileFooter = () => {
  return (
    <div className="footerMobile">
      <Row>
        <Col xs={4}>
          <div>
            <NavLink to="/saver-zone" className="footerLink">
              <div className="footerMobIcon">
                <img
                  src="/Assets/tips_and_updates.svg"
                  className="cartIcon d-lg-none"
                  alt="tip logo"
                />
              </div>
              <div className="footerMobText">Saver Zone</div>
            </NavLink>
          </div>
        </Col>
        <Col xs={4}>
          <div>
            <NavLink to="/deals-of-the-day" className="footerLink">
              <div className="footerMobIcon">
                <img
                  src="/Assets/alarm.svg"
                  className="cartIcon d-lg-none"
                  alt="alarm logo"
                />
              </div>
              <div className="footerMobText">Deal Of The Day</div>
            </NavLink>
          </div>
        </Col>
        <Col xs={4}>
          <div className="footerCartCon">
            <Cart1 />
            <div className="footerMobText">Cart</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MobileFooter;
