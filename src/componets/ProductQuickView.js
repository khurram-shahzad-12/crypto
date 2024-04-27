import React, { useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import UseAddToCartHook from "./UseAddToCartHook";
import AddToCartAPI from "../componets/AddToCartAPI";

const ProductQuickView = ({ productModelData, show, setShow }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { cartClick, cartDetail, addToCart } = UseAddToCartHook();

  return (
    <div>
      <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        data-dismiss="modal"
        closeButton
        style={{ borderBottom: "none" }}
      ></Modal.Header>
      <Modal.Body className="productModel">
        <div className="outer-quick-prdct" style={{ marginTop: "-20px" }}>
          <div className="col-lg-6 col-12" style={{ margin: "16px" }}>
            <img
              src={productModelData.image}
              alt="Quick View"
              className="productModelImage"
            />
          </div>

          <div className="col-lg-5 col-12">
            <div className="modelName mb-2">{productModelData.name}</div>

            <div className="d-flex">
              <div className="redBox">
                <div className="percentOff">
                  {productModelData.percentage}% Off
                </div>
              </div>
              <div className="modelDisplayPrice">
                {productModelData.display_price}
              </div>

              <div className="oldPrice p-0">{productModelData.old_price}</div>
            </div>

            <NavLink
              to={`/details/${productModelData.url}/${productModelData.sku}`}
              className="seeAllFeatures"
            >
              See all features
            </NavLink>
            <div>
              <button type="button" className="modelAddtoCart" onClick={() => addToCart(productModelData.id)}>
                Add To Cart
              </button>
            </div>
            <div className="modeDetail">Details</div>
            {productModelData.small_desc_data.slice(0, 3).map((ele2, id) => (
              <Row className="DescriptionName" key={id}>
                <Col xs={5} md={2}>
                  {ele2.title}
                </Col>
                <Col xs={1}>:</Col>
                <Col xs={6} md={4}>
                  {ele2.value}
                </Col>
              </Row>
            ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
    {cartClick && <AddToCartAPI cartDetail={cartDetail} />}
    </div>
    
  );
};

export default ProductQuickView;
