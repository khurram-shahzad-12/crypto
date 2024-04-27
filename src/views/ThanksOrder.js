import React, { useState, useEffect } from "react";
import CommonBreadCrumb from "../componets/CommonBreadCrumb";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {AiFillCheckCircle} from "react-icons/ai"
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import call_apis from "../services/Apis";

const ThanksOrder = () => {
  const { t } = useTranslation();
  const data = [{ slug: "Order Confirmation", link: "", url: "" }];
  const {slug} = useParams()
  let navigate = useNavigate();
  const [seconds, setSeconds] = useState(4);
  const cookies = new Cookies();

  console.log(slug);
  const removeItems = async () => {
    if (cookies.get("jwt_token") !== undefined) {
      const resp = await call_apis.updateCartStatus();
      if (resp.status === 200) {
       
      }
    }

  };

  useEffect(() => {
    cookies.remove("oscad");
    removeItems();
    const timerId = setTimeout(() => {
      // navigate("/my-orders");
    }, 4000); // 4000 milliseconds = 4 seconds
    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds("BOOOOM!");
    }
  }, []);

  return (
    <Container
      fluid
      className="maxWidthContainerFluid paddingContainerFluid ThanksOrder"
    >
      <Container fluid className="maxWidthContainerFluid">
        <CommonBreadCrumb data={data} />
      </Container>
      <Container className='mb-3'>
      <Row>
        <Col md={7} className="text-center thanksContainer">
          <div className="head">{t("thanks.order")}</div>
           <AiFillCheckCircle size={40} color="#7ec900" className="tick" />
          <div className="text">{t("your.order")}</div>
          <div className="thanksInput text2">
            {t("your.orderis")} {slug}
          </div>
          <div className="text2">{t("thaks.text")}</div>
          <div className="text2 mb-4">{t("thaks.sec")}</div>
          <div className="ProductDetail thankbutton">
            <NavLink to="/" className="productAddToCart">
              {t("continue.shopping")}
            </NavLink>
          </div>
          <div className="redirect">
            {t("thanks.redirect")} {seconds} {t("thanks.seconds")}
          </div>
        </Col>
        <Col md={1}></Col>
        <Col md={4} className="text-center thanksContainer">
          <div className="head">{t("track.order")}</div>
          <div className="thanksInput text2">{slug}</div>
          <div className="ProductDetail thankbutton">
            <button type="button" className="productAddToCart" style={{padding: "8px 7px"}}>
              {t("search.status")}
            </button>
          </div>
        </Col>
      </Row>
      </Container>
    </Container>
  );
};

export default ThanksOrder;
