import React from 'react'
import AdminCommunity from '../../../components/Admin/AdminCommunity/AdminCommunity'
import Navebar from '../../../components/Admin/Navebar/Navebar'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Communitymanagement() {
  const navigate = useNavigate();

  const admindetails = useSelector((state) => state.admin.adminDetails);

  useEffect(() => {
    if (admindetails == false) navigate("/admin");
  }, [admindetails]);
  return (
    <div>
        <div><Navebar/></div>
        <div><AdminCommunity/></div>
    </div>
  )
}

export default Communitymanagement