import React from "react";
import { Container } from "react-bootstrap";
import Slider from "../Home/Slider";
import {
  YellowOutlineCard,
  CommonSubCategorySection,
  SubcategoryProductList,
  CommonItemList,
  MostPicked,
} from "../Perfumes";
import { useTranslation } from "react-i18next";

const PerfumeSection = ({ perfumeData }) => {
  const { t } = useTranslation();
  const border = "3px solid #36a7b9";
  const background = "#ceeff3";
  const borderRadius = "3px";

  return (
    <>
      {perfumeData !== undefined && (
        <div className="categoryPage">
          <div className="maxWidthContainerFluid paddingContainerFluid container-fluid">
            {perfumeData.slider_images.length > 0 && (
              <Slider carouselList={perfumeData.slider_images} />
            )}
          </div>
          {perfumeData.hasOwnProperty("special_deals") && perfumeData.special_deals.items.length > 0 && (
            <Container fluid className="maxWidthContainerFluid">
              <div className="subCategoryTitle" style={{ color: "#c90101" }}>
                {t("perfume.splDeal")}
              </div>
              <YellowOutlineCard
                data={perfumeData.special_deals.items}
                border={border}
                type="perfume"
              />
            </Container>
          )}
          <Container fluid className="maxWidthContainerFluid">
            {/* <div className="subCategoryTitle" style={{ color: "#c90101" }}>
              {perfumeData.shop_by_category.title}
            </div> */}
            <div className={perfumeData.shop_by_category.list_css}>
              <CommonSubCategorySection
                data={perfumeData.shop_by_category.items}
                borderRadius={borderRadius}
                type={"perfume"}
              />
            </div>
          </Container>
          {perfumeData.hasOwnProperty("Combo Deals") && perfumeData["Combo Deals"].length > 0 && (
            <Container
              fluid
              className="maxWidthContainerFluid mb-3 pb-5"
              style={{ background: "#fdfcd1", marginTop: "25px" }}
            >
              <div className="subCategoryTitle" style={{ color: "#c90101" }}>
                {t("perfume.comboDeal")}
              </div>
              <YellowOutlineCard
                data={perfumeData["Combo Deals"]}
                border={"1px solid #a01944"}
                type="perfume"
              />
            </Container>
          )}
          {perfumeData.hasOwnProperty("most_picked") && perfumeData.most_picked.items.length > 0 && (
            <Container fluid className="maxWidthContainerFluid">
              <MostPicked data={perfumeData.most_picked} />
            </Container>
          )}
          {perfumeData.categories.length > 0 && (
            <Container fluid className="maxWidthContainerFluid">
              <SubcategoryProductList
                data={perfumeData.categories}
                background={background}
              />
            </Container>
          )}
          <Container
            fluid
            className="maxWidthContainerFluid"
            style={{ background: "#FFFFFF" }}
          >
            <CommonItemList />
          </Container>
        </div>
      )}
    </>
  );
};

export default PerfumeSection;
