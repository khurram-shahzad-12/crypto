import React from "react";
import "react-multi-carousel/lib/styles.css";
import { Card, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Carousel from "react-multi-carousel";

const TechManiaBrands = ({ data }) => {
  const isMobile = useMediaQuery({ query: `(max-width: 991px)` });

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };


  return (
    <>
    {!isMobile ? 
      <div className="brandLogos justify-content-center">
        <Row>
          {data.map((each, i) => (
            <Col md={2} lg={2} sm={3} key={i} className="mb-4">
              <Card
                key={{ i }}
                style={{ border: "1px solid #c0c0c0", background: "#f0f0f0" }}
              >
                <NavLink className="" to={`${each.url}`}>
                  <img
                    src={each.desktopImage}
                    alt="CommonTopBrands"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "/Assets/images1111.png";
                    }}
                  />
                </NavLink>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      :
      <Carousel
      arrows={false}
      responsive={responsive}
      >
        {data.map((each, i) => (
          <Card key={i} className=" text-center">
            <NavLink
              className="subCategoryLink"
              to={`${each.url}`}
              
            >
              <img
                src={each.desktopImage}
                alt="CommonTopBrands"
                style={{ width: "90%" }}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "/Assets/images1111.png";
                }}
              />
            
            </NavLink>
          </Card>
        ))}
      </Carousel>
      }
    </>
  );
};

export default TechManiaBrands;
