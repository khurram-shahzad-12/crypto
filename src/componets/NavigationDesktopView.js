import React from "react";
import { NavLink } from "react-router-dom";
import { BsFillCaretRightFill } from "react-icons/bs";
import UseCategoryHook from "./UseCategoryHook";
import { useTranslation } from "react-i18next";

const NavigationDesktopView = ({ categoryList }) => {
  const {
    showSubcategory,
    subCategory,
    isHovered,
    subSubCategory,
    showCategoryDependentData,
    showlast,
    lastHover,
    showBrandById,
    brandIdHover,
    brandId,
    defaultSubSubCategory,
    Setshowcategory,
  } = UseCategoryHook(categoryList);

  const { t } = useTranslation();

  return (
    <>
      <div
        className="category-menu-list"
        style={{
          background: `${categoryList !== undefined && categoryList.data.length > 0
              ? "#e9f0fc"
              : ""
            }`,
          borderLeft: `${categoryList !== undefined && categoryList.data.length > 0
              ? "4px solid #083ea2"
              : ""
            }`,
        }}
      >
        {/* Category list display */}
        <ul className="scroll">
          {categoryList.data.length > 0 &&
            categoryList.data.map((each, i) => (
              <NavLink to={`/categories/${each.url}`} key={i}>
                <li
                  onMouseOver={() => showSubcategory(each.category_id)}
                  onClick={() => Setshowcategory(false)}
                >
                  {each.category_name}
                  {subCategory[0] !== undefined &&
                    subCategory[0].category_id === each.category_id && (
                      <BsFillCaretRightFill
                        style={{
                          float: "right",
                          paddingTop: "5px",
                          color: "#0D69E0",
                          fontSize: "16px",
                        }}
                      />
                    )}
                </li>
              </NavLink>
            ))}
        </ul>
        {/* Sub-Category list display */}
        {isHovered === true && (
          <>
            <div className="nav-menu-list">
              <div className="cat-left-drop-menu-left">
                <span className="category-title">
                  {t("navigation.shopByCategory")}
                </span>
                <ul className="subCategoryUl">
                  {subCategory[0].subcategory.length > 0 &&
                    subCategory[0].subcategory.map((subcat, i) => (
                      <NavLink
                        key={i}
                        to={`/products-category/${subcat.url}`}
                        state={{ from: `${subcat.sub_category_id}` }}
                        subcstid={i}
                      >
                        <li
                          onMouseOver={() =>
                            showCategoryDependentData(subcat.sub_category_id)
                          }
                          onClick={() => Setshowcategory(false)}
                          style={{
                            borderLeft: `${subSubCategory !== undefined &&
                                subSubCategory.sub_category_id ===
                                subcat.sub_category_id
                                ? "4px solid #0D69E0"
                                : "none"
                              }`,
                            color: `${subSubCategory !== undefined &&
                                subSubCategory.sub_category_id ===
                                subcat.sub_category_id
                                ? "#0D69E0"
                                : "#000000"
                              }`,
                            backgroundColor: `${subSubCategory !== undefined &&
                                subSubCategory.sub_category_id ===
                                subcat.sub_category_id
                                ? "#FAFAFA"
                                : "#FFFF"
                              }`,
                          }}
                        >
                          {subcat.sub_category_name}
                          {subSubCategory !== undefined &&
                            subSubCategory.sub_category_id ===
                            subcat.sub_category_id && (
                              <BsFillCaretRightFill
                                style={{
                                  float: "right",
                                  paddingTop: "5px",
                                  color: "#0D69E0",
                                  fontSize: "16px",
                                }}
                              />
                            )}
                        </li>
                      </NavLink>
                    ))}
                </ul>
              </div>
            </div>
          </>
        )}
        {/* Sub-sub-Category list display */}
        {Object.keys(subSubCategory).length > 0 &&
          (subSubCategory.sub_subcategory.length > 0 ||
            subSubCategory.brands.length > 0) && (
            <div className="cat-left-drop-menu" style={{ paddingTop: "16px" }}>
              <div className="cat-left-drop-menu-left">
                <div className="mega-menu">
                  <div className="mega-catagory">
                    {subSubCategory.sub_subcategory !== undefined &&
                      subSubCategory.sub_subcategory.length > 0 && (
                        <>
                          <div>
                            <span className="category-title">
                              {t("navigation.shopBySubCategory")}
                            </span>
                            <ul className="subsubcategoryul">
                              {subSubCategory.sub_subcategory !== undefined &&
                                subSubCategory.sub_subcategory.length > 0 &&
                                subSubCategory.sub_subcategory.map(
                                  (each, ind) => (
                                    <NavLink
                                      to={`/products-subcategory/${each.url}`}
                                      key={ind}
                                    >
                                      <li
                                        onMouseOver={() =>
                                          showlast(each.sub_subcategory_id)
                                        }
                                        onClick={() => Setshowcategory(false)}
                                        style={{
                                          backgroundColor: `${lastHover === true &&
                                              defaultSubSubCategory !== "" &&
                                              defaultSubSubCategory ===
                                              each.sub_subcategory_id
                                              ? "#FAFAFA"
                                              : "#FFFFFF"
                                            }`,
                                          color: `${lastHover === true &&
                                              defaultSubSubCategory !== "" &&
                                              defaultSubSubCategory ===
                                              each.sub_subcategory_id
                                              ? "#0D69E0"
                                              : "#000000"
                                            }`,
                                        }}
                                      >
                                        {each.sub_subcategory_name}
                                      </li>
                                    </NavLink>
                                  )
                                )}
                            </ul>
                          </div>
                        </>
                      )}
                    {subSubCategory.brands !== undefined &&
                      subSubCategory.brands.length > 0 && (
                        <>
                          <div>
                            <span className="category-title">
                              {t("navigation.topBrands")}
                            </span>
                            <ul
                              style={{ width: "247px" }}
                              className="brandScroll"
                            >
                              {subSubCategory.brands !== undefined &&
                                subSubCategory.brands.length > 0 &&
                                subSubCategory.brands.map((each, i) => (
                                  <li
                                    key={i}
                                    onMouseOver={() =>
                                      showBrandById(each.brand_id)
                                    }
                                    onClick={() => Setshowcategory(false)}
                                    style={{
                                      borderLeft: `${brandIdHover === true &&
                                          brandId !== "" &&
                                          brandId.brand_id === each.brand_id
                                          ? "4px solid #0D69E0"
                                          : "none"
                                        }`,
                                      backgroundColor: `${brandIdHover === true &&
                                          brandId !== "" &&
                                          brandId.brand_id === each.brand_id
                                          ? "#FAFAFA"
                                          : "#FFFFFF"
                                        }`,
                                    }}
                                  >
                                    <NavLink
                                      to={`/brands/${each.url}/${each.subcategory_id}`}
                                      state={{
                                        category: `${subSubCategory.category_id}`,
                                        subcategory: `${each.subcategory_id}`,
                                      }}
                                      style={{
                                        color: `${brandIdHover === true &&
                                            brandId !== "" &&
                                            brandId.brand_id === each.brand_id
                                            ? "#0D69E0"
                                            : "#000000"
                                          }`,
                                      }}
                                    >
                                      {each.name}
                                    </NavLink>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </>
                      )}
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default NavigationDesktopView;
