import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import Countdown, { zeroPad } from "react-countdown";
import { HiOutlineClock } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const CommonHorizontalCard = ({
  data,
  color,
  buttonColor,
  setWidth,
  backwhite,
  countdownStyle,
  setPadding,
}) => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <span>
          {zeroPad(days)}: {zeroPad(minutes)}: {zeroPad(seconds)}
        </span>
      );
    } else {
      // Render a countdown
      return (
        <span>
          {zeroPad(days)}: {zeroPad(minutes)}: {zeroPad(seconds)}
        </span>
      );
    }
  };

  return (
    <NavLink to={`/details/${data.url}`}>
      <Card
        className="border-0 horizontalCard"
        style={{
          background: `${color}`,
          // padding: `${setWidth === true ? "1px" : "horizontalCard"}`,
          width: `${setWidth === true ? "98%" : "92%"}`,
          marginBottom: `${setWidth === false ? "8px" : "8px"}`,
        }}
      >
        <Row>
          <Col
            xs={6} md={6}
            style={{ borderRadius: "6px" }}
            className={`${backwhite === true ? "order-1" : "order-2"}`}
          >
            <div
              className="cardImage"
              style={{
                backgroundImage: `url(${data.image.replaceAll(" ", "%20")} )`,
                padding: "2px",
              }}
            ></div>
          </Col>
          <Col
            xs={6} md={6} /* style={{padding: '0px'}} */
            className={`${backwhite === true ? "order-2" : "order-1"}`}
          >
            <div className="cardData">
              {data.countdown !== undefined &&
                data.countdown !== "" &&
                data.countdown !== "Invalid date" && (
                  <div
                    className="orange_box d-flex gap-1"
                    style={{
                      background: `${countdownStyle.background}`,
                      color: `${countdownStyle.color}`,
                      /* padding: `${setPadding}`, */
                    }}
                  >
                    <HiOutlineClock size={18} className="d-none d-lg-block" />
                    <Countdown
                      className="countdown"
                      date={data.countdown}
                      renderer={renderer}
                    />
                  </div>
                )}
              <div className="SellPrice" style={{ color: `${buttonColor}` }}>
                {data.display_price.slice(0,4)}<span /* style={{fontSize: '18px'}} */>{data.display_price.slice(3, (data.display_price.length))}</span>
              </div>
              <div className="oldPrice" style={{ color: `${buttonColor}` }}>
                {data.old_price}
              </div>
              <div className="descrip" style={{height: '35px'}}>{data.name}</div>
              <div
                className="discountPercent pt-2"
                style={{ color: `${buttonColor}` }}
              >
                {data.percentage}% Off
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </NavLink>
  );
};

export default CommonHorizontalCard;
