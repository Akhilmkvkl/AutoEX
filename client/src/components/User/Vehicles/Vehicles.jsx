import React, { useEffect } from "react";
import MovingComponent from "react-moving-text";
import "./Vehicles.css";
import { axiosUserInstance } from "../../../instance/axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input, Button, Select, Skeleton, Pagination } from "antd";

function Vehicles() {
  // <Skeleton active />
  const navigate = useNavigate();
  const [Vehicle, setvehicle] = useState([]);
  const [vehicleBrand, setvehicleBrand] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [vehiclesPerPage] = useState(6);

  async function getvehicles() {
    try {
      const res = await axiosUserInstance.get("/vehicles");
      if (res) {
        setvehicle(res.data.veh);
        setFilteredVehicles(res.data.veh);
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

  const [filters, setFilters] = useState({ brand: "", type: "", search: "" });
  const [filteredVehicles, setFilteredVehicles] = useState(Vehicle);

  const handleBrandFilter = (value) => {
    setFilters({ ...filters, brand: value });
  };

  const handleTypeFilter = (value) => {
    setFilters({ ...filters, type: value });
  };

  const handleSearch = (value) => {
    setFilters({ ...filters, search: value });
  };
  const vehicletype = [
    {
      type: "SUV",
    },
    {
      type: "Hatchback",
    },
    {
      type: "Sedan",
    },
    {
      type: "Micro Suv",
    },
    {
      type: "MPV",
    },
    {
      type: "Offroader",
    },
  ];

  const handleApplyFilters = () => {
    let filtered = Vehicle;
    if (filters.brand) {
      filtered = filtered.filter((vehicle) => vehicle.Brand === filters.brand);
    }
    if (filters.type) {
      filtered = filtered.filter((vehicle) => vehicle.Type === filters.type);
    }
    if (filters.search) {
      filtered = filtered.filter((vehicle) =>
        vehicle.Name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    setFilteredVehicles(filtered);
  };

  const handleResetFilters = () => {
    setFilters({ brand: "", type: "", search: "" });
    setFilteredVehicles(Vehicle);
  };

  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = filteredVehicles.slice(
    indexOfFirstVehicle,
    indexOfLastVehicle
  );

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
            src="https://wallpapers.com/images/featured/ferrari-cglqdk3qgwuhk35k.jpg"
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

      <div className="flex flex-col">
        <div className="flex flex-row items-center mb-2">
          <Select
            className="mr-2"
            placeholder="Brand"
            value={filters.brand}
            onChange={handleBrandFilter}
            style={{ width: "20vw" }}
          >
            <Option value="">All</Option>
            {vehicleBrand.map((brand) => {
              return <Option value={brand.Brandname}>{brand.Brandname}</Option>;
            })}
          </Select>
          <Select
            className="mr-2"
            placeholder="Type"
            value={filters.type}
            onChange={handleTypeFilter}
            style={{ width: "20vw" }}
          >
            <Option value="">All</Option>
            {vehicletype.map((typeis) => {
              return <Option value={typeis.type}>{typeis.type}</Option>;
            })}
          </Select>
          <Input
            className="mr-2"
            placeholder="Search by car  name"
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleApplyFilters();
              }
            }}
          />
          <Button className="mr-2 bg-red-600" onClick={handleApplyFilters}>
            Apply
          </Button>
          <Button onClick={handleResetFilters}>Reset</Button>
        </div>
      </div>

      <div className=" flex flex-wrap grid-cols-3 gap-3 mt-40 ">
        {currentVehicles.map((vehicles) => {
          return (
            <div
              className="veh-card"
              onClick={() => {
                vewVehicle(vehicles);
              }}
            >
              <Card sx={{ maxWidth: 345 }} style={{ height: 350 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={vehicles.Images[0]}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {vehicles.Name}
                    </Typography>
                    <Typography variant="body2" className="text-red-600">
                      {vehicles.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions></CardActions>
              </Card>
            </div>
          );
        })}
      </div>
      <div className="mt-5">
        <Pagination
          current={currentPage}
          onChange={setCurrentPage}
          total={filteredVehicles.length}
          pageSize={vehiclesPerPage}
        />
      </div>
      <br />
      <br />
      <br />

      <div></div>
    </div>
  );
}

export default Vehicles;
