import React from "react";
import { Row, Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import CommonCard from "../../componets/CommonCard";
import { useFilter } from "./context/filter-context";
export const Products = ({ products }) => {
  const { filterPage, hasMore, setFilterPage } = useFilter();

  const InnerProduct = ({ totalProducts }) => {
    return (
      <div className="categoryPage ">
        <Row className="row-cols-sm-6 row-cols-md-4 row-cols-lg-4 cardMargin">
          {totalProducts.length > 0 &&
            totalProducts.map((each, i) => (
              <div className="col-6 col-sm-6 col-md-4 col-lg-21 cardPadding" key={i}>
                <CommonCard data={each} />
              </div>
            ))}
        </Row>
      </div>
    );
  };

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={() => {
        setFilterPage(filterPage + 1);
      }}
      hasMore={hasMore}
      loader={
        products.length > 35 && 
        <div className="mt-5 pb-5">
          <div style={{ height: "10vh" }}>
            <div className="loading-indicator"></div>
          </div>
        </div>
      }
      endMessage={<></>}
      // refreshFunction={refresh}
      style={{ overflow: "hidden" }}
    >
      <InnerProduct totalProducts={products} />
    </InfiniteScroll>
  );
};
