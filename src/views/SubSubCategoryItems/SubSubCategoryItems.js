import React from "react";
import { FilterProvider } from "../SearchResult/context/filter-context";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiSelector } from "../../store/Api_middelware";
import SubCategoryPage from "./SubCategoryPage";

const SubSubCategoryItems = () => {
  const { slug1, slug2 } = useParams();
  const { data } = useSelector(apiSelector);

  const dreadCrum =
    data.length > 0 &&
    data.map((each) => each.subcategory.filter((ele) => ele.url === slug1));
  const crumData =
    dreadCrum.length > 0 && dreadCrum.filter((each) => each.length === 1);

  const catbread =
    data.length > 0 &&
    data.filter((each) => each.category_id === crumData[0][0].category_id);
  const crumData1 =
    crumData.length > 0 &&
    crumData[0][0].sub_subcategory.filter(
      (ele) => ele.url === slug1 + "/" + slug2
    );

    

  const totalbread = [
    {
      slug: catbread.length > 0 && catbread[0].category_name,
      url: catbread.length > 0 && catbread[0].url,
      link: "categories",
    },
    {
      slug: slug1,
      url: crumData.length > 0 && crumData[0][0].url,
      link: "products-category",
    },
    {
      slug: slug2,
      url: crumData1.length > 0 && crumData1[0].url,
      link: "products-subcategory",
    },
  ];

  return (
    <FilterProvider>
      <SubCategoryPage data={totalbread} />
    </FilterProvider>
  );
};

export default SubSubCategoryItems;
