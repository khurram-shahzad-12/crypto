/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import { BiPlus, BiMinus, BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const FilterItems = ({
  checkData,
  sliderRange,
  fliterItemsSend,
  slug,
  data,
  minPriceChange,
  maxPriceChange,
  filterArray,
  clearArray,
  removeItem,
}) => {
  const { t } = useTranslation();
  const [subCategory, SetSubCategory] = useState(false);
  const webChange = useParams();

  const routerHistory = useNavigate();

  const [menuItems, setMenuItems] = useState([]);
  const [subCategoryShow, setSubCategoryShow] = useState(true);
  const [priceShow, setPriceShow] = useState(true);
  const [subCategory_id, SetSubCategory_id] = useState([]);

  const [CheckBoxData, setCheckBoxData] = useState(checkData);
  const [searchItems, setSearchItems] = useState([]);
  const [checkBoxId, setCheckBoxId] = useState([]);
  const [isCheck, setIsCheck] = useState([]);
  const [clearButton, setClearButton] = useState(clearArray);

  useEffect(() => {
    fliterItemsSend(searchItems);
  }, [searchItems]);

  useEffect(() => {
    const removefilterValue = isCheck.filter((ele) => ele !== removeItem);
    setIsCheck(removefilterValue);
  }, [removeItem]);

  useEffect(() => {
    const removefilterValue = searchItems.filter(
      (ele) => ele.value !== removeItem
    );
    setSearchItems(removefilterValue);
  }, [removeItem]);

  const changeFilter = (url) => {
    routerHistory(`/products-category/${slug}/filters=true&data=${url}`);
  };

  const changeSubFilter = (url) => {
    //  routerHistory(`/products-subcategory/${url}`);
  };

  useEffect(() => {
    if (webChange.hasOwnProperty("thirdslug")) {
      var uio = webChange.thirdslug
        .split("&")
        .map((ele) => {
          var producedarray = ele.split("=");
          if (producedarray[0] !== "filters") {
            return producedarray[1];
          }
        })
        .filter((elee) => elee != null);
      setIsCheck(uio);
      setCheckBoxData(checkData);
    } else {
      setCheckBoxData(checkData);
      setSearchItems([]);
      setIsCheck([]);
      setCheckBoxId(
        checkData.map((each) => {
          return each.id;
        })
      );
    }
  }, [slug]);

  useEffect(() => {
    clearButton && setSearchItems([]);
    clearButton && setIsCheck([]);
  }, [clearButton]);

  useEffect(() => {
    setClearButton(clearArray);
  }, [clearArray]);

  useEffect(() => {
    filterArray.length > 0 && setSearchItems(filterArray);
    const filterIsCheck =
      filterArray.length > 0 &&
      filterArray.map((each) => {
        return each.value;
      });
    if (filterIsCheck) {
      setIsCheck(filterIsCheck);
    } else {
    }
  }, [filterArray]);

  const handelSearch = (e, id) => {
    const filterCheckBoxItems = checkData.filter((check) => check.id === id);
    const filterItems = filterCheckBoxItems[0].list.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (filterItems.length > 0) {
      setCheckBoxData((current) =>
        current.map((obj) => {
          if (obj.id === id) {
            return {
              ...obj,
              list: filterItems,
            };
          }
          return obj;
        })
      );
    } else setCheckBoxData(checkData);
  };

  const handelCheckShow = (id) => {
    checkBoxId.includes(id)
      ? setCheckBoxId(checkBoxId.filter((each) => each !== id))
      : setCheckBoxId([id, ...checkBoxId]);
  };

  const handelCheckBox = (e, id, name) => {
    var upDatedChecks = {};
    if (e.target.checked) {
      upDatedChecks["title"] = id;
      upDatedChecks["value"] = e.target.value;

      setSearchItems([...searchItems, upDatedChecks]);
      setIsCheck([...isCheck, name]);
    } else {
      setSearchItems(
        searchItems.filter((each) => each.value !== e.target.value)
      );
      setIsCheck(isCheck.filter((ame) => ame !== name));
    }
  };

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    data.filter((ele) => {
      const repData = ele.subcategory;
      const linkData = repData.filter((ele1) => ele1.url === slug);
      if (linkData.length > 0) {
        const id = linkData[0].category_id;
        const vData = data.filter((ele2) => ele2.category_id === id);
        setMenuItems(vData[0].subcategory);
      }
    });
  }, [data]);

  const handelImageChange = (sub_category_id, url) => {
    SetSubCategory(!subCategory);
    subCategory_id.includes(sub_category_id)
      ? SetSubCategory_id(
          subCategory_id.filter((each) => each !== sub_category_id)
        )
      : SetSubCategory_id([sub_category_id, ...subCategory_id]);
  };

  const listLength = data.length > 0 ? data.length : 0;

  const handelPriceChange = (min, max) => {};

  return (
    <div className="categoryContainer">
      <div>
        {data.length > 0 && (
          <div>
            <div>
              <button
                type="button"
                className="menuShow"
                onClick={() => setSubCategoryShow(!subCategoryShow)}
              >
                <p className="filterTitle">{t("navigation.category")}</p>
                {subCategoryShow ? <BiMinus /> : <BiPlus />}
              </button>
            </div>
            <div className={listLength >= 4 && "textLength textScroll"}>
              {subCategoryShow &&
                data.map((item, idx) => {
                  return (
                    <div key={idx}>
                      <button
                        className="categoryButton text-decoration-none"
                        type="button"
                        defaultValue={item.sub_category_id}
                        onClick={(e) =>
                          handelImageChange(item.category_id, item.url)
                        }
                      >
                        {subCategory_id.includes(item.category_id) ||
                        item.url === slug ? (
                          <BiMinusCircle className="circleImage" />
                        ) : (
                          <BiPlusCircle className="circleImage" />
                        )}
                      </button>
                      <button
                        className="categoryButton text-decoration-none"
                        onClick={() => changeFilter(item.url)}
                      >
                        {item.category_name}
                      </button>
                      {(subCategory_id.includes(item.category_id) ||
                        item.url === slug) &&
                        item.subcategory.map((ele, id) => {
                          return (
                            typeof ele.sub_category_id != "object" && (
                              <div key={id}>
                                <button
                                  onClick={changeSubFilter(ele.url)}
                                  className="text-decoration-none subSubButton"
                                >
                                  {ele.sub_category_name}
                                </button>
                              </div>
                            )
                          );
                        })}
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
      <>{data.length > 0 && <hr className="new1" />}</>

      <div>
        {sliderRange.length > 0 && (
          <div>
            <button
              type="button"
              className="menuShow filterTitleContainer"
              onClick={() => setPriceShow(!priceShow)}
            >
              <p className="filterTitle">{sliderRange[0].title}</p>
              {priceShow ? <BiMinus /> : <BiPlus />}
            </button>
          </div>
        )}

        {sliderRange.length > 0 && priceShow && (
          <ProgressBar
            min={sliderRange[0].min_value}
            max={sliderRange[0].max_value}
            onChange={({ min, max }) => handelPriceChange(min, max)}
            minPriceChange={minPriceChange}
            maxPriceChange={maxPriceChange}
          />
        )}
      </div>

      <hr />
      {checkData.length > 0 && (
        <div>
          {CheckBoxData.length > 0 &&
            CheckBoxData.map((each, idc) => (
              <div key={idc}>
                <div>
                  <button
                    type="button"
                    className="menuShow filterTitleContainer"
                    onClick={(e) => handelCheckShow(each.id)}
                  >
                    <p className="filterTitle">{each.title}</p>
                    {checkBoxId.includes(each.id) ? <BiMinus /> : <BiPlus />}
                  </button>
                </div>

                <div className="mb-2">
                  {checkBoxId.includes(each.id) && (
                    <div>
                      <input
                        onChange={(e) => handelSearch(e, each.id)}
                        className="filterSearch"
                        type="search"
                        placeholder={` Search for ${each.title}`}
                      />

                      <div
                        className={
                          each.list.length >= 5 ? "textLength textScroll" : ""
                        }
                      >
                        {each.list.map((item, idv) => (
                          <div key={idv}>
                            <input
                              type="checkbox"
                              className="filterCheckBox"
                              id={item.id}
                              name={item.id}
                              value={item.name}
                              onChange={(e) =>
                                handelCheckBox(e, each.title, item.name)
                              }
                              checked={
                                isCheck.includes(item.name) ? true : false
                              }
                            />
                            <label
                              className="filterCheckName"
                              htmlFor={item.id}
                            >
                              {item.name}
                            </label>
                          </div>
                        ))}{" "}
                      </div>
                    </div>
                  )}{" "}
                </div>
                <hr className="new1" />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default FilterItems;
