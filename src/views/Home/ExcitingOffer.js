import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CommonHorizontalCard from "../../componets/CommonHorizontalCard";
import { Container } from "react-bootstrap";
import CommonSubHeading from "../../componets/CommonSubHeading";
import { useTranslation } from "react-i18next";

const ExcitingOffer = ({ exictingOffers }) => {
  const { t } = useTranslation();
console.log(exictingOffers)


  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 40,
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
    0: "#F2F99F",
    1: "#FFE8D9",
    2: "#C4E9FB",
    3: "#DFDFFC",
    4: "#F2F99F",
    5: "#FFE8D9",
    6: "#C4E9FB",
    7: "#DFDFFC",
    8: "#F2F99F",
    9: "#FFE8D9",
  };

  const buttonColor = {
    0: "#525625",
    1: "#7A3000",
    2: "#085073",
    3: "#24247E",
    4: "#525625",
    5: "#7A3000",
    6: "#085073",
    7: "#24247E",
    8: "#525625",
    9: "#7A3000",
  };

  const countdownStyle = {
    background: "#FD7900",
    color: "#ffffff",
  };
  
  const setPadding = "4px 8px 4px 6px";

  return (
    <>
      {exictingOffers.length > 0 && (
        <Container className="maxWidthContainerFluid excitingSection" fluid>
          <CommonSubHeading
            heading={t("home.excitingTitle")}
            title={true}
            viewAll={false}
          />
          <Carousel responsive={responsive} partialVisible={true}>
            {exictingOffers.map((each, i) => (
              <CommonHorizontalCard
                key={i}
                data={each}
                color={colorArray[i.toString().slice(-1)]}
                buttonColor={buttonColor[i.toString().slice(-1)]}
                setWidth={true}
                countdownStyle={countdownStyle}
                setPadding={setPadding}
              />
            ))}
          </Carousel>
        </Container>
      )}
    </>
  );
};

export default ExcitingOffer;
