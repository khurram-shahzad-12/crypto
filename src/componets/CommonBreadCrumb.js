import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { BsFillPlayFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const CommonBreadCrumb = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Breadcrumb className="breadCrumbHeader">
      <Breadcrumb.Item
        className="Homepage"
        onClick={() => {
          navigate("/");
        }}
      >
        {" "}
        Home {""}
      </Breadcrumb.Item>
      {data.length === 1 ? (
        data.map((each, i) => (
          <React.Fragment key={i}>
            <BsFillPlayFill className="BsFillPlayFill" />
            <Breadcrumb.Item className="aboutuspage">
              <b>{each.slug}</b>
            </Breadcrumb.Item>
          </React.Fragment>
        ))
      ) : (
        <React.Fragment>
          {data.slice(0, -1).map((each, i) => (
            <React.Fragment key={i}>
              <BsFillPlayFill className="BsFillPlayFill" />
              <Breadcrumb.Item
                className="aboutuspage"
                onClick={() => {
                  navigate(`/${each.link}/${each.url}`);
                }}
              >
                {each.slug}
              </Breadcrumb.Item>
            </React.Fragment>
          ))}

          <BsFillPlayFill className="BsFillPlayFill" />
          <Breadcrumb.Item className="aboutuspage">
            <b style={{color: '#000'}}> {data[data.length - 1].slug}</b>
          </Breadcrumb.Item>
        </React.Fragment>
      )}
    </Breadcrumb>
  );
};

export default CommonBreadCrumb;
