import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Filters from "./Filters";
import { Products } from "./Products";
import Modal from "react-bootstrap/Modal";
import TopBrands from "./TopBrands";
import { useTranslation } from "react-i18next";
import { useFilter } from "./context/filter-context";
import CommonSubsubCategorySection from "../../componets/CommonSubsubCategorySection";
import AllFilters from "./AllFilters";
import SortBy from "./SortBy";
import { useParams, useNavigate } from "react-router-dom";
import CommonBreadCrumb from "../../componets/CommonBreadCrumb";
import { VscFilterFilled } from "react-icons/vsc";
import Slider from "../Home/Slider";
import { useSelector } from "react-redux";
import { apiSelector } from "../../store/Api_middelware";
import { Loadingsearchproducts } from './LoadingPosts';

const Productfilters = ({ data ,subcategory_id}) => {
  const routerHistory = useParams();

  const { t } = useTranslation();
  const {
    DisplayItems,
    setDisplayItems,
    isMobile,
    loaderStatus,
    location,
    show,
    handleShow,
    fullscreen,
    handleClose,
  } = useFilter();


  const subcategoryDataRedux = useSelector(apiSelector);

  var subCategoryData = subcategoryDataRedux.data.filter((element) =>
    element.subcategory.some((subElement) => subElement.url == routerHistory.slug))
    .map(element => {
      return Object.assign({}, element, { subcategory: element.subcategory.filter(subElement => subElement.url == routerHistory.slug)[0].sub_subcategory });
    });
  if (subCategoryData.length > 0) {
    subCategoryData = subCategoryData[0].subcategory;
  }

  const borderRadius = "20%";


  return (
    <div>
      {DisplayItems.hasOwnProperty("filters") ? (
        <Container
          fluid
          className="maxWidthContainerFluid paddingContainerFluid"
        >
          <Container fluid className="maxWidthContainerFluid">
            <CommonBreadCrumb data={data} />
          </Container>
          <Row>
            <Col xs={12} lg={3} xxl={3} xl={3}>
              <Filters filters={DisplayItems.filters} subcategory_id={subcategory_id}/>
            </Col>

            <Col xs={12} lg={9} className="mt-1">
              <>
                {DisplayItems.hasOwnProperty("display_items") &&
                  DisplayItems.display_items.hasOwnProperty("banners") && (
                    <Slider carouselList={DisplayItems.display_items.banners} />
                )}
                <Col xs={12} md={12}>
                  {DisplayItems.hasOwnProperty("display_items") &&
                    DisplayItems.display_items.hasOwnProperty("top_brands") &&
                    DisplayItems.display_items.top_brands.length > 0 && (
                      <TopBrands
                        TopBrands={DisplayItems.display_items.top_brands}
                      />
                    )}
                </Col>
                <Col xs={12} md={12}>
                  {subCategoryData.length > 0 &&
                    <CommonSubsubCategorySection
                      data={subCategoryData}
                      borderRadius={borderRadius}
                      type={"category"}
                    />
                  }
                </Col>
                <Col xs={12} className="sortBy mb-2">
                  <Col>
                    {DisplayItems.hasOwnProperty("display_items") &&
                      DisplayItems.display_items.hasOwnProperty(
                        "top_brands"
                      ) && <SortBy />}
                  </Col>
                </Col>
                <Col>
                  <button
                    type="button"
                    className="filterImage"
                    onClick={() => handleShow("lg-down")}
                  >
                    <VscFilterFilled style={{ color: "#fff", fill: "#fff" }} />
                  </button>
                </Col>

                <Col xs={12} md={12}>
                  {loaderStatus ? (
                    <div style={{ height: "50vh" }}>
                      <div className="loading-indicator"></div>
                    </div>
                  ) : (
                    <>
                      <AllFilters />
                      {DisplayItems.hasOwnProperty("display_items") && (
                        <Products
                          products={DisplayItems.display_items.products}
                        />
                      )}
                    </>
                  )}
                </Col>
              </>
            </Col>
          </Row>
        </Container>
      ) : 
      <Loadingsearchproducts />}
    </div>
  );
};

export default Productfilters;
