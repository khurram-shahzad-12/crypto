import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { BsDash } from "react-icons/bs";
import { BeatLoader, ClipLoader } from "react-spinners";

import { useMediaQuery } from "react-responsive";

const LoadingCard = () => {
  return (
    <div className="product_card mb-3 placeholder">
      <div
        className="product_img"
        style={{
          background: "#D9D9D9",
          position: "relative",
          paddingTop: "120px",
          height: "232px",
        }}
      >
        <BeatLoader
          size={12}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      <div className="product_information">
        <div className="proDescripName" style={{ background: "#D9D9D9" }}></div>
        <div className="price">
          <div
            className="display_price"
            style={{ background: "#D9D9D9" }}
          ></div>
          <div className="old_price" style={{ background: "#D9D9D9" }}></div>
        </div>
        <div className="offer">
          <div></div>
        </div>
        <div className="add2cart">
          <div className="add2cart_btn">&nbsp;</div>
        </div>
      </div>
    </div>
  );
};

export const LoadingTopBrands = () => {
  const loadbrand = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <Container className="border m-2 p-2">
      <Row>
        {" "}
        {loadbrand.map((items, index) => {
          return (
            <Col key={index} lg={1} md={4} xs={3} className="d-flex">
              <button
                type="button"
                className="brandImage border-0"
                style={{
                  background: "#EBF8FF",
                  width: "50px",
                  height: "10px",
                }}
              ></button>
            </Col>
          );
        })}{" "}
      </Row>
    </Container>
  );
};

export const LoadingProducts = () => {
  const loadPages = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <Container>
      <Row className="customContainer">
        {" "}
        {loadPages.map((items, index) => {
          return (
            <Col key={index} xs={6} lg={3} md={6}>
              <div className="product_card mb-3 placeholder w-100">
                <div
                  className="product_img"
                  style={{
                    background: "#D9D9D9",
                    position: "relative",
                    paddingTop: "94px",
                  }}
                >
                  <ClipLoader
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
                <div className="product_information">
                  <div
                    className="proDescripName"
                    style={{ background: "#D9D9D9", textAlign: "center" }}
                  ></div>
                  <div className="price">
                    <div
                      className="display_price"
                      style={{ background: "#D9D9D9" }}
                    ></div>
                    <div className="old_price"></div>
                  </div>
                  <div className="offer">
                    <div></div>
                  </div>
                  <div className="">
                    <div className="">&nbsp;</div>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}{" "}
      </Row>
    </Container>
  );
};

const LoadingPosts = () => {
  const loadPages = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <Row>
      {" "}
      {loadPages.map((items, index) => {
        return (
          <Col key={index} xxl={3} xl={4} lg={6} md={4}>
            <LoadingCard />
          </Col>
        );
      })}{" "}
    </Row>
  );
};

const Filters = () => {
  return (
    <div className="filters_parent">
      <div className="filter_list">
        <div className="filter_title">
          <div></div>
          <div>
            {" "}
            <BsDash />
          </div>
        </div>

        <div className="filter_description">
          <div className="filter_description_list">
            <div className="mb-3">
              <div className="search_box">
                <input type="text" className="text_Search_box" />
              </div>
              <ul>
                <li>
                  <Form.Check inline />
                </li>
                <li>
                  <Form.Check inline />
                </li>
                <li>
                  <Form.Check inline />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="filter_title">
          <div></div>
          <div>
            {" "}
            <BsDash />
          </div>
        </div>
        <div className="filter_description">
          <div className="filter_description_list">
            <div className="mb-3">
              <div className="search_box">
                <input type="text" className="text_Search_box" />
              </div>
              <ul>
                <li>
                  <Form.Check inline />
                </li>
                <li>
                  <Form.Check inline />
                </li>
                <li>
                  <Form.Check inline />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="filter_title">
          <div></div>
          <div>
            {" "}
            <BsDash />
          </div>
        </div>
        <div className="filter_description">
          <div className="filter_description_list">
            <div className="mb-3">
              <div className="search_box">
                <input type="text" className="text_Search_box" />
              </div>
              <ul>
                <li>
                  <Form.Check inline />
                </li>
                <li>
                  <Form.Check inline />
                </li>
                <li>
                  <Form.Check inline />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="divider"></div>
      </div>
    </div>
  );
};

export const LoadingFilters = () => {
  return (
    <div className="customContainer">
      <Filters />
    </div>
  );
};

export const Loadingsearchproducts = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });
  return (
    <div>
      <Container fluid>
        <div className="customContainer paddingContainerFluid">
          <Row>
            <Col lg={12}></Col>
          </Row>
          <Row>
            <Col xxl={3} xl={3} lg={4}>
              {!isMobile && <Filters />}
            </Col>
            <Col xxl={9} xl={9} lg={8}>
              <LoadingPosts />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default LoadingPosts;
