import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Select from "react-select";

const NationalityComponent = ({ handle, name }) => {
  const [countryList, SetcountryList] = useState({});
  const api_call = useRef(true);

  const getCountryList = () => {
    axios
      .get(`/api/GetNationality`)
      .then((response) => {
        SetcountryList(response.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const handleNationality = (e) => {
    handle(e);
  };

  useEffect(() => {
    if (api_call.current) {
      api_call.current = false;
      getCountryList();
    }
  }, []);

  return (
    <>
      {Object.keys(countryList).length > 0 && (
        <Select
          className="mb-2"
          options={countryList}
          onChange={(e) => handleNationality(e)}
          placeholder="Select Nationality"
        />
      )}
    </>
  );
};

export default NationalityComponent;
