import React, { useEffect } from "react";
import MovingComponent from "react-moving-text";
import "./Vehicles.css";
import { axiosUserInstance } from "../../../instance/axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core';


function Vehicles() {
  const navigate = useNavigate();
  const [Vehicle, setvehicle] = useState([]);
  const [vehicleBrand, setvehicleBrand] = useState([]);
  async function getvehicles() {
    try {
      const res = await axiosUserInstance.get("/vehicles");
      if (res) {
        setvehicle(res.data.veh);
      }
    } catch (error) {}
  }

  async function getbrand() {
    try {
      const res = await axiosUserInstance.get("/brands");
      if (res) {
        setvehicleBrand(res.data.brands);
      }
    } catch (error) {}
  }

  useEffect(() => {
    try {
      getvehicles();
      getbrand();
    } catch (error) {
      console.log(error);
    }
  }, []);

  function vewVehicle(vehicle) {
    
    navigate("/VehicleView", { state: vehicle });
  }
  const [FilteredVehicles,setFilteredVehicles]=useState([])
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');

  const handleBrandChange = event => {
    setBrand(event.target.value);
  };

  const handleTypeChange = event => {
    setType(event.target.value);
  };

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };
 
  const handleApplyFilter = () => {
    let filteredVehicles = [...Vehicle];

    if (brand) {
      filteredVehicles = filteredVehicles.filter(vehicle => vehicle.Brand === brand);
    }

    if (type) {
      filteredVehicles = filteredVehicles.filter(vehicle => vehicle.Type === type);
    }

    if (search) {
      filteredVehicles = filteredVehicles.filter(vehicle => 
        vehicle.Name.toLowerCase().includes(search.toLowerCase())
      );

      setFilteredVehicles(filteredVehicles);

    }
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
            src="https://cdn.wallpapersafari.com/72/96/8nrGd4.jpg"
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
      <div className="ml-8">
      <FormControl>
        <InputLabel id="brand-label">Brand</InputLabel>
        <Select
          labelId="brand-label"
          id="brand-select"
          value={brand}
          onChange={handleBrandChange}
          
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="brand1">Brand 1</MenuItem>
          <MenuItem value="brand2">Brand 2</MenuItem>
          <MenuItem value="brand3">Brand 3</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          id="type-select"
          value={type}
          onChange={handleTypeChange}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="type1">Type 1</MenuItem>
          <MenuItem value="type2">Type 2</MenuItem>
          <MenuItem value="type3">Type 3</MenuItem>
        </Select>
      </FormControl>

      <TextField
        id="search"
        label="Search"
        value={search}
        onChange={handleSearchChange}
      />
      <button onClick={handleApplyFilter}>Apply Filter</button>
    </div>
      
      <div className=" flex flex-wrap grid-cols-3 gap-3 ">
        {FilteredVehicles.map((vehicles) => {
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
                    image={vehicles.Images[1]}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {vehicles.Name}
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
