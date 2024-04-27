import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "react-bootstrap";
import CommonHorizontalCard from "../../componets/CommonHorizontalCard";
import CommonSubHeading from "../../componets/CommonSubHeading";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Bundel = ({ bundelArray }) => {
  const { t } = useTranslation();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
      // partialVisibilityGutter : 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      // partialVisibilityGutter: 40,
    },
    largeMobile: {
      breakpoint: { max: 768, min: 576 },
      items: 2,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
      partialVisibilityGutter: 40,
    },
  };

  const colorArray = {
    0: "#D7D7FF",
    1: "#F2F99F",
    2: "#D7D7FF",
  };

  const buttonColor = {
    0: "#24247E",
    1: "#ca7b1f",
    2: "#24247E",
  };

  const setPadding = "4px 8px 4px 0px";

  return (
    <div className="Deal">
      <Container className="maxWidthContainerFluid excitingSection" fluid>
        <CommonSubHeading
          heading={t("home.bundleDealsTitle")}
          title={true}
          viewAll={true}
        />

        <Carousel responsive={responsive} partialVisible={true}>
          {bundelArray.map((each, i) => (
            <CommonHorizontalCard
              key={i}
              data={each}
              color={colorArray[i.toString().slice(-1)]}
              buttonColor={buttonColor[i.toString().slice(-1)]}
              setWidth={true}
              backwhite={true}
              countdownStyle={{}}
              setPadding={setPadding}
            />
          ))}
        </Carousel>
      </Container>
    </div>
  );
};

export default Bundel;
