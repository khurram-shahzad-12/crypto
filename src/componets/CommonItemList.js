import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import CommonItemRow from "./CommonItemRow";
import { useParams } from "react-router-dom";


const refresh = (setItems) => { };

const CommonItemList = ({ data, categorysection }) => {

  var { slug } = useParams();


  const [page, setpage] = React.useState(1);
  const [stop_Api, setstop_Api] = React.useState(true);

  React.useEffect(() => { }, [page, stop_Api]);
  const fetchData = (setItems, items) => {
    axios
      .get(`api/getallitems?cat_url=${slug}&page=${page}`)
      .then((res) => {
        if (res.data.data.length <= 0) {
          setstop_Api(false);
        }
        setItems([...items, ...res.data.data]);
        setpage(page + 1);
      });
  };

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetchData(setItems, items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InfiniteScroll
      dataLength={items.length} //This is important field to render the next data
      next={() => {
        fetchData(setItems, items);
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
      // below props only if you need pull down functionality
      refreshFunction={refresh}
      style={{ overflow: "hidden" }}
    >
      <CommonItemRow items={items} categorysection={categorysection} />
    </InfiniteScroll>
  );
};

export default CommonItemList;
