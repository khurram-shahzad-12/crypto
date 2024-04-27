import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Card, Row, Col } from "react-bootstrap";
import Countdown from "react-countdown";
import { NavLink } from "react-router-dom";
import CardPlaceholder from "../views/Home/CardPlaceholder";

const HomeDealBundelClearnce = (dataArray) => {
  const data = [1, 2, 3, 4];
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1192 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1191, min: 992 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 991, min: 768 },
      items: 2,
      partialVisibilityGutter: 350,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
      partialVisibilityGutter: 200,
    },
  };

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span></span>;
    } else {
      // Render a countdown
      return (
        <span>
          {days}:{minutes}:{seconds}
        </span>
      );
    }
  };

  var redirectUrl = "";
  if (dataArray.heading === "Deal Of The Day") {
    redirectUrl = "/deals-of-the-day";
  } else if (dataArray.heading === "Bundle Deals") {
    redirectUrl = "/shopee-bundle-deals";
  } else if (dataArray.heading === "Clearance Sale") {
    redirectUrl = "/clearance";
  }

  return (
    <>
      <Container
        className="HomeDealBundelClearnce maxWidthContainerFluid paddingContainerFluid"
        style={{ marginTop: "48px" }}
        fluid
      >
        <div className="paragraph" style={{ paddingBottom: "16px" }}>
          <span className="text_title">{dataArray.heading}</span>
          <NavLink to={redirectUrl} style={{ textDecoration: "none" }}>
            <span className="view_all">View All</span>
          </NavLink>
        </div>
        <Carousel
          responsive={responsive}
          itemClass="carousel-item-padding-40-px"
        >
          {dataArray.dataArray.length > 0
            ? dataArray.dataArray.map((each, i) => (
                <NavLink
                  key={each.id}
                  className="text-decoration-none"
                  to={`/details/${each.url}`}
                >
                  <Card
                    style={{
                      backgroundColor: `${
                        dataArray.backgroundColorArray[i.toString().slice(-1)]
                      }`,
                      padding: "16px",
                      border: "none",
                    }}
                  >
                    <Row
                      className={`${
                        dataArray.heading === "Clearance Sale"
                          ? "dealOfDay flex-row-reverse"
                          : "dealOfDay flex-row"
                      }`}
                    >
                      <Col
                        lg={6}
                        md={6}
                        sm={6}
                        xs={6}
                        style={{ borderRadius: "6px" }}
                      >
                        <div
                          className="dealImage"
                          style={{
                            backgroundImage: `url(${each.image.replaceAll(
                              " ",
                              "%20"
                            )})`,
                          }}
                        >
                        </div>
                      </Col>
                      <Col lg={6} md={6} sm={6} xs={6}>
                        <div>
                          {dataArray.heading === "Deal Of The Day" && (
                            <div className="dealWatchCountdown">
                              <img src="/Assets/schedule.svg" alt="schedule" />
                              <Countdown
                                className="dealCountdown"
                                date={each.countdown}
                                renderer={renderer}
                              />
                            </div>
                          )}
                          <div className="SellPrice">
                            <span
                              className="dealPrice"
                              style={{
                                color: `${
                                  dataArray.priceColor[i.toString().slice(-1)]
                                }`,
                              }}
                            >
                              {each.display_price}
                            </span>
                          </div>
                          <div className="oldPrice">
                            <span>{each.old_price}</span>
                          </div>
                          <div className="dealPercentage">
                            <span>{each.percentage}% Off</span>
                          </div>
                          <div className="dealText">
                            <span className="dealText1">{each.name}</span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </NavLink>
              ))
            : data.map((each, i) => <CardPlaceholder key={i} />)}
        </Carousel>
      </Container>
    </>
  );
};

export default HomeDealBundelClearnce;
