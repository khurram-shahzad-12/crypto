import React, { useRef } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGooglePlusG,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AffiliateProgram = () => {
  const ref = useRef(null);
  const ref1 = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleClick1 = () => {
    ref1.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Container className="AffiliateProgram maxWidthContainerFluid" fluid>
      
      <Row className="backfullimgContainer">
        <div ref={ref1} className=" backfullimg">
          <Col md={12} sm={12}>
            <h1 className="Ourshopeetext">Ourshopee</h1>
            <h3>Affiliate Program</h3>
            <button className="joinbutton" onClick={handleClick}>
              JOIN NOW &amp; EARN MONEY
            </button>
          </Col>
        </div>
      </Row>

      <Row>
        <Col md={12} sm={12}>
          <h2 className="whoweare">WHO WE ARE</h2>
          <p className="Ourshoping">
            Ourshopee is an emerging trusted online shopping website in UAE. We
            are leading in e-shopping with a wide range of customers across UAE.
            We have a huge collection of various products so customers can make
            earth's biggest selection. We focus on your satisfaction to the
            fullest, because your satisfaction is our energy. So we can improve
            our-self to the best. We are driving to reach at 100% satisfied
            customers, which is the secret behind our repeat customers.
          </p>
          <div style={{ textAlign:"center", padding:"15px 0" }}>
            <button className="joinour">
              Join our Affiliate program & Earn commissions for each CPS
            </button>
          </div>
        </Col>
      </Row>

      <Row ref={ref} style={{ background: "#FFFFFF" }}>
        <div>
          <h2 className="infoourshopee">REGISTER HERE</h2>
          <p className="Pleasefill">
            Please fill the contact form to get more information
          </p>
          <p className="Pleasefill" onClick={handleClick1}>
            Contact us at: info@ourshopee.com.
          </p>
          <Row className="backcolorblack">
            <Col lg={6} sm={12} xs={12}>
              <Form.Group style={{ textAlign: "left" }}>
                <Form.Label style={{ paddingTop: "4%" }}>Name</Form.Label>
                <Form.Control type="text" placeholder="Afsal.kk" />

                <Form.Label style={{ paddingTop: "4%" }}>
                  Contact Number
                </Form.Label>
                <Form.Control type="Number" placeholder="Ex: 9998889999" />

                <Form.Label style={{ paddingTop: "4%" }}>
                  Website URL
                </Form.Label>
                <Form.Control type="text" placeholder="Ex: www.ourshopee.com" />
              </Form.Group>
            </Col>
            <Col lg={6} sm={12} xs={12}>
              <Form.Group style={{ textAlign: "left" }}>
                <Form.Label style={{ paddingTop: "4%" }}>
                  Email Address
                </Form.Label>
                <Form.Control type="text" placeholder="Email Address" />

                <Form.Label style={{ paddingTop: "4%" }}>
                  Company Name
                </Form.Label>
                <Form.Control type="text" placeholder="Ex: Ourshopee" />

                <Form.Label className="fillCaptcha">Captcha</Form.Label>
                <Col lg="10" md={12} xs={12}>
                  <Form.Control
                    type="text"
                    placeholder="Enter Captcha"
                    className="entCaptcha"
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <button className="submitbutton" type="submit">
            {" "}
            Submit{" "}
          </button>
        </div>
      </Row>
      <section style={{ marginTop: "80px", marginBottom:"50px" }}>
        <Row className="backcolorwhite">
          <h2 className="ourmain">OUR MAIN PARTNERS</h2>
          <Col lg={6} sm={12} xs={12} className="borderbox">
            <NavLink to="//www.criteo.com/">
              <img src="Assets/criteoimg.jpg" className="logoimg" alt="" />
            </NavLink>
          </Col>
          <Col lg={6} sm={12} xs={12} className="borderbox">
            <NavLink to="/affiliate-program">
              <img src="Assets/optimiseimg.webp" className="logoimg" alt="" />
            </NavLink>
          </Col>
        </Row>
      </section>
      <Row className="backAffiliateimg" style={{display:"none"}}>
        <h2 className="connectwith">CONNECT WITH OUR SOCIAL MEDIA</h2>
        <Row className="midiaicon">
          <NavLink to="//www.facebook.com/OurShopee/" className="iconname">
            <FaFacebookF />
            <span>&nbsp;Facebook</span>
          </NavLink>
          <NavLink to="//twitter.com/ourshopee" className="iconname">
            <FaTwitter />
            <span>&nbsp;Twitter</span>
          </NavLink>
          <NavLink to="//linkedin.com/ourshopee" className="iconname ">
            <FaLinkedinIn />
            <span>&nbsp;Linkedin</span>
          </NavLink>
          <NavLink to="//googleplus.com/ourshopee" className="iconname">
            <FaGooglePlusG style={{ color: "#dd4b38" }} />
            <span>&nbsp;Google Plus</span>
          </NavLink>
        </Row>
      </Row>

      <Row className="affilatedFooter" style={{display:"none"}}>
        <Col lg={7} sm={7} xs={12}>
          <NavLink to="/" className="homeaboutcontact">
            Home
          </NavLink>{" "}
          &nbsp; | &nbsp;
          <NavLink to="/about-ourshopee" className="homeaboutcontact">
            About
          </NavLink>{" "}
          &nbsp; | &nbsp;
          <NavLink to="/contact-us" className="homeaboutcontact">
            Contact
          </NavLink>
        </Col>
        <Col lg={5} sm={5} xs={12}>
          <p className="Copyright">
            Copyright ©2024 www.qatar.ourshopee.com. All rights reserved.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AffiliateProgram;
