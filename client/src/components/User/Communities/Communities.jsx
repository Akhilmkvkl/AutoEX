import React from 'react'
import MovingComponent from "react-moving-text";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; 

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
            src="https://wallpaperaccess.com/full/690719.jpg"
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