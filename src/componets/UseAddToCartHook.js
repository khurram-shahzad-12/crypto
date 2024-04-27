import { useState } from "react";

const UseAddToCartHook = () => {
  const [cartClick, setCartClick] = useState(false);
  const [cartDetail, setCartDetail] = useState({
    id: "",
    quantity: "",
  });

  //const [scrollPosition, setScrollPosition] = useState(0);

  const addToCart = (id) => {
    // console.log("id", e)
    //setScrollPosition(window.scrollY);

    setCartClick(true);
    setCartDetail({ id: id.toString(), quantity: "1" });
  };

  // const disableSafariScroll = () => {
  //   document.body.style.overflow = 'hidden';
  //   document.documentElement.style.overflow = 'hidden';
  //   window.scrollTo(0, 0);
  //   document.body.scrollTop = 0;
  //   document.documentElement.scrollTop = 0;
  //   document.body.style.overflow = 'auto';
  //   document.documentElement.style.overflow = 'auto';
  // };

  return {
    addToCart,
    cartDetail,
    cartClick,
    setCartClick
  };
};

export default UseAddToCartHook;
