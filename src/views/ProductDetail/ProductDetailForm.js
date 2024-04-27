import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useParams, NavLink } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import { useTranslation } from "react-i18next";
import Cookies from "universal-cookie";
import call_apis from "../../services/Apis";
import { VscTriangleDown } from "react-icons/vsc";

const ProductDetail = () => {
  const [from, setForm] = useState({});
  const { slug, slug1 } = useParams();
  const { t } = useTranslation();
  const [carouselImage, setCarouselImage] = useState(0);

  const cookies = new Cookies();

  const updateCookies = () => {

    if (cookies.get("sku") === undefined) {
      cookies.set("sku", [slug1], { maxAge: 30 * 24 * 60 * 60, path: "/" });
    }
    if (cookies.get("sku") !== undefined) {
      if (cookies.get("sku").includes(slug1) === false) {
        cookies.set("sku", [...cookies.get("sku"), slug1], {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
      } else {
        const data = cookies.get("sku");
        data.push(data.splice(data.indexOf(slug1), 1).pop());
        cookies.set("sku", data, { maxAge: 30 * 24 * 60 * 60, path: "/" });
      }
    }
  };


  const getProductDatas = async () => {
    const response = await call_apis.getProductData(slug1);
    setForm(response.data.data.product[0]);

    getProductDetailData(
      response.data.data.product[0].sku,
      response.data.data.product[0].brand_id,
      response.data.data.product[0].subcategory_id
    );
  };

  useEffect(() => {
    updateCookies();
    setForm([]);
    setCarouselImage(0);
    getProductDatas();
  }, [slug1]);

  const getProductDetailData = async (sku, brandId, subcategoryId) => {
    const data = {
      brand_id: brandId,
      subcategory_id: subcategoryId,
      sku: sku,
      skulist: cookies.get("sku").slice(-6),
    };
    const response = await call_apis.postProductData(data);
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: {
        max: 4000,
        min: 1192,
      },
      items: 4,
      partialVisibilityGutter: 10,
    },
    desktop: {
      breakpoint: {
        max: 1191,
        min: 992,
      },
      items: 4,
      partialVisibilityGutter: 10,
    },
    tablet: {
      breakpoint: {
        max: 991,
        min: 768,
      },
      items: 4,
      partialVisibilityGutter: 10,
    },
    mobile: {
      breakpoint: {
        max: 767,
        min: 321,
      },
      items: 3,
      partialVisibilityGutter: 10,
    },
    shortMobile: {
      breakpoint: {
        max: 320,
        min: 0,
      },
      items: 2,
      partialVisibilityGutter: 40,
    },
  };

  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  // eslint-disable-next-line no-unused-vars
  const ButtonGroup = ({ next, previous, ...rest }) => {
    const {
      carouselState: { currentSlide, totalItems, slidesToShow },
    } = rest;

    return (
      <div className="carousel-button-group">
        <button
          aria-label="Go to previous slide"
          className={
            currentSlide === 1
              ? "react-multiple-carousel__arrow react-multiple-carousel__arrow--left"
              : "react-multiple-carousel__arrow react-multiple-carousel__arrow--left"
          }
          onClick={() => previous()}
        ></button>
        <button
          aria-label="Go to next slide"
          className={
            currentSlide === totalItems - slidesToShow
              ? "react-multiple-carousel__arrow react-multiple-carousel__arrow--right"
              : "react-multiple-carousel__arrow react-multiple-carousel__arrow--right"
          }
          onClick={() => next()}
        ></button>
      </div>
    );
  };

  const html = Object.keys(from).length > 0 && decodeHtml(from.details);

  const handelImage = (e, id) => {
    setCarouselImage(id);
  };



  return (
    <>
    <Container fluid className="ProductDetail maxWidthContainerFluid">
        <Container
              fluid
              className="maxWidthContainerFluid paddingContainerFluid ThanksOrder"
            >
              <Row>
                <Col lg={4} sm={12} className="mt-4">
                  <Row>

                    <Col md={12} lg={12} style={{ position: "relative" }}>
                      {
                        carouselImage == -1 ?
                          <div className="video-responsive">
                            <iframe
                              width="400"
                              height="400"
                              src={from.video_link}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title="Embedded youtube"
                            />
                          </div> :
                          <>
                            <ReactImageMagnify
                              {...{
                                smallImage: {
                                  isFluidWidth: true,
                                  src:
                                    from.images.length > 0
                                      ? from.images[carouselImage]
                                      : from.image,
                                  width: 400,
                                  height: 'auto',
                                },
                                largeImage: {
                                  src:
                                    from.images.length > 0
                                      ? from.images[carouselImage]
                                      : from.image,
                                  width: 900,
                                  height: 900,
                                },
                              }}
                            />
                            {
                              from.stock == 'Out of stock'
                              &&
                              <img
                                src="/Assets/soldouta.webp"
                                alt="shop now"
                                className="soldout"
                              />
                            }

                          </>

                      }
                      <div style={{ top: "0px", position: "absolute" }}>
                        <div className="percentage">
                          <strong>{from.percentage}</strong>
                          <span className="percentageOff"> % OFF</span>
                        </div>
                        <VscTriangleDown size={50} className="percentageImage" />
                      </div>
                    </Col>
                    {from.video_link != '' &&
                      <Col md={2} lg={2} sm={2} xs={2} className="video-margin">

                        <div className="video-seperate">

                          <a onClick={(e) => handelImage(null, -1)} ><img className="product-v-img video-thumb" src={from.images[0]} alt="" />

                            <div className="overlayvideo" id="videocode" style={{
                              border: `${carouselImage === -1
                                ? "2px solid #0D69E0"
                                : ""
                                }`,
                            }}> <img src="https://www.ourshopee.com/images/play.svg" className="playbutton" alt="" /> </div>

                          </a>

                        </div>

                      </Col>
                    }
                    {from.video_link != '' ?
                      <Col md={10} lg={10} sm={10} xs={10}>
                        {from.images.length > 0 && (
                          <Carousel
                            responsive={responsive}
                            arrows={false}
                            infinite={true}
                            focusOnSelect={true}
                            swipeable={true}
                            centerMode={true}
                            containerClass="carousel-container"
                            autoPlaySpeed={1000}
                            partialVisible={false}
                            renderButtonGroupOutside
                          >

                            {from.images.map((each, id) => (
                              <button
                                type="button"
                                style={{
                                  border: `${carouselImage === id
                                    ? "2px solid #0D69E0"
                                    : ""
                                    }`,
                                }}
                                key={id}
                                defaultValue={each}
                                onClick={(e) => handelImage(e, id)}
                                className="ButtonGroup"
                              >
                                <img
                                  src={each}
                                  alt="product"
                                  className="carouselImage"
                                />
                              </button>
                            ))}
                          </Carousel>
                        )}
                      </Col>

                      :
                      <Col md={12} lg={12} sm={12} xs={12}>
                        {from.images.length > 0 && (
                          <Carousel
                            responsive={responsive}
                            arrows={false}
                            infinite={true}
                            focusOnSelect={true}
                            swipeable={true}
                            centerMode={true}
                            containerClass="carousel-container"
                            autoPlaySpeed={1000}
                            partialVisible={false}
                            renderButtonGroupOutside
                          >

                            {from.images.map((each, id) => (
                              <button
                                type="button"
                                style={{
                                  border: `${carouselImage === id
                                    ? "2px solid #0D69E0"
                                    : ""
                                    }`,
                                }}
                                key={id}
                                defaultValue={each}
                                onClick={(e) => handelImage(e, id)}
                                className="ButtonGroup"
                              >
                                <img
                                  src={each}
                                  alt="product"
                                  className="carouselImage"
                                />
                              </button>
                            ))}
                          </Carousel>
                        )}
                      </Col>
                    }
                  </Row>
                </Col>
                <Col lg={8} sm={12}>
                  <div className="DetailName">{from.name}</div>
                  <div className="d-md-flex">
                    <div className="d-flex">
                      <div className="productpercentage">
                        {from.percentage}% Off
                      </div>
                      <div className="productPrice">{from.display_price}</div>
                    </div>
                    <div className="d-flex">
                      <div className="productOldprice">{from.old_price}</div>
                      <div className="productText">
                        (Price Inclusive Of VAT)
                      </div>
                    </div>
                  </div>
            
                </Col>
              </Row>

        </Container >
    </Container >
    </>
  );
};

export default ProductDetail;
