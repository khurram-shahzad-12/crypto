import React from "react";
import { Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { BsX } from "react-icons/bs";
import { useFilter } from "./context/filter-context";
const AllFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filterArray } = useFilter();

  const fliterclick = (title, value) => {
    const ParamsValue = searchParams.get(title);
    var paramsArray = ParamsValue.split(",");
    var filteredArray = paramsArray.filter((ele) => ele !== value);
    searchParams.set(title, filteredArray.toString());
    if (filteredArray.length <= 0) {
      searchParams.delete(title);
    }
    setSearchParams(searchParams);
  };

  const clearFilterArray = () => {
    filterArray.map((ele) => {
      searchParams.delete(ele.title);
      setSearchParams(searchParams);
    });
  };

  return (
    <Col>
      <div className="d-flex justify-content-between">
        <div>
          {filterArray.map((item, idn) =>
            item.value.map((ele, index) => (
              <button
                key={idn + ele}
                type="button"
                className="fliterclick mx-1"
                onClick={() => fliterclick(item.title, ele)}
              >
                {item.label[index]}
                <BsX />
              </button>
            ))
          )}
        </div>
        {filterArray.length > 0 && (
          <button
            type="button"
            className="clearFilterArray"
            onClick={clearFilterArray}
          >
            Clear
          </button>
        )}
      </div>
    </Col>
  );
};

export default AllFilters;
