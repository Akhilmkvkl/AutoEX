import React from 'react'
import Footer from '../../../components/User/Footer/Footer'
import Header from  '../../../components/User/Header/Header'
import ViewNews from '../../../components/User/News/ViewNews'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ViewNewspage() {
  const navigate=useNavigate()
  const userdetails = useSelector((state) => state.admin.userDetails);

  useEffect(() => {
    if (userdetails == false) navigate("/auth");
  }, [userdetails]);

  return (
    <div>
  <Header/>
  <ViewNews/>
  <Footer/>
    </div>
  )
}

export default ViewNewspage