import React, { useEffect, useState } from "react";
import PerfumeSection from "./PerfumeSection";
import axios from "axios";

const Perfumes = () => {
  const [perfumeData, SetPerfumeData] = useState({});

  const getPerfumeData = () => {
    axios
      .get(`api/sectionItems?subcat_id=34`)
      .then((response) => {
        SetPerfumeData(response.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    getPerfumeData();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {Object.keys(perfumeData).length > 0 ? (
        <PerfumeSection perfumeData={perfumeData} />
      ) : (
        <div style={{ height: "50vh" }}>
          <div className="loading-indicator"></div>
        </div>
      )}
    </>
  );
};

export default Perfumes;
