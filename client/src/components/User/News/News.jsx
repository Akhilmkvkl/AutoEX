import React from "react";
import "./News.css";
import MovingComponent from "react-moving-text";
import { useState } from "react";
import { Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { axiosUserInstance } from "../../../instance/axios";
import { useSelector } from "react-redux";

function News() {
  const navigate = useNavigate();
  const [news, setnews] = useState([]);
  
 

  useEffect(() => {
   

    async function getnews() {
      const res = await axiosUserInstance.get("/news");
      setnews(res.data.news);
    }
    getnews();
  }, []);

  function viewNewses(news) {
    console.log(news);
    navigate("/ViewNews", { state: news });
  }

  return (
    <div>
      <div className="image">
        <MovingComponent
          type="fadeIn"
          duration="900ms"
          delay="0"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none"
        >
          <img
            className="ImgNews"
            src="https://wallpapercave.com/wp/wp7395102.jpg"
            alt=""
          />
        </MovingComponent>
        <MovingComponent
          type="fadeInFromBottom"
          duration="900ms"
          delay="0"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none"
        >
          <h1 className="textNews">
            Explore Latest automobile related
            <br /> News
          </h1>
        </MovingComponent>
      </div>

      <div className="flex flex-wrap">
        {news.map((news) => {
          return (
            <div className="news" style={{ width: "26em" }}>
              <Col className="mb-5">
                <div className="blog__item">
                  <img src={news.images[0]} alt="" className="w-100" />
                  <div
                    className="blog__info p-3"
                    onClick={() => {
                      viewNewses(news);
                    }}
                  >
                    
                    {news.title}
                  
                    <p className="section__description mt-3">
                      {news.news.length > 100
                        ? news.news.substr(0, 100)
                        : news.news}
                    </p>

                    <p
                      className="read__more"
                      onClick={() => {
                        viewNewses(news);
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
  );
}

export default News;
