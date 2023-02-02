import React from 'react'
import Navebar from '../../../components/Admin/Navebar/Navebar'
import AdminAddnews from '../../../components/Admin/AdminNews/AdminAddnews'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function AdminAddnewsManagement() {

  const navigate = useNavigate();

  const admindetails = useSelector((state) => state.admin.adminDetails);

  useEffect(() => {
    if (admindetails == false) navigate("/admin");
  }, [admindetails]);

  return (
    <div>
         <div><Navebar/> </div>
         <div><AdminAddnews/></div>

    </div>
  )
}

export default AdminAddnewsManagement