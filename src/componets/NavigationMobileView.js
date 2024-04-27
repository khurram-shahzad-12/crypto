import React, { useState, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import UseCategoryHook from "./UseCategoryHook";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { BsChevronLeft, BsXCircle } from "react-icons/bs";
import { apiSelector } from "../../src/store/Api_middelware";
import RegisterCommonModal from "../views/RegisterComponent/RegisterCommonModal";
import ModalCommonHook from "./ModalCommonHook";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { useTranslation } from "react-i18next";
import { GlobalUserStatus } from "../App";
import { BiChevronRight } from "react-icons/bi";

const NavigationMobileView = () => {
  const { t } = useTranslation();


  const { logout } = useContext(GlobalUserStatus);

  const categoryList = useSelector(apiSelector);
  var menuShow = useSelector((state) => state.hamburger.menuShow);

  const dispatch = useDispatch();

  const closeMenu = () => {
    dispatch({ type: "Open", menuShow: !menuShow });
  };

  const {
    showSubcategory,
    subCategory,
    isHovered,
    showCategoryDependentData,
    brandHover,
    subSubCategory,
    hideMobile,
    getIdList,
  } = UseCategoryHook(categoryList);

  //open sign up modal
  var openModal = useSelector((state) => state.modalShow.openModal);
  const { showModal } = ModalCommonHook();
  //-----//

  const [viewCategory, SetViewCategory] = useState(true);
  const [viewProfile, SetViewProfile] = useState(false);

  const showCategoryList = () => {
    SetViewCategory(true);
    SetViewProfile(false);
  };
  const showProfileList = () => {
    SetViewProfile(true);
    SetViewCategory(false);
  };

  const cookies = new Cookies();
  var useName = "";

  if (cookies.get("jwt_token") !== undefined) {
    const decoded = jwt(cookies.get("jwt_token"));

    useName = decoded.first_name;
  }

  return (
    <>
      <Container fluid className="navigationMobileView ">
        <div className="fixedMobileNav">
          <Row>
            <div style={{ top: "16px", position: "absolute" }}>
              {isHovered && (
                <BsChevronLeft
                  className="backMenu"
                  onClick={(e) => getIdList()}
                />
              )}
              <BsXCircle className="cancelMenu" onClick={closeMenu} />
            </div>
          </Row>
          <Row className="userLogin">
            <div>
              <img src="/Assets/account_circle.png" alt="cancel" className="" />
            </div>

            {cookies.get("jwt_token") !== undefined ? (
              <div className="userName">
                <span>{useName}</span>
              </div>
            ) : (
              <div className="welcomeUser">
                <span>{t("navigation.welcomeUser")}</span>
              </div>
            )}

            {cookies.get("jwt_token") === undefined && (
              <div className="sign_up">
                <span onClick={(e) => showModal("login")}>
                  {t("navigation.signIn")}
                </span>{" "}
                /{" "}
                <span onClick={(e) => showModal("signup")}>
                  {t("navigation.signUp")}
                </span>
              </div>
            )}
          </Row>
          <div
            className="row"
            style={{ marginTop: "140px", textAlign: "center", height: "36px" }}
          >
            <div
              className="col-6 colTab categoryBtn"
              style={{ background: `${viewCategory ? "#E5F0FD" : "#FAFAFA"}` }}
              onClick={showCategoryList}
            >
              <img
                src="/Assets/blackMenu.svg"
                alt="menu"
                style={{ paddingBottom: "3px" }}
              />{" "}
              &nbsp; {t("navigation.category")}
            </div>
            <div
              className="col-6 colTab profileBtn"
              onClick={showProfileList}
              style={{ background: `${viewProfile ? "#E5F0FD" : "#FAFAFA"}` }}
            >
              <img
                src="/Assets/account_circlegrey.png"
                alt="menu"
                style={{ paddingBottom: "3px" }}
              />{" "}
              &nbsp; {t("navigation.profile")}
            </div>
          </div>
        </div>
        {viewCategory && (
          <>
            {!isHovered && (
              <div className="menuList">
                <ul style={{ paddingBottom: "0px" }}>
                  {categoryList.data.length > 0 &&
                    categoryList.data.map((each, i) => (
                      <li
                        key={i}
                        onClick={(e) => showSubcategory(each.category_id)}
                      >
                        {each.category_name}
                        {each.subcategory.length > 1 && (
                          <div>
                            <BiChevronRight />
                          </div>
                        )}
                      </li>
                    ))}
                </ul>
                <div
                  style={{
                    background: "#0055B8",
                    color: "#ffffff",
                    padding: "13px 26px",
                    margin: "0px -12px",
                    fontSize: "12px",
                  }}
                >
                  {t("navigation.moreLinks")}
                </div>
                <div>
                  <ul style={{ paddingTop: "0px" }}>
                    <li>
                      <NavLink to="/perfumes" className="" onClick={closeMenu}>
                        {" "}
                        {t("navigation.perfume")}{" "}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/clearance" className="" onClick={closeMenu}>
                        {" "}
                        {t("navigation.clearance")}{" "}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/categories/pre-owned" onClick={closeMenu}>
                        {" "}
                        {t("navigation.preowned")}{" "}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/saver-zone" onClick={closeMenu}>
                        {" "}
                        {t("navigation.saverZone")}{" "}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/deals-of-the-day" onClick={closeMenu}>
                        {" "}
                        {t("navigation.deal")}{" "}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/deals/Top-Selling-Products"
                        onClick={closeMenu}
                      >
                        {" "}
                        {t("navigation.topSellingProduct")}{" "}
                      </NavLink>
                    </li>
                    <li>World Tennis League</li>
                  </ul>
                </div>
              </div>
            )}

            {isHovered && !hideMobile && (
              <div style={{ paddingTop: "183px" }}>
                <ul>
                  <li>
                    {subCategory[0] !== undefined && (
                      <NavLink
                        to={`/categories/${subCategory[0].url}`}
                        style={{ color: "#0D69E0", fontWeight: "700" }}
                      >
                        {t("global.viewAll")}
                      </NavLink>
                    )}
                  </li>
                  {subCategory !== undefined &&
                    subCategory[0] !== undefined &&
                    subCategory[0].subcategory.length > 0 &&
                    subCategory[0].subcategory.map((each) => (
                      <React.Fragment key={each.sub_category_id}>
                        {each.sub_subcategory.length === 0 ? (
                          <NavLink
                            to={`/products-category/${each.url}`}
                            onClick={closeMenu}
                          >
                            <li
                              onClick={(e) =>
                                showCategoryDependentData(each.sub_category_id)
                              }
                            >
                              {each.sub_category_name}
                            </li>
                          </NavLink>
                        ) : (
                          <li
                            key={each.sub_category_id}
                            onClick={(e) =>
                              showCategoryDependentData(each.sub_category_id)
                            }
                          >
                            {each.sub_category_name}
                            <div>
                              <BiChevronRight />
                            </div>
                          </li>
                        )}
                      </React.Fragment>
                    ))}
                </ul>
              </div>
            )}
            {brandHover && (
              <div style={{ paddingTop: "183px" }}>
                <ul>
                  <li onClick={closeMenu}>
                    {" "}
                    {subSubCategory !== undefined && (
                      <NavLink
                        to={`/products-category/${subSubCategory.url}`}
                        style={{ color: "#0D69E0", fontWeight: "700" }}
                      >
                        {t("global.viewAll")}
                      </NavLink>
                    )}
                  </li>
                  {subSubCategory.sub_subcategory !== undefined &&
                    subSubCategory.sub_subcategory.length > 0 &&
                    subSubCategory.sub_subcategory.map((each) => (
                      <NavLink
                        to={`/products-subcategory/${each.url}`}
                        key={each.sub_subcategory_id}
                      >
                        <li onClick={closeMenu}>{each.sub_subcategory_name}</li>
                      </NavLink>
                    ))}
                </ul>
              </div>
            )}
          </>
        )}
        {viewProfile && (
          <>
            <div className="menuList">
              <ul>
                <li>
                  <NavLink to="/myaccount" onClick={closeMenu}>
                    {t("navigation.order")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/myaccount" onClick={closeMenu}>
                    {t("navigation.wishlist")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/myaccount" onClick={closeMenu}>
                    {t("navigation.trackOrder")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/myaccount" onClick={closeMenu}>
                    {t("navigation.complaints")}{" "}
                  </NavLink>
                </li>
                <li onClick={closeMenu}>
                  <NavLink to="/contact-us">
                    {t("navigation.contactUs")}
                  </NavLink>
                </li>
                <li onClick={closeMenu}>
                  <NavLink to="/deals/Top-Selling-Products">
                    {t("navigation.topSellingProduct")}
                  </NavLink>
                </li>
              </ul>
            </div>
            <div
              style={{
                background: "#0055B8",
                color: "#ffffff",
                padding: "13px 26px",
                margin: "0px -12px",
                fontSize: "12px",
              }}
            >
              {t("navigation.moreLinks")}
            </div>
            <div>
              <ul style={{ paddingTop: "0px" }}>
                <li>
                  <NavLink to="/return-policy" onClick={closeMenu}>
                    {t("navigation.warranty")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/privacy-policy" onClick={closeMenu}>
                    {t("navigation.policy")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/terms-and-conditions" onClick={closeMenu}>
                    {t("navigation.term")}
                  </NavLink>
                </li>
                {cookies.get("jwt_token") != undefined && (
                  <li>
                    <NavLink to="/" onClick={function (event) { logout(); closeMenu(); }}>
                      Sign out
                    </NavLink>
                  </li>
                )}

              </ul>
            </div>
          </>
        )}
      </Container>
      {openModal && <RegisterCommonModal />}
    </>
  );
};

export default NavigationMobileView;
