import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title="Ourshopee.com Online Shopping for Mobiles, Electronics, Perfumes, Watches & More in UAE",seoDescription="Ourshopee.com Online Shopping for Mobiles, Electronics, Perfumes, Watches & More in UAE",
seoKeywords="Ourshopee.com Online Shopping for Mobiles, Electronics, Perfumes, Watches & More in UAE",
 productUrl, seoTitle="Ourshopee.com Online Shopping for Mobiles, Electronics, Perfumes, Watches & More in Kuwait", productDescription, productImageUrl }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="robots" content="index,follow"/>
      <meta name="title" content={seoTitle}/>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="url" content={productUrl} /> 
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={productDescription} />
      {/* <meta property="og:type" content="product"/> */}
      <meta property="og:title" content={seoTitle}/> 
      {/* <meta property="og:description" content={seoDescription}/> */}
      <meta property="og:url" content={productUrl} />
      <meta property="og:image" content={productImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_ae" />

    </Helmet>
  );
};

export default Meta;