import React,{useEffect} from 'react'
import Header from '../../../components/User/Header/Header'
import Footer from '../../../components/User/Footer/Footer'
import Experts from '../../../components/User/Experts/Experts'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
function ExpertPage() {
  const navigate=useNavigate()
  const userdetails = useSelector((state) => state.admin.userDetails);

  useEffect(() => {
    if (userdetails == false) navigate("/auth");
  }, [userdetails]);
  return (
    <div>
    <Header/>
    <Experts/>
    <Footer/>
    </div>
  )
}

export default ExpertPage
