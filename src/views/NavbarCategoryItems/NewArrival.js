import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const NewArrival = ({ sortByFunction }) => {
  const { t } = useTranslation();
  const [newArrival, setNewArrival] = useState(true);
  const [lowToHigh, setLowToHigh] = useState(false);
  const [highToLow, setHighToLow] = useState(false);
  const [poisition, setPosition] = useState(false);

  const handelNew = (e) => {
    sortByFunction("");
    setNewArrival(true);
    setLowToHigh(false);
    setHighToLow(false);
    setPosition(false);
  };

  const handelLowToHigh = (e) => {
    sortByFunction(e);
    setNewArrival(false);
    setLowToHigh(true);
    setHighToLow(false);
    setPosition(false);
  };

  const handelHighToLow = (e) => {
    sortByFunction(e);
    setNewArrival(false);
    setLowToHigh(false);
    setHighToLow(true);
    setPosition(false);
  };

  const handelPosition = (e) => {
    sortByFunction(e);
    setNewArrival(false);
    setLowToHigh(false);
    setHighToLow(false);
    setPosition(true);
  };
  return (
    <Container>
      <Row>
        <Col md={2} className="d-none d-md-block">
          <h6 className="sortbyTitle">{t("subCategory.sort")}</h6>
        </Col>
        <Col xs={6} md={2} className="arrivals newarrivals">
          <button
            type="button"
            style={{
              color: `${newArrival ? "#0D69E0" : "#4F4F4F"}`,
            }}
            onClick={(e) => handelNew("new arrival")}
            className="border-0 kk sortByButton"
          >
            {t("subCategory.newArrival")}
          </button>
        </Col>
        <Col xs={6} md={3} className="arrivals highPrice">
          <button
            type="button"
            style={{
              color: `${lowToHigh ? "#0D69E0" : "#4F4F4F"}`,
            }}
            onClick={(e) => handelLowToHigh("Low to High")}
            className="border-0 sortByButton"
          >
            {t("subCategory.LTHprice")}
          </button>
        </Col>

        <Col xs={6} md={3} className="arrivals LowPrice">
          <button
            type="button"
            style={{
              color: `${highToLow ? "#0D69E0" : "#4F4F4F"}`,
            }}
            onClick={(e) => handelHighToLow("High to Low")}
            className="border-0 sortByButton"
          >
            {t("subCategory.HTLprice")}
          </button>
        </Col>
        <Col xs={6} md={2} className="arrivals Position">
          <button
            type="button"
            style={{
              color: `${poisition ? "#0D69E0" : "#4F4F4F"}`,
            }}
            onClick={(e) => handelPosition("Position")}
            className="border-0 sortByButton"
          >
            {t("subCategory.position")}
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default NewArrival;
