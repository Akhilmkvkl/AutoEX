import React from "react";
import "./ViewNews.css";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";



function ViewNews() {
  const location = useLocation();
  const news = location.state;
  console.log(news);

  return (
    <div className="news">
      <section>
        <Container>
          <Row>
            <Col lg="8" md="8">
              <div className="blog__details">
                <img src={news.images[0]} />
                <h1 className="section__title mt-4 text-red-700">
                  {news.title}
                </h1>

                <div className="blog__publisher d-flex align-items-center gap-4 mb-4">
                  <span className="blog__author">
                    <i className="ri-user-line"></i>
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-time-line font-bold"></i> {news.date}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-time-line"></i> {news.news}
                  </span>
                </div>

                {/* <p className="section__description">{news.content}</p> */}
                <h6 className="ps-5 fw-normal">
                  {/* <blockquote className="fs-4">{news.posted}</blockquote> */}
                </h6>
                {/* <p className="section__description">description</p> */}
              </div>

              <div className="comment__list mt-5">
                {/* <h4 className="mb-5">3 Comments</h4> */}

                {/* <div className="single__comment d-flex gap-3">
                  <div className="comment__content">
                    <h6 className=" fw-bold">David Visa</h6>
                    <p className="section__description mb-0">14 July, 2022</p>
                    <p className="section__description">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Eos nobis totam eius laborum molestias itaque minima
                      distinctio, quae velit tempore!
                    </p>
                  </div>
                </div> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default ViewNews;
