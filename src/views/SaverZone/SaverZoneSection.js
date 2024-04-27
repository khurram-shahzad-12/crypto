import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FaWhatsapp } from 'react-icons/fa';
import {
  CommonSubCategorySection,
} from "../Perfumes";
import Slider from "../Home/Slider";
import {
  YellowOutlineCard,
  BlueOutlineCard,
  CommonItemRow,
  TechManiaBrands,
  SubcategoryProductList,
  InfinIteScrollItems,
} from "../SaverZone";

const SaverZoneSection = ({ data, type }) => {
  const border = "2px solid #f6af1c";
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });

  const phoneNumber = '+96897012106';
  const openWhatsAppChat = () => {
    window.open(`https://api.whatsapp.com/send/?phone=97433780528&text&type=phone_number&app_absent=0{phoneNumber}`);
  };
  const iconSize = 32;

  const imgslider =[ 
    {
        id: 114,
        image_url: "https://www.ourshopee.com/images/wtl/Artists.png",
        mobile_image_url: "https://www.ourshopee.com/images/wtl/Artists.png",
        url:""

    },
    {
        id: 114,
        image_url: "https://www.ourshopee.com/images/wtl/Artists.png",
        mobile_image_url: "https://www.ourshopee.com/images/wtl/Artists.png",
        url:""

    }
]
  return (
    <div className="categoryPage saverZone">
      <div className="maxWidthContainerFluid paddingContainerFluid container-fluid">
        {data.slider_images.length > 0 && (
          <Slider carouselList={data.slider_images} />
        )}
      </div>
      <button onClick={openWhatsAppChat} className="whatsapp-icn"> <FaWhatsapp size={iconSize} /> </button>

      {type=="league" &&
        <>
          <div className="wtl-slidertop">
        <div className="maxWidthContainerFluid paddingContainerFluid container-fluid">
            {imgslider.length > 0 && (
            <Slider carouselList={imgslider} />
            )}
        </div>
      </div>
      <div className="wtl-cnt">
        <div className="maxWidthContainerFluid paddingContainerFluid container-fluid">
            <h2> WORLD TENNIS LEAGUE </h2> 
            <h3> 18 WORLD CLASS TENNIS PLAYERS 6 INTERNATIONAL ARTISTS WELCOME TO THE "GREATEST SHOW ON COURT" </h3>
            <p> The 6 days and nights of WTL promises to be a night of passionate tennis matches and concerts by the best music artists!</p>
        </div>
      </div>
      
      <div className="wtl-artist-line">
        <div className="maxWidthContainerFluid paddingContainerFluid container-fluid">
            <Row className="wtl-a-iner">
                <h2> WORLD TENNIS LEAGUE ARTIST LINE UP </h2> 
                <Col lg={4} md={4}>
                  <a href="https://wplworld.com/" target="blank"><img className="rightimg" src="https://www.ourshopee.com/images/wtl/artist/artistnicky.jpg" alt="" style={{ width: "100%" }}/> </a>           
                </Col>
                <Col lg={4} md={4}>
                  <a href="https://wplworld.com/" target="blank"><img className="rightimg" src="https://www.ourshopee.com/images/wtl/artist/simply-ed-web-banner-2.3.jpg" alt="" style={{ width: "100%" }}/> </a>         
                </Col>
                <Col lg={4} md={4}>
                  <a href="https://wplworld.com/" target="blank"><img className="rightimg" src="https://www.ourshopee.com/images/wtl/artist/sq-mithoon.jpg" alt="" style={{ width: "100%" }}/>  </a>          
                </Col>
            </Row>
            <Row className="wtl-a-iner" style={{ marginTop:"25px" }}>
                <Col lg={12} md={12}>
                <a href="https://wplworld.com/" target="blank"><img className="rightimg" src="https://www.ourshopee.com/images/wtl/Get15-off-banner.jpg" alt="" style={{ width: "100%" }}/></a>
                </Col>
            </Row>
        </div>
      </div>

      

      <div className="wtl-team-line">
        <div className="maxWidthContainerFluid paddingContainerFluid container-fluid">
            <Row className="wtl-a-iner">
                <h2> OUR TEAM </h2> 
                <Col lg={3} md={3}>
                    <p className="teamborder-style"><img className="rightimg" src="https://www.ourshopee.com/images/wtl/team/Frame17.png" alt="" style={{ width: "100%" }}/></p>            
                </Col>
                <Col lg={3} md={3}>
                    <p className="teamborder-style"><img className="rightimg" src="https://www.ourshopee.com/images/wtl/team/Frame18.png" alt="" style={{ width: "100%" }}/> </p>           
                </Col>
                <Col lg={3} md={3}>
                    <p className="teamborder-style"><img className="rightimg" src="https://www.ourshopee.com/images/wtl/team/Frame19.png" alt="" style={{ width: "100%" }}/> </p>           
                </Col>
                <Col lg={3} md={3}>
                    <p className="teamborder-style"><img className="rightimg" src="https://www.ourshopee.com/images/wtl/team/Frame20.png" alt="" style={{ width: "100%" }}/> </p>          
                </Col>
            </Row>
        </div>
      </div>
        </>
      }


      {data.other_section.map((ele, index) => {

        if (ele.type == 8) {
          return (
            <Container
              key={index}
              fluid
              className="maxWidthContainerFluid mt-2"
            >
              <div className="subCategoryTitle" style={{ color: "#c90101" }}>
                {ele.heading}
              </div>
              <YellowOutlineCard data={ele.items} border={border} />
            </Container>
          );
        }

        if (ele.type == 1) {
          return (
            <Container
              key={index}
              fluid
              className="maxWidthContainerFluid mt-2"
            >
              <div className="subCategoryTitle" style={{ color: "#c90101" }}>
              {ele.heading}
            </div>
            <div>
              <CommonSubCategorySection
                data={ele.items}
                // borderRadius={borderRadius}
                type={"perfume"}
              />
            </div>
            </Container>
          );
        }

        if (ele.type == 9) {
          return (
            <Container
              key={index}
              fluid
              className="maxWidthContainerFluid mt-2"
            >
              <div className="subCategoryTitle" style={{ color: "#c90101" }}>
                {ele.heading}
              </div>
              <BlueOutlineCard data={ele.items} border={"5px solid #cfeff9"} />
            </Container>
          );
        }
        if (ele.type == "brands") {
          return (
            <Container
              key={index}
              fluid
              className="maxWidthContainerFluid mt-2 saverbrand"
            >
              <div className="subCategoryTitle" style={{ color: "#c90101" }}>
                {ele.heading}
              </div>
              <TechManiaBrands data={ele.items} />
            </Container>
          );
        }
        if (ele.type == "items") {
          return (
            <React.Fragment key={index}>
              <div style={{ background: "#f8eaff" }}>
                <Container
                  fluid
                  className="maxWidthContainerFluid mt-3 pt-4 pb-4"
                >
                  <CommonItemRow type="non-infinite" items={ele.items} />
                </Container>
              </div>
            </React.Fragment>
          );
        }
        if (ele.type == "single_image") {
          return (
            <Container
              key={index}
              fluid
              className="maxWidthContainerFluid my-4"
            >
              <NavLink to={ele.images.url}>
                {isMobile ? (
                  <img
                    src={ele.images.mobileImage}
                    style={{ width: "100%" }}
                    alt=""
                  />
                ) : (
                  <img
                    src={ele.images.desktopImage}
                    style={{ width: "100%" }}
                    alt=""
                  />
                )}
              </NavLink>
            </Container>
          );
        }
        if (ele.type == "multiple_images") {
          return (
            <Container
              key={index}
              fluid
              className="maxWidthContainerFluid mt-4 mb-5 multipleImage"
            >
             {/*  <div className="subCategoryTitle">{ele.heading}</div> */}
              <div className="row">
                {ele.images.length > 0 &&
                  ele.images.map((img, ind) => (
                    <div className={`${img.list_css}`}  key={ind + index}>
                      <NavLink
                        className="text-decoration-none commonCardLink"
                        to={img.url}
                      >
                        {isMobile ? (
                          <img
                            src={img.desktopImage}
                            style={{ width: "100%" }}
                            alt="multiple"
                          />
                        ) : (
                          <img
                            src={img.desktopImage}
                            style={{ width: "100%" }}
                            alt="multiple"
                          />
                        )}
                      </NavLink>
                    </div>
                  ))}
              </div>
            </Container>
          );
        }
        if (ele.type == "category_items") {
          return (
            <Container fluid className="maxWidthContainerFluid" key={index}>
              <SubcategoryProductList
                data={ele.items}
                type={"saverZone"}
                background={"#f8eaff"}
              />
            </Container>
          );
        }
      })}
      <Container fluid className="maxWidthContainerFluid my-4"  >
        <InfinIteScrollItems />
      </Container>
      
    </div>
  );
};

export default SaverZoneSection;
