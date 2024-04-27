import React,{useEffect,useState} from "react";
import Productfilters from "../SearchResult/Productfilters";
import { useFilter } from "../SearchResult/context/filter-context";
import { useParams, useLocation, useSearchParams } from "react-router-dom";
import Meta from "../../componets/Meta";
import call_apis from "../../services/Apis";

const BrandCategoryPage = ({ data }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setDisplayItems } = useFilter();
  var { slug, slug1 } = useParams();
  const { state } = useLocation();
  const [metadata,setMetadata]=useState("");

  const getprojectdetails = async () => {
    const response =
      state !== null
        ? slug1 === undefined && Object.keys(state).length > 0
          ? await call_apis.searchBrandData(slug + "/" + slug1, 1)
          : await call_apis.brandData(
            slug,
            1,
            state.category,
            state.subcategory
          )
        : await call_apis.searchBrandData(slug + "/" + slug1, 1);
    setDisplayItems(response.data.data);
  };

  React.useEffect(() => {
    getprojectdetails();
  }, [slug, slug1]);


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
  }, [searchParams, slug, slug1]);

  const getbrandsmetadata=async()=>{
    let input={url: slug};
    const resp=await call_apis.brandsMetatags(input);
    let data=resp.data?.data[0];
    setMetadata(data)
  }


  useEffect(()=>{getbrandsmetadata()},[slug]);

  const title=(metadata && metadata.seo_title) || undefined;
  const seotitle=(metadata && metadata.seo_title) || undefined;
  const seoKeyword=(metadata && metadata.seo_keywords) || undefined;
  const seoDescription=(metadata && metadata.seo_description) || undefined;
  let productUrl=`https://www.kuwait.ourshopee.com/brands/${slug}/${slug1}`;




  return (
    <div>
      <Meta title={title} seoTitle={seotitle} seoDescription={seoDescription} seoKeywords={seoKeyword} productUrl={productUrl} productDescription={seoDescription}/>
      <Productfilters data={data} />
    </div>
  );
};

export default BrandCategoryPage;
