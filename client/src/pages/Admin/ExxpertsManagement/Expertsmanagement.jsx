import React from 'react'
import AdminExperts from '../../../components/Admin/AdminExperts/AdminExperts'
import Navebar from '../../../components/Admin/Navebar/Navebar'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Expertsmanagement() {
  const navigate = useNavigate();

  const admindetails = useSelector((state) => state.admin.adminDetails);

  useEffect(() => {
    if (admindetails == false) navigate("/admin");
  }, [admindetails]);
  return (
    <div>
        <div><Navebar/></div>
        <div><AdminExperts/></div>
    </div>
  )
}

export default Expertsmanagement