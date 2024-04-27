import React, { useState } from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CommonSubHeading from "../../componets/CommonSubHeading";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useMediaQuery } from "react-responsive";
import AddToCartAPI from '../../componets/AddToCartAPI'
import UseAddToCartHook from "../../componets/UseAddToCartHook";
import {ThreeDots} from 'react-loader-spinner';


const TopPick = ({ data }) => {
  const { t } = useTranslation();
  const { cartClick, cartDetail, addToCart,setCartClick } = UseAddToCartHook();
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });

   // start add to cart button Spin
   const [isLoading, setIsLoading] = useState(false);
   const handleAddToCart = () => {
     setIsLoading(true);
     setTimeout(() => {
       setIsLoading(false);
     }, 1000);
   };
 
 // End add to cart button shake


  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
    },
    largeMobile: {
      breakpoint: { max: 768, min: 576 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      {data.length > 0 && (
        <Container
          className="maxWidthContainerFluid excitingSection top_pickup_section"
          fluid
        >
          <CommonSubHeading heading={t("home.topPicktitle")} title={true} />
          <div className="toppick_outer">
            <div className="toppick_inner">
              <Carousel
                fade
                responsive={responsive}
                transitionDuration={1000}
                customTransition="transform translate3d(-11016px, 0px, 0px) .6 ease-in-out"
                autoPlay={true}
                autoPlaySpeed={3000}
                infinite={true}
              >
                {data.map((each, i) => (
                  <div className="item row" key={i}>
                    <Col xs={12} lg={5} className={isMobile ? "mb-2" : ""}>
                      <NavLink
                        className="text-decoration-none"
                        to={`/brands/${each.url}`}
                      >
                        <img
                          src={each.image_slider}
                          alt=""
                          className="brand-des"
                        />
                      </NavLink>
                    </Col>
                    <Col xs={12} lg={7}>
                      <Row className="row-cols-md-4 row-cols-lg-4 ">
                        {each.productlist && each.productlist.length > 0 &&
                          each.productlist.map((data, e) => (
                            <div className="col-6 cardPadding1 sl-d" key={e}>
                              <Card className="commoncategoryItems topcard">
                                <NavLink
                                  className="text-decoration-none"
                                  to={`/details/${data.url}/${data.sku}`}
                                >
                                  <div
                                    className="commonCardimage toppickimage"
                                    style={{
                                      backgroundImage: `url(${data.image.replaceAll(
                                        " ",
                                        "%20"
                                      )})`
                                    }}
                                  ></div>
                                </NavLink>
                                  <div className="categoryContainers">
                                  <NavLink className="text-decoration-none" to={`/details/${data.url}/${data.sku}`}>
                                    <div className="categoryText text">
                                    {/* <div className="categoryText"> */}
                                      {data.name}
                                    </div>
                                    </NavLink>
                                    <div
                                      className="justify-content-between"
                                      style={{
                                        margin: "4px 0",
                                        display: `${isMobile ? "block" : "flex"
                                          }`,
                                      }}
                                    >
                                      <div className="displayPrice">
                                        AED <span style={{ fontSize: '18px' }}>{data.display_price.slice(4)}</span>
                                      </div>
                                      {/* <div className="previousPrice">
                                        {data.old_price}
                                      </div> */}
                                    </div>
                                    {data.percentage ? (
                                      <div className="dealPercentage">
                                        {data.percentage}% {t("global.off")}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    <div className="addToCartSection d-lg-none">
                                      <div className="yellowOutlineCard">
                                        <div className="btn add-to-cart mt-2 w-100" onClick={() => addToCart(data.id)}>
                                          {t("global.addCart")}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                
                                <div className="AddToCartHover d-none d-lg-block">
                                  <div 
                                    className="AddToCartButton"
                                    onClick={() => {
                                      addToCart(data.id);
                                      handleAddToCart(); // Call the custom function on button click
                                    }}
                                    style={{
                                      textDecoration: "none",
                                      color: "#ffffff",
                                      textTransform: "uppercase",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <div style={{ display:'flex', justifyContent: 'center', alignItems: 'center' }}>
                                      {isLoading ? (
                                        <ThreeDots type="ThreeDots" color="#00BFFF" height={44} width={40} />
                                      ) : (
                                        
                                        <div>{t("global.addCart")}</div>
                                      )}
                                    </div>

                                  </div>
                                </div>

                                
                              </Card>
                            </div>
                          ))}
                      </Row>
                    </Col>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </Container>
      )}
      {cartClick && <AddToCartAPI cartDetail={cartDetail} setCartClick={setCartClick} cartClick={cartClick}/>}

    </>
  );
};

export default TopPick;
