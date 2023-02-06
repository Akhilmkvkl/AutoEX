import React from "react";
import "./Home.css";
import MovingComponent from "react-moving-text";
import { useEffect } from "react";
import { axiosUserInstance } from "../../../instance/axios";
import { useState } from "react";

function Home() {
  const [brands, setbrands] = useState([]);
  const getbrand = async () => {
    try {
      const res = await axiosUserInstance.get("/brands");
      if (res) {
        setbrands(res.data.brands);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getbrand();
  }, []);

  console.log(brands);

  return (
    <div>
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
              className="ImgHome"
              src="https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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
            <h1 className="text">
              Find Your Best choice
              <br /> With Us
            </h1>
          </MovingComponent>
        </div>
      </div>
      <div className="section2">
        <MovingComponent
          type=""
          duration="900ms"
          delay="0"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none"
        >
          

          <div className="brand-list">
            {brands.map((brand) => {
              return (
                <img
                  className="img_brand"
                  src={brand.icon}
                  alt={brand.Brandname}
                />
              );
            })}
          </div>
        </MovingComponent>

        <br />
        <br />
        <br />
        
      </div>
      <div className="section3"></div>
    </div>
  );
}

export default Home;
