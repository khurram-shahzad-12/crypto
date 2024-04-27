/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import ProgressBar from "../NavbarCategoryItems/ProgressBar";

import { BiPlus, BiMinus } from "react-icons/bi";
import { useFilter } from "./context/filter-context";
const SliderRange = ({ sliderRange }) => {
  const { SetMinPrice, SetMaxPrice, maxPrice,
    minPrice } = useFilter();

  const [priceShow, setPriceShow] = useState(true);

  const maxPriceChange = (maxValue) => {
    SetMaxPrice(maxValue);
  };

  const minPriceChange = (minValue) => {
    SetMinPrice(minValue);
  };

  React.useEffect(() => {
    console.log(minPrice);
    console.log(maxPrice);
  }, [maxPrice])

  const handelPriceChange = (min, max) => { };

  return (
    <div className="categoryContainer">
      <div>
        {sliderRange.length > 0 && (
          <div className="">
            <button
              type="button"
              className="menuShow filterTitleContainer"
              onClick={() => setPriceShow(!priceShow)}
            >
              <p className="filterTitle">{sliderRange[0].title}</p>
              {priceShow ? <BiMinus /> : <BiPlus />}
            </button>
          </div>
        )}

        {sliderRange.length > 0 && priceShow && (
          <ProgressBar
            min={sliderRange[0].min_value}
            max={sliderRange[0].max_value}
            onChange={({ min, max }) => handelPriceChange(min, max)}
            minPriceChange={minPriceChange}
            maxPriceChange={maxPriceChange}
          />
        )}
      </div>
    </div>
  );
};

export default SliderRange;
