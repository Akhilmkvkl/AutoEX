import React from 'react'
import AdminNews from '../../../components/Admin/AdminNews/AdminNews'
import Navebar from '../../../components/Admin/Navebar/Navebar'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function NewsManagement() {
  const navigate = useNavigate();

  const admindetails = useSelector((state) => state.admin.adminDetails);

  useEffect(() => {
    if (admindetails == false) navigate("/admin");
  }, [admindetails]);
  return (
    <div>
        
        <div><Navebar/></div>
        <div><AdminNews/></div>
    </div>
  )
}

export default NewsManagement