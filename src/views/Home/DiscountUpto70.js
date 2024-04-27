import React from "react";
import { Container, Card } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const DiscountUpto70 = ({ data }) => {
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });

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
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 2,
      partialVisibilityGutter: 10,
    },
  };
  return (
    <>
      {data.length > 0 &&
        data.map((each, i) => (
          <Container
            className="maxWidthContainerFluid excitingSection "
            key={i}
            fluid
          >
            <div
              className={
                isMobile ? "divSmallTitle pb-3" : "divMediumTitle pb-3"
              }
            >
              {` ${each.category_name}`}
            </div>

            <div className="discount70">
              <Carousel responsive={responsive} partialVisible={true}>
                {each.subcategory.map((item, e) => (
                  <Card key={e} className="discountCard">
                    <NavLink
                      to={`/products-category/${item.url}`}
                      className="text-decoration-none"
                    >
                      <img
                        className=""
                        width="100%"
                        src={item.sub_category_image}
                        alt={item.sub_category_name}
                      />
                      <div className="itemname">{item.sub_category_name}</div>
                    </NavLink>
                  </Card>
                ))}
              </Carousel>
            </div>
          </Container>
        ))}
    </>
  );
};

export default DiscountUpto70;
