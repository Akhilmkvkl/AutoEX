import React from 'react'
import Navebar from '../../../components/Admin/Navebar/Navebar'
import AdminHome from '../../../components/Admin/AdminHome/AdminHome'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function AdminHomepage() {
  const navigate = useNavigate();

  const admindetails = useSelector((state) => state.admin.adminDetails);

  useEffect(() => {
    if (admindetails == false) navigate("/admin");
  }, [admindetails]);

  return (
    <div>
      <div><Navebar/></div>
      <div><AdminHome/></div>
    
    </div>
  )
}

export default AdminHomepage