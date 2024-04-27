import React from "react";
import Productfilters from "./Productfilters";
import { useFilter } from "./context/filter-context";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

import axios from "axios";
import { useLocation } from 'react-router-dom';

const ProductPage = ({ data }) => {
  const { setDisplayItems, DisplayItems,SethasMore } = useFilter();

  const [searchParams, setSearchParams] = useSearchParams();

  const statelocation = useLocation();

  const routerHistory = useParams();

  const [response_status, Setresponse_status] = React.useState();

  const navigate = useNavigate();

  if (statelocation.state != null) {
    var subcategory_id = statelocation.state.subcategory_id
  } else {
    var subcategory_id = 'search'
  }
  const getprojectdetails = () => {
    axios
      .get(`api/search_result_items?string=${routerHistory.slug}&subcategory=${subcategory_id}`)
      .then((response) => {
        if (response.status === 200) {
          if (!response.data.data.hasOwnProperty("filters")) {
            var type = response.data.data.type;
            if (type === "search_redirect") {
              let domain = new URL(response.data.data.redirect_url);
              return navigate(domain.pathname);
            } else if (type === "subcategory") {
              return navigate(
                `/products-category/${response.data.data.redirect_url}`
              );
            } else if (type === "brands") {
              return navigate(`/brands/${response.data.data.redirect_url}`);
            }
          } else {
            setDisplayItems(response.data.data);
            SethasMore(true);
          }
        } else {
          Setresponse_status(true);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  React.useEffect(() => {
    setDisplayItems({});
    var queryObj = {};
    for (const entry of searchParams.entries()) {
      queryObj = Object.fromEntries([...searchParams]);
    }

    var finalInput = Object.entries(queryObj).map(([key, value]) => ({
      title: key,
      value: value.split(",").map((ele) => ele.split("_")[0]),
    }))
    if (finalInput.length > 0) {
      // getprojectdetails();
    } else {
      getprojectdetails();
    }

  }, [searchParams]);

  React.useEffect(() => {
    getprojectdetails();
  }, [routerHistory.slug]);

  return (
    <>
      {
        DisplayItems.hasOwnProperty("filters") &&
        <Productfilters data={data} subcategory_id={subcategory_id} />
      }
    </>
  )
};

export default ProductPage;
