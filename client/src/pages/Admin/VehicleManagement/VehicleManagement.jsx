import React from 'react'
import AdminVehicle from '../../../components/Admin/AdminVehicles/AdminVehicle'
import Navebar from '../../../components/Admin/Navebar/Navebar'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function VehicleManagement() {

  const navigate = useNavigate();

  const admindetails = useSelector((state) => state.admin.adminDetails);

  useEffect(() => {
    if (admindetails == false) navigate("/admin");
  }, [admindetails]);

  return (
    <div>
        <div>
            <Navebar/>
        </div>
        <div>
            <AdminVehicle/>
        </div>
    </div>
  )
}

export default VehicleManagement