import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Multibanners = ({ multibanners }) => {
  return (
    <Container fluid className="maxWidthContainerFluid paddingContainerFluid">
      <Row className="Section_img" gap="4px">
        {multibanners.length > 0 &&
          multibanners.map((element) => (
            <Col key={element.banner_id} md={6}>
              <NavLink to={element.url}>
                <Card.Img
                  className="multibanners"
                  src={element.banner_image}
                  alt="multibanners"
                />
              </NavLink>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Multibanners;
