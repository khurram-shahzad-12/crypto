import React from "react";
import CommonCard from "./CommonCard";
import { Row } from "react-bootstrap";

const CommonItemRow = ({ type,items, categorysection }) => {
  return (
    <Row className={`row-cols-sm-6 row-cols-md-4 ${type == 'non-infinite' ? "row-cols-lg-6" : "row-cols-lg-5" } cardMargin`}>
      {items.length > 0 &&
        items.map((each, i) => (
          <div className="col-6 col-sm-6 col-md-4 col-lg-21 cardPadding" key={i}>
            <CommonCard
              data={each}
              type="heart"
              categorysection={categorysection}
            />
          </div>
        ))}
    </Row>
  );
};

export default CommonItemRow;
