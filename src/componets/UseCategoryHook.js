import { useState, useContext } from "react";
import { GlobalUserStatus } from "../App";

const UseCategoryHook = (categoryList) => {
  const [subCategory, SetSubCategory] = useState([]);
  const [subSubCategory, SetSubSubCategory] = useState({});
  const [isHovered, SetIsHovered] = useState(false);
  const [brandHover, SetBrandHover] = useState(false);
  const [lastHover, SetLastHover] = useState(false);
  const [subSubCategoryId, SetSubSubCategoryId] = useState({});
  const [brandId, SetBrandId] = useState({});
  const [brandIdHover, SetBrandIdHover] = useState({});
  const [hideMobile, SetHideMobile] = useState(false);
  const [categoryId, SetCategoryId] = useState({});
  const [defaultSubSubCategory, SetDefaultSubSubCategory] = useState("");
  const { showcategory, Setshowcategory, showcategorylist } =
    useContext(GlobalUserStatus);

  var getId = {};
  //show Category list Filter category by id
  const showSubcategory = (category_id) => {
    try {
      Object.assign(getId, { category_id: category_id });
      SetCategoryId(getId);
      SetSubCategory(
        categoryList.data.filter(
          (Element) => Element.category_id === category_id
        )
      );

      let subCategoryDatabyId = categoryList.data.filter(
        (Element) => Element.category_id === category_id
      )[0].subcategory;

      let SubSubCategory = subCategoryDatabyId[0].sub_subcategory;

      if (subCategoryDatabyId && subCategoryDatabyId.length > 0) {
        SetSubSubCategory(subCategoryDatabyId[0]);
        if (SubSubCategory.length > 0) {
          SetDefaultSubSubCategory(SubSubCategory[0].sub_subcategory_id);
        }
      }

      SetIsHovered(true);
    } catch (error) {
      console.warn(error);
    }
  };

  const handelmenu = () => {
    Setshowcategory(false);
  };

  //show SubCategory list Filter SubCategory by id
  const showCategoryDependentData = (sub_category_id) => {
    try {
      SetCategoryId(
        Object.assign(categoryId, { sub_category_id: sub_category_id })
      );

      let brandList = subCategory[0].subcategory.filter(
        (ele) => ele.sub_category_id === sub_category_id
      );

      if (brandList) {
        SetSubSubCategory(brandList[0]);
      }
      SetHideMobile(true);
      SetBrandHover(true);
    } catch (e) {
      console.log(e);
    }
  };

  // Filter & hover SubsubCategory by id
  const showlast = (getId) => {
    try {
      const setId = subSubCategory.sub_subcategory.filter(
        (ele) => ele.sub_subcategory_id === getId
      );

      if (setId) {
        SetSubSubCategoryId(setId[0]);
      }
      SetLastHover(true);
      SetBrandIdHover(false);
    } catch (e) {
      console.log(e);
    }
  };

  // set hover on brand
  const showBrandById = (getId) => {
    try {
      const setId = subSubCategory.brands.filter(
        (ele) => ele.brand_id === getId
      );
      if (setId) {
        SetBrandId(setId[0]);
      }
      SetBrandIdHover(true);
      SetLastHover(false);
    } catch (e) {
      console.log(e);
    }
  };

  const checkMouseLeave = () => {
    Setshowcategory(false);
  };

  const getIdList = () => {
    if (categoryId.sub_category_id !== undefined) {
      delete categoryId.sub_category_id;
      SetCategoryId(categoryId);
      SetBrandHover(false);
      SetHideMobile(!hideMobile);
    } else if (categoryId.sub_category_id === undefined) {
      SetIsHovered(false);
    }
  };

  return {
    showcategorylist,
    showcategory,
    showSubcategory,
    subCategory,
    isHovered,
    subSubCategory,
    showCategoryDependentData,
    showlast,
    brandHover,
    lastHover,
    subSubCategoryId,
    showBrandById,
    brandIdHover,
    brandId,
    checkMouseLeave,
    hideMobile,
    getIdList,
    SetDefaultSubSubCategory,
    defaultSubSubCategory,
    Setshowcategory,
    handelmenu,
  };
};

export default UseCategoryHook;
