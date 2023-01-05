import React from "react";
import "./News.css";
import MovingComponent from "react-moving-text";
import { useState } from "react";
import { Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";


const newsReports = [
  {
    title: "A Look At All The Tata Cars Expected To Debut At Auto Expo 2023",
    content:
      "Although Auto Expo 2023 will feature fewer participants than previous years, it will still be packed with multiple car launches and reveals from various carmakers. Tata will be one of the star marques at the event and so we thought you would be interested in knowing which models you can expect from the Indian carmaker at its stall.",
    posted: "10 jan 2023",
    image:
      "https://stimg.cardekho.com/images/cms/carnewsimages/editorimages/63ac328e68ba3.jpg",
  },
  {
    title: "Toyota Innova Hycross vs MPV Rivals - Price Check",
    content:
      "The prices for the Toyota Innova Hycross are out and they start from Rs 18.30 lakh (ex-showroom). Its an all-new model with very few similarities to its predecessor, the Crysta. New platform, new engines, and a lot more premium features! However, just like the Crysta, theres no direct rival for the Hycross yet So, if you want an MPV then you have the Innova Hycross on one side and its alternatives on the other which include the Kia Carens and Carnival. Here’s a quick price check between the three",
    posted: "10 jan 2023",
    image:
      "https://stimg.cardekho.com/images/cms/carnewsimages/editorimages/63ac22760c769.jpg",
  },
  {
    title: "Check Out All The Electric Cars Launched In 2022",
    content:
      "Many carmakers in India brought out new electric vehicles this year, with as many as three models coming from Tata. The EVs in this list range from the most affordable ones to some of the most expensive electric cars in the country. While there were some EVs that were unveiled in the last months of this year, their prices were not announced and hence were excluded from this list. Here are all the EVs that came out in 2022",
    posted: "10 jan 2023",
    image:
      "https://stimg.cardekho.com/images/cms/carnewsimages/editorimages/63abfab5dedd1.jpg",
  },
  {
    title: "Here Are The MG Cars Expected At Auto Expo 2023",
    content:
      "Ahead of the 2023 Auto Expo, carmakers are readying their new and facelifted models along with some concepts. While Maruti has revealed how many models it will be presenting, we have only speculation on what MG will treat us with at the upcoming motor show. Here are the MG models that we expect to see at the 2023 Auto Expo",
    posted: "10 jan 2023",
    image:
      "https://stimg.cardekho.com/images/cms/carnewsimages/editorimages/63ad224a47cc2.jpg",
  },
];

function News() {
  const navigate = useNavigate();
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

      <div className="news">
        {newsReports.map((news) => {
          return (
            <div>
              <Col className="mb-5">
                <div className="blog__item">
                  <img src={news.image} alt="" className="w-100" />
                  <div
                    className="blog__info p-3"
                    onClick={() => {
                      viewNewses(news);
                    }}
                  >
                    {/* <Link to={'/ViewNews'} className="blog__title"> */}
                    {news.title}
                    {/* </Link> */}
                    <p className="section__description mt-3">
                      {news.content.length > 100
                        ? news.content.substr(0, 100)
                        : news.content}
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
                          <i class="ri-calendar-line"></i> {news.posted}
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
