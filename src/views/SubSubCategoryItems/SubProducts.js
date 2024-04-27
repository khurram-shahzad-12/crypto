/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Col, Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import AddToCartAPI from "../../componets/AddToCartAPI";
import CommonCard from "../../componets/CommonCard";
import { useTranslation } from "react-i18next";
const refresh = (setItems) => {};

const SubProducts = ({
  slug1,
  slug2,
  sortBy,
  filterArray,
  products,
  minValue,
  maxValue,
  maximum,
}) => {
  const [sta, setstaus] = useState(true);
  const { t } = useTranslation();
  const [totalProducts, setTotalProducts] = useState(products);
  const [beforeFilterProduct, setBeforeFilterProduct] = useState(products);
  const [sortFilter, setSortFilter] = useState("");
  const [uio, setUio] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [page, setpage] = React.useState(1);
  const [filterPage, setFilterPage] = useState(1);
  const [stop_Api, setstop_Api] = React.useState(true);
  const [loaderProducts, setLoaderProducts] = useState(true);
  const [responseProducts, setResponseProducts] = useState([]);

  const [cartSubProduct, setCartSubProduct] = useState(false);
  const [cartSubProductDetail, setCartSubProductDetail] = useState({
    id: "",
    quantity: "",
  });

  useEffect(() => {
    setTotalProducts(products);
    setBeforeFilterProduct(products);
    setLoaderProducts(false);
  }, [products]);

  React.useEffect(() => {}, [page, stop_Api]);

  useEffect(() => {
    setSortFilter(sortBy);
  }, [sortBy]);

  const getFilterItems = (uio) => {
    axios
      .post("/api/filtered_items", {
        subcat_url: slug1,
        sub_subcat_url: slug2,
        page: 1,
        filtered_items: uio,
        price_range: [
          {
            min: minValue,
            max: maxValue,
          },
        ],
      })
      .then((response) => {
        setTotalProducts(response.data.data.products);
        setResponseProducts(response.data.data.products);
        setLoaderProducts(false);
      })
      .catch((err) => {
        console.log("err");
      });
  };

  useEffect(() => {
    setPageNo(1);
    setFilterPage(1);
  }, [uio]);

  useEffect(() => {
    if (
      filterArray.length > 0 ||
      (minValue !== undefined &&
        maxValue !== undefined &&
        minValue + maxValue !== maximum) ||
      sortBy !== ""
    ) {
      const opp = filterArray
        .filter(
          (v, i, a) =>
            a.findIndex((v2) => ["title"].every((k) => v2[k] === v[k])) === i
        )
        .map((Element5) => {
          return { title: Element5.title };
        });

      const sortFilters = {
        title: "sortby",
        value: sortBy === "" ? "new arrival" : sortBy,
      };

      const uios = opp.map((ele) => {
        return {
          title: ele.title,
          value: filterArray
            .filter((ele3) => ele3.title === ele.title)
            .map((ele8) => {
              return ele8.value;
            })
            .toString(),
        };
      });

      uios.push(sortFilters);
      setUio(uios);
      getFilterItems(uios);
    } else {
      filterArray.length === 0 && setTotalProducts(beforeFilterProduct);
      filterArray.length === 0 && setPageNo(1);
    }
  }, [filterArray, minValue, maxValue, sortBy]);

  useEffect(() => {
    setLoaderProducts(true);
  }, [totalProducts]);

  useEffect(() => {
    responseProducts.length === 0 && setLoaderProducts(false);
  }, [responseProducts]);

  const fetchFilterData = () => {
    axios
      .post("/api/filtered_items", {
        subcat_url: slug1,
        sub_subcat_url: slug2,
        page: filterPage + 1,
        filtered_items: uio,
        price_range: [
          {
            min: minValue,
            max: maxValue,
          },
        ],
      })
      .then((response) => {
        setTotalProducts([...totalProducts, ...response.data.data.products]);
        if (response.data.data.products.length <= 0) {
          setstop_Api(false);
        }

        setFilterPage(filterPage + 1);
        setResponseProducts(response.data.data.products);
        setLoaderProducts(false);
      })
      .catch((err) => {
        console.log("err");
      });
  };

  const fetchData = () => {
    axios
      .get(
        `api/getallsubcategoryItems?subcat_url=${slug1}&sub_subcat_url=${slug2}&page=${
          page + 1
        }`
      )
      .then((res) => {
        if (res.data.data.display_items.products.length > 0) {
          setstaus(true);
          setResponseProducts(res.data.data.display_items.products);
          setTotalProducts([
            ...totalProducts,
            ...res.data.data.display_items.products,
          ]);
          setLoaderProducts(false);
          setBeforeFilterProduct([
            ...totalProducts,
            ...res.data.data.display_items.products,
          ]);
        }
        if (res.data.data.length <= 0) {
          setstop_Api(false);
        }
        setpage(page + 1);
      });
  };

  React.useEffect(() => {
    if (filterArray.length <= 0) {
      fetchData();
    } else if (filterArray.length > 0) {
      fetchFilterData();
    }
  }, []);

  const InnerProduct = ({ totalProducts }) => {
    return (
      <Container className="categoryPage cardMargin">
        <Row>
          {totalProducts.length > 0 &&
            totalProducts.map((each, i) => (
              <div className="col-6 col-sm-6 col-md-3 col-lg-21 cardPadding" key={i}>
                <CommonCard data={each} />
              </div>
            ))}
        </Row>
        {cartSubProduct && <AddToCartAPI cartDetail={cartSubProductDetail} />}
      </Container>
    );
  };

  return (
    <Container className="">
      <InfiniteScroll
        dataLength={totalProducts.length}
        next={() => {
          if (filterArray.length <= 0) {
            fetchData();
          } else if (filterArray.length > 0) {
            fetchFilterData();
          }
        }}
        hasMore={stop_Api}
        loader={<div className="mt-5 pb-5"></div>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>{t("product.noProduct")}</b>
          </p>
        }
        refreshFunction={refresh}
        style={{ overflow: "hidden" }}
      >
        <InnerProduct totalProducts={totalProducts} />
      </InfiniteScroll>
    </Container>
  );
};

export default SubProducts;
