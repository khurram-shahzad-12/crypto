/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import SubCategory from "./SubCategory";

const CategoryList = ({ items }) => {
  return (
    <li className="menu-items">
      {items.subcategory ? (
        <>
          <a href="">{items.category_name} </a>
          {items.subcategory.map((subCat, index) => (
            <SubCategory subCat={items.subcategory} key={index} />
          ))}
        </>
      ) : (
        <a href="">{items.title}</a>
      )}
    </li>
  );
};

export default CategoryList;
