/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import { NavLink } from "react-router-dom";

const SubTopBrands = ({
  TopBrands,
  fliterItemsSend,
  slug1,
  slug2,
  clearArray,
  removeItem,
}) => {
  const [topBrandFilter, setTopBrandFilter] = useState([]);
  const [brandName, setBrandName] = useState([]);
  const [clearfilter, setclearfilter] = useState(clearArray);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1192 },
      items: 10,
      partialVisiblityGutter: 40,
    },
    desktop: {
      breakpoint: { max: 1191, min: 992 },
      items: 7,
      partialVisiblityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 992, min: 768 },
      items: 5,
      partialVisiblityGutter: 40,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 3,
      slidesToSlide: 5,
      partialVisiblityGutter: 40,
    },
  };

  useEffect(() => {
    const removefilterValue = brandName.filter((ele) => ele !== removeItem);
    setBrandName(removefilterValue);
  }, [removeItem]);

  useEffect(() => {
    const removefilterValue = topBrandFilter.filter(
      (ele) => ele.value !== removeItem
    );
    setTopBrandFilter(removefilterValue);
  }, [removeItem]);

  useEffect(() => {
    fliterItemsSend(topBrandFilter);
  }, [topBrandFilter]);

  useEffect(() => {
    clearfilter && setBrandName([]);
    clearfilter && setTopBrandFilter([]);
  }, [clearfilter]);

  useEffect(() => {
    setBrandName([]);
    setTopBrandFilter([]);
  }, [slug1, slug2]);

  useEffect(() => {
    setclearfilter(clearArray);
  }, [clearArray]);

  const handelTopBrand = (name) => {
    setBrandName([...brandName, name]);
    const lio = brandName.length >= 1 && brandName.includes(name);
    if (!lio) {
      var upDatedChecks = {};
      upDatedChecks["title"] = "Brands";
      upDatedChecks["value"] = name;
      setTopBrandFilter([...topBrandFilter, upDatedChecks]);
    }
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
      className="carouselColor mt-2"
    >
      {TopBrands.map((each) => (
        <NavLink key={each.id}>
          <div className="appleimgCon" style={{ position: "unset" }}>
            <button
              type="button"
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
            </button>
          </div>
        </NavLink>
      ))}
    </Carousel>
  );
};

export default SubTopBrands;
