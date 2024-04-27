import React, { useState, createContext } from "react";
import Meta from "../../componets/Meta";
import axios from "axios";
import {
  Slider,
  PreOwned,
  Banner,
  ExcitingOffer,
  BigBanners,
  Multibanners,
  CategoryTool,
  Bundel,
  Clearance,
  CategoryItems,
  DuoSection,
  TopSelling,
  Brand,
  TopPick,
  DiscountUpto70,
  DealToDealBanner,
} from "../Home";
import call_apis from "../../services/Apis";
export const DealSaverData = createContext({ stubData: [] });


const Home = () => {
  const api_call = React.useRef(true);
  const [bannerCarouselList, setBannerCarouselList] = useState([]);
  const [dealOfTheDay, setDealOfDay] = useState([]);
  const [multibanners, setMultibanners] = useState([]);
  const [bundelArray, setBundelArray] = useState([]);
  const [brandWeek, setbrandWeek] = useState([]);
  const [preOwned, setPreOwned] = useState([]);
  const [cearanceArray, setCearanceArray] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [exictingOffers, setExictingOffers] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [toppick, setToppick] = useState([]);
  const [topselling, setTopselling] = useState([]);
  const [saver, setSaver] = useState([]);


  const getAllData = async () => {
    //bannerlist
    const bannerData = await call_apis.getbannerlist();
    if (bannerData.status === 200) {
      setBannerCarouselList(bannerData.data.data);
      setMultibanners(bannerData.data.data.multibanners);
    }
    //exciting offer
    const excitingData = await call_apis.getExcitingOffer();

    if (excitingData.status === 200) {
      
      if (excitingData.data.data.exciting_offers.length > 0) {
        const excitingData1=excitingData.data.data.exciting_offers;
        setExictingOffers(excitingData1);
      }
    }
    
    //bundel/clearance
    const bundelData = await call_apis.Bundel_Clearance_Sale();
    if (bundelData.status === 200) {
      if (bundelData.data.data.bundle_deals.length > 0) {
        setBundelArray(bundelData.data.data.bundle_deals);
      }
      if (bundelData.data.data.clearance_sale.length > 0) {
        setCearanceArray(bundelData.data.data.clearance_sale);
      }
    }
    //deal of the day
    const dealData = await call_apis.deal_of_the_day();
    if (dealData.status === 200) {
      if (dealData.data.data.length > 0) {
        setDealOfDay(dealData.data.data);
      }
    }
    //saver zone
    const saverData = await call_apis.saverZone();
    if (saverData.status === 200) {
      if (saverData.data.data.length > 0) {
        setSaver(saverData.data.data);
      }
    }

    const CategorySection = await call_apis.getCategorySection();
    if (CategorySection.status === 200) {
      if (CategorySection.data.data.length > 0) {
        setDiscount(CategorySection.data.data);
      }
    }
  };

  const getCategoryItems = () => {
    axios
      .get("/api/category_items")
      .then((response) => {
        setCategoryItems(response.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const getTopPick = () => {
    axios
      .get("/api/getTopPicks")
      .then((response) => {
        setToppick(response.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const getTopSelling = () => {
    axios
      .get("/api/getTopSelling")
      .then((response) => {
        setTopselling(response.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const brandWeekFunction = async () => {
    const brandWeekData = await call_apis.brandWeek();
    if (brandWeekData.status === 200) {
      if (brandWeekData.data.data.length > 0) {
        setbrandWeek(brandWeekData.data.data);
      }
    }
  };

  const pre_owned = async () => {
    const pre_ownedData = await call_apis.pre_owned();
    if (pre_ownedData.status === 200) {
      setPreOwned(pre_ownedData.data.data);
    }
  };

  React.useEffect(() => {
    if (api_call.current) {
      api_call.current = false;
      getCategoryItems();
      getTopPick();
      getTopSelling();
      getAllData();
      brandWeekFunction();
      pre_owned();
    }
  }, []);

  const title= undefined;
  const seotitle=undefined;
  const seoKeyword= undefined;
  const seoDescription= undefined;
  let productUrl=`https://www.ourshopee.com/`

  return (
    <div>
      <Meta title={title} seoTitle={seotitle} seoDescription={seoDescription} seoKeywords={seoKeyword} productUrl={productUrl} productDescription={seoDescription}/>
      <Slider carouselList={bannerCarouselList.carousel} />
      <CategoryTool />
      {exictingOffers.length > 0 && (
        <ExcitingOffer exictingOffers={exictingOffers} />
      )}
      <BigBanners
        renderMobImg="bnpl-bnr-mob.png"
        renderImg="bnpl-bnr-web.png"
        url="/tech-mania"
      />
     

      {dealOfTheDay.length > 0 && saver.length > 0 && (
        <DealSaverData.Provider
          value={{ dealData: dealOfTheDay, saverData: saver }}
        >
          <DuoSection />
        </DealSaverData.Provider>
      )}
    
      {preOwned.hasOwnProperty("carouselItems") && <PreOwned data={preOwned} />}

      <DealToDealBanner
        renderMobImg="new-deal-to-deal-mob.gif"
        renderImg="deal-to-deal-list.gif"
        url="/AED-1-to-20"
      />
      
      {topselling.length > 0 && <TopSelling topselling={topselling} />}
      {multibanners.length > 0 && <Multibanners multibanners={multibanners} />}
      <Banner bannerList={bannerCarouselList.banner} />
      {bundelArray.length > 0 && <Bundel bundelArray={bundelArray} />}
      {cearanceArray.length > 0 && <Clearance cearanceArray={cearanceArray} />}
      <TopPick data={toppick} />
      <BigBanners
        renderMobImg="blueMobImg.svg"
        renderImg="blueImage.svg"
        url="/saver-zone"
      />
      {dealOfTheDay.length > 0 && <Brand data={brandWeek} />}
      {discount.length > 0 && <DiscountUpto70 data={discount} />}
      {categoryItems.length > 0 && (
        <CategoryItems categoryItems={categoryItems} />
      )}
    </div>
  );
};

export default Home;
