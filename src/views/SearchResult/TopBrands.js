/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import Carousel from "react-multi-carousel";
import { useSearchParams } from "react-router-dom";

const TopBrands = ({ TopBrands }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1192 },
      items: 8,
      partialVisibilityGutter: 10,
    },
    desktop: {
      breakpoint: { max: 1191, min: 992 },
      items: 5,
      partialVisibilityGutter: 10,
    },
    tablet: {
      breakpoint: { max: 992, min: 768 },
      items: 3,
      partialVisibilityGutter: 10,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 2,
      // slidesToSlide: 5,
      partialVisibilityGutter: 30,
    },
  };

  const handelTopBrand = (brand_name) => {
    if (searchParams.has("Brands")) {
      const ParamsValue = searchParams.get("Brands");
      searchParams.delete("Brands");
      searchParams.set("Brands", ParamsValue + "," + brand_name);
    } else {
      searchParams.set("Brands", brand_name);
    }
    setSearchParams(searchParams);
  };

  return (
    <Carousel
      swipeable={true}
      draggable={true}
      autoPlay={false}
      showDots={true}
      ssr={true}
      slidesToSlide={5}
      renderDotsOutside={true}
      arrows={false}
      partialVisible={true}
      responsive={responsive}
      className="carouselColor mt-2 mb-2"
    >
      {TopBrands.map((each, i) => (
        <>
        {/* <div className="appleimgCon" key={i} style={{ position: "unset" }}>
          <div
            className="brandImage"
            onClick={() => handelTopBrand(each.brand_name)}
          >
            <img
              className="appleimg"
              alt="TopBrands"
              src={each.image}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/Assets/images1111.png";
              }}
            />
          </div>
        </div> */}
          <div className="card border-0 topbrandCard" key={i} onClick={() => handelTopBrand(each.brand_name)}>
          <img
              className="appleimg"
              alt="TopBrands"
              src={each.image}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/Assets/images1111.png";
              }}
            />
          </div>
        </>
      ))}
    </Carousel>
  );
};

export default TopBrands;
