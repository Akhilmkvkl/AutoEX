import React, { useState, useEffect } from "react";
import { Button, Space } from "antd";
import { Await, Link } from "react-router-dom";
import { axiosAdminInstance } from "../../../instance/axios";
import { Col } from "reactstrap";
import { useNavigate } from "react-router-dom";

function AdminNews() {
  const [news, setnews] = useState([]);

  // useEffect(async () => {
   async function getnews(){
    const res = await axiosAdminInstance.get("/news");
    if (res) {
      console.log(res);
      setnews(res.data.news);
    }
   }

   getnews()
    
  // }, []);



  return (
    <div className="mt-48 ml-20">
      <Link to={"/Admin-Addnews"}>
        <Button type="primary">Add News</Button>
      </Link>
      <div>
        <div className="news">
          {news.map((news) => {
            return (
              <div>
                <Col className="mb-5">
                  <div className="blog__item">
                    <img src={news.images[0]} alt="" className="w-100" />
                    <div
                      className="blog__info p-3"
                      onClick={() => {
                        // viewNewses(news);
                      }}
                    >
                      {/* <Link to={'/ViewNews'} className="blog__title"> */}
                      {news.title}
                      {/* </Link> */}
                      <p className="section__description mt-3">
                        {news.news.length > 100
                          ? news.news.substr(0, 100)
                          : news.news}
                      </p>

                      <p
                        className="read__more"
                        onClick={() => {
                          // viewNewses(news);
                        }}
                      >
                        Read More
                      </p>

                      <div className="blog__time pt-3 mt-3 d-flex align-items-center justify-content-between">
                        <span className="blog__author">
                          {/* <i class="ri-user-line"></i> {author} */}
                        </span>

                        <div className=" d-flex align-items-center gap-3">
                          <span className=" d-flex align-items-center gap-1 section__description">
                            <i class="ri-calendar-line"></i> {news.date}
                          </span>

                          <span className=" d-flex align-items-center gap-1 section__description">
                            {/* <i class="ri-time-line"></i> {time} */}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AdminNews;
