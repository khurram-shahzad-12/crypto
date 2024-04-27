import React, { useCallback, useEffect, useState, useRef } from "react";
import classnames from "classnames";
import { useFilter } from "../SearchResult/context/filter-context";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

const ProgressBar = ({
  min,
  max,
  onChange,
  minPriceChange,
  maxPriceChange,
}) => {
  const { setcallSliderRange, maxPrice, minPrice } = useFilter();
  const [searchParams, setSearchParams] = useSearchParams();
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  useEffect(() => {

    if (minPrice > 0) {
      setMinVal(minPrice);
    } else {
      setMinVal(min);
    }

    if (maxPrice > 0) {
      setMaxVal(maxPrice);
    } else {
      setMaxVal(max);
    }

  }, [min, minPrice, maxPrice, max]);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  const priceChange = (l, h) => {
    minPriceChange(l);
    setcallSliderRange(true);
    maxPriceChange(h);
    searchParams.set("min", l);
    searchParams.set("max", h);
    setSearchParams(searchParams);
  };

  const priceClear = () => {
    setcallSliderRange(true);
    setMinVal(min);
    setMaxVal(max);
    minPriceChange(min);
    maxPriceChange(max);
    searchParams.delete("min");
    searchParams.delete("max");
    setSearchParams(searchParams);
  };

  return (
    <div className="container progressBar">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          setMinVal(value);
          event.target.value = value.toString();
        }}
        className={classnames("thumb thumb--zindex-3", {
          "thumb--zindex-5": minVal > max - 100,
        })}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={(event) => {
          const value = Math.max(+event.target.value, minVal + 1);
          setMaxVal(value);
          event.target.value = value.toString();
        }}
        className="thumb thumb--zindex-4"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="d-flex align-items-center justify-content-center">
          <input
            className="slider__left-value"
            type="number"
            min="0"
            max={max}
            value={minVal}
            placeholder={min}
            onChange={(e) => setMinVal(e.target.value)}
          />
          <div className="slider__to-value w-25">To</div>
          <input
            className="slider__right-value"
            type="number"
            min="0"
            max={max}
            value={maxVal}
            placeholder={max}
            onChange={(e) => setMaxVal(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          type="button"
          className="sliderButton sliderClear m-1"
          onClick={priceClear}
        >
          Clear
        </button>
        <button
          type="button"
          className="sliderButton sliderapply m-1"
          onClick={() => priceChange(minVal, maxVal)}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ProgressBar;
