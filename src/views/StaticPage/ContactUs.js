import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Meta from "../../componets/Meta";

const ContactUs = () => {

  return (
    <div>
    <Container className="ContactUs" fluid>
      <Row style={{ paddingTop: "2%", paddingBottom: "3%" }}>
        <Col sm={12} md={12} lg={6}>
        <iframe
            class="responsive-iframe"
            id="gmap_canvassss"
            src="https://maps.google.com/maps?q=ourshopee%20headquaters&t=&z=15&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
          ></iframe>
        </Col>

        <Col lg={1} sm={12} md={12}></Col>

        <Col lg={5}>
          <Row className="contactfill">
            <strong style={{ fontWeight: "600" }}>Contact info</strong>
            <div>
              <Row style={{ paddingTop: '3%'}}>
                <Col md={2} sm={2} xs={2}>
                  <p> Phone </p>
                </Col>
                <Col md={1} sm={1} xs={1}>
                  <p>:</p>
                </Col>
                <Col md={9} sm={9} xs={9}>
                  <p>+971 4 4120000 </p>
                </Col>
              </Row>
              <Row>
                <Col md={2} sm={2} xs={2}>
                  <p> Mail </p>
                </Col>
                <Col md={1} sm={1} xs={1}>
                  <p>:</p>
                </Col>
                <Col md={9} sm={9} xs={9}>
                  <p> support@ourshopee.com </p>
                </Col>
              </Row>
              <Row>
                <Col md={2} sm={2} xs={2}>
                  <p> Address </p>
                </Col>
                <Col md={1} sm={1} xs={1}>
                  <p>:</p>
                </Col>
                <Col md={9} sm={9} xs={9}>
                  <p>
                    OurShopee Trading LLC | 8B Street | Al Qusais Ind Area 1 |
                    Dubai | UAE
                  </p>
                </Col>
              </Row>
            </div>
          </Row>
          <h2 className="GetItOn">Get It On</h2>
          <div className="Androidimg">
            <img src="Assets/Android_Appstore.png" alt=""  className="g-play"/>
            <img
              style={{ paddingLeft: "5%" }}
              src="Assets/online-shopping.png"
              alt="" className="app-store"
            />
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default ContactUs;
