import React from "react";
import { Card, Row, Container } from "react-bootstrap";
const BundleDeals = ({ dealOfTheDay }) => {
  return (
    <Container>
      <Row>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <img src={"Assets/image_bundle.png"} alt="" />
            <Card.Title>Card Title</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default BundleDeals;
