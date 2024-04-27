import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Banner = ({ bannerList }) => {
  return (
    <Container
      className="banner_list maxWidthContainerFluid paddingContainerFluid"
      fluid
    >
      <Row>
        {bannerList !== undefined &&
          bannerList.map((each, i) => (
            <Col xs={6} lg={3} className="banner_column" key={i}>
              <Card>
                <NavLink to={each.url} className="text-decoration-none">
                  <Card.Img
                    variant="top"
                    src={each.banner_image}
                    //className="banner"
                  />
                </NavLink>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Banner;
