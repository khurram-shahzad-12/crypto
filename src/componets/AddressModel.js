import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import call_apis from "../services/Apis";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { GlobalCart } from "../App";
import OtpInput from "react18-input-otp";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import OtpVerify from '../componets/OtpVerify'

const AddressModel = ({ addressById, showAddress, setShowaddressModal, type}) => {
 
  const { getAddressList,setIdaddress,setMobile,setSelectAddress,setPrecheckoutno,setPostcheckoutno,setSelectAddressError,setAdloading } = useContext(GlobalCart);
  const google = (window.google = window.google ? window.google : {});
  const [location, SetLocation] = useState([]);
  const [arealist, SetArealist] = useState([]);
  const [latitude, setLatitide] = useState("");
  const [longitude, SetLongitude] = useState("");
  const cookies = new Cookies();
  const token = cookies.get("jwt_token");
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState({});
  const [userAddress, setUserAddress] = useState('');
  const [draggedMarkerPosition, setDraggedMarkerPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const [address, setAddres] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [phoneVerify, setPhoneVerify] = useState("");
  const [successMpbile, setSuccessMpbile] = useState(false);
  const [mobileMsz, setMobileMsz] = useState(false)
  const [showmobileverifymsz, setshowmobileverifymsz] = useState("")
  const [otpVarify,setOtpVarify]=useState("");
  const [checkBoxError,setCheckBoxError]=useState("")
  const [preMob,setPreMob]=useState("");
  const [postMob,setPostMob]=useState("");
  const [oldmobile,setOldmobile]=useState("")
  const [oldmobilestatus,setOldmobilestatus]=useState("");
  const searchBoxRef = useRef(null);

  

  const varifyMobileNumberWhtsap = async(input) => {
    const resp = await call_apis.reSendOtpWhatsapp(input);
      if(resp.status === 200){
        if(resp.data.status == 'success'){
          setshowmobileverifymsz(resp.data.message)
          setPhoneVerify(true)
          
        }else if(resp.data.status == "exits"){
          setPhoneVerify(false)
          setshowmobileverifymsz(resp.data.message)
        }
      }
  }

  const getResendOtpWhatsapp = async () => {
    const mobile=preMob+postMob
    const input = {
      "mobile": mobile,
    };  
    //console.log("input",input)
    varifyMobileNumberWhtsap(input)
   
  };

  
  
  const handleSelect = async (selectedAddress) => {
    const results = await geocodeByAddress(selectedAddress);
    let latLng = await getLatLng(results[0]);
    setMapCenter(latLng);
    setMarkerPosition(latLng)
    setAddres(selectedAddress);
    setUserAddress(selectedAddress);
    

  };

  // eslint-disable-next-line no-unused-vars
  const [addressDetails, setAddressDetails] = useState({
    first_name: "",
    last_name: "",
    address: "",
    address2: "",
    pre: "",
    mobile: "",
    emirate: "",
    area: "",
    building_name: "",
    latitude: "",
    longitude: "",
    status:0,
    default_address: false,
  });

  const getLocations = async () => {
    const resp = await call_apis.getLocations();
    if (resp.status === 200) {
      if (resp.data.data.length > 0) {
        SetLocation(resp.data.data);
      }
    }
  };

  const closeModal = () => {
    setShowaddressModal(false);
    setAddressDetails({
      first_name: "",
      last_name: "",
      address: "",
      address2: "",
      pre: "",
      mobile: "",
      emirate: "",
      area: "",
      building_name: "",
      latitude: "",
      longitude: "",
      default_address: false,
      status:0
    });
  };

  const handleDefault=(e)=>{

    // if(otpVarify){
      if(e.target.name === "default_address"){
        setAddressDetails((addressDetails)=>({
          ...addressDetails,
          [e.target.name]: e.target.checked,
        }))
      }
    

  }

  React.useEffect(() => {
    if (successMpbile) {
      setAddressDetails((addressDetails) => ({
        ...addressDetails,
        ["status"]: 1,
      }));
    }
  }, [successMpbile])

  const validate = () => {
    const errors = {};
    console.log(errors)
    const regexName = /^[a-zA-Z ,.'-]+$/i;
    const regexmobile = /^(\+\d{1,3}[- ]?)?\d{7}$/;


    if (addressDetails.first_name === "") {
      errors.first_name = "Name is required";
    } else if (!regexName.test(addressDetails.first_name)) {
      errors.first_name = "This is not a valid name format";
    }


    if (addressDetails.mobile === "") {
      errors.mobile = "Mobile is required";
    } else if (!regexmobile.test(addressDetails.mobile)) {
      errors.mobile = "Mobile should be 7 digit";
    }
    if (addressDetails.pre === "") {
      errors.pre = "Choose code";
    }
    if (addressDetails.emirate === "") {
      errors.emirate = "Emirate is required";
    }
    if (addressDetails.area === "") {
      errors.area = "Area is required";
    }
    if (addressDetails.address === "") { 
      errors.address = "Address is required";
    }
    if ((addressDetails.latitude === undefined) || (addressDetails.longitude === undefined))
{
  errors.locError = "Please Mark your Location"; 
}

    return errors;
  };



  const addressSubmit = async() => {
  const errorDetails=await validate(addressDetails)
  setFormErrors(errorDetails);
    
    if(Object.keys(errorDetails).length>0) return;

    addressSave();
    setMobileMsz(false)
  };




  const getAreaList = async (event) => {
    const resp = await call_apis.getAreas(parseInt(event));
    if (resp.status === 200) {
      if (resp.data.data.length > 0) {
        SetArealist(resp.data.data);
      }
    }
  };

  const varifyMobileNumber = async (input) => {
    const resp = await call_apis.checkMobileNumber(input);
    if (resp.status === 200) {
      if (resp.data.status == 'success') {
        setAddressDetails((addressDetails) => ({
          ...addressDetails,
          ["mobile"]: input.mobile.slice(2, 9),
        }));
        
        setPhoneVerify(true);
      } else if (resp.data.status == "invalid") {

        setshowmobileverifymsz(resp.data.message)
      }
    }
  }



  const handleChange = async (event, i) => {
    if (event.target.name === "emirate") {
      if (event.target.value != '' || event.target.value == 0) {
        getAreaList(event.target.value);
        setAddressDetails((addressDetails) => ({
          ...addressDetails,
          [event.target.name]: event.target.value,
        }));
      }
    } else if (event.target.name === "default_address") {
      setAddressDetails((addressDetails) => ({
        ...addressDetails,
        [event.target.name]: event.target.checked,
      }));
    } else if (event.target.name === "pre") {

      if(addressDetails.mobile !== "" && addressDetails.mobile?.length === 7){
        let wholemobilenumber=event.target.value + addressDetails.mobile;
        setPreMob(event.target.value);
        setPostMob(addressDetails.mobile);
        const input={
          "mobile":wholemobilenumber
        }
        // await varifyMobileNumber(input);
        
        setMobileMsz(false)
      }


      setAddressDetails((addressDetails) => ({
        ...addressDetails,
        [event.target.name]: event.target.value,
      }));
    
      


      
    } else if (event.target.name === "mobile") {
      const regexName = /^(\+\d{1,3}[- ]?)?\d{7}$/;

      if (event.target.value !== '' && event.target.value.length == 7) {
       if(addressDetails.pre !== "" && addressDetails.pre?.length === 2){
        let wholemobilenumber=addressDetails.pre + event.target.value;
        setPreMob(addressDetails.pre);
        setPostMob(event.target.value);
        const input={
          "mobile":wholemobilenumber
        }
        console.log(input)
        // await varifyMobileNumber(input);
    
        setMobileMsz(false)
       }
        setAddressDetails((addressDetails) => ({
          ...addressDetails,
          [event.target.name]: event.target.value,
        }));
        
      } else {
        
        setMobileMsz(true)
      }

    } else {
      setAddressDetails((addressDetails) => ({
        ...addressDetails,
        [event.target.name]: event.target.value,
      }));
    }
    if (longitude !== "") {
      setAddressDetails((addressDetails) => ({
        ...addressDetails,
        ["longitude"]: longitude,
      }));
    }
    if (latitude !== "") {
      setAddressDetails((addressDetails) => ({
        ...addressDetails,
        ["latitude"]: latitude,
      }));
    }
  };

  useEffect(() => {
    showAddress && location.length === 0 && getLocations();
  }, []);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };
  const [mapCenter, setMapCenter] = useState({ lat: 25.2048, lng: 55.2708 });


  
  
  useEffect(() => {
    if (addressById !== undefined && addressById.length > 0) {
      getAreaList(addressById[0].emirate);

      setAddressDetails({
        status:addressById[0].status,
        idaddress: addressById[0].idaddress,
        first_name: addressById[0].first_name,
        address: addressById[0].address,
        address2: addressById[0].address2,
        mobile: addressById[0].mobile.slice(2, 9),
        pre: addressById[0].mobile.slice(0, 2),
        emirate: addressById[0].emirate.toString(),
        area: addressById[0].area.toString(),
        building_name: addressById[0].building_name,
        latitude: addressById[0].latitude,
        longitude: addressById[0].longitude,
        default_address: addressById[0].default_address === 1 ? true : false,
        status: addressById[0].status
      });
    }
  }, [addressById]);

  useEffect(() => {
    if (addressById !== undefined && addressById.length > 0) {
      getAreaList(addressById[0].emirate);


        
        let initiallatitude= addressById[0].latitude;
        let initiallongitude= addressById[0].longitude;
        let getoldmobile=addressById[0].mobile;
        let getoldmobilestatus=addressById[0].status;
        let getoldaddress2=addressById[0].address2;
        let parselatitude=parseFloat(initiallatitude);
        let parselongitude=parseFloat(initiallongitude);
        
        setOldmobile(getoldmobile);
        setOldmobilestatus(getoldmobilestatus);
        setAddres(getoldaddress2);
        setLatitide(parselatitude);
        SetLongitude(parselongitude);
        setMarkerPosition({ lat: parselatitude, lng: parselongitude });

    }
  }, [addressById]);

  




  const varifyMobileNumberResend = async(input) => {

    const resp = await call_apis.reSendOtp(input);
    
      if(resp.status === 200){
        if(resp.data.status == 'success'){
          setAddressDetails((addressDetails) => ({
            ...addressDetails,
            ["mobile"]: input.mobile.slice(2, 9)
  
          }));
          setshowmobileverifymsz(resp.data.message)
          setPhoneVerify(true)
        }else if(resp.data.status == "exits"){
          setPhoneVerify(false)
          setshowmobileverifymsz(resp.data.message)
        }
      }
  }


  const getusernewaddress=async(id)=>{
    const inputData = {
      idaddress: id,
    };
    const resp = await call_apis.selectAddress(inputData);
    if (resp.status === 200) {
      await getAddressList();
    }
    // const resp = await call_apis.getAddressList(0);
    // if (resp.status === 200) {
    //   let addresslist=resp.data.data;
    //   let getselectaddress=addresslist && addresslist.find(address => address.idaddress === id);
    //     let idadres=getselectaddress.idaddress;
    //     let mobile=getselectaddress.mobile;
    //     let mobileStr = mobile.toString();
    //     let prenumber = mobileStr.slice(0, 2);
    //     let postnumber = mobileStr.slice(2,9);
    //     setIdaddress(idadres);
    //     setSelectAddress(getselectaddress);  
    //     setPrecheckoutno(prenumber)
    //     setPostcheckoutno(postnumber)
    //     setMobile(mobile);
    // }else{
      
    // }
  }




  const getResendOtp = async () => {
    const mobile=preMob+postMob
    const input = {
      "mobile": mobile,
    };  
    
    varifyMobileNumberResend(input)
  };

  const handleClose = () => setPhoneVerify(false);


  const addressSave = async () => {
    setAdloading(true);

    const { pre, ...addressDetailsNew } = addressDetails;

    Object.keys(addressDetailsNew).forEach((item) => {
      if (item == "mobile") {
        addressDetailsNew[item] = pre + addressDetailsNew[item];
      }
    });
    const op = {
      ...addressDetails,
      "mobile": addressDetails.pre + addressDetails.mobile,
      "address2":address
    }
    const resp = await call_apis.saveAddress(op);
    let new_addressId=resp.data.data.idaddress
    if (resp.status == 200) {
      closeModal();
      await getusernewaddress(new_addressId)
      await getAddressList();
      setSelectAddressError("");
    }
    setAdloading(false)

  }

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setMarkerPosition({ lat: latitude, lng: longitude });
          setMapCenter({ lat: latitude, lng: longitude });
          const results = await geocodeByAddress(`${latitude}, ${longitude}`);
          setUserAddress(results[0].formatted_address);
          
          setAddressDetails(addressDetails => ({
            ...addressDetails,
            latitude: latitude,
            longitude:longitude,
          }));
        },
        (error) => {
          console.log('Error occurred while retrieving the user location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  const geocodeByLatLng = async (latLng) => {
    const results = await geocodeByAddress(`${latLng.lat}, ${latLng.lng}`);
    setUserAddress(results[0].formatted_address);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };



  useEffect(() => {
    if (markerPosition) {
      getAddressFromLatLng(markerPosition);
      let mlatitude=markerPosition && markerPosition.lat;
      let mlongitude=markerPosition && markerPosition.lng;
      setLatitide(mlatitude);
      SetLongitude(mlongitude);

      setAddressDetails(addressDetails => ({
        ...addressDetails,
        latitude: mlatitude,
        longitude:mlongitude,
      }));

      
    }
  }, [markerPosition]);

  const getAddressFromLatLng = async (latLng) => {
    try {
      const results = await geocodeByAddress(`${latLng.lat}, ${latLng.lng}`);
      setAddres(results[0].formatted_address);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePlaceChange = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      setMapCenter(latLng);
      setMarkerPosition(latLng);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDragEnd = async (event) => {
    const { latLng } = event;
    const newPosition = { lat: latLng.lat(), lng: latLng.lng() };
    // setUserLocation({ lat: latLng.lat(), lng: latLng.lng() });
    setMarkerPosition(newPosition);

    try {
      const results = await geocodeByAddress(`${newPosition.lat}, ${newPosition.lng}`);
      const latLng = await getLatLng(results[0]);
      setMapCenter(latLng);
      searchBoxRef.current.setAddress(results[0].formatted_address);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  
  useEffect(()=>{
    if(otpVarify === true && phoneVerify === false){
      setAddressDetails((addressDetails)=>({
        ...addressDetails,
        ["status"]:1
      }))
    }
    else if (otpVarify === false && phoneVerify === false) {
      setAddressDetails((addressDetails)=>({
        ...addressDetails,
        ["status"]:0
      }))
    }
    else if(type === "edit" && phoneVerify === false){
      console.log("hellow")
      if(oldmobilestatus === 1 && oldmobile === addressDetails.pre + addressDetails.mobile){
        setAddressDetails((addressDetails)=>({
          ...addressDetails,
          ["status"]:1
        }))
      }else{ 
        setAddressDetails((addressDetails)=>({
          ...addressDetails,
          ["status"]:0
        }))
      }
    }
    else { console.log("null values")
      
    };
    
  },[otpVarify, phoneVerify]);
  

  return (
    <div className="address-model-styles">
      <Modal
        show={showAddress}
        className="model-a"
        centered
        size="lg"
        onHide={closeModal}
      >
        <Modal.Header className="border-bottom-0 addNewAddress">
          <div>
            {type === "edit"? "Update Address": "Add a new address"}
            <div className="addressdeliverytext">
              Enter a new delivery address below
            </div>
            
          </div>
          <RxCross2 className="closeModal mb-3" onClick={closeModal} />
        </Modal.Header>
        <Modal.Body className="address">
          <Row>
            <Col lg={6}>
              <button type="button" className="locate-me" onClick={handleLocateMe}>Locate Me</button>

              <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                libraries={["drawing", "places"]}
              >
                <PlacesAutocomplete value={address} onChange={setAddres} onSelect={handleSelect}>
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                      <input
                        {...getInputProps({
                          placeholder: 'Search for your Location/Landmark',
                          className: 'location-search-input',
                        })}
                        style={{
                          boxSizing: `border-box`,
                          border: `1px solid #000`,
                          width: `100%`,
                          height: `32px`,
                          padding: `0 12px`,
                          borderRadius: `3px`,
                          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                          fontSize: `14px`,
                          outline: `none`,
                          textOverflow: `ellipses`,
                          margin: `10px 0px`,
                          position: 'relative',
                        }}
                      />
                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion) => {
                          const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                          // Modify the styling as per your requirement

                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                              })}

                            >
                              {suggestion.description}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
                <p className="error">
                      {formErrors != undefined && formErrors.hasOwnProperty("locError")
                        ? formErrors.locError
                        : ""}
                    </p>
                <GoogleMap
                  center={mapCenter}
                  zoom={10}
                  mapContainerStyle={containerStyle}
                  onClick={(event) => setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() })}
                >
                  {userLocation && (
                    <MarkerF position={userLocation} icon={{ url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' }} />
                  )}
                  {markerPosition && (
                    <>
                      <MarkerF
                        position={markerPosition}
                        draggable={true}
                        icon={{
                          url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                          scaledSize: { width: 48, height: 48 },
                          anchor: { x: 24, y: 48 },
                        }}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                      />
                      {!isDragging && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, 50%)',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            pointerEvents: 'none',
                          }}
                        >
                          Drag me
                        </div>
                      )}
                    </>
                  )}
                </GoogleMap>
              </LoadScript>
            </Col>
            <Col lg={6}>
              <form className="addressBody">
                <div className="row mb-1">
                  <div className="form-group col-md-12">
                    <input
                      type="text"
                      placeholder="Name"
                      name="first_name"
                      className="addressName"
                      defaultValue={addressDetails.first_name}
                      onChange={handleChange}
                    />
                    <p className="error">
                      {formErrors != undefined && formErrors.hasOwnProperty("first_name")
                        ? formErrors.first_name
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="d-flex mb-1">
                  <span style={{ width: "20%", backgroundColor: "#ffffff" }}>
                    <input
                      className="addressName mx-1"
                      style={{ backgroundColor: "#ffffff" }}
                      type="text"
                      placeholder="+971"
                      id="code"
                      name="code"
                      disabled
                      onChange={() => {}}
                    />
                  </span>
                  <span
                    style={{ width: "3%", backgroundColor: "#ffffff" }}
                  ></span>

                  <span style={{display:"flex",flexDirection:"column", width:"25%"}}>
                  <span className="preSpan d-flxe" style={{ width: "80%" }}>
                    <select
                      name="pre"
                      id="pre"
                      className="form-control"
                      defaultValue={addressDetails.pre}
                      onChange={handleChange}
                    >
                      <option value="" disabled hidden>{addressDetails.pre !== undefined && addressDetails.pre !== "" ? addressDetails.pre : "--"}  </option>
                      <option value="50">50</option>
                      <option value="52">52</option>
                      <option value="54">54</option>
                      <option value="55">55</option>
                      <option value="56">56</option>
                      <option value="58">58</option>
                    </select>
                  </span>
                  <span className="error">
                    {formErrors != undefined && formErrors.hasOwnProperty("pre")
                      ? formErrors.pre
                      : ""}
                  </span>
                  </span>
                  
                  <span
                    style={{ width: "10%", backgroundColor: "#ffffff" }}
                  ></span>
                  <span className="" style={{ width: "50%" }}>
                    <input
                      type="text"
                      placeholder="Mobile"
                      id="mobile"
                      name="mobile"
                      maxLength="7"
                      onInput={(e) => {
                        const re = /^[0-9\b]+$/;
                        e.target.value = ((e.target.value != '' && re.test(e.target.value)) ? Math.max(0, parseInt(e.target.value)).toString().slice(0, 7) : '')
                      }}
                      className="addressName"
                      defaultValue={addressDetails.mobile}
                      onChange={handleChange}
                    />
                    <p className="error">
                      {formErrors != undefined && formErrors.hasOwnProperty("mobile")
                        ? formErrors.mobile
                        : ""}
                    </p>
                    <p className="error">
                      {showmobileverifymsz}
                    </p>

                    
                  </span>
                </div>

                <div className="row mb-1">
                  <div className="form-group col-md-6">
                    <select
                      className="addressName"
                      name="emirate"
                      value={addressDetails.emirate}
                      onChange={handleChange}
                    >
                      <option value="">Select Location</option>
                      {location.length > 0 &&
                        location.map((each, i) => (
                          <option key={i} value={each.id}>
                            {each.name}
                          </option>
                        ))}
                    </select>
                    <p className="error">
                      {formErrors != undefined && formErrors.hasOwnProperty("emirate")
                        ? formErrors.emirate
                        : ""}
                    </p>
                  </div>

                  <div className="form-group col-md-6">
                    <select
                      className="addressName"
                      name="area"
                      id="area"
                      value={addressDetails.area}
                      onChange={handleChange}
                    >
                      <option value="">Select Area</option>
                      {arealist.length > 0 &&
                        arealist.map((each, i) => (
                          <option key={i} value={each.id}>
                            {each.name}
                          </option>
                        ))}
                    </select>
                    <p className="error">
                      {formErrors != undefined && formErrors.hasOwnProperty("area") ? formErrors.area : ""}
                    </p>
                  </div>
                </div>
                <div className="mb-1">
                  <input
                    type="text"
                    placeholder="Flat, House no, Building, Apartment Name"
                    name="address"
                    className="addressName"
                    defaultValue={addressDetails.address}
                    onChange={handleChange}
                  />
                  <p className="error">
                    {formErrors != undefined && formErrors.hasOwnProperty("address")
                      ? formErrors.address
                      : ""}
                  </p>
                </div>

                <label className="addressName border-0 mb-3">
                  <input
                    type="checkbox"
                    name="default_address"
                    value={addressDetails.default_address}
                    checked={addressDetails.default_address}
                    aria-label="radio 1"
                    onClick={handleDefault}
                  />
                  {"  "}
                  Make this is my default address
                </label>
                <div className="addArdressButton form-control">
                  <button
                    type="button"
                    className="ArdressButton"
                    onClick={addressSubmit}
                  >{type !=undefined ? "Update Address":"Add Address"}
                    
                  </button>
                </div>
              </form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      {phoneVerify &&
        <OtpVerify phoneVerify={phoneVerify} setPhoneVerify={setPhoneVerify} setSuccessMpbile={setSuccessMpbile} handleClose={handleClose}
          prephone={addressDetails.pre} phone={addressDetails.mobile} getResendOtp={getResendOtp} getResendOtpWhatsapp={getResendOtpWhatsapp} setOtpVarify={setOtpVarify}
          type="header" />
      }
    </div>
  );
};

export default AddressModel;