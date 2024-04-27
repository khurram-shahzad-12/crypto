import React, { useEffect, useState } from "react";
import SaverZoneSection from "./SaverZoneSection";
import call_apis from "../../services/Apis";
import Meta from "../../componets/Meta";

const SaverZone = ({ type }) => {
  const [saveZone, SetSaveZone] = useState({});

  async function fetchSaverZonedata() { 
    const resp = await call_apis.saverZoneSection(type);
    if (resp.status === 200) {
      SetSaveZone(resp.data.data);
    }
  };

  const title=Object.keys(saveZone).length>0 && saveZone.meta_tags[0]?.seo_title || undefined;
  const seotitle=Object.keys(saveZone).length>0 && saveZone.meta_tags[0]?.seo_title || undefined;
  const seoKeyword=Object.keys(saveZone).length>0 && saveZone.meta_tags[0]?.seo_keywords || undefined;
  const seoDescription=Object.keys(saveZone).length>0 && saveZone.meta_tags[0]?.seo_description || undefined;
  let productUrl=`https://kuwait.ourshopee.com/saver-zone/`

  useEffect(() => {
    fetchSaverZonedata();
  }, [type]);

  return (
    <>
    <Meta title={title} seoTitle={seotitle} seoDescription={seoDescription} seoKeywords={seoKeyword} productUrl={productUrl} productDescription={seoDescription}/>
      {Object.keys(saveZone).length > 0 ? (
        <SaverZoneSection data={saveZone} type={type} />
      ) : (
        <div style={{ height: "50vh" }}>
          <div className="loading-indicator"></div>
        </div>
      )}
    </>
  );
};

export default SaverZone;
