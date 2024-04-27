import React from "react";
import CustomCheckboxTree from "./CustomCheckboxTree";
import CustomCheckbox from "./CustomCheckbox";
import axios from "axios";
import { useFilter } from "./context/filter-context";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import SliderRange from "./SliderRange";
import FiltersPage from "./FiltersPage";

const Filters = ({ filters, subcategory_id }) => {
  const statelocation = useLocation();

  const [status, setstatus] = React.useState('');
  const {
    maxPrice,
    minPrice,
    SethasMore,
    filterPage,
    SetMinPrice,
    SetMaxPrice,
    setFilterPage,
    setloaderStatus,
    handleClose,
    setcallSliderRange,
    callSliderRange,
    DisplayItems,
    setDisplayItems,
    setfilterArray,
    setfilterArray1,
  } = useFilter();

  const urlSlug = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const fetchFilterData = (type) => {

    var queryObj = {};
    for (const entry of searchParams.entries()) {
      queryObj = Object.fromEntries([...searchParams]);
    }

    var finalInput = Object.entries(queryObj).map(([key, value]) => ({
      title: key,
      value: value.split(",").map((ele) => ele.split("_")[0]),
    }));

    setfilterArray(
      Object.entries(queryObj).map(([key, value]) => ({
        title: key,
        value: value.split(","),
        label:
          key === "category" || key === "subcategory" || key === "subsubcategory"
            ? value.split(",").map((ele) => {
              const find = ({ value, children }) =>
                value.includes(ele) || (children && children.some(find));
              const matchingCategories = filters.categories.filter(find);
              if (matchingCategories.length > 0) {
                const firstMatch = matchingCategories[0];
                const subcategoryLabel = firstMatch.children
                  .filter((ele1) => ele1.value === ele + "@" + key)[0]?.label;
                return subcategoryLabel || "Unknown";
              } else {
                return "Unknown";
              }
            })
            : value.split(","),
      }))
    );
    setfilterArray1(
      Object.entries(queryObj).map(([key, value]) => ({
        title: key,
        value: value.split(","),
        label:
          key === "category" || key === "subcategory" || key === "subsubcategory"
            ? value.split(",").map((ele) => {
              const find = ({ value, children }) =>
                value.includes(ele) || (children && children.some(find));
              const matchingCategories = filters.categories.filter(find);
              if (matchingCategories.length > 0) {
                const firstMatch = matchingCategories[0];
                const subcategoryLabel = firstMatch.children
                  .filter((ele1) => ele1.value === ele + "@" + key)[0]?.label;
                return subcategoryLabel || "Unknown";
              } else {
                return "Unknown";
              }
            })
            : value.split(","),
      }))
    );

    const pathname = window.location.pathname.split("/")[1];


    if (finalInput.length <= 0) {
      if (pathname != "search-result" && pathname != "brands") {




        const find = ({ url, children }) =>
          url.includes(
            urlSlug.hasOwnProperty("slug2") ? urlSlug.slug1 + "/" + urlSlug.slug2 : urlSlug.slug
          ) ||
          (children && children.some(find));
        var category1 = filters.categories.reduce((acc, curr) => {
          if (find(curr)) {
            acc = curr;
          }
          return acc;
        }, null);


        if (category1 != null) {
          var category = [category1];

        } else {
          var category = [];
        }


        if (category.length > 0) {
          var finalInput = [
            {
              title: "subcategory",
              value: [category[0].sub_category_id],
            },
          ];
        }
        if (pathname == "products-category") {
          var finalInput = [
            {
              title: "subcategory",
              value: category.length > 0 ? [category[0].sub_category_id] : [],
            },
            ...finalInput,
          ];
        }
        if (pathname == "products-subcategory") {

          console.log(filters.categories);
          // console.log("category", category)
          // console.log("urlSlug", urlSlug)
          // console.log("slug1", category[0].children.filter(
          //   (ele) => ele.url == urlSlug.slug1 + "/" + urlSlug.slug2
          // )[0])
          var finalInput = [
            {
              title: "subsubcategory",
              value: [
                category[0].children.filter(
                  (ele) => ele.url == urlSlug.slug1 + "/" + urlSlug.slug2
                ).length > 0 ? category[0].children.filter(
                  (ele) => ele.url == urlSlug.slug1 + "/" + urlSlug.slug2
                )[0].sub_subcategory_id : [],
              ],
            },
            ...finalInput,
          ];
        }
      } else {
        if (pathname == "brands") {
          if (urlSlug.slug1 != undefined) {
            var finalInput = [
              {
                title: "Brands",
                value: [urlSlug.slug],
              },
              {
                title: "subcategory",
                value: [urlSlug.slug1],
              },
              ...finalInput,
            ];
          } else {
            var finalInput = [
              {
                title: "Brands",
                value: [urlSlug.slug],
              },
              ...finalInput,
            ];
          }

        }
      }
    } else {
      if (pathname != "search-result" && pathname != "brands") {
        const uio = finalInput.filter(
          (ele) =>
            ele.title == "category" ||
            ele.title == "subcategory" ||
            ele.title == "subsubcategory"
        );
        if (uio.length <= 0) {
          const find = ({ url, children }) =>
            url.includes(
              urlSlug.hasOwnProperty("slug2") ? urlSlug.slug2 : urlSlug.slug
            ) ||
            (children && children.some(find));
          var category = filters.categories.filter(find);


          if (pathname == "products-category") {
            var finalInput = [
              {
                title: "subcategory",
                value: [category[0].sub_category_id],
              },
              ...finalInput,
            ];
          }
          if (pathname == "products-subcategory") {

            var finalInput = [
              {
                title: "subsubcategory",
                value: [
                  category[0].children.filter(
                    (ele) => ele.url == urlSlug.slug1 + "/" + urlSlug.slug2
                  )[0].sub_subcategory_id,
                ],
              },
              ...finalInput,
            ];
          }
        }
      } else {
        if (pathname == "brands") {
          if (urlSlug.slug1 != undefined) {
            var finalInput = [
              {
                title: "Brands",
                value: [urlSlug.slug],
              },
              {
                title: "subcategory",
                value: [urlSlug.slug1],
              },
              ...finalInput,
            ];
          } else {
            var finalInput = [
              {
                title: "Brands",
                value: [urlSlug.slug],
              },
              ...finalInput,
            ];
          }
        }
      }
    }

    filterPage == 1 && setloaderStatus(true);

    if (statelocation.state != null) {
      var subcategory_id = statelocation.state.subcategory_id
    } else {
      var subcategory_id = 'search'
    }

    var getMaxval = finalInput.filter(ele => ele.title == 'max')
    if (getMaxval.length > 0) {
      SetMinPrice(finalInput.filter(ele => ele.title == 'min')[0].value)
      SetMaxPrice(finalInput.filter(ele => ele.title == 'max')[0].value)
    }

    axios
      .post("/api/filtered_items", {
        page: type == "filtered" ? 1 : filterPage,
        filtered_items: finalInput.filter(ele => ele.title != 'min' && ele.title != 'max'),
        ...(pathname == "search-result" && { searchString: urlSlug.slug, subcategory_id: subcategory_id }),
        ...(getMaxval.length > 0 && {
          price_range: [
            {
              min: finalInput.filter(ele => ele.title == 'min')[0].value,
              max: finalInput.filter(ele => ele.title == 'max')[0].value,
            },
          ],
        }),
      })
      .then((response) => {
        if (response.data.data.products.length > 0) {
          SethasMore(true);
        } else {
          SethasMore(false);
        }

        setstatus(false)

        if (type == "filtered") {
          setDisplayItems({
            ...DisplayItems,
            display_items: {
              ...DisplayItems["display_items"],
              ["products"]: response.data.data.products,
            },
          });
        } else {
          setDisplayItems({
            ...DisplayItems,
            display_items: {
              ...DisplayItems["display_items"],
              ["products"]: [
                ...DisplayItems["display_items"]["products"],
                ...response.data.data.products,
              ],
            },
          });
        }
        setloaderStatus(false);
      })
      .catch((err) => {

        console.log("err", err);
      });
  };

  React.useEffect(() => {
    if (filterPage != 1) {
      fetchFilterData("notfiltered");
    }

    console.log("filterPage", filterPage);
  }, [filterPage]);


  React.useEffect(() => {
    const pathname = window.location.pathname.split("/")[1];
    setFilterPage(1);
    var queryObj = {};
    for (const entry of searchParams.entries()) {
      queryObj = Object.fromEntries([...searchParams]);
    }

    var finalInput = Object.entries(queryObj).map(([key, value]) => ({
      title: key,
      value: value.split(",").map((ele) => ele.split("_")[0]),
    }))

    if (finalInput.length > 0) {

      if (pathname != "search-result") {
        fetchFilterData("filtered");
      } else {
        fetchFilterData("filtered");
      }


    } else {
      setfilterArray(
        Object.entries(queryObj).map(([key, value]) => ({
          title: key,
          value: value.split(","),
          label:
            key == "category" || key == "subcategory" || key == "subsubcategory"
              ? value.split(",").map((ele) => {
                const find = ({ value, children }) =>
                  value.includes(ele) || (children && children.some(find));
                return filters.categories
                  .filter(find)
                  .map((eleValue) => eleValue.children)[0]
                  .filter((ele1) => ele1.value == ele + "@" + key)[0].label;
              })
              : value.split(","),
        }))
      );
      setfilterArray1(
        Object.entries(queryObj).map(([key, value]) => ({
          title: key,
          value: value.split(","),
          label:
            key == "category" || key == "subcategory" || key == "subsubcategory"
              ? value.split(",").map((ele) => {
                const find = ({ value, children }) =>
                  value.includes(ele) || (children && children.some(find));
                return filters.categories
                  .filter(find)
                  .map((eleValue) => eleValue.children)[0]
                  .filter((ele1) => ele1.value == ele + "@" + key)[0].label;
              })
              : value.split(","),
        }))
      );

      SetMinPrice(0);
      SetMaxPrice(0);


      // fetchFilterData("filtered");

    }

  }, [searchParams]);

  React.useEffect(() => {
    if (callSliderRange == true) {
      fetchFilterData("filtered");
      setcallSliderRange(false);
      handleClose()
    }
  }, [callSliderRange]);

  return (
    <>
      {
        DisplayItems.hasOwnProperty("filters") &&
        <FiltersPage filters={filters} />
      }
    </>
  );
};

export default Filters;
