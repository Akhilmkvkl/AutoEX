import React from 'react'
import MovingComponent from "react-moving-text";
function Communities() {
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
            src="https://wallpapercave.com/dwp2x/wp3647903.jpg"
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
            Keep Connected With
            <br />  Communities
          </h1>
        </MovingComponent>
      </div>
        

   

    </div>
  )
}

export default Communities