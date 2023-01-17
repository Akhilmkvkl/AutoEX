import React from 'react'
import Footer from '../../../components/User/Footer/Footer'
import Header from '../../../components/User/Header/Header'
import News from '../../../components/User/News/News'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function NewsPage() {
  const navigate=useNavigate()
  const userdetails = useSelector((state) => state.admin.userDetails);

  useEffect(() => {
    if (userdetails == false) navigate("/auth");
  }, [userdetails]);
  return (
    <div>
  <Header/>
  <News/>
  <Footer/>


    </div>
  )
}

export default NewsPage