import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DealDaySaver from "./DealDaySaver";
import { useTranslation } from "react-i18next";
import { DealSaverData } from "./Home";

const DuoSection = () => {
  const { t } = useTranslation();
  const { dealData, saverData } = useContext(DealSaverData);
 
  return (
    <Container className="maxWidthContainerFluid duoSection" fluid>
      <Row>
        {/* <Col md={12} lg={6}> */}
        <div className="col-md-12 col-lg-6">
          <DealDaySaver
            data={dealData}
            heading={t("navigation.deal")}
            background="#D7D7FF"
            setWidth={true}
            redirect = "/deals-of-the-day"
          />
          </div>
       {/*  </Col> */}
       {/*  <Col md={12} lg={6}> */}
        <div className="col-md-12 col-lg-6" >
          <DealDaySaver
            redirect = "/saver-zone"
            data={saverData}
            heading={t("navigation.saverZone")}
            background="#fde2d1"
            setWidth={true}
          />
        </div>
        {/* </Col> */}
      </Row>
    </Container>
  );
};

export default DuoSection;
