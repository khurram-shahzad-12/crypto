import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link,Navigate,useNavigate  } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive';
import Accordion from 'react-bootstrap/Accordion';
import ModalCommonHook from '../componets/ModalCommonHook'
import AddressModel from './AddressModel'
import {HiPlusSm,HiMinusSm} from 'react-icons/hi'
import Cookies from 'universal-cookie';
import AddressCarosule from './AddressCarosule'

const Login = ({cartData,cartDataShow,addressData}) => {
    const {showModal }= ModalCommonHook();
    const isMobile = useMediaQuery({ query: `(max-width: 992px)` });
    console.log(addressData.length, 'addressData')

    const handelLoginShow = (data) => {
        showModal(data)
        cartDataShow(false)
    }

    React.useEffect(() =>{
        console.log(addressData, '\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\')

    },[addressData])

    const handelSignShow = (data) => {
        showModal(data)
        cartDataShow(false)
    }

    const handelNewAddress = (data) => {
        console.log("hhhhhhhhhh")
        showModal(data)
        cartDataShow(false)
    }

    const navigate = useNavigate();

    const handelContinue = () => {
        navigate('/')
        cartDataShow(false)

    }

    const cookies = new Cookies();

    var addressModal = useSelector((state) => state.addressShow.addressModal)

    console.log(addressModal, 'addressModal')
   
  return (
     <div className='d-flex justify-content-end login'>
        <img src='/Assets/arrowUp.svg' alt='Arrow' className='arrowUpSvg d-none d-lg-block' />
        
        <div className={isMobile ? "cartHoverContainer footerbottom" : "cartHoverContainer"}>
            <div className='HoverContainer d-flex flex-column'>
           
             <div className='logincontainer'>
             <div className='avatarCon mt-3'>
                 <img src='/Assets/account_circle.svg' alt='Account_Circle' className='avatarlogin' />
                 </div>
                 {(cookies.get('jwt_token') === undefined) && 
            <>
                 <div className='logincontainer'>
                     <button type='button' className='avatarButton' onClick={(e)=> handelLoginShow('login')}>Login</button>
                     <div className='loginText d-flex'>Don’t have an account?<button type='button' onClick={(e)=> handelSignShow('signup')} className='loginsign'>Sign Up</button></div>
                 </div>
                
                 <hr className='logiHorzental' />
                 </>
            }
             </div>
               
                  {(cartData !== undefined && Object.keys(cartData).length > 0 ) && cartData.cart_items.length > 0 && 
        <div className='w-100 px-2'>
            <div>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>My Cart</Accordion.Header>
                    <Accordion.Body className='productsScroll'>
                        
                    {(cartData !== undefined && Object.keys(cartData).length > 0 ) && 
                    <div>
                        {Object.keys(cartData).length > 0 && cartData.cart_items.map((each,id) => (
                            <div key={id} className=''>
                            <div className='singleCart'>
                                <div className='d-flex'>
                                <div className='cartimage'>
                                <img src={each.image} alt='Add To Cart' className='navCartImage' />
                                </div>
                               <NavLink className='cartlinkCon'>
                               <div className='cartText'>{each.name}</div>
                               <button type='button' className='cartRemove'>Remove</button>
                               
                               </NavLink>
                               </div>
                               <div className='loginquantity'>
                                <div className='quantityContainer'>
                                <button type='button' className='plusButton'><HiPlusSm /></button>
                                <input type='text' defaultValue='1' className='quantity' />
                                <button type='button' className='plusButton'><HiMinusSm /></button>
                                </div>
                                <div className='cartTextdisplayName'>{each.display_price}</div>
                               </div>
                                </div>
                                <div className='logiHorzental'></div>
                                </div>
                                
                
                        ))}


                     <div className='w-100'>
                      <div className='logincontainer'>
                      
                      <button type='button' className='loginshoppingbutton' onClick={handelContinue}><span className='loginshopping'>Continue Shopping</span> <span className='loginAddMore'>{" "}to add more items</span></button>
                      </div>
                     
                     
                  </div> 
                     
                      
                       
         </div>
         }
         
                   
                       
        
         
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Select Your Address</Accordion.Header>
                    <Accordion.Body>
                       {addressData.length > 0 && 
                        <AddressCarosule userAddress={addressData} />
                       }
                           
                        
                        
                        <div className='addAddressButton'>
                            <button type='button' className='addAddress' onClick={(e) => handelNewAddress("address")}>+ Add A New Address</button>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Payment Method</Accordion.Header>
                    <Accordion.Body>
                        
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
                        
                      
                       
         </div>
         } 
          {cartData === undefined && 
                         <div className='logincontainer'>
                         <div className='loginText text-center'>Cart is empty, add your items and continue place the order</div>
                         <button type='button' className='loginshopping' onClick={handelContinue}>Continue Shopping</button>
                     </div> 
                 
                        }
                   
                   
               
            </div>
            <div className='w-100'>    
                <div className='d-flex justify-content-between mx-2'>
                    <div className='cartSubTotal'>Sub Total</div>
                       <div className='subTotal'>{cartData.sub_total}</div>
                        </div>
                       
                       
                        </div>
                        <div className='cartComplete'><NavLink className='loginbutton'>Please Login</NavLink></div>
           
            </div>

       
       
           

            
            {addressModal && <AddressModel />} 
            
        
         </div>
                        
        
        
   
                 
    
  )
}

export default Login


