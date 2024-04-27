import React from "react";
import { FilterProvider } from "../SearchResult/context/filter-context";
import { useParams } from "react-router-dom";
import BrandCategoryPage from "./BrandCategoryPage";

const BrandPage = () => {
  var { slug } = useParams();
  const data = [{ slug: slug, link: "brands" }];

  return (
    <FilterProvider>
      <BrandCategoryPage data={data} />
    </FilterProvider>
  );
};

export default BrandPage;
