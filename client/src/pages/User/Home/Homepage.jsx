import React from 'react'
import Header from '../../../components/User/Header/Header'
import Home from '../../../components/User/Home/Home'
// import Newshome from '../../../components/User/News_home/News_home'
import Footer from '../../../components/User/Footer/Footer'
import './Homepage.css'

function Homepage() {
  return (
    <div className='homepage'>
      
     <div><Header/></div> 
     <div><Home/></div> 
     {/* <div><Newshome/></div> */}
     <div><Footer/></div>
     
    
    </div>
  )
}

export default Homepage