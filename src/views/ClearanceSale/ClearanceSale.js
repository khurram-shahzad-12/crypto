import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import call_apis from "../../services/Apis";
import YellowOutlineCard from "../../componets/YellowOutlineCard";
import InfiniteScroll from "react-infinite-scroll-component";
import CommonItemRow from "../../componets/CommonItemRow";
import { Slider } from "../Home";
import Meta from "../../componets/Meta";

const refresh = (setItems) => {};

const ClearanceSale = () => {
  const [page, setpage] = useState(1);
  const [stop_Api, setstop_Api] = useState(true);
  const [BannerImages, setBannerImages] = useState([]);
  const [topItem, SetTopItem] = useState([]);
  const [metatag,setMetatag]=useState("");

  useEffect(() => {}, [page, stop_Api]);

  const clearanceData = async (setItems, items) => {
    const res = await call_apis.clearanceData(page);
    if (res.data.data.length <= 0) {
      setstop_Api(false);
    }
    setItems([...items, ...res.data.data.items]);
    setpage(page + 1);
    if (page == 1) {
      if (res.data.data.top_items) {
        setBannerImages(res.data.data.bannerImages);
        setMetatag(res.data.data?.meta_tags[0])
        SetTopItem(res.data.data.top_items);
      }
    }
  };

  const [items, setItems] = React.useState([]);
  const title=metatag && metatag.seo_title || undefined;
  const seotitle=metatag && metatag.seo_title || undefined;
  const seoKeyword=metatag && metatag.seo_keywords || undefined;
  const seoDescription=metatag && metatag.seodescription || undefined;
  let productUrl=`https://www.kuwait.ourshopee.com/clearance`


  React.useEffect(() => {
    clearanceData(setItems, items);
  }, []);

  const border = "2px solid #f15f18";

  return (
    <>
      <Meta title={title} seoTitle={seotitle} seoDescription={seoDescription} seoKeywords={seoKeyword} productUrl={productUrl} productDescription={seoDescription}/>
      {topItem.length > 0 || items.length > 0 ? (
        <div className="categoryPage">
          <div className="maxWidthContainerFluid paddingContainerFluid container-fluid">
        {BannerImages.length > 0 && <Slider carouselList={BannerImages} />}
      </div>
          <Container fluid className="maxWidthContainerFluid mt-4">
            {topItem.length > 0 && (
              <YellowOutlineCard data={topItem} border={border} />
            )}
          </Container>
          <div style={{ background: "#e5eef3" }}>
            {items.length > 0 && (
              <Container fluid className="maxWidthContainerFluid mt-3 pt-3">
                <InfiniteScroll
                  dataLength={items.length}
                  next={() => {
                    clearanceData(setItems, items);
                  }}
                  hasMore={stop_Api}
                  loader={
                    <div className="">
                      <div className="loading-indicator"></div>
                    </div>
                  }
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                    </p>
                  }
                  refreshFunction={refresh}
                  style={{ overflow: "hidden" }}
                >
                  <CommonItemRow items={items} />
                </InfiniteScroll>
              </Container>
            )}
          </div>
        </div>
      ) : (
        <div style={{ height: "50vh" }}>
          <div className="loading-indicator"></div>
        </div>
      )}
    </>
  );
};

export default ClearanceSale;
