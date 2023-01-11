import React from 'react'
import AdminVehicle from '../../../components/Admin/AdminVehicles/AdminVehicle'
import Navebar from '../../../components/Admin/Navebar/Navebar'
function VehicleManagement() {
  return (
    <div>
        <div>
            <Navebar/>
        </div>
        <div>
            <AdminVehicle/>
        </div>
    </div>
  )
}

export default VehicleManagement