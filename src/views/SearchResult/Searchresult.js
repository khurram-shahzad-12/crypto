import React from "react";
import { FilterProvider } from "./context/filter-context";
import { useParams } from "react-router-dom";
import ProductPage from "./ProductPage";
function Searchresult() {
  var { slug } = useParams();
  const data = [{ slug: `Search Result For '${slug}'`, link: "" }];
  return (
    <FilterProvider>
      <ProductPage data={data} />
    </FilterProvider>
  );
}

export default Searchresult;
