import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CommonTopBrands = ({ data }) => {
  const { t } = useTranslation();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1440 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 1440, min: 1024 },
      items: 7,
    },
    tablet: {
      breakpoint: { max: 1024, min: 991 },
      items: 5,
    },
    mintablet: {
      breakpoint: { max: 991, min: 768 },
      items: 4,
    },

    largeMobile: {
      breakpoint: { max: 768, min: 576 },
      items: 4,
    },
    smallMobile: {
      breakpoint: { max: 576, min: 375 },
      items: 3,
    },

    xtrasmallMobile: {
      breakpoint: { max: 375, min: 0 },
      items: 2,
    },
  };
  return (
    <>
      <div className="subCategoryTitle">{t("category.topbrand")}</div>
      <Carousel
        responsive={responsive}
        arrows={false}
        className="brandLogos justify-content-center"
        swipeable={true}
        infinite={true}
        itemClass="carousel-item-padding-40-px"
      >
        {data.map((each, i) => (
          <Card key={{ i }}>
            <NavLink className="" to={`/brands/${each.url}`}>
              <img
                src={each.image}
                alt="CommonTopBrands"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "/Assets/images1111.png";
                }}
              />
            </NavLink>
          </Card>
        ))}
      </Carousel>
    </>
  );
};

export default CommonTopBrands;
