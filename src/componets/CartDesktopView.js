import React from 'react'
import { useMediaQuery } from "react-responsive";
import Checkout from './Checkout';

const CartDesktopView = ({isShown, setIsShown}) => {
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });

  return (
    <div className="d-flex justify-content-end login">
      <img src="/Assets/arrowUp.svg" alt="Arrow" className="arrowUpSvg d-none d-lg-block" />
      <div className={isMobile ? "cartHoverContainer footerbottom" : "cartHoverContainer"}>
        <div className={`d-flex flex-column ${isMobile ? "HoverContainerMob" : "HoverContainer"}`}>
          <Checkout isShown={isShown} setIsShown={setIsShown}/>
        </div>
      </div>
    </div>
  )
}

export default CartDesktopView
