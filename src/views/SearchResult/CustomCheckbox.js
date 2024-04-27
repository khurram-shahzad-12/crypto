import { BsDash, BsPlus } from "react-icons/bs";
import useCollapse from "react-collapsed";
import { useFilter } from "./context/filter-context";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const CustomCheckbox = ({ data }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
    defaultExpanded: true,
  });

  const [checked, setChecked] = useState([]);

  const { filterArray, CheckItems, setCheckItems,handleClose } = useFilter();

  const handelCheckBox = (e, title) => {
    if (e.target.checked) {
      setCheckItems([...CheckItems, e.target.value]);
      if (searchParams.has(data.title)) {
        const ParamsValue = searchParams.get(data.title);

        searchParams.delete(data.title);

        searchParams.set(
          data.title,
          ParamsValue + "," + e.target.value.split("@")[0]
        );
      } else {
        searchParams.set(data.title, e.target.value.split("@")[0]);
      }
    } else {
      const ParamsValue = searchParams.get(data.title);
      var paramsArray = ParamsValue.split(",");
      var filteredArray = paramsArray.filter(
        (ele) => ele !== e.target.value.split("@")[0]
      );
      searchParams.set(data.title, filteredArray.toString());
      if (filteredArray.length <= 0) {
        searchParams.delete(data.title);
      }
      setCheckItems(CheckItems.filter((each) => each !== e.target.value));
    }
    handleClose()
    setSearchParams(searchParams);
  };

  React.useEffect(() => {
    const checkBoxData = filterArray.filter(
      (fil_Ele) => fil_Ele.title != "category" || fil_Ele.title != "subcategory"
    );
    if (checkBoxData.length > 0) {
      setChecked(
        filterArray
          .map(function (obj) {
            return obj.value.map((ele) => {
              return ele + "@" + obj.title;
            });
          })
          .reduce((a, b) => a.concat(b))
      );
    } else {
      setChecked([]);
    }
  }, [filterArray]);

  return (
    <div>
      <div className="" {...getToggleProps()}>
        <button type="button" className="menuShow filterTitleContainer">
          <p className="filterTitle">{data.title}</p>
          <div>{isExpanded ? <BsDash /> : <BsPlus />}</div>
        </button>
      </div>

      <div className="mb-2" {...getCollapseProps()}>
        <div>
          <input
            className="filterSearch"
            type="search"
            placeholder={` Search for ${data.title}`}
          />

          <div className={data.list.length >= 5 ? "textLength textScroll" : ""}>
            {data.list.length > 0 &&
              data.list.map((ele, idv) => (
                <div key={idv}>
                  <input
                    type="checkbox"
                    className="filterCheckBox"
                    name={data.title}
                    value={ele.name + "@" + data.title}
                    id={`inline-checkbox-${ele.id}`}
                    onChange={(e) => handelCheckBox(e, data.title)}
                    checked={checked.includes(ele.name + "@" + data.title)}
                  />
                  <label
                    className="filterCheckName"
                    htmlFor={`inline-checkbox-${ele.id}`}
                  >
                    {ele.name}
                  </label>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCheckbox;
