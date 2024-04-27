import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const CheckoutProcess = () => {
  const [addressButton, setAddressButton] = useState(false);
  const [PaymentMethod, setPaymentMethod] = useState(false);
  const [ItemsDelivery, setItemDelivery] = useState(false);
  return (
    <Container className="CheckoutProcess">
      <Row>
        <Col lg={8}>
          <h1 className="checktitle">Checkout</h1>
          <button
            type="button"
            className="CheckoutSubTitle"
            onClick={() => setAddressButton(!addressButton)}
          >
            1. Select a delivery address
          </button>
          {addressButton && <h1>delivery address</h1>}
          <button
            type="button"
            className="CheckoutSubTitle"
            onClick={() => setPaymentMethod(!PaymentMethod)}
          >
            2. Payment Method
          </button>
          {PaymentMethod && <h1>Payment</h1>}
          <button
            type="button"
            className="CheckoutSubTitle"
            onClick={() => setItemDelivery(!ItemsDelivery)}
          >
            3. Items and delivery
          </button>
          {ItemsDelivery && <h1>Payment</h1>}
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutProcess;
