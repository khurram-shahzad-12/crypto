import React from "react";
import { Card } from "react-bootstrap";

const CardPlaceholder = ({ heading }) => {
  return (
    <>
      <Card
        className={`${
          heading === "Clearance Sale"
            ? "dealOfDay flex-row-reverse"
            : "dealOfDay flex-row"
        }`}
        style={{
          backgroundColor: `#D9D9D9`,
          border: "none",
        }}
      >
        <div className="dealImage"> </div>
        <div
          className={`${heading === "Clearance Sale" ? "mx-3 my-3" : "my-3"}`}
        >
          {heading === "Deal Of The Day" && (
            <div className="dealWatchCountdown"></div>
          )}

          <p className="dealPrice"></p>
          <p className="oldPrice"></p>
          <p
            className=""
            style={{
              background: "rgb(239 235 235)",
              width: "77px",
              height: "30px",
            }}
          >
            {" "}
          </p>
          <div className="dealText">
            <p className="dealText1"></p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CardPlaceholder;
