import React from "react";
import Carousel from "react-multi-carousel";
import { Row, Col, Card } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import { NavLink } from "react-router-dom";
import CommonCard from "../../componets/CommonCard";

const RelatedProducts = ({ relatedProducts, recentData }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1192 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 1191, min: 992 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 991, min: 768 },
      items: 4,
      partialVisibilityGutter: 10,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 2,
      partialVisibilityGutter: 10,
    },
  };

  return (
    <div className="relatedProducts">
      <Carousel responsive={responsive} partialVisible={true}>
        {relatedProducts.map((ele4, id) => (
          <CommonCard data={ele4} key={id} />
        ))}
      </Carousel>
    </div>
  );
};

export const ReleatedCard = ({ relatedProducts, recentData }) => {
  return (
    <Row className="relatedProducts">
      {relatedProducts.map((ele4, id) => (
        <Col xs={6} lg={4} key={id}>
          <NavLink
            style={{ textDecoration: "none" }}
            to={`/details/${ele4.url}/${ele4.sku}`}
          >
            <Card className={recentData ? "recentlyProduct" : "relatedProduct"}>
              {ele4.image !== undefined ? (
                <div
                  className="relatedImage"
                  style={{ backgroundImage: `url(${ele4.image})` }}
                ></div>
              ) : (
                <div
                  className="relatedImage"
                  style={{
                    backgroundImage: `url(${"/Assets/images1111.png"})`,
                  }}
                ></div>
              )}
              <div className="realtedName">{ele4.name}</div>
              <div className="relatedPrice">
                {ele4.currency_type} {ele4.display_price}
              </div>
              {recentData && (
                <>
                  <div className="d-md-flex">
                    <div className="relatedPrice">{ele4.display_price}</div>
                    <div className="oldPrice mx-md-3 pt-md-1">
                      {ele4.old_price}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btnColor btn btn-outline-warning"
                  >
                    Add to Cart
                  </button>
                </>
              )}
            </Card>
          </NavLink>
        </Col>
      ))}
    </Row>
  );
};

export default RelatedProducts;
