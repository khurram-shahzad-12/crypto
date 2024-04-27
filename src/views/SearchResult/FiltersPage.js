import React from "react";
import CustomCheckboxTree from "./CustomCheckboxTree";
import CustomCheckbox from "./CustomCheckbox";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useFilter } from "./context/filter-context";
import { useParams, useSearchParams } from "react-router-dom";
import SliderRange from "./SliderRange";
import { useTranslation } from "react-i18next";

const FiltersPage = ({ filters }) => {
  const {
    isMobile,
    show,
    fullscreen,
    handleClose,
  } = useFilter();
  const { t } = useTranslation();
  return (

    <>
      {isMobile ? (
        <Modal
          show={show}
          fullscreen={fullscreen}
          onHide={handleClose}
          centered
          className="modellearn"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton className="d-flex flex-column">
            <div className="filterTille">{t("subCategory.filter")}</div>
          </Modal.Header>
          <Modal.Body>
            <div className="categoryContainer ">
              <div>
                <CustomCheckboxTree categories={filters.categories} />
              </div>

              <div>
                {filters.slider_range.length > 0 && (
                  <SliderRange sliderRange={filters.slider_range} />
                )}
              </div>

              {filters.checkbox.map((ele) => (
                <React.Fragment key={ele.title}>
                  <CustomCheckbox data={ele} /> <div className="divider"></div>
                </React.Fragment>
              ))}
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        <div className="categoryContainer ">
          <div>
            <CustomCheckboxTree categories={filters.categories} />
          </div>

          <div>
            {filters.slider_range.length > 0 && (
              <SliderRange sliderRange={filters.slider_range} />
            )}
          </div>

          {filters.checkbox.map((ele) => (
            <React.Fragment key={ele.title}>
              <CustomCheckbox data={ele} /> <div className="divider"></div>
            </React.Fragment>
          ))}
        </div>
      )}
    </>



  );
};

export default FiltersPage;
