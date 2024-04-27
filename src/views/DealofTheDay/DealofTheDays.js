import React, { useState } from "react";
import axios from "axios";
import DealSection from "./DealSection";
import InfiniteScroll from "react-infinite-scroll-component";
import CommonItemRow from "../../componets/CommonItemRow";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Meta from "../../componets/Meta";

const refresh = (setItems) => {};

const DealofTheDays = () => {
  const { t } = useTranslation();
  const [page, setpage] = React.useState(1);
  const [stop_Api, setstop_Api] = React.useState(true);
  const [topItem, SetTopItem] = useState({});
  const [metatag,setMetatag]=useState("")

  React.useEffect(() => {}, [page, stop_Api]);

  const getdealOdThedayData = (setItems, items) => {
    axios.get(`api/deal_of_the_day?page=${page}`).then((res) => {
      SetTopItem(res.data.data);
      if (res.data.data.length <= 0) {
        setstop_Api(false);
      }
      setItems([...items, ...res.data.data.trending_products]);
      setMetatag(res.data.data.meta_tags[0]);
      setpage(page + 1);
    });
  };


  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    getdealOdThedayData(setItems, items);
  }, []);

  const title=metatag && metatag.seo_title || undefined;
  const seotitle=metatag && metatag.seo_title || undefined;
  const seoKeyword=metatag && metatag.seo_keywords || undefined;
  const seoDescription=metatag && metatag.seodescription || undefined;
  let productUrl=`https://www.kuwait.ourshopee.com/clearance`

  return (
    <>
    <Meta title={title} seoTitle={seotitle} seoDescription={seoDescription} seoKeywords={seoKeyword} productUrl={productUrl} productDescription={seoDescription}/>
      <div className="categoryPage">
        {topItem !== undefined && Object.keys(topItem).length > 0 ? (
          <DealSection data={topItem} />
        ) : (
          <div style={{ height: "50vh" }}>
            <div className="loading-indicator"></div>
          </div>
        )}
        {items.length > 0 && (
          <div style={{ background: "#ffebf1" }}>
            <Container fluid className="maxWidthContainerFluid mt-1 pt-3">
              <div className="subCategoryTitle">{t("deal.trend")}</div>
              <InfiniteScroll
                dataLength={items.length}
                next={() => {
                  getdealOdThedayData(setItems, items);
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
          </div>
        )}
      </div>
    </>
  );
};

export default DealofTheDays;
