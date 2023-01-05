import React from "react";
import "./Home.css";
import MovingComponent from "react-moving-text";

function Home() {
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
              src="https://4kwallpapers.com/images/wallpapers/maserati-mc20-sports-cars-white-background-2021-5k-8k-2560x1080-2694.jpg"
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
          <h2>
            <span>Brands</span>
          </h2>

          <div  className="brand-list" >
            <img
              className="img_brand"
              src="https://img.icons8.com/color/2x/bmw.png"
              alt="jj"
            />
            <img
              className="img_brand"
              src="https://img.icons8.com/ios/2x/volkswagen.png"
              alt="jj"
            />
            <img
              className="img_brand"
              src="https://img.icons8.com/color/2x/mercedes-benz.png"
              alt="jj"
            />
            <img
              className="img_brand"
              src="https://img.icons8.com/color/2x/hyundai.png"
              alt="jj"
            />
            <img
              className="img_brand"
              src="https://img.icons8.com/color/2x/suzuki.png"
              alt="jj"
            />
            <img
              className="img_brand"
              src="https://img.icons8.com/color/2x/jeep.png"
              alt="jj"
            />
            <img
              className="img_brand"
              src="https://img.icons8.com/color/2x/kia.png"
              alt="jj"
            />
            <img
              className="img_brand"
              src="https://img.icons8.com/color/2x/toyota.png"
              alt="jj"
            />
            <img
              className="img_brand"
              src="https://img.icons8.com/color/2x/nissan.png"
              alt="jj"
            />
            <img
              className="img_brand"
              src="https://img.icons8.com/color/2x/lamborghini.png"
              alt="jj"
            />
            <img
              className="img_brand"
              src="https://img.icons8.com/color/2x/land-rover.png"
              alt="jj"
            ></img>{" "}
            <img
              className="img_brand"
              src="https://img.icons8.com/color/2x/kia.png"
              alt="jj"
            />
            <img
              className="img_brand"
              src="https://img.icons8.com/color/2x/toyota.png"
              alt="jj"
            />
            <img
              className="img_brand"
              src="https://img.icons8.com/color/2x/nissan.png"
              alt="jj"
            />
            <img
              className="img_brand"
              src="https://img.icons8.com/color/2x/lamborghini.png"
              alt="jj"
            />
          </div>
        </MovingComponent>

        <br />
        <br />
        <br />
        {/* <h2><span>News</span></h2> */}
      </div>
      <div className="section3"></div>
    </div>
  );
}

export default Home;
