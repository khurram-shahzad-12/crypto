import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiSelector } from "../../store/Api_middelware";

const SiteMap = () => {
  const { data } = useSelector(apiSelector);

  const from = data.length > 0 && data.slice(0, 10);
  const navigate = useNavigate();

  return (
    <>
      <Container className="SiteMapFixed">
        <Row>
          <NavLink
            onClick={() => {
              navigate("/");
            }}
            className="nextpage"
          >
            Home
          </NavLink>
          {data.length > 0 &&
            from.map((element) => (
              <Col xs={12} md={3} key={element.category_id}>
                <div>
                  <NavLink
                    to={`/categories/${element.url}`}
                    className="categoryName"
                  >
                    {element.category_name}
                  </NavLink>
                </div>
                <div>
                  <ul style={{ listStyleType: "none" }}>
                    {element.subcategory.slice(0, 7).map((items, i) => (
                      <NavLink key={i} to={`/products-category/${items.url}`}>
                        <li className="arrow">{items.sub_category_name}</li>
                      </NavLink>
                    ))}
                  </ul>
                </div>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default SiteMap;
