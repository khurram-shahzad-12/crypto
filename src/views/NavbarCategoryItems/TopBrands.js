/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import { NavLink } from "react-router-dom";

const TopBrands = ({
  TopBrands,
  fliterItemsSend,
  slug,
  clearArray,
  removeItem,
  filterArray,
}) => {
  const [topBrandFilter, setTopBrandFilter] = useState([]);
  const [brandName, setBrandName] = useState([]);
  const [clearfilter, setclearfilter] = useState(clearArray);

  useEffect(() => {
    filterArray.length > 0 && setTopBrandFilter(filterArray);
  }, [filterArray]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1192 },
      items: 6,
      partialVisibilityGutter: 40,
    },
    desktop: {
      breakpoint: { max: 1191, min: 992 },
      items: 5,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 992, min: 768 },
      items: 4,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 2,
      partialVisibilityGutter: 20,
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
    if (topBrandFilter.length > 0) {
      fliterItemsSend(topBrandFilter);
    }
  }, [topBrandFilter]);

  useEffect(() => {
    clearfilter && setBrandName([]);
    clearfilter && setTopBrandFilter([]);
  }, [clearfilter]);

  useEffect(() => {
    setBrandName([]);
    setTopBrandFilter([]);
  }, [slug]);

  useEffect(() => {
    setclearfilter(clearArray);
  }, [clearArray]);

  const handelTopBrand = (name) => {
    setBrandName([...brandName, name]);
    const lio = brandName.length >= 1 && brandName.includes(name);
    const index = lio && brandName.indexOf(name);
    const kio = lio && brandName.splice(index, 1);

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
      {TopBrands.map((each, i) => (
        <NavLink key={i}>
          <div className="appleimgCon" style={{ position: "unset" }}>
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
          </div>
        </NavLink>
      ))}
    </Carousel>
  );
};

export default TopBrands;
