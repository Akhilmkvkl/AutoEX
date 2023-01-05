import React from 'react'
import Footer from '../../../components/User/Footer/Footer'
import Header from  '../../../components/User/Header/Header'
import Reviews from '../../../components/User/Reviews/Reviews'
import VehicleView from '../../../components/User/VehicleView/VehicleView'
function VehicleViewPage() {
  return (
    <div>
        <Header/>
        <VehicleView/>
        <Reviews/>
        <Footer/>
        
    </div>
  )
}

export default VehicleViewPage