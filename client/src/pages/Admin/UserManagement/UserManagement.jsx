import React from 'react'
import AdminListUsers from '../../../components/Admin/AdminListUsers/AdminListUsers'
import Navebar from '../../../components/Admin/Navebar/Navebar'

function UserManagement() {
  return (
    <div>
        <div><Navebar/></div>
        <div><AdminListUsers/></div>
    </div>
  )
}

export default UserManagement