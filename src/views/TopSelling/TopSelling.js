import React,{useEffect,useState} from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import YellowOutlineCard from "../../componets/YellowOutlineCard";
import InfiniteScroll from "react-infinite-scroll-component";
import CommonItemRow from "../../componets/CommonItemRow";
import { useTranslation } from "react-i18next";
import Slider from "../Home/Slider";
import Meta from "../../componets/Meta";

const refresh = (setItems) => {};

const TopSelling = () => {
  const { t } = useTranslation();

  const [page, setpage] = React.useState(1);
  const [stop_Api, setstop_Api] = React.useState(true);
  const [data, SetData] = React.useState({});
  const [items, setItems] = React.useState([]);
  const [metadata,setMetadata]=useState("");

  React.useEffect(() => {}, [page, stop_Api]);

  const getTpSellingData = (setItems, items) => {
    axios.get(`api/top_selling_products?page=${page}`).then((res) => {
      console.log(res);
      if (res.data.data.length <= 0) {
        setstop_Api(false);
      }
      setItems([...items, ...res.data.data.top_Selling_products]);
      setMetadata(res.data.data.meta_tags[0]);
      setpage(page + 1);
      SetData(res.data.data);
    });
  };

  React.useEffect(() => {
    getTpSellingData(setItems, items);
  }, []);

  const border = "2px solid #0153a9";

  const title=(metadata && metadata.seo_title) || undefined;
  const seotitle=(metadata && metadata.seo_title) || undefined;
  const seoKeyword=(metadata && metadata.seo_keywords) || undefined;
  const seoDescription=(metadata && metadata.seo_description) || undefined;
  let productUrl=`https://www.kuwait.ourshopee.com/deals/Top-Selling-Products`

  return (
    <>
    <Meta title={title} seoTitle={seotitle} seoDescription={seoDescription} seoKeywords={seoKeyword} productUrl={productUrl} productDescription={seoDescription}/>
      {data !== undefined && Object.keys(data).length > 0 ? (
        <div className="categoryPage">
          <div className="maxWidthContainerFluid paddingContainerFluid container-fluid">
            {data.banner_image !== " " && (
              <Slider carouselList={data.banner_image} />
            )}
          </div>
          <Container fluid className="maxWidthContainerFluid mt-4">
            <YellowOutlineCard data={data.items} border={border} />
          </Container>
          <div style={{ background: "#fcf6d7" }}>
            <Container fluid className="maxWidthContainerFluid mt-3">
              <div className="subCategoryTitle">
                {t("navigation.topSellingProduct")}
              </div>
              <InfiniteScroll
                dataLength={items.length}
                next={() => {
                  getTpSellingData(setItems, items);
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
        </div>
      ) : (
        <div style={{ height: "50vh" }}>
          <div className="loading-indicator"></div>
        </div>
      )}
    </>
  );
};

export default TopSelling;
