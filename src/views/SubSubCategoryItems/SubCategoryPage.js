import React,{useEffect,useState} from "react";
import Productfilters from "../SearchResult/Productfilters";
import { useFilter } from "../SearchResult/context/filter-context";
import { useParams,useSearchParams } from "react-router-dom";
import call_apis from "../../services/Apis";
import Meta from "../../componets/Meta";

const SubCategoryPage = ({ data }) => {
  const { DisplayItems, setDisplayItems } = useFilter();
  const [searchParams, setSearchParams] = useSearchParams();
  const [metadata,setMetadata]=useState("");

  var { slug1, slug2 } = useParams();

  const getprojectdetails = async () => {
    const page = 1;
    const response = await call_apis.subSubcategoryData(slug1, slug2, page);
    setDisplayItems(response.data.data);
  };

  React.useEffect(() => {
    setDisplayItems({});
    getprojectdetails();
  }, [slug1, slug2]);


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
    }
  }, [searchParams,slug2]);

  const getsubsubcategorymetatags=async()=>{
    const input={url:slug2}
    const resp=await call_apis.subsubcategoryMetatags(input);
    let data=resp.data?.data[0];
    setMetadata(data);
  }

  useEffect(()=>{getsubsubcategorymetatags()},[slug2]);

  const title=(metadata && metadata.seo_title) || undefined;
  const seotitle=(metadata && metadata.seo_title) || undefined;
  const seoKeyword=(metadata && metadata.seo_keywords) || undefined;
  const seoDescription=(metadata && metadata.seo_description) || undefined;
  let productUrl=`https://www.kuwait.ourshopee.com/categories/products-subcategory/${slug1}/${slug2}`;

  return (
    <div>
       <Meta title={title} seoTitle={seotitle} seoDescription={seoDescription} seoKeywords={seoKeyword} productUrl={productUrl} productDescription={seoDescription}/>
      {DisplayItems.hasOwnProperty("filters") ? (
        <Productfilters data={data} />
      ) : (
        <div style={{ height: "50vh" }}>
          <div className="loading-indicator"></div>
        </div>
      )}
    </div>
  );
};

export default SubCategoryPage;
