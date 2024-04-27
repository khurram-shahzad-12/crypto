import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CommonBreadCrumb from "../componets/CommonBreadCrumb";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  const data = [{ slug: "Page not found", link: "", url: "" }];
  return (
    <section
      className="noresult-found no_result_class"
      style={{ textAlign: "center" }}
    >
      <Container fluid className="maxWidthContainerFluid paddingContainerFluid">
        <Container fluid className="maxWidthContainerFluid">
          <CommonBreadCrumb data={data} />
        </Container>
        <Row>
          <Col>
            <div className="mt-3 noresult-inner">
              <img
                src="https://www.ourshopee.com/images/404_error.gif"
                alt="OurShopee.com"
              />
              <p className="no_result_msg">
                {" "}
                Oops!! No result found this search{" "}
              </p>

              <NavLink to="/" className="button-link">
                Continue Shopping
              </NavLink>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NotFound;
