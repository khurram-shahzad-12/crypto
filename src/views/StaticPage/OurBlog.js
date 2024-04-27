import React, {useEffect, useState} from "react";
import { Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiSelector } from "../../store/Api_middelware";
import Moment from 'moment';
import call_apis from "../../services/Apis";
import ReactHtmlParser  from 'html-react-parser';

const OurBlog = () => {
  const { blogdata } = useSelector(apiSelector);
  const [recent, SetRecent] = useState([])
  const [blogList, SetBlogList] = useState([])
  const [type, SetType] = useState("list")
  const [path, SetPath] = useState(undefined)
  const format = "DD-MM-YYYY"

  const getData = async(id, type) => {
    SetType(type)
    const blgdata = await call_apis.getlistbyblogCategory(id);
    SetBlogList(blgdata.data.data.categoryList)
  };

  const getBlogDetail = async(id, type) => {
    SetType(type)
    const detail = await call_apis.getBlogDetail(id);
    SetRecent(detail.data.data.categoryList)
  };

  useEffect(() => {
    if(Object.keys(blogdata).length > 0){
      SetRecent(blogdata.Recents.slice(0,5))
      SetBlogList(blogdata.Recents)
    }
  }, [blogdata]);

  useEffect(() => {
    SetRecent(blogdata.Recents)
    SetPath(window.location.pathname)
  },[path])

  
  
  return (
    <div className="OurBlog">
      <Row>
        <Col md={9} className="screennine">
          {/* <BlogList /> */}
          {(blogList.length > 0) && blogList.map((each, i) => (
					<Row className={`${type=="list"? 'backcolor': ''} mb-5`} key={i}>
							<Col lg={5} md={12} sm={12}>
							<a href={`/blogs/${each.url}`}>
									<img className="linkimg" src={each.image} alt=""  onClick={() => getBlogDetail(each.id, "detail")}/>
							</a>
							</Col>
							<Col lg={7} md={12} sm={12}>
							<div className="Business">
									<NavLink
									to={`/blogs/${each.url}`}
									className="Announcement"  onClick={() => getBlogDetail(each.id, "detail")}
									>
									{each.title}
									</NavLink>
									<Row className="date">
									<Col lg={3} md={12} sm={12} xs={12}>
											<span className="Ourshopeecom">{Moment(each.display_date).format(format)}</span>
									</Col>
									<Col lg={9} md={12} sm={12} xs={12}>
											<p className="left"> posted by admin Ourshopee.com </p>
									</Col>
									</Row>
									<div className="Ourshopeecom">
                    {type=="list" ?
                      ReactHtmlParser(each.description.slice(0,255)) :
                      ReactHtmlParser(each.description)
                    }
									</div>
							</div>
							</Col>
					</Row>
					))}
        </Col>

        <Col lg={3} md={12} sm={12}>
          <div className="verticallion">
            <div className="listleft">
              {/* categories section */}
              <h3 className="Categories">Categories</h3>
              <hr />

              <div>
                {(Object.keys(blogdata).length > 0 && blogdata.Categories.length > 0) &&
                  blogdata.Categories.map((each, i) => (
                    <ul style={{ listStyleType: "circle" }} key={i}>
                      <li onClick={() => getData(each.id, "list")}>
                        <NavLink
                          to={`/blogs/${each.url}`}
                          className="list" 
                        >
                          {" "}
                        {each.name}  <span>{/* (13) */}</span>
                        </NavLink>
                      </li>
                    </ul>
                  ))
                }
              </div>
              {/* Recents section */}
              <div>
                <h3 className="Categories">Recents</h3>
                <hr />
                <div className="Recentsdate">
                  {(recent !== undefined && recent.length > 0) && recent.slice(0,5).map((each, i) => (
                    <Row className="mt-2" key={i}>
                    <Col lg={5} xs={4} sm={4} md={2}>
                      <NavLink to={`/blogs/${each.url}`}>
                        {" "}
                        <img
                          className="smalllinkimg"
                          src={each.image}
                          alt="" onClick={() => getBlogDetail(each.id, "detail")}
                        />
                      </NavLink>
                    </Col>
                    <Col lg={7} xs={8} sm={8} md={10}>
                      <div className="Announcementsmall">
                        <NavLink 
                          to="//www.ourshopee.com/blog/Announcement-Of-Business-Expansion-Ourshopeecom/"
                          className="Announcementsmall" onClick={() => getBlogDetail(each.id, "detail")}
                        >
                          {each.title}
                        </NavLink>
                        <br />
                        <div>
                          <span className="smalldate">{Moment(each.display_date).format(format)}</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default OurBlog;
