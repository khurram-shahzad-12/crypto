import React from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import CommonHorizontalCard from "../../componets/CommonHorizontalCard";
import { useTranslation } from "react-i18next";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useMediaQuery } from "react-responsive";

const Clearance = ({ cearanceArray }) => {
  const { t } = useTranslation();

  const mobileView = useMediaQuery({ query: `(max-width: 991px)` });

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
      // partialVisibilityGutter : 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    largeMobile: {
      breakpoint: { max: 768, min: 576 },
      items: 2,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
      partialVisibilityGutter: 40,
    },
  };

  const colorArray = {
    0: "#DFDEFF",
    1: "#FFE8D9",
    2: "#C4E9FB",
    3: "#DFDEFF",
    4: "#FFE8D9",
    5: "#C4E9FB",
    6: "#DFDEFF",
    7: "#FFE8D9",
    8: "#C4E9FB",
    9: "#DFDEFF",
  };

  const buttonColor = {
    0: "#040079",
    1: "#7A3000",
    2: "#085073",
    3: "#040079",
    4: "#7A3000",
    5: "#085073",
    6: "#040079",
    7: "#7A3000",
    8: "#085073",
    9: "#040079",
  };

  return (
    <Container
      className="maxWidthContainerFluid excitingSection paddingContainerFluid"
      fluid
    >
      <div className="clearanceSale dealSection">
        <div
          style={{
            padding: "0px 0px 10px",
            display: `${mobileView ? "flex" : ""}`,
            justifyContent: `${mobileView ? "space-between" : ""}`,
          }}
        >
          {!mobileView && (
            <img
              src="/Assets/mikeSale.svg"
              alt="announce "
              className="announce"
            />
          )}
          <div
            className={
              !mobileView
                ? `text-center divLargeTitle`
                : `divMediumTitle text-uppercase`
            }
          >
            {t("navigation.clearance")}
          </div>
          <NavLink to="/deals-of-the-day">
            <div className="view_all" style={{ color: "#ffffff" }}>
              {t("global.viewAll")}
            </div>
          </NavLink>
        </div>
        <Carousel responsive={responsive} partialVisible={true}>
          {cearanceArray.map((each, i) => (
            <CommonHorizontalCard
              key={i}
              data={each}
              color={'#fff'}
              buttonColor={buttonColor[i.toString().slice(-1)]}
              setWidth={true}
              countdownStyle={{}}
              setPadding={""}
            />
          ))}
        </Carousel>
      </div>
    </Container>
  );
};

export default Clearance;
