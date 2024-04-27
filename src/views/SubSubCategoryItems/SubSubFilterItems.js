/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProgressBar from "../NavbarCategoryItems/ProgressBar";

import { BiPlus, BiMinus, BiMinusCircle, BiPlusCircle } from "react-icons/bi";

const SubSubFilterItems = ({
  checkData,
  sliderRange,
  fliterItemsSend,
  slug1,
  slug2,
  data,
  minPriceChange,
  maxPriceChange,
  filterArray,
  clearArray,
  removeItem,
}) => {
  const [subCategory, SetSubCategory] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [subCategoryShow, setSubCategoryShow] = useState(true);
  const [priceShow, setPriceShow] = useState(true);
  const [subCategory_id, SetSubCategory_id] = useState([]);
  const [clearButton, setClearButton] = useState(clearArray);
  const [CheckBoxData, setCheckBoxData] = useState(checkData);

  const [searchItems, setSearchItems] = useState([]);
  const [checkBoxId, setCheckBoxId] = useState([]);

  const [isCheck, setIsCheck] = useState([]);

  useEffect(() => {
    fliterItemsSend(searchItems);
  }, [searchItems]);

  useEffect(() => {
    setCheckBoxData(checkData);
    setSearchItems([]);
    setIsCheck([]);
    setCheckBoxId(
      checkData.map((each) => {
        return each.id;
      })
    );
  }, [slug1, slug2]);

  useEffect(() => {
    setClearButton(clearArray);
  }, [clearArray]);

  useEffect(() => {
    clearButton && setSearchItems([]);
    clearButton && setIsCheck([]);
  }, [clearButton]);

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
      setIsCheck([]);
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
    data !== undefined &&
      // eslint-disable-next-line array-callback-return
      data.filter((ele) => {
        const repData = ele.subcategory;
        const dat1 = repData.filter((each) => each.url === slug1);
        if (dat1.length > 0) {
          setMenuItems(repData);
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

  const listLength = menuItems.length > 0 && menuItems.length;

  const handelPriceChange = (min, max) => {};

  return (
    <div className="categoryContainer">
      <div>
        {menuItems.length > 0 && (
          <div>
            <div className="">
              <button
                type="button"
                className="menuShow"
                onClick={() => setSubCategoryShow(!subCategoryShow)}
              >
                <p className="filterTitle">Category</p>
                {subCategoryShow ? <BiMinus /> : <BiPlus />}
              </button>
            </div>
            <div className={listLength >= 4 && "textLength textScroll"}>
              {subCategoryShow &&
                menuItems.map((item, idx) => {
                  return (
                    <div key={idx}>
                      <button
                        className="categoryButton text-decoration-none"
                        type="button"
                        defaultValue={item.sub_category_id}
                        onClick={(e) =>
                          handelImageChange(item.sub_category_id, item.url)
                        }
                      >
                        {subCategory_id.includes(item.sub_category_id) ||
                        item.url === slug1 ? (
                          <BiMinusCircle className="circleImage" />
                        ) : (
                          <BiPlusCircle className="circleImage" />
                        )}
                      </button>
                      <NavLink
                        className="categoryButton text-decoration-none"
                        to={`/products-category/${item.url}`}
                      >
                        {item.sub_category_name}
                      </NavLink>
                      {(subCategory_id.includes(item.sub_category_id) ||
                        item.url === slug1) &&
                        item.sub_subcategory.map((ele, id) => {
                          return (
                            typeof ele.sub_subcategory_id != "object" && (
                              <div key={id}>
                                <NavLink
                                  to={`/products-subcategory/${ele.url}`}
                                  className="text-decoration-none subSubButton"
                                >
                                  {ele.sub_subcategory_name}
                                </NavLink>
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
      <>{menuItems.length > 0 && <hr className="new1" />}</>

      <div>
        {sliderRange.length > 0 && (
          <div className="">
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
        <div className="">
          {CheckBoxData.length > 0 &&
            CheckBoxData.map((each, idc) => (
              <div key={idc}>
                <div className="">
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

export default SubSubFilterItems;
