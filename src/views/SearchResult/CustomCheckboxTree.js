import React, { useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import useCollapse from "react-collapsed";
import { useFilter } from "./context/filter-context";
import { BsDash, BsPlus } from "react-icons/bs";
import { useParams, useSearchParams } from "react-router-dom";
import {
  MdAddBox,
  MdIndeterminateCheckBox,
  MdInsertDriveFile,
} from "react-icons/md";

const CustomCheckboxTree = ({ categories }) => {
  const { filterArray, setFilterPage,handleClose } = useFilter();

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
    defaultExpanded: true,
  });

  const [clicked, setClicked] = useState({});

  const urlSlug = useParams();

  const pathname = window.location.pathname;

  if (pathname.split("/")[1] != "search-result" && pathname.split("/")[1] != "brands") {
    const find = ({ url, children }) =>
      url.includes(
        urlSlug.hasOwnProperty("slug2") ? urlSlug.slug2 : urlSlug.slug
      ) ||
      (children && children.some(find));
    var default_expanded_slug_data = categories.filter(find);
  } else {
    var default_expanded_slug_data = [];
  }

  const [searchParams, setSearchParams] = useSearchParams();

  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  React.useEffect(() => {
    
    const checkBoxTree = filterArray.filter(
      (fil_Ele) =>
        fil_Ele.title == "category" ||
        fil_Ele.title == "subcategory" ||
        fil_Ele.title == "subsubcategory"
    );
    if (checkBoxTree.length > 0) {
      setChecked(
        checkBoxTree
          .map(function (obj) {
            return obj.value.map((ele) => {
              return ele + "@" + obj.title;
            });
          })
          .reduce((a, b) => a.concat(b))
      );

      setExpanded([
        default_expanded_slug_data.length > 0 &&
          default_expanded_slug_data[0].value,
        ...checkBoxTree
          .map(function (obj) {
            return obj.value.map((ele) => {
              const find = ({ value, children }) =>
                value.includes(ele) || (children && children.some(find));
              return (
                ele + "@" + obj.title,
                categories.filter(find).map((eleValue) => eleValue.value)[0]
              );
            });
          })
          .reduce((a, b) => a.concat(b)),
      ]);
    } else {
      setChecked([]);
      if (categories.length > 0) {
        if (default_expanded_slug_data.length > 0) {
          setExpanded([default_expanded_slug_data[0].value]);
        } else {
          setExpanded([]);
        }
      }
    }
  }, [filterArray]);

  React.useEffect(() => {
    if (default_expanded_slug_data.length > 0) {
      setExpanded([default_expanded_slug_data[0].value]);
      // setChecked([]);
    }
  }, [urlSlug.slug, categories]);


  const icons = {
    expandClose: (
      <>
        <div className="categoryButton text-decoration-none" type="button">
          <BiPlusCircle className="circleImage" />
        </div>
      </>
    ),
    expandOpen: (
      <>
        <div className="categoryButton text-decoration-none" type="button">
          <BiMinusCircle className="circleImage" />
        </div>
      </>
    ),
    expandAll: <MdAddBox className="rct-icon rct-icon-expand-all" />,
    collapseAll: (
      <MdIndeterminateCheckBox className="rct-icon rct-icon-collapse-all" />
    ),
    parentClose: <></>,
    parentOpen: <></>,
    leaf: <MdInsertDriveFile className="rct-icon rct-icon-leaf-close" />,
  };

  const handleCheck = (checkedd, node) => {
    if (node.checked) {
      if (Object.keys(node.parent).length > 0) {
        setChecked([...checked, ...[node.parent.value, node.value]]);
        const Value = node.value.split("@")[1];
        if (searchParams.has(Value)) {
          const ParamsValue = searchParams.get(Value);
          if (!ParamsValue.split(",").includes(node.value.split("@")[0])) {
            searchParams.delete(Value);
            searchParams.set(
              Value,
              ParamsValue + "," + node.value.split("@")[0]
            );
          }
        } else {
          searchParams.set(Value, node.value.split("@")[0]);
        }
        setSearchParams(searchParams);
      } else {
        setChecked([...checked, ...[node.value]]);
        const parentValue = node.value.split("@")[1];
        if (searchParams.has(parentValue)) {
          const ParamsValue = searchParams.get(parentValue);
          if (!ParamsValue.split(",").includes(node.value.split("@")[0])) {
            searchParams.delete(parentValue);
            searchParams.set(
              parentValue,
              ParamsValue + "," + node.value.split("@")[0]
            );
          }
        } else {
          searchParams.set(parentValue, node.value.split("@")[0]);
        }
        setSearchParams(searchParams);
      }
    } else {
      const Value = node.value.split("@")[1];
      const ParamsValue = searchParams.get(Value);
      var paramsArray = ParamsValue.split(",");
      var filteredArray = paramsArray.filter(
        (ele) => ele !== node.value.split("@")[0]
      );
      searchParams.set(Value, filteredArray.toString());
      if (filteredArray.length <= 0) {
        searchParams.delete(Value);
      }
      const filteredChecks = checked.filter((each) => each !== node.value);
      setChecked(filteredChecks);
      setSearchParams(searchParams);
    }

    handleClose()

    console.log("hiiiii");
  };

  const onClick = (value) => {
    setClicked(value);
    // handleClose()
  };

  return (
    <div>
      <div className="" {...getToggleProps()}>
        <button type="button" className="menuShow">
          <p className="filterTitle">Category</p>
          <div>{isExpanded ? <BsDash /> : <BsPlus />}</div>
        </button>
      </div>

      <div {...getCollapseProps()} className="textLength textScroll">
        <CheckboxTree
          nodes={categories}
          checked={checked}
          nativeCheckboxes={true}
          onlyLeafCheckboxes={true}
          expandOnClick
          noCascade={true}
          expanded={expanded}
          onClick={onClick}
          onCheck={(checked, node) => handleCheck(checked, node)}
          onExpand={(expanded) => setExpanded(expanded)}
          icons={icons}
        />
      </div>
    </div>
  );
};

export default CustomCheckboxTree;
