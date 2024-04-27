import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaSuitcase } from "react-icons/fa";
import { BiAt } from "react-icons/bi";
import { BsCreditCard } from "react-icons/bs";
import { FiTruck } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";

const TabbyPlan = () => {
  const LaptopOrMobile = useMediaQuery({ query: `(max-width: 575px)` });
  return (
    <>
      <Container className="TabbyPlan maxWidthContainerFluid" fluid>
        <div>
          <img
            className="bluebanner"
            src="Assets/shopnowimg.webp"
            alt="Banner"
          />
        </div>
        <Row className="rowparagraph mt-5">
          <Col lg={6} className="d-flex">
            <div className="collumright">
              <h2>Am I Eligible?</h2>
              <h5>Yes, if you…</h5>
              <ul style={{ listStyleType: "circle" }}>
                <li>are 18+ years old</li>
                <li>have a valid debit or credit card</li>
                <li>are resident in the United Arab Emirates</li>
              </ul>
              <h5>and just FYI…</h5>
              <ul style={{ listStyleType: "circle" }}>
                <li>
                  Tabby easy installment plan is valid for all electronics
                  category products value up to 1500 AED and Non-electronics
                  category products value up to 2500 AED.
                </li>
                <li>
                  Your payment instalments are automatic, although a small late
                  fee applies if you fail to make a payment on time.
                </li>
                <li>
                  If you need to make a return, you are to do so through
                  Ourshopee as you normally would. Once the refund is confirmed,
                  your payments will be refunded back to you.
                </li>
              </ul>
            </div>
          </Col>

          <Col lg={6} sm={12} md={12} xs={12} className="d-flex">
            {/* <div > */}
            <div className="collumright">
              <h1 className="buynowpay">Buy Now Pay Later</h1>
              <ul style={{ paddingLeft: "1%" }}>
                <li>
                  {" "}
                  <FaSuitcase className="iconsmall" /> Select everything you
                  love at Ourshopee
                </li>

                <li>
                  <img
                    className="iconsmall"
                    src="Assets/tabbysmallimg.webp"
                    style={{ width: "10%" }}
                    alt="tabby"
                  />{" "}
                  For EMI Plans, please choose Tabby as your payment method at
                  checkout
                </li>

                <li>
                  <BiAt className="iconsmall" />
                  <strong>Sign up</strong> Sign up with just your{" "}
                  <strong>email and mobile number</strong>(approval is instant!)
                </li>

                <li>
                  <FiTruck className="iconsmall" /> Ourshopee will ship out your
                  order right away
                </li>

                <li>
                  <BsCreditCard className="iconsmall" />
                  <strong> Pay only 40% today</strong>Pay only 40% today and the
                  rest over equal, automatic instalments
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <div className="plan">
          <h1 className="EasyInstalment">Easy Instalment Plan</h1>
          <p className="convenience">
            {" "}
            <strong>"</strong> OurShopee.com at your convenience. Pay the easy
            way with our Buy now pay later or shop now pay later.You can buy
            your desired product with no wait. No Credit Card needed. You can
            place order using your debit card with 0% interest rate & Get your
            product without any burden on your pocket. <strong>"</strong>
          </p>
        </div>
        <Row className="worth mt-5">
          <Col lg={3} sm={12} md={12} xs={12}>
            <div>
              <h1 className="onedot">1.</h1>
              <h3 className="Ifyoudesired">
                If you desired product is worth 200AED or above, you will see
                installement eligibility message.
              </h3>
            </div>
          </Col>
          <Col lg={9} sm={12} md={12} xs={12}>
            <img
              className="ourshopeedetailsimg"
              src={
                LaptopOrMobile
                  ? "Assets/detailsmobimg.webp"
                  : "Assets/ourshopeedetailsimg.webp"
              }
              alt="Details"
            />
          </Col>
        </Row>

        <Row className="worth mt-5">
          <Col
            className="col order-lg-last order-md-first"
            lg={3}
            sm={12}
            md={12}
            xs={12}
          >
            <div>
              <h1 className="twodot">2.</h1>
              <h3 className="Ifyoudesired">
                If your cart is worth 200AED or above by selecting multiple
                items, you will see the options to convert them into
                installement.
              </h3>
            </div>
          </Col>
          <Col
            lg={9}
            sm={12}
            md={12}
            xs={12}
            className="order-lg-first order-md-last"
          >
            <img
              className="ourshopeedetailsimg"
              src={
                LaptopOrMobile
                  ? "Assets/Tabbymobimg.webp"
                  : " Assets/Tabbycheckoutimg.webp"
              }
              alt="Tabbymobimg"
            />
          </Col>
        </Row>

        <Row className="worth mt-5">
          <Col lg={3} sm={12} md={12} xs={12}>
            <div>
              <h1 className="onedot">3.</h1>
              <h3 className="Ifyoudesired">
                <strong>Shop Now Pay Later</strong> There will be Shop Now pay
                Later option, select the option and you will be redirected on
                the payment plan option page. You have to register yourself on
                that page.
              </h3>
            </div>
          </Col>
          <Col lg={9} sm={12} md={12} xs={12}>
            <img
              className="ourshopeedetailsimg"
              src={
                LaptopOrMobile
                  ? "Assets/paymobimg.webp"
                  : "Assets/Tabbypayimg.webp"
              }
              alt="paymobimg"
            />
          </Col>
        </Row>

        <Row className="worth mt-5">
          <Col
            className="col order-lg-last order-md-first"
            lg={3}
            sm={12}
            md={12}
            xs={12}
          >
            <div>
              <h1 className="twodot">4.</h1>
              <h3 className="Ifyoudesired">Confirm your Phone Number.</h3>
            </div>
          </Col>
          <Col
            lg={9}
            sm={12}
            md={12}
            xs={12}
            className="order-lg-first order-md-last"
          >
            <img
              className="ourshopeedetailsimg"
              src={
                LaptopOrMobile
                  ? "Assets/varificationmobimg.webp"
                  : "Assets/Tabbyvarificationimg.webp"
              }
              alt="varificationmobimg"
            />
          </Col>
        </Row>

        <Row className="worth mt-5">
          <Col lg={3} sm={12} md={12} xs={12}>
            <div>
              <h1 className="onedot">5.</h1>
              <h3 className="Ifyoudesired">Upload your Emirates ID.</h3>
            </div>
          </Col>
          <Col lg={9} sm={12} md={12} xs={12}>
            <img
              className="ourshopeedetailsimg"
              src={
                LaptopOrMobile
                  ? "Assets/emiratesidmobimg.webp"
                  : "Assets/Tabbyuploadimg.webp"
              }
              alt="Emiratesidmobimg"
            />
          </Col>
        </Row>

        <Row className="worth mt-5">
          <Col
            className="col order-lg-last order-md-first"
            lg={3}
            sm={12}
            md={12}
            xs={12}
          >
            <div>
              <h1 className="twodot">6.</h1>
              <h3 className="Ifyoudesired">Confirm your Phone Number.</h3>
            </div>
          </Col>
          <Col
            lg={9}
            sm={12}
            md={12}
            xs={12}
            className="order-lg-first order-md-last"
          >
            <img
              className="ourshopeedetailsimg"
              src={
                LaptopOrMobile
                  ? "Assets/customermobimg.webp"
                  : "Assets/Tabbydetailsimg.webp"
              }
              alt="Customermobimg"
            />
          </Col>
        </Row>

        <Row className="worth mt-5">
          <Col lg={3} sm={12} md={12} xs={12}>
            <div>
              <h1 className="onedot">7.</h1>
              <h3 className="Ifyoudesired">
                Fill in your Debit or Credit details.
              </h3>
            </div>
          </Col>
          <Col lg={9} sm={12} md={12} xs={12}>
            <img
              className="ourshopeedetailsimg"
              src={
                LaptopOrMobile
                  ? "Assets/paymentmobimg.webp"
                  : "Assets/Tabbypaymentimg.webp"
              }
              alt="Paymentmobimg"
            />
          </Col>
        </Row>

        <Row className="worth mt-5">
          <Col
            className="col order-lg-last order-md-first"
            lg={3}
            sm={12}
            md={12}
            xs={12}
          >
            <div>
              <h1 className="twodot">8.</h1>
              <h3 className="Ifyoudesired">
                Once the details are submitted and approved, you will be
                redirected to the Order confirmed page.
              </h3>
            </div>
          </Col>
          <Col
            lg={9}
            sm={12}
            md={12}
            xs={12}
            className="order-lg-first order-md-last"
          >
            <img
              className="ourshopeedetailsimg"
              src={
                LaptopOrMobile
                  ? "Assets/successmobimg.webp"
                  : "Assets/paymentsuccessimg.webp"
              }
              alt="Successmobimg"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TabbyPlan;
