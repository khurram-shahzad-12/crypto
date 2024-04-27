import React from "react";
import { Container } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CommonSubHeading from "../../componets/CommonSubHeading";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import CommonHorizontalCard from "../../componets/CommonHorizontalCard";

const Brand = ({ data }) => {
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

  const color = "#f3590b";
  const countdownStyle = {
    background: "transparent",
    color: "#f3590b",
  };

  return (
    <Container className="maxWidthContainerFluid excitingSection" fluid>
          <div className="d-flex justify-content-between align-items-baseline">
          <CommonSubHeading heading={t("home.brandWeekTitle")} title={true} />
          <NavLink to="/brands/Wiwu">
            <div className="view_all">
              {t("global.viewAll")}
            </div>
          </NavLink>
          </div>
      
      <div className="brandWeek">
        <img
          src={mobileView ? data[0].mobileImage : data[0].desktopImage}
          alt="brandBanner"
          width="100%"
        />
        <Carousel responsive={responsive} partialVisible={true}>
          {data[0].items.map((each, i) => (
            <CommonHorizontalCard
              key={i}
              data={each}
              buttonColor={color}
              setWidth={false}
              countdownStyle={countdownStyle}
              setPadding=""
            />
          ))}
        </Carousel>
      </div>
    </Container>
  );
};

export default Brand;
