import React from "react";
import {
  YellowOutlineCard,
  CommonSubCategorySection,
  CommonTopBrands,
  SubcategoryProductList,
  CommonItemList,
} from "../CategoryPage";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { apiSelector } from "../../store/Api_middelware";
import { useTranslation } from "react-i18next";
import Slider from "../Home/Slider";
import InfiniteScroll from "react-infinite-scroll-component";

const CategorySection = ({ categoryData, item, slug }) => {
  const { t } = useTranslation();

  const data = useSelector(apiSelector);

  var subCategoryData = data.data.filter((Element) => Element.url === slug);
  console.log("subCategoryData", subCategoryData)
  if (subCategoryData.length > 0) {
    subCategoryData = subCategoryData[0].subcategory;
  }

  const background = "#d7d7ff";
  const borderRadius = "20%";
  const border = "2px solid #f6af1c";

  return (
    <>
      <div className="categoryPage">
        <div className="maxWidthContainerFluid paddingContainerFluid container-fluid">
          {categoryData.category_image !== " " && (
            <Slider carouselList={categoryData.category_image} />
          )}
        </div>
        <Container fluid className="maxWidthContainerFluid mt-4">
          {/* <div className="row product-shop-main"> */}
            <CommonSubCategorySection
              data={subCategoryData}
              borderRadius={borderRadius}
              type={"category"}
            />
          {/* </div> */}
        </Container>
        {/* <Container fluid className="maxWidthContainerFluid">
          <div className="subCategoryTitle">{t("category.subcategory")}</div>
          <CommonSubCategorySection
            data={subCategoryData}
            borderRadius={borderRadius}
            type={"category"}
          />
        </Container> */}
        <Container fluid className="maxWidthContainerFluid">
          <div className="subCategoryTitle">{t("category.hotdeal")}</div>
          <YellowOutlineCard data={categoryData.hot_deals} border={border} />
        </Container>
        <Container fluid className="maxWidthContainerFluid">
          <CommonTopBrands data={categoryData.top_brands} />
        </Container>
        <Container fluid className="maxWidthContainerFluid">
          <SubcategoryProductList
            data={categoryData.categories}
            background={background}
          />
        </Container>
        <div style={{ background: "#FFF1EB" }}>
          <Container fluid className="maxWidthContainerFluid">
            <CommonItemList data={item} categorysection={true} />
          </Container>
        </div>
        
      </div>
    </>
  );
};

export default CategorySection;
