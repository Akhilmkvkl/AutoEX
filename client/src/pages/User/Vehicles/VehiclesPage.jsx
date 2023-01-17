import React from 'react'
import Footer from '../../../components/User/Footer/Footer'
import Header from  '../../../components/User/Header/Header'
import Vehicles from '../../../components/User/Vehicles/Vehicles'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function VehiclesPage() {
  const navigate=useNavigate()
  const userdetails = useSelector((state) => state.admin.userDetails);

  useEffect(() => {
    if (userdetails == false) navigate("/auth");
  }, [userdetails]);
  return (
    <div>
        <Header/>
        <Vehicles/>
        <Footer/>
    </div>
  )
}

export default VehiclesPage