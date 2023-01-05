import React from 'react'
import {Link} from 'react-router-dom'
import './Navebar.css'
import { useState } from 'react'




function Navebar() {

  return (
    <div className='head'>
      <nav className="navbar">
        <div className="navbar-container">
            <Link to={'/Admin-home'}  className="navbar-logo">
                AutoEX
            </Link>
            
            <ul className='nav-menu'>
                <li className='nav-item'>
                    <Link to={'/Admin-Users'}  className='nav-links' >
                        Users
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to={'/Admin-Vehicles'}  className='nav-links' >
                        Vehicles
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link  to={'/Admin-Community'} className='nav-links' >
                        community
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to={'/Admin-news'} className='nav-links' >
                        News
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link  to={'/Admin-Experts'} className='nav-links' >
                        Experts
                    </Link>
                </li>

                {/* <li className='nav-item'>
                    <Link to={'/auth'}  className='nav-links' >
                        Signup/login
                    </Link>
                </li> */}
                
                
            </ul>
            
        </div>
      </nav>
    </div> 
  )
}

export default Navebar