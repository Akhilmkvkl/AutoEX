import React from "react";
import { Col } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import "./VehicleView.css";
import { Container, Row } from "reactstrap";
import YouTube from "react-youtube";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

function VehicleView() {
  const location = useLocation();
  const vehicles = location.state;
  console.log(vehicles);
  console.log(vehicles.image)

  const opts = {
    height: "490",
    width: "840",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
    
  };

  return (
    <div className="vahicle-view">
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={vehicles.image[0]} alt="" className="w-100" />
              {/* {vehicles.image.forEach((images) => {
                <MDBCarousel showIndicators showControls fade>
                  <MDBCarouselItem
                    className="w-100 d-block"
                    itemId={1}
                    src={images}
                    alt="..."
                  ></MDBCarouselItem>
                </MDBCarousel>
              })} */}
            </Col>
            <Col>
              <div className="">
                <h1>{vehicles.name}</h1>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4 text-red-700">
                    {vehicles.price}
                  </h6>

                  <span className=" d-flex align-items-center gap-2 fw-bold">
                    <span style={{ color: "#f9a826" }}>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    (2.2 ratings)
                  </span>
                </div>

                <p className="section__description fw-bold">{vehicles.brand}</p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description fw-bold">
                    <i
                      className="ri-roadster-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {vehicles.transmition}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description fw-bold">
                    <i
                      className="ri-settings-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {vehicles.power}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description fw-bold">
                    <i
                      className="ri-timer-flash-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {vehicles.torque}
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description fw-bold">
                    <i
                      className="ri-map-pin-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {vehicles.type}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description fw-bold">
                    <i
                      className="ri-wheelchair-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {vehicles.milage}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description fw-bold">
                    <i
                      className="ri-building-2-line"
                      style={{ color: "#f9a826" }}
                    >
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took
                    </i>{" "}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <div>
        <div className="spec-table">
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th scope="col">Key</th>
                <th scope="col">Specifications</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <td>Price</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>Engine</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>Safety</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>Transmission</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>Fuel Type</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>FSeating Capacity</td>
                <td>@fat</td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>

      <div className="video">
        <YouTube
          videoId={vehicles.video}
          opts={opts}
          onReady={() => console.log("Video is ready!")}
        />
      </div>
    </div>
  );
}

export default VehicleView;
