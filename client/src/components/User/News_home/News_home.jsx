import React from "react";
import "./News_home.css";
import { Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

function Newshome() {
  const navigate = useNavigate();
  const newsReports = [
    {
      title: "Rs 1.2 Lakh More For These Jeep Models In 2023",
      content:
        "In the usual flux of price hikes at the start of the new calendar year, Jeep has also increased the asking price of two of its models - Meridian and Wrangler. The Compass had received a price hike in November last year. Just like the other carmakers, Jeep’s price hike could also be due to the rise in input costs.it will still be packed with multiple car launches and reveals from various carmakers. Tata will be one of the star marques at the event and so we thought you would be interested in knowing which models you can expect from the Indian carmaker at its stall.",
      posted: "10 jan 2023",
      image:
        "https://stimg.cardekho.com/images/cms/carnewsimages/editorimages/63b417fd7cd9f.jpg",
    },
    {
      title: "Toyota Innova Hycross vs MPV Rivals - Price Check",
      content:
        "The prices for the Toyota Innova Hycross are out and they start from Rs 18.30 lakh (ex-showroom). Its an all-new model with very few similarities to its predecessor, the Crysta. New platform, new engines, and a lot more premium features! However, just like the Crysta, theres no direct rival for the Hycross yet So, if you want an MPV then you have the Innova Hycross on one side and its alternatives on the other which include the Kia Carens and Carnival. Here’s a quick price check between the three",
      posted: "10 jan 2023",
      image:
        "https://stimg.cardekho.com/images/cms/carnewsimages/editorimages/63b3e2bb0a4b3.jpg",
    },
    {
      title: "Citroen Models Get Dearer By Up To Rs 50,000",
      content:
        "Many carmakers in India brought out new electric vehicles this year, with as many as three models coming from Tata. The EVs in this list range from the most affordable ones to some of the most expensive electric cars in the country. While there were some EVs that were unveiled in the last months of this year, their prices were not announced and hence were excluded from this list. Here are all the EVs that came out in 2022",
      posted: "10 jan 2023",
      image:
        "https://stimg.cardekho.com/images/cms/carnewsimages/editorimages/63b2b571cfef1.jpg",
    },
  ];

  function viewNewses(news) {
    console.log(news);
    navigate("/ViewNews", { state: news });
  }

  return (
    <div>
      <div className="newsdata">
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

export default Newshome;
