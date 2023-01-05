import React from 'react'
import MovingComponent from "react-moving-text";




function AdminHome() {

 
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
  )
}

export default AdminHome