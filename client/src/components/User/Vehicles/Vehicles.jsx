import React from "react";
import MovingComponent from "react-moving-text";
import "./Vehicles.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Vehicles() {
  const navigate = useNavigate();

  const Vehicle = [
    {
      name: "Hyundai i20",
      image:[ "https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/i20/6986/1604567349336/front-left-side-47.jpg?tr=w-456","https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/i20/6986/1604570416881/side-view-(left)-90.jpg?tr=w-456"],
       
      price: "Rs.7.07 - 11.62 Lakh*",
      brand: "Hyundai",
      transmition: "automatic/manual",
      power: "123 hp",
      torque: "100 Nm",
      type: "hatchback",
      milage: "24 kmpl",
      video: "GYab8GZK7_k",
    },
    {
      name: "TATA Nexon",
      image:[ "https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon/7384/1614326304397/front-left-side-47.jpg?tr=w-456","https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon/7297/1579769179487/side-view-(left)-90.jpg?tr=w-456"],
       
      price: "Rs.7.70 - 14.18 Lakh*",
      brand: "TATA",
      transmition: "automatic/manual",
      power: "120 hp",
      torque: "115 Nm",
      type: "Compact-SUV",
      milage: "20 kmpl",
      video: "x3JziTgbwM4",
    },
    {
      name: "Mahindra xuv 700",
      image:[ "https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/XUV700/8629/1659345807519/front-left-side-47.jpg?tr=w-456","https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/XUV700/6806/1631863538634/rear-left-view-121.jpg?tr=w-456"],
       
      price: "Rs.13.45 - 24.95 Lakh*",
      brand: "Mahindra",
      transmition: "automatic/manual",
      power: "200 hp",
      torque: "390 Nm",
      type: "SUV",
      milage: "14 kmpl",
      video: "brm2FjHFBqo",
    },
    {
      name: "Toyota Fortuner",
      image:[ "https://stimg.cardekho.com/images/carexteriorimages/630x420/Toyota/Fortuner/8241/1609921660871/front-left-side-47.jpg?tr=w-456","https://stimg.cardekho.com/images/carexteriorimages/630x420/Toyota/Fortuner/8241/1609921660871/rear-left-view-121.jpg?tr=w-456"],
       
      price: "Rs.32.59 - 50.34 Lakh*",
      brand: "Toyota",
      transmition: "automatic",
      power: "204 hp",
      torque: "500 Nm",
      type: "SUV",
      milage: "9 kmpl",
      video: "PrROTdfvsaw",
    },
    {
      name: "Volkswagen Virtus",
      image:["https://stimg.cardekho.com/images/carexteriorimages/630x420/Volkswagen/Virtus/6120/1646726714226/front-left-side-47.jpg?tr=w-456","https://stimg.cardekho.com/images/carexteriorimages/630x420/Volkswagen/Virtus/6120/1646726714226/side-view-(left)-90.jpg?tr=w-456"],
        
      price: "Rs.11.32 - 18.42 Lakh*",
      brand: "Volkswagen",
      transmition: "automatic/manual",
      power: "150 hp",
      torque: "250 Nm",
      type: "sedan",
      milage: "10 kmpl",
      video: "jITZtn--Mbw",
    },
    {
      name: "Skoda Superb",
      image:["https://stimg.cardekho.com/images/carexteriorimages/630x420/Skoda/Superb/7803/1646110587938/front-left-side-47.jpg?tr=w-456","https://stimg.cardekho.com/images/carexteriorimages/630x420/Skoda/Superb/6764/1590494186274/rear-left-view-121.jpg?tr=w-456"],
        
      price: "Rs.34.19 - 37.29 Lakh*",
      brand: "Skoda",
      transmition: "automatic",
      power: "190 hp",
      torque: "350 Nm",
      type: "sedan",
      milage: "14 kmpl",
      video: "rwKB2OajhVQ",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  function vewVehicle(vehicle) {
    // console.log(vehicle)
    navigate("/VehicleView", { state: vehicle });
  }

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
            src="https://wallpapercave.com/dwp2x/wp7395275.jpg"
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
            Buying your dream car?
            <br /> Check Now!
          </h1>
        </MovingComponent>
      </div>
      <div className=" flex flex-wrap grid-cols-3 gap-3 ">
        {Vehicle.map((vehicles) => {
          return (
            <div
              className="veh-card"
              onClick={() => {
                vewVehicle(vehicles);
              }}
            >
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={vehicles.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {vehicles.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {vehicles.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </div>

      <div></div>
    </div>
  );
}

export default Vehicles;
