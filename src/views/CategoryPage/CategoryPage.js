import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CategorySection from "./CategorySection";
import CommonBreadCrumb from "../../componets/CommonBreadCrumb";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { apiSelector } from "../../store/Api_middelware";
import Meta from "../../componets/Meta";

const CategoryPage = () => {
  const { slug } = useParams();
  const { data } = useSelector(apiSelector);
  const [category, SetCategory] = useState({});
  const [title,setTitle]=useState("");
  const [seotitle,setSeotitle]=useState("");
  const [seoKeyword,setSeoKeyword]=useState("");
  const [seoDescription,setSeoDescription]=useState("");
  // eslint-disable-next-line no-unused-vars
  const [subCategoryItem, SetSubCategoryItem] = useState({});
  const [metadata,setMetadata]=useState("");
  const [productUrl,setProductUrl]=useState("");

  React.useEffect(() => {
    SetCategory({});
  }, [slug]);

  const breadCrumData =
    data.length > 0 && data.filter((each) => each.url === slug);
  const crumData = [
    {
      slug: breadCrumData.length > 0 && breadCrumData[0].category_name,
      link: "categories",
    },
  ];

  const getCategoryPage = () => {
    axios
      .get(`api/getallcategoryItems?cat_url=${slug}`)
      .then((response) => {
        if (Object.keys(response.data.data).length > 0) {
          SetCategory(response.data.data);
          setMetadata(response.data.data?.meta_tags[0]);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    getCategoryPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    // Use metadata only if it's available
    if (metadata) {
      setTitle(metadata.seo_title || undefined);
      setSeotitle(metadata.seo_title || undefined);
      setSeoKeyword(metadata.seo_keywords || undefined);
      setSeoDescription(metadata.seo_description || undefined);
      setProductUrl(`https://www.kuwait.ourshopee.com/categories/${slug}`) ;
      // Now you can use these variables as needed
    }
  }, [metadata, slug]);

  return (
    <>
    <Meta title={title} seoTitle={seotitle} seoDescription={seoDescription} seoKeywords={seoKeyword} productUrl={productUrl} productDescription={seoDescription}/>
      <Container fluid className="maxWidthContainerFluid">
        <CommonBreadCrumb data={crumData} />
      </Container>
      {Object.keys(category).length > 0 ? (
        <CategorySection
          categoryData={category}
          item={subCategoryItem}
          slug={slug}
        />
      ) : (
        <div style={{ height: "50vh" }}>
          <div className="loading-indicator"></div>
        </div>
      )}
    </>
  );
};

export default CategoryPage;
