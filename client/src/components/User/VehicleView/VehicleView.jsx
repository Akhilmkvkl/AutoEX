import React from "react";
import { Col } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import "./VehicleView.css";
import { Container, Row } from "reactstrap";
import YouTube from "react-youtube";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function VehicleView() {
  const navigate = useNavigate();
  

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
              <img src={vehicles.Images[1]} alt="" className="w-100" />
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
                <h1>{vehicles.Name}</h1>

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
                    {/* (2.2 ratings) */}
                  </span>
                </div>

                <p className="section__description fw-bold">{vehicles.Brand}</p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description fw-bold">
                    <i
                      className="ri-roadster-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {vehicles.Fueltype}
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
                    {vehicles.Torque}
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
                    {vehicles.Type}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description fw-bold">
                    <i
                      className="ri-wheelchair-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {vehicles.Mileage}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description fw-bold">
                    <i
                      className="ri-building-2-line"
                      style={{ color: "#f9a826" }}
                    >
                     {vehicles.Description}
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
                <td>{vehicles.price}</td>
              </tr>
              <tr>
                <td>Engine</td>
                <td>{vehicles.Engine}</td>
              </tr>
              <tr>
                <td>Seats</td>
                <td>{vehicles.Seats}</td>
              </tr>
              <tr>
                <td>Cyliders</td>
                <td>{vehicles.Cylinders}</td>
              </tr>
              <tr>
                <td>Fuel Type</td>
                <td>{vehicles.Fueltype}</td>
              </tr>
              <tr>
                <td>Engine</td>
                <td>{vehicles.Engine}</td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>

      <div className="video">
        <YouTube
          videoId={vehicles.Video}
          opts={opts}
          onReady={() => console.log("Video is ready!")}
        />
      </div>
    </div>
  );
}

export default VehicleView;
