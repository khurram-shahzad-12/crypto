import React from "react";
import YellowOutlineCard from "../../componets/YellowOutlineCard";
import CommonItemRow from "../../componets/CommonItemRow";
import { Container } from "react-bootstrap";
import Slider from "../Home/Slider";

const DealSection = ({ data }) => {
  const border = "2px solid #efc639";

  return (
    <>
      {data !== undefined && (
        <div>
          <div className="maxWidthContainerFluid paddingContainerFluid container-fluid">
            {data.banner_image !== " " && (
              <Slider carouselList={data.banner_image} />
            )}
          </div>
          <Container fluid className="maxWidthContainerFluid mt-3">
            <YellowOutlineCard
              data={data.hot_deals}
              border={border}
              type="perfume"
            />
          </Container>
          <div style={{ background: "#dff4ff" }}>
            <Container fluid className="maxWidthContainerFluid mt-3 pt-4 pb-4">
              <CommonItemRow items={data.items} />
            </Container>
          </div>
        </div>
      )}
    </>
  );
};

export default DealSection;
