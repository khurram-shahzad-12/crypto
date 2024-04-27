import React from "react";
import { Container, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";

const DealToDealBanner = ({ renderMobImg, renderImg, url }) => {
 const isMobile = useMediaQuery({ query: `(max-width: 992px)` });

  return (
    <NavLink to={url}>
      <Container className="maxWidthContainerFluid paddingContainerFluid" fluid>
        <Row className="Big_bnrs">
          {isMobile ? (
            <img
              className="bnr_img b-curve"
              alt="banner"
              src={`https://ourshopee.com/images/${renderMobImg}`}
            />
          ) : (
            <img
              className="bnr_img b-curve"
              alt="banner"
              src={`https://ourshopee.com/images/${renderImg}`}
            />
          )}
        </Row>
      </Container>
    </NavLink>
  );
};


export default DealToDealBanner;