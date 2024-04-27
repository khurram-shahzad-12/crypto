import React, { useState } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";
import { useSelector } from "react-redux";
import { apiSelector } from "../../src/store/Api_middelware";
import { useTranslation } from "react-i18next";
import {BsWhatsapp, BsLinkedin} from "react-icons/bs";
import {AiOutlineYoutube} from "react-icons/ai";

const Footer = () => {
  const { t } = useTranslation();

  const [show, setShow] = useState(7);
  const [buttonShow, setButtonShow] = useState(true);
  const data = useSelector(apiSelector);
  const handelViewMore = () => {
    setShow(-1);
    setButtonShow(false);
  };

  const handelViewLess = () => {
    setShow(7);
    setButtonShow(true);
  };

  const currentYear = new Date().getFullYear();

  //start viewmore function
  const showLines = 3;
  const lineHeight = 0.9; 
  const maxAllowedHeight = showLines * lineHeight * 16;
  const [showFullDescription, setShowFullDescription] = useState(false);

  const descriptionStyle = {
    maxHeight: showFullDescription ? 'none' : `${maxAllowedHeight}px`,
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  //end viewmore function

  const imgStyles = {
    paddingTop: '2%',
    width: '87%',
  };
  
  const slicedCategoryArray = data.data.length > 0 && data.data.slice(0, 6);
  return (
    <>
      <div className="footerContainer">
        <Container
          fluid
          className=" maxWidthContainerFluid paddingContainerFluid"
        >
          <Row className="">
            {slicedCategoryArray.length > 0 &&
              slicedCategoryArray.map((each) => (
                <Col xs={6} lg={2} key={each.category_id}>
                  <div className="footerHead">
                    <span>{each.category_name}</span>
                  </div>
                  <div>
                    <ul style={{ listStyleType: "none" }}>
                      {each.subcategory.slice(0, show).map((item) => (
                        <li key={item.sub_category_id}>
                          <NavLink className="items" to={`/products-category/${item.url}`} >
                            {item.sub_category_name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
              ))}
            <div>
              {buttonShow && (
                <button
                  type="button"
                  className="viewMore viewmorestyle"
                  onClick={handelViewMore}
                >
                  {t("footer.viewMore")}
                </button>
              )}
              {!buttonShow && (
                <button
                  type="button"
                  className="viewMore viewmorestyle"
                  onClick={handelViewLess}
                >
                  {t("footer.viewLess")}
                </button>
              )}
            </div>
          </Row>
        </Container>
      </div>
      <div className="footerSecondContainer">
        <Container
          fluid
          className="maxWidthContainerFluid paddingContainerFluid"
        >
          <Row style={{ paddingBottom: "50px" }}>
            <Col lg={4}>
              <Row>
                <Col lg={12}>
                  <img
                    src="/Assets/ourShopeeLogo.png"
                    alt="OurShopeeLogo"
                    className="OurShopeeLogo"
                  />
                  <h4 className="footer_headg"> {t("footer.abouthead")} </h4>
                  <div className="footer_descipt" style={descriptionStyle}>
                    <p className="footer_descip" >{t("footer.discription")}</p>
                    <h5 className="footer_headg"> {t("footer.whyourshopeehead")} </h5>
                    <p className="footer_descip"> <b> {t("footer.whyourshopeetitle1")}</b> {t("footer.whyourshopeetitle1discription")}  </p>
                    <p className="footer_descip"> <b> {t("footer.whyourshopeetitle2")}</b> {t("footer.whyourshopeetitle2discription")}  </p>
                    <p className="footer_descip"> <b> {t("footer.whyourshopeetitle3")}</b> {t("footer.whyourshopeetitle3discription")}  </p>
                    <p className="footer_descip"> <b> {t("footer.whyourshopeetitle4")}</b> {t("footer.whyourshopeetitle4discription")}  </p>
                    <p className="footer_descip"> <b> {t("footer.whyourshopeetitle5")}</b> {t("footer.whyourshopeetitle5discription")}  </p>
                    <p className="footer_descip"> <b> {t("footer.whyourshopeetitle6")}</b> {t("footer.whyourshopeetitle6discription")}  </p>
                    <p className="footer_descip"> <b> {t("footer.whyourshopeetitle7")}</b> {t("footer.whyourshopeetitle7discription")}  </p>
                    <p className="footer_descip"> <b> {t("footer.whyourshopeetitle8")}</b> {t("footer.whyourshopeetitle8discription")}  </p>
                    <p className="footer_descip"> <b> {t("footer.whyourshopeetitle9")}</b> {t("footer.whyourshopeetitle9discription")}  </p>
                    <p className="footer_descip"> <b> {t("footer.whyourshopeetitle10")}</b> {t("footer.whyourshopeetitle10discription")}  </p>
                    <p className="footer_descip">  {t("footer.whyourshopeetitle11discription")}  </p>
                  </div>

                  {!showFullDescription && (
                    <button className="view-more-less-btn" onClick={toggleDescription}>
                      View more
                    </button>
                  )}
                  {showFullDescription && (
                    <button className="view-more-less-btn" onClick={toggleDescription}>
                      View less
                    </button>
                  )}

                </Col>
              </Row>
              <Row style={{ paddingTop: "8px" }}>
                <Col lg={12}>
                  <img
                    src="/Assets/ConsumerRights.png"
                    className="consumerLogo"
                    alt="ConsumerRights"
                  />
                  <div style={{ paddingTop: "19px" }}>
                    <h1 className="Connectwithus">{t("footer.connect")}</h1>
                    <div className="sosalmidiaimg">
                      <a
                        href="https://www.facebook.com/Ourshopee/"
                        className="facebook"
                        target="_blank"
                        rel="noreferrer"
                        title="facebook"
                      >
                        <img src="/Assets/FaceBook.png" alt="FaceBook" />
                      </a>
                      
                      <a
                        href="https://www.instagram.com/ourshopee/"
                        className="facebook"
                        target="_blank"
                        rel="noreferrer"
                        title="instagram"
                      >
                        <img src="/Assets/Vector.png" alt="Vector" />
                      </a>
                      <a
                        href="https://wa.me/971521740943"
                        className="facebook"
                        target="_blank"
                        rel="noreferrer"
                        title="whatsapp"
                      >
                        <BsWhatsapp color="#fff" size="20" />
                      </a>
                      <a
                        href="https://www.linkedin.com/company/ourshopee-com"
                        className="facebook"
                        target="_blank"
                        rel="noreferrer"
                        title="linkedIn"
                      >
                        <BsLinkedin color="#fff" size="20" />
                      </a>
                      <a
                        href="https://twitter.com/ourshopee/"
                        className="facebook"
                        target="_blank"
                        rel="noreferrer"
                        title="twitter"
                      >
                        <img src="/Assets/Twitter.png" alt="Twitter" />
                      </a>
                      <a
                        href="https://www.youtube.com/channel/UCHxhfnO2bt5DmXf_Ng2_Upw/"
                        className="facebook"
                        target="_blank"
                        rel="noreferrer"
                        title="twitter"
                      >
                        <AiOutlineYoutube color="#fff" size="25"/>
                      </a>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={5}>
              <Row>
                <Col lg={12}>
                  <h1 className="footerHeading">
                    {t("footer.customerSupport")}
                  </h1>
                  <p className="footer_descip">{t("footer.supportDiscrip")}</p>
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  <h1 className="wearealways">{t("footer.weRAlways")}</h1>
                  <p className="Reachout">{t("footer.reachOut")}</p>
                  <div className="midiacont">
                    <div className="row">
                      <div className="col-md-3">
                        <p className="massages">
                          {t("footer.hotline")} :{" "}
                        </p>
                      </div>
                      <div className="col-md-9">
                        <p className="massages">
                        <span className="contact">(971) 4 4120000</span>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <p className="massages">
                        {t("footer.whatsapp")} :{" "}
                        </p>
                      </div>
                      <div className="col-md-9">
                        <p className="massages">
                          <span className="contact">(971) 52 174 0943</span>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <p className="massages">
                          {t("footer.email")} :{" "}
                        </p>
                      </div>
                      <div className="col-md-9">
                        <p className="massages">
                        <span className="contact">support@ourshopee.com</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={3}>
              <Row>
                <Col lg={12}>
                  <h1 className="Newsletter">{t("footer.newsletter")}</h1>
                  <InputGroup className="email_id">
                    <Form.Control placeholder="Enter your email ID" />
                    <InputGroup.Text className="frameicon" id="basic-addon2">
                      <FaPaperPlane />
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
              <Row style={{ paddingTop: "42px" }}>
                <Col lg={12}>
                  <div className="app_downlod">
                    <p className="secondfooterHeading">
                      {t("footer.downloadApp")}
                    </p>
                  </div>
                  <Row>
                    <Col lg={6}>
                      <NavLink
                        to={`https://play.google.com/store/apps/details?id=www.ourshopee.com`}
                        target="_blank"
                      >
                        <img
                          className="apple_icon"
                          src="/Assets/Android_Appstore.png"
                          alt="Android_Appstore"
                        />
                      </NavLink>
                    </Col>
                    <Col lg={6}>
                      <NavLink
                        to={`https://apps.apple.com/us/app/ourshopee-online-shopping/id1226954989`}
                        target="_blank"
                      >
                        {" "}
                        <img
                          className="apple_icon"
                          src="/Assets/online-shopping.png"
                          alt="online-shopping"
                          style={imgStyles}
                        />
                      </NavLink>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div className="middle_paragraph">
                <NavLink to="/about-ourshopee" className="dddddd">
                  {" "}
                  {t("footer.about")}{" "}
                </NavLink>{" "}
                |
                <NavLink to="/sitemap" className="dddddd">
                  {t("footer.siteMap")}
                </NavLink>{" "}
                |
                <NavLink to="/customer-reviews" className="dddddd">
                  {t("footer.submitReview")}
                </NavLink>
                |
                <NavLink to="/return-policy" className="dddddd">
                  {t("navigation.warranty")}
                </NavLink>
                |
                <NavLink to="/privacy-policy" className="dddddd">
                  {" "}
                  {t("navigation.policy")}
                </NavLink>
                |
                <NavLink to="/terms-and-conditions" className="dddddd">
                  {t("navigation.term")}
                </NavLink>
                |
                <NavLink to="/blogs" className="dddddd">
                  {t("footer.blog")}
                </NavLink>
                |
                <NavLink to="/contact-us" className="dddddd">
                  {t("navigation.contactUs")}
                </NavLink>
                |
                <NavLink to="/faqs" className="dddddd">
                  {t("footer.faq")}
                </NavLink>
                |
                <NavLink to="/sell-with-us" className="dddddd">
                  {t("footer.sell")}
                </NavLink>
                |
                <NavLink to="/affiliate-program" className="dddddd">
                  {" "}
                  {t("footer.affialate")}{" "}
                </NavLink>
              </div>
            </Col>
          </Row>
          <Row style={{ paddingTop: "46px" }}>
            <Col lg={6}>
              <img
                className="footer_img"
                src={"/Assets/footer_img.png"}
                alt=""
              />
            </Col>
            <Col lg={6}>
              <div className="footer_component">
              <p className="ourshop_com">Copyright {currentYear} {t("footer.copyright")} </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Footer;
