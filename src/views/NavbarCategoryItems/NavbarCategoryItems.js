import React,{useEffect,useState} from "react";
import { FilterProvider } from "../SearchResult/context/filter-context";
import CategoryPage from "../NavbarCategoryItems/CategoryPage";
import { useSelector } from "react-redux";
import { apiSelector } from "../../store/Api_middelware";
import { useParams } from "react-router-dom";
import Meta from "../../componets/Meta";
import call_apis from "../../services/Apis";

function NavbarCategoryItems() {
  const [metadata,setMetadata]=useState("");
  const { data } = useSelector(apiSelector);
  var { slug } = useParams();

  const getmetadata=async()=>{
    const input={url:slug};
    const resp=await call_apis.subcategoryMetatags(input);
    let data=resp.data?.data[0];
    setMetadata(data);
  };

  const breadCrumData =
    data.length > 0 &&
    data.map((each) => each.subcategory.filter((ele) => ele.url === slug));
  const crumData =
    breadCrumData.length > 0 &&
    breadCrumData.filter((ele1) => ele1.length === 1);
  const crumData1 =
    data.length > 0 &&
    data.filter((ele2) => ele2.category_id === crumData[0][0].category_id);
  const crumData2 = [
    {
      slug: crumData1.length > 0 && crumData1[0].category_name,
      link: "categories",
      url: crumData1.length > 0 && crumData1[0].url,
    },
    { slug: slug, link: "products-category" },
  ];

  useEffect(()=>{
    getmetadata()
  },[slug]);

  const title=(metadata && metadata.seo_title) || undefined;
  const seotitle=(metadata && metadata.seo_title) || undefined;
  const seoKeyword=(metadata && metadata.seo_keywords) || undefined;
  const seoDescription=(metadata && metadata.seo_description) || undefined;
  let productUrl=`https://www.kuwait.ourshopee.com/products-category/${slug}`


  return (
    <FilterProvider>
      <Meta title={title} seoTitle={seotitle} seoDescription={seoDescription} seoKeywords={seoKeyword} productUrl={productUrl} productDescription={seoDescription}/>
      <CategoryPage data={crumData2} />
    </FilterProvider>
  );
}

export default NavbarCategoryItems;
