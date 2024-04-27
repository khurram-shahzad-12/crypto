import React, { createContext, useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams, useSearchParams } from "react-router-dom";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [filterArray, setfilterArray] = React.useState([]);
  const [filterArray1, setfilterArray1] = React.useState({});
  const [CheckItems, setCheckItems] = React.useState([]);
  const [minPrice, SetMinPrice] = React.useState(0);
  const [callFilterApi, SetcallFilterApi] = React.useState(false);
  const [hasMore, SethasMore] = React.useState(true);
  const [maxPrice, SetMaxPrice] = React.useState(0);
  const [filterPage, setFilterPage] = useState(1);
  const [loaderStatus, setloaderStatus] = useState(false);
  const [callSliderRange, setcallSliderRange] = React.useState(false);
  const [defaultChecked, setdefaultChecked] = React.useState([]);
  const [DisplayItems, setDisplayItems] = React.useState({});
  const [filterUrl, setfilterUrl] = React.useState("");
  const [showfilters, setshow_filters] = React.useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });
  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  var { slug, slug1 } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleShow = (breackPoint) => {
    setFullscreen(breackPoint);
    setShow(true);
  };

  React.useEffect(() => {
    console.log("slug", slug);
    setDisplayItems({});
    setFilterPage(1);
    SethasMore(true);
  }, [slug, slug1]);

  const handleClose = () => {
    setShow(false);
  };

  const openFilters = () => {
    setshow_filters(!showfilters);
  };

  return (
    <FilterContext.Provider
      value={{
        filterArray,
        filterArray1,
        SethasMore,
        hasMore,
        setfilterArray,
        setfilterArray1,
        DisplayItems,
        filterUrl,
        setloaderStatus,
        loaderStatus,
        setcallSliderRange,
        callSliderRange,
        isMobile,
        show,
        setFilterPage,
        filterPage,
        setShow,
        SetcallFilterApi,
        callFilterApi,
        fullscreen,
        setFullscreen,
        handleShow,
        handleClose,
        setdefaultChecked,
        openFilters,
        SetMinPrice,
        SetMaxPrice,
        maxPrice,
        minPrice,
        showfilters,
        setshow_filters,
        setCheckItems,
        CheckItems,
        defaultChecked,
        setfilterUrl,
        setDisplayItems,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => useContext(FilterContext);

export { useFilter, FilterProvider };
