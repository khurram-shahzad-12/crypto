import React, { useState, useEffect } from "react";
import CommonBreadCrumb from "../componets/CommonBreadCrumb";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { RxCrossCircled } from "react-icons/rx";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cancelled = ()=> {
    const { t } = useTranslation();
    
  const data = [{ slug: "Order Cancellation", link: "", url: "" }];
  let navigate = useNavigate();
  const [seconds, setSeconds] = useState(4);

  useEffect(() => {
    const timerId = setTimeout(() => {
      navigate("/my-orders");
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
          <div className="head">{t("cancelled.header")}</div>
          <RxCrossCircled color="red" size={40} className="tick" />
          {/* <div className="thanksInput text2">
            {t("your.orderis")} 
          </div> */}
          <div className="text2 mb-4">{t("thaks.sec")}</div>
          <div className="ProductDetail thankbutton">
            <NavLink t0="/" className="productAddToCart">
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
          {/* <div className="thanksInput text2">{slug}</div> */}
          <div className="ProductDetail thankbutton">
            <button type="button" className="productAddToCart" style={{height: 'fit-content'}}>
              {t("search.status")}
            </button>
          </div>
        </Col>
      </Row>
      </Container>
    </Container>
    )
}

export default Cancelled