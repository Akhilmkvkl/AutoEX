import React from 'react'
import MovingComponent from "react-moving-text";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import './Experts.css'

function Experts() {



const experts=[
  {
    name:"Akhil",
    photo:"https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60",
    stat:"7 years of  Experience in automobile sector",
    available:"10 am ",
    fee:"500 /- per Hour"
  },
  {
    name:"Aswant",
    photo:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60",
    stat:"9 years of  Experience in automobile sector",
    available:"9 am ",
    fee:"900 /- per Hour"
  },
  {
    name:"Akash",
    photo:"https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60",
    stat:"2 years of  Experience in automobile sector",
    available:"10 am ",
    fee:"400 /- per Hour"
  },
  {
    name:"Aswant",
    photo:"https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60",
    stat:"7 years of  Experience in automobile sector",
    available:"11 am ",
    fee:"500 /- per Hour"
  }
]



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
            src="https://wallpapercave.com/wp/wp2539051.jpg"
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
            Talk to Experts
            <br /> 
          </h1>
        </MovingComponent>
      </div>
      <div className='expert'>
      {experts.map((expert) => {
          return (
            <div>
           <Col  className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={expert.photo} alt="" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{expert.name}</h4>
          <h6 className="rent__price text-center mt-">
            {expert.fee}<span></span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-car-line"></i> 
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-settings-2-line"></i> 
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-timer-flash-line"></i> {expert.available}
            </span>
          </div>

          <button className=" w-50 car_item-btn car_btn-rent">
            <Link to={""}>Talk</Link>
          </button>

          {/* <button className=" w-50 car_item-btn car_btn-details">
            <Link to={""}>Details</Link>
          </button> */}
        </div>
      </div>
</Col>
            </div>
          );
        })}
        </div>

    </div>
  )
}

export default Experts