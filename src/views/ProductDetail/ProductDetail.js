import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useParams, NavLink } from "react-router-dom";
import { RiQuestionFill } from "react-icons/ri";
import { BsFillTagFill } from "react-icons/bs";
import HTMLReactParser from "html-react-parser";
import ReactImageMagnify from "react-image-magnify";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useMediaQuery } from "react-responsive";
import { ReleatedCard } from "./RelatedProducts";
import RelatedProducts from "./RelatedProducts";
import Modal from "react-bootstrap/Modal";
import UseAddToCartHook from "../../componets/UseAddToCartHook";
import AddToCartAPI from "../../componets/AddToCartAPI";
import { useTranslation } from "react-i18next";
import Cookies from "universal-cookie";
import Countdown, { zeroPad } from "react-countdown";
import call_apis from "../../services/Apis";
import CommonBreadCrumb from "../../componets/CommonBreadCrumb";
import { HiOutlineClock } from "react-icons/hi";
import { VscTriangleDown } from "react-icons/vsc";
import { TbCircle } from "react-icons/tb";
import moment from "moment/moment";
import Meta from "../../componets/Meta";

const ProductDetail = () => {
  const [from, setForm] = useState({});
  const { slug, slug1 } = useParams();
  const { t } = useTranslation();
  const { cartClick, cartDetail, addToCart, setCartClick } = UseAddToCartHook();
  const [description, setDescription] = useState(true);
  const [reviews, setReviews] = useState(false);
  const [showLines, setShowLines] = useState(4);
  const [showDetail, setShowDetail] = useState(5);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [learnData, setLearnData] = useState({});
  const [learnDescription, setLearnDescription] = useState();
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });
  const [carouselImage, setCarouselImage] = useState(0);
  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [fullscreenTobby, setFullscreenTobby] = useState(true);
  const [offerIndex, setOfferIndex] = useState("3 Months");
  const [bread, setBread] = useState({});
  const [tobbyShow, setTobbyShow] = useState(false);
  const [expressDelivery, setExpressDelivery] = useState(false);
  

  const handleClose = () => setShow(false);
  const handleCloseTobby = () => setTobbyShow(false);
  const handleCloseExpDelivery = () => setExpressDelivery(false);

  const pageTitle = `${slug} in - UAE `;

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


  console.log(from)

  const getProductDatas = async () => {
    const response = await call_apis.getProductData(slug1);
    setForm(response.data.data.product[0]);
    setBread([
      {
        slug: response.data.data.product[0].category_name,
        link: "categories",
        url: response.data.data.product[0].category_url,
      },
      {
        slug: response.data.data.product[0].subcategory_name,
        link: "products-category",
        url: response.data.data.product[0].subcategory_url,
      },
      {
        slug: response.data.data.product[0].sub_sub_category_name,
        link: "products-subcategory",
        url:
          response.data.data.product[0].subcategory_url +
          "/" +
          response.data.data.product[0].sub_sub_category_url,
      },
      { slug: slug, link: "details", url: slug1 },
    ]);
    getProductDetailData(
      response.data.data.product[0].sku,
      response.data.data.product[0].brand_id,
      response.data.data.product[0].subcategory_id
    );
  };

  useEffect(() => {
    updateCookies();
    setForm([]);
    setRelatedProducts([]);
    setRecentlyViewed([]);
    setCarouselImage(0);
    getProductDatas();
    setBread({});
  }, [slug1]);

  const handleShow = (index, breakpoint) => {
    setFullscreen(breakpoint);
    setLearnData(index);
    setLearnDescription(index.plans[0]);
    setShow(true);
  };

  const handleShowTobby = (price, breakpoint) => {
    setTobbyShow(true);
    setFullscreenTobby(breakpoint);
  };

  const handleExpDelivery = (breakpoint) => {
    setExpressDelivery(true);
    setFullscreenTobby(breakpoint);
  };

  const handelTimePeriod = (description) => {
    setLearnDescription(description);
    setOfferIndex(description.time_period);
  };

  const getProductDetailData = async (sku, brandId, subcategoryId) => {
    const data = {
      brand_id: brandId,
      subcategory_id: subcategoryId,
      sku: sku,
      skulist: cookies.get("sku").slice(-6),
    };
    const response = await call_apis.postProductData(data);
    setRelatedProducts(response.data.data.related_products);
    setRecentlyViewed(response.data.data.recently_viewed);
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

  const handelDescription = () => {
    setReviews(false);
    setDescription(true);
  };
  const handelReviews = () => {
    setDescription(false);
    setReviews(true);
  };

  const html = Object.keys(from).length > 0 && decodeHtml(from.details);

  const handelImage = (e, id) => {
    setCarouselImage(id);
  };

  const handelViewMore = () => {
    const len = from.bank_offers.length;
    setShowLines(len);
  };

  const handelViewLess = () => {
    setShowLines(4);
  };

  const handelSeeMore = () => {
    const len = from.small_desc_data.length;
    setShowDetail(len);
  };

  const handelSeeLess = () => {
    setShowDetail(5);
  };

  const expressDeliveryJson = [
    {
      area: "dubai",
      value: "1 Hour"
    },
    {
      area: "sharjah",
      value: "1 Hour"
    },
    {
      area: "Ajman",
      value: "1 Hour"
    },
    {
      area: "Umm Al Quwain",
      value: "1 Hour"
    },
    {
      area: "Ras Al Kaihmah",
      value: "24 Hours"
    },
    {
      area: "Fujairah",
      value: "24 Hours"
    },
    {
      area: "Al Ain",
      value: "24 Hours"
    },
    {
      area: "Abu Dhabi",
      value: "24 Hours"
    },
  ]

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <span>
          {zeroPad(hours)} hrs: {zeroPad(minutes)} min: {zeroPad(seconds)} sec
        </span>
      );
    } else {
      // Render a countdown
      return (
        <span>
          {zeroPad(hours)} hrs: {zeroPad(minutes)} min: {zeroPad(seconds)} sec
        </span>
      );
    }
  };
  

  const title=pageTitle || undefined;
  const seoTitle=pageTitle || undefined
  const productUrl=`https://www.ourshopee.com/details/${slug}/${slug1}`||"";
  const seoDescription=pageTitle || undefined;
  const seoKeyword=pageTitle || undefined;
  const productImageUrl=from.image|| "";


    
  

  return (
    <>
    <Meta title={title} seoTitle={seoTitle} seoDescription={seoDescription} seoKeywords={seoKeyword} productUrl={productUrl} productDescription={seoDescription} productImageUrl={productImageUrl}/>
      {Object.keys(from).length > 0 ? (
        <Container fluid className="ProductDetail maxWidthContainerFluid">
          {Object.keys(from).length > 0 && (
            <Container
              fluid
              className="maxWidthContainerFluid paddingContainerFluid ThanksOrder"
            >
              <Container fluid className="maxWidthContainerFluid">
                <CommonBreadCrumb data={bread} />
              </Container>

              
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
                  {from.display_price.split(" ")[1] >= 50 &&
                    from.tabbyactive === 1 && (
                      <div>
                        <img
                          src="/Assets/shop-now-pay-later.svg"
                          alt="shop now"
                          style={{ width: "176px" }}
                        />
                        <div className="offerCard">
                          <BsFillTagFill style={{ fill: "#0D69E0" }} /> Easy
                          Installment Plans with 0% Interest. Pay
                          <span
                            className="offerValue"
                            style={{
                              color: "#EB5757",
                              fontWeight: "500",
                            }}
                          >
                            {" "}
                            AED {(from.display_price.split(" ")[1] * 40) /
                              100}{" "}
                          </span>
                          <span>Now, Rest pay later </span>
                          <img
                            src="/Assets/tabby.webp"
                            alt="Offer"
                            className="offerImage"
                          />
                          <button
                            type="button"
                            className="learnMore"
                            onClick={() =>
                              handleShowTobby(
                                from.display_price.split(" ")[1],
                                "lg-down"
                              )
                            }
                          >
                            Learn more
                          </button>
                        </div>
                      </div>
                    )}

                  {from.fastTrack === 1 ? (

                    <Col xs={12} md={10} className="productDeliverycontainer">
                      <div className="productDelivery">
                        <Row>
                          <Col md={3}>
                            <img
                              src="/Assets/Xpress-delivery.svg"
                              alt="Delivery"
                              className="w-100"
                            />
                          </Col>
                          <Col md={6}>
                            <p style={{ margin:"0",lineHeight:"26px"}}> Delivery within <b>1 Hour</b> on selected areas </p>
                          </Col>
                          <Col md={3}>
                            <RiQuestionFill className="delieryQuestion" />
                            <button type="button"
                              className="learnMore"
                              onClick={() =>
                                handleExpDelivery("lg-down")
                              }
                            >Learn more</button>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  )
                    :
                    <Col xs={12} md={10} className="productDeliverycontainer">
                      <div className="productDelivery">


                        <Row>

                          <Col md={6}>
                            {from.delivery.slice(0, 20)}
                            <span className="productDeliverySpan">
                              &nbsp;{from.delivery.slice(20)}
                            </span>
                          </Col>
                          <Col md={3}>

                          </Col>
                        </Row>
                      </div>
                    </Col>
                  }


                  <div className="productBankOffer">Details</div>
                  {from.small_desc_data.slice(0, showDetail).map((ele2, id) => (
                    <Row className="DescriptionName" key={id}>
                      <Col xs={5} md={2}>
                        {ele2.title}
                      </Col>
                      <Col xs={1}>:</Col>
                      <Col xs={6} md={4}>
                        {ele2.value.replace(/(\d)([A-Za-z])/g, '$1 $2')}
                      </Col>
                    </Row>
                    
                  ))}
                  {/* <col>Free Shipping</col> */}
                  {showDetail === 5 && from.small_desc_data.length > 5 && (
                    <button
                      type="button"
                      onClick={handelSeeMore}
                      className="viewMore"
                    >
                      See more
                    </button>
                  )}
                  {showDetail === 6 && showDetail === from.small_desc_data.length && (
                    <button
                      type="button"
                      onClick={handelSeeLess}
                      className="viewMore"
                    >
                      See Less
                    </button>
                  )}
                  {from.alternateAttributes.length > 0 &&       (
                    <div className="alternateAttributes pt-3 mt-2">
                      <Row>
                        {from.alternateAttributes.map((ele, i) => {
                          if (ele.title === "Available Colors") {
                            return (
                              <Row key={i}>
                                <Col xs={4} md={2} className="Attributestitle">
                                  {ele.title}:
                                </Col>
                                <Col xs={8} md={10} className="d-flex">
                                  {ele.list.map((each, i) => (
                                    <NavLink
                                      to={`/details/${each.url}/${each.sku}`}
                                      key={i}
                                      style={{ background: `${each.code}` }}
                                      className={
                                        each.id === from.color_id
                                          ? "colordiv colordivActive"
                                          : "colordiv"
                                      }
                                    >
                                      <div> </div>
                                    </NavLink>
                                  ))}
                                </Col>
                              </Row>
                            );
                          }
                          if (ele.title === "Available Storage") {
                            return (
                              <Row className="my-2" key={i}>
                                <Col xs={2} className="Attributestitle">
                                  {ele.title}:
                                </Col>
                                <Col xs={10}>
                                  {ele.list.map((each, i) => (
                                    <NavLink
                                      to={`/details/${each.url}/${each.sku}`}
                                      key={i}
                                      className={
                                        each.id === from.storage_id
                                          ? "textdiv colordivActive"
                                          : "textdiv"
                                      }
                                    >
                                      {each.name}
                                    </NavLink>
                                  ))}
                                </Col>
                              </Row>
                            );
                          }
                        })}
                      </Row>
                    </div>
                  )}
                  {from.subcategory_id === 205 && (
                    <Container className="alternateAttributes mt-2">
                      <Row>
                        <Col xs={12} md={2} className="d-flex">
                          <input type="checkbox" id="myCheckbox1" />
                          <label
                            htmlFor="myCheckbox1"
                            className="checkbox-lable"
                          >
                            <img
                              src="/Assets/warranty-assistants.svg"
                              alt="cart"
                              className="warrenty-img"
                            />
                          </label>
                        </Col>
                        <Col xs={12} md={9}>
                          <div className="text">{t("Extended.Warranty")}</div>
                          <div className="Warranty">{t("Get.complete")}</div>
                          <NavLink to="/warranty-terms" className="know">
                            {t("know.more")}
                          </NavLink>
                          <div>
                            <span className="current">AED </span>
                            <span className="currentPrice">
                              {" "}
                              {(from.display_price.split(" ")[1] * 5) / 100}
                            </span>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  )}
                  <div className="productBank">
                    {from.bank_offers.length > 0 && (
                      <div className="productBankOffer">Bank Offers</div>
                    )}
                    {from.bank_offers.slice(0, showLines).map((ele, index) => (
                      <div key={index} className="offerCard">
                        <BsFillTagFill style={{ fill: "#0D69E0" }} />{" "}
                        {ele.value.slice(0, 23)}
                        <span
                          className="offerValue"
                          style={{
                            color: "#EB5757",
                            fontWeight: "500",
                          }}
                        >
                          {ele.value.slice(23, -4)}
                        </span>
                        <span>{ele.value.slice(-4)} </span>
                        <img
                          src={ele.image}
                          alt="Offer"
                          className="offerImage"
                        />
                        <span className="offertagName"> {ele.tag}</span>
                        <button
                          type="button"
                          className="learnMore"
                          onClick={() => handleShow(ele.modal_data, "lg-down")}
                        >
                          Learn more
                        </button>
                      </div>
                    ))}
                    {showLines === 4 && from.bank_offers.length > 4 && (
                      <button
                        type="button"
                        onClick={handelViewMore}
                        className="viewMore"
                      >
                        View more offers
                      </button>
                    )}
                    {showLines === from.bank_offers.length && (
                      <button
                        type="button"
                        onClick={handelViewLess}
                        className="viewMore"
                      >
                        View Less
                      </button>
                    )}{" "}
                  </div>
                  <Row>
                    <Col>
                      {from.hasOwnProperty("countdown") && (
                        <HiOutlineClock size={18} />
                      )}
                      <Countdown
                        className="countdown"
                        date={from.countdown}
                        renderer={renderer}
                      />
                    </Col>
                  </Row>
                  <Col xs={12} md={4}>
                    {
                      from.stock != 'Out of stock'
                        ?
                        <button
                          type="button"
                          onClick={() => addToCart(from.id)}
                          className="productAddToCart"
                        >
                          {t("global.addCart")}
                        </button>
                        :
                        <button
                          type="button"
                          className="productAddToCart"
                        >
                          Notify Me
                        </button>
                    }

                  </Col>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  {isMobile ? (
                    <>
                      <div className="d-flex mb-3">
                        <button
                          type="button"
                          onClick={handelDescription}
                          className={`${description ? "productBankOffers" : "productREviews"
                            }`}
                        >
                          Description
                        </button>
                        <button
                          type="button"
                          onClick={handelReviews}
                          className={`${reviews ? "productBankOffers" : "productREviews"
                            }`}
                        >
                          Reviews (0)
                        </button>
                      </div>
                      {description && (
                        <div className="descriptionscroll">
                          <div className="DescriptionName">{from.name}</div>
                          <div>
                            {" "}
                            {html.length > 0 &&
                              HTMLReactParser(html, {
                                replace: (domNode) => {
                                  if (domNode.name === "table") {
                                  }
                                  if (domNode.name === "span") {
                                  }
                                },
                              })}{" "}
                          </div>
                        </div>
                      )}
                      {reviews && (
                        <div className="productBankOffer mt-0">
                          No Reviews Found
                        </div>
                      )}{" "}
                    </>
                  ) : (
                    <div className="productBank productDescription">
                      <div className="mb-3 tabsContainer">
                        <Tabs
                          defaultActiveKey="home"
                          transition={false}
                          id="noanim-tab-example"
                        >
                          <Tab
                            eventKey="home"
                            title="Description"
                            className="descriptionscroll"
                          >
                            <div className="DescriptionName">{from.name}</div>
                            <div>
                              {html.length > 0 &&
                                HTMLReactParser(html, {
                                  replace: (domNode) => {
                                    if (domNode.name === "table") {
                                    }
                                    if (domNode.name === "span") {
                                    }
                                  },
                                })}{" "}
                            </div>
                          </Tab>
                          <Tab eventKey="profile" title="Reviews (0)">
                            <div className="productBankOffer mt-0">
                              No Reviews Found
                            </div>
                          </Tab>
                        </Tabs>
                      </div>
                    </div>
                  )}
                </Col>
                <Col xs={12} md={6}>
                  <div className="productBankOffer mt-4 mb-3">
                    Related Products
                  </div>

                  <ReleatedCard relatedProducts={relatedProducts} />
                </Col>
              </Row>

              <Row className="mb-3">
                <>
                  <div className="productBankOffer mt-3 mb-3">
                    Recently Viewed
                  </div>
                  <RelatedProducts
                    relatedProducts={recentlyViewed}
                    recentData={true}
                  />
                </>
              </Row>
              {show && (
                <Modal
                  show={show}
                  fullscreen={fullscreen}
                  onHide={handleClose}
                  centered
                  className="modellearn"
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                >
                  <Modal.Header closeButton className="d-flex flex-column">
                    <div className="text_title">
                      {learnData.bank_name} Payment Options
                    </div>
                    <div className="productBankOffer">
                      You pick the EMI Plans
                    </div>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="learnContainer">
                      {learnData.plans.map((each, id) => (
                        <button
                          type="button"
                          key={id}
                          className={
                            offerIndex === each.time_period
                              ? "learnButton learnButtonhover"
                              : "learnButton"
                          }
                          onClick={() => handelTimePeriod(each)}
                        >
                          {each.time_period}
                        </button>
                      ))}
                    </div>
                    <div className="learnBody">
                      {learnDescription !== undefined && (
                        <div>
                          {Object.keys(learnDescription.description).length !==
                            0 ? (
                            <div>
                              <div className="learnBodyDescription learnHeading">
                                <div>
                                  {learnDescription.description.interest}
                                </div>
                                <div>
                                  {learnDescription.description.payamount}
                                </div>
                              </div>
                              <div className="learnColor">
                                <div className="learnBodyDescription">
                                  <div>Price</div>
                                  <div>
                                    {learnDescription.description.price}
                                  </div>
                                </div>
                                <div className="learnBodyDescription">
                                  <div>Bank Processing Fee</div>
                                  <div>
                                    {
                                      learnDescription.description
                                        .processing_fee
                                    }
                                  </div>
                                </div>
                                <div className="learnBodyDescription">
                                  <div>
                                    Interest paid to bank(
                                    {learnDescription.description.interest_num})
                                  </div>
                                  <div>
                                    {
                                      learnDescription.description
                                        .emi_interest_to_bank
                                    }
                                  </div>
                                </div>
                                <div className="learnDot"></div>
                                <div className="learnBodyDescription">
                                  <div>
                                    Total amount Payable(
                                    {
                                      learnDescription.description
                                        .total_amnt_left
                                    }
                                    )
                                  </div>
                                  <div>
                                    {
                                      learnDescription.description
                                        .total_amnt_right
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              {learnDescription.time_period} EMI not available
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </Modal.Body>
                </Modal>
              )}

              {tobbyShow && (
                <Modal
                  show={tobbyShow}
                  fullscreen={fullscreenTobby}
                  onHide={handleCloseTobby}
                  centered
                  className="modellearn ProductDetail"
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                >
                  <Modal.Header closeButton className="d-flex flex-column">
                    <div className="text_title">Payment Options</div>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="tobbymonthly">Monthly</div>
                    <div className="learnBody timeline-heading mb-2">
                      <Row style={{ fontSize: "14px", marginBottom: "10px" }}>
                        <Col xs={9} lg={10}>
                          Payments schedule
                        </Col>
                        <Col xs={3} lg={2}>
                          {from.display_price}
                        </Col>
                      </Row>
                      <Row style={{ fontSize: "12px" }}>
                        <Col xs={9} lg={10} className="timeline-milestone-key">
                          <TbCircle /> Today
                        </Col>
                        <Col xs={3} lg={2} className="timeline-milestone-key">
                          AED {(from.display_price.split(" ")[1] * 40) / 100}
                        </Col>
                      </Row>
                      <hr
                        width="2"
                        size="25"
                        style={{ margin: "0px 7px" }}
                        className="timeline-milestone-key"
                      />
                      <Row style={{ fontSize: "12px" }}>
                        <Col xs={9} lg={10}>
                          <TbCircle />{" "}
                          {moment(new Date())
                            .add(1, "M")
                            .format("dddd Do of MMMM YYYY")}
                        </Col>
                        <Col xs={3} lg={2}>
                          AED {(from.display_price.split(" ")[1] * 20) / 100}
                        </Col>
                      </Row>
                      <hr width="2" size="25" style={{ margin: "0px 7px" }} />
                      <Row style={{ fontSize: "12px" }}>
                        <Col xs={9} lg={10}>
                          <TbCircle />{" "}
                          {moment(new Date())
                            .add(2, "M")
                            .format("dddd Do of MMMM YYYY")}
                        </Col>
                        <Col xs={3} lg={2}>
                          AED {(from.display_price.split(" ")[1] * 20) / 100}
                        </Col>
                      </Row>
                      <hr width="2" size="25" style={{ margin: "0px 7px" }} />
                      <Row style={{ fontSize: "12px" }}>
                        <Col xs={9} lg={10}>
                          <TbCircle />{" "}
                          {moment(new Date())
                            .add(3, "M")
                            .format("dddd Do of MMMM YYYY")}
                        </Col>
                        <Col xs={3} lg={2}>
                          AED {(from.display_price.split(" ")[1] * 20) / 100}
                        </Col>
                      </Row>
                      <hr width="2" size="25" style={{ margin: "0px 7px" }} />
                    </div>
                  </Modal.Body>
                  <NavLink
                    to="/tabbyplan"
                    className="productAddToCart tabbyplan"
                  >
                    {t("learn.more")}
                  </NavLink>
                </Modal>
              )}


              {expressDelivery && (
                <Modal
                  show={expressDelivery}
                  fullscreen={fullscreenTobby}
                  onHide={handleCloseExpDelivery}
                  centered
                  className="modellearn ProductDetail"
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                >
                  <Modal.Header closeButton className="d-flex flex-column">
                    <div className="text_title">Delivery Information</div>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="spotii-popup-inner">
                      <div className="spoti-popup-row">
                        <div className="tab-outer">
                          <div className="tab-content clearfix">
                            <div className="tab-pane active">
                              <div className="estimation">
                                <div className="timeline timeline-size-small auth-timeline">
                                  {
                                    expressDeliveryJson.map(ele => {
                                      return (
                                        <div className="timeline-milestone">
                                          <div style={{ display: "flex" }}>
                                            <div className="timeline-milestone-key" style={{
                                              marginRight: "5px", color: "red"
                                            }}>O</div>
                                            <div className="timeline-milestone-key">{ele.area}</div>
                                          </div>
                                          <div className="timeline-milestone-value">Delivery within <b>{ele.value}</b></div>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                              </div>
                              <p className="not-tx"> Note:Orders placed between Monday - Saturday 9 AM to 6 PM Will be eligible for the 1 Hour delivery time.
                                Rest all orders will be delivered within 24 Hours.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              )}


            </Container >
          )}
        </Container >
      ) : (
        <div style={{ height: "50vh" }}>
          <div className="loading-indicator"></div>
        </div>
      )}
      {cartClick && <AddToCartAPI cartDetail={cartDetail} cartClick={cartClick} setCartClick={setCartClick} />}
      
    </>
  );
};

export default ProductDetail;
