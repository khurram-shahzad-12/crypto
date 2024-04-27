import React from "react";
import Productfilters from "../SearchResult/Productfilters";
import { useFilter } from "../SearchResult/context/filter-context";
import { useParams,useSearchParams } from "react-router-dom";
import call_apis from "../../services/Apis";

const ProductPage = ({ data }) => {
  const { setDisplayItems, DisplayItems } = useFilter();
  const [searchParams, setSearchParams] = useSearchParams();

  var { slug } = useParams();

  const getprojectdetails = async () => {
    const page = 1;
    const response = await call_apis.subcategoryData(slug, page);
    setDisplayItems(response.data.data);
  };

  React.useEffect(() => {
    var queryObj = {};
    for (const entry of searchParams.entries()) {
      queryObj = Object.fromEntries([...searchParams]);
    }

    var finalInput = Object.entries(queryObj).map(([key, value]) => ({
      title: key,
      value: value.split(",").map((ele) => ele.split("_")[0]),
    }))

    if (finalInput.length <= 0) {
      getprojectdetails();
    }else{
      // getprojectdetails();
    }
  }, [searchParams,slug]);

  React.useEffect(() => {
    var queryObj = {};
    for (const entry of searchParams.entries()) {
      queryObj = Object.fromEntries([...searchParams]);
    }

    var finalInput = Object.entries(queryObj).map(([key, value]) => ({
      title: key,
      value: value.split(",").map((ele) => ele.split("_")[0]),
    }))

      getprojectdetails();
  }, [slug]);



  return (
    <>
      {

        DisplayItems.hasOwnProperty("filters") ? (
          <Productfilters data={data} />
        ) : (
          <div style={{ height: "50vh" }}>
            <div className="loading-indicator"></div>
          </div>
        )
      }
    </>
  );
};

export default ProductPage;
