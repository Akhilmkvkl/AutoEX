import React from 'react'
import AdminListUsers from '../../../components/Admin/AdminListUsers/AdminListUsers'
import Navebar from '../../../components/Admin/Navebar/Navebar'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function UserManagement() {
  const navigate = useNavigate();

  const admindetails = useSelector((state) => state.admin.adminDetails);

  useEffect(() => {
    if (admindetails == false) navigate("/admin");
  }, [admindetails]);
  return (
    <div>
        <div><Navebar/></div>
        <div><AdminListUsers/></div>
    </div>
  )
}

export default UserManagement