/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Col, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import InfiniteScroll from "react-infinite-scroll-component";
import AddToCartAPI from "../../componets/AddToCartAPI";
import { useTranslation } from "react-i18next";
import CommonCard from "../../componets/CommonCard";
import call_apis from "../../services/Apis";

const refresh = (setItems) => {};

const Products = ({
  slug,
  sortBy,
  filterArray,
  products,
  minValue,
  maxValue,
  maximum,
  brand,
}) => {
  const routerHistory = useNavigate();
  const webChange = useParams();

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
  const [cartProduct, setCartProduct] = useState(false);
  const [cartProductDetail, setCartProductDetail] = useState({
    id: "",
    quantity: "",
  });

  React.useEffect(() => {}, [page, stop_Api]);

  const fetchData = async () => {
    const res =
      brand !== true
        ? await call_apis.subcategoryData(slug, page + 1)
        : typeof slug === "object"
        ? await call_apis.brandData(
            slug[1],
            page + 1,
            slug[0].category,
            slug[0].subcategory
          )
        : await call_apis.searchBrandData(slug, page + 1);
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
  };

  const fetchFilterData = () => {
    axios
      .post("/api/filtered_items", {
        subcat_url: slug,
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

  React.useEffect(() => {
    if (filterArray.length <= 0) {
      if (webChange.hasOwnProperty("thirdslug")) {
        var uio = webChange.thirdslug
          .split("&")
          .map((ele) => {
            var producedarray = ele.split("=");
            if (producedarray[0] !== "filters") {
              return {
                title: producedarray[0],
                value: producedarray[1],
              };
            }
          })
          .filter((elee) => elee != null);
        axios
          .post("/api/filtered_items", {
            subcat_url: slug,
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
      } else {
        fetchData();
      }
    } else if (filterArray.length > 0) {
      fetchFilterData();
    }
  }, []);

  useEffect(() => {
    setTotalProducts(products);
    setBeforeFilterProduct(products);
    setLoaderProducts(false);
  }, [products]);

  useEffect(() => {
    setLoaderProducts(true);
  }, [totalProducts]);

  useEffect(() => {
    setSortFilter(sortBy);
  }, [sortBy]);

  useEffect(() => {
    responseProducts.length === 0 && setLoaderProducts(false);
  }, [responseProducts]);

  const getFilterItems = (uio) => {
    const parts = uio.map((param) => {
      return encodeURIComponent(param.title) + "=" + param.value;
    });

    const url = parts.join("&");

    routerHistory(`/products-category/${slug}?filters=true&${url}`);

    axios
      .post("/api/filtered_items", {
        subcat_url: slug,
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

  const InnerProduct = ({ totalProducts }) => {
    return (
      <Container className="categoryPage ">
        <Row className="row-cols-sm-6 row-cols-md-4 row-cols-lg-4 cardMargin">
          {totalProducts.length > 0 &&
            totalProducts.map((each, i) => (
              <div className="col-6 col-sm-6 col-md-4 col-lg-21 cardPadding" key={i}>
                <CommonCard data={each} />
              </div>
            ))}
        </Row>
        {cartProduct && <AddToCartAPI cartDetail={cartProductDetail} />}
      </Container>
    );
  };

  return (
    <>
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
    </>
  );
};

export default Products;
