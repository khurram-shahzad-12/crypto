import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import Countdown, { zeroPad } from "react-countdown";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";
import UseAddToCartHook from "./UseAddToCartHook";
import AddToCartAPI from "./AddToCartAPI";

const YellowOutlineCard = ({ data, border, color, type }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });


  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <span>
          {zeroPad(hours)} Hrs: {zeroPad(minutes)} Min: {zeroPad(seconds)} Sec
        </span>
      );
    } else {
      // Render a countdown
      return (
        <span>
          {zeroPad(hours)} Hrs: {zeroPad(minutes)} Min: {zeroPad(seconds)} Sec
        </span>
      );
    }
  };

  const { cartClick, cartDetail,setCartClick, addToCart } = UseAddToCartHook();

  return (
    <>
      <Row className="yellowOutlineCard">
        {data.map((each, i) => (
          <Col
            xs={6}
            sm={6}
            md={6}
            lg={3}
            key={i}
            className="columnYellow mb-2"
          >
            <Card style={{ width: "100%", border: `${border}` }}>
              <NavLink
                className="subCategoryLink"
                to={`/details/${each.url}/${each.sku}`}
              >
                {each.image !== "" ? <img src={each.image} alt="" /> :
                  <div className="dummy-image"></div>}
                {each.countdown !== undefined &&
                  each.countdown !== "" &&
                  each.countdown !== "Invalid date" && (
                    <div className="countDownSimplify">
                      <Countdown
                        className="countdown"
                        date={each.countdown}
                        renderer={renderer}
                      />
                    </div>
                  )}
                <div className="productName">
                  <span>{each.name}</span>
                </div>
                {each.display_price !== undefined && (
                  <div className="hotPrice">
                    <span>{each.display_price}</span>
                  </div>
                )}
              </NavLink>

              <div
                className="addToCartSection"
                style={{
                  display: `${isMobile ? "" : "flex"}`,
                  gap: `${isMobile ? "" : "12px"}`,
                }}
              >
                <div
                  className="btn add-to-cart"
                  onClick={() => addToCart(each.id)}
                  style={{
                    width: `${isMobile ? "100%" : "52%"}`,
                    marginBottom: `${isMobile ? "10px" : ""}`,
                  }}
                >
                  {t("global.addCart")}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      {cartClick && <AddToCartAPI cartDetail={cartDetail} cartClick={cartClick} setCartClick={setCartClick} />}
    </>
  );
};

export default YellowOutlineCard;
