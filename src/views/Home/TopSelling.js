import React from "react";
import { Container } from "react-bootstrap";
import CommonHorizontalCard from "../../componets/CommonHorizontalCard";
import CommonSubHeading from "../../componets/CommonSubHeading";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useTranslation } from "react-i18next";

const TopSelling = ({ topselling }) => {
  const { t } = useTranslation();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
      // partialVisibilityGutter : 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      partialVisibilityGutter: 40,
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
    0: "#DFDFFC",
    1: "#FFE4D7",
    2: "#C4E9FB",
    3: "#FFE4D7",
  };

  const buttonColor = {
    0: "#24247E",
    1: "#FD7900",
    2: "#24247E",
    3: "#FD7900",
  };

  const setPadding = "4px 8px 4px 0px";

  return (
    <>
      {topselling.length > 0 && (
        <Container className="maxWidthContainerFluid excitingSection" fluid>
          <CommonSubHeading
            heading={t("home.topsellingTitle")}
            title={true}
            viewAll={true}
          />
          <Carousel responsive={responsive} partialVisible={true}>
            {topselling.map((each, i) => (
              <CommonHorizontalCard
                key={i}
                data={each}
                color={colorArray[i.toString().slice(-1)]}
                buttonColor={buttonColor[i.toString().slice(-1)]}
                setWidth={true}
                countdownStyle={{}}
                setPadding={setPadding}
              />
            ))}
          </Carousel>
        </Container>
      )}
    </>
  );
};

export default TopSelling;
