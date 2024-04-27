/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";

const CheckBox = ({ slug, CheckBoxItems, fliterItemsSend }) => {
  const [CheckBoxData, setCheckBoxData] = useState(CheckBoxItems);
  const [searchItems, setSearchItems] = useState([]);
  const [checkBoxId, setCheckBoxId] = useState([]);
  const [isCheck, setIsCheck] = useState([]);
  const initialSearchValues = useRef();
  const initialCheck = useRef();

  useEffect(() => {
    initialSearchValues.current = searchItems;
    initialCheck.current = isCheck;
  }, [searchItems]);

  useEffect(() => {
    fliterItemsSend(searchItems);
  }, [searchItems]);

  useEffect(() => {
    setCheckBoxData(CheckBoxItems);
    setSearchItems([]);
    setIsCheck([]);
    setCheckBoxId([]);
  }, [slug]);

  const handelSearch = (e, id) => {
    const filterCheckBoxItems = CheckBoxItems.filter(
      (check) => check.id === id
    );

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
    } else setCheckBoxData(CheckBoxItems);
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

  return (
    <div className="">
      {CheckBoxData.length > 0 &&
        CheckBoxData.map((each, id) => (
          <div key={id}>
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

                  <div className={each.list.length >= 6 ? "textLength" : ""}>
                    {each.list.map((item, id) => (
                      <div key={id}>
                        <input
                          type="checkbox"
                          className="filterCheckBox"
                          id={item.id}
                          name={item.id}
                          value={item.name}
                          onChange={(e) =>
                            handelCheckBox(e, each.title, item.name)
                          }
                          checked={isCheck.includes(item.name) ? true : false}
                        />
                        <label className="filterCheckName" htmlFor={item.id}>
                          {item.name}
                        </label>
                      </div>
                    ))}{" "}
                  </div>
                </div>
              )}{" "}
            </div>
          </div>
        ))}
    </div>
  );
};

export default CheckBox;
