import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useState } from "react";

function Header() {
  return (
    <div className='head'>
      <nav className="navbar">
        <div className="navbar-container">
            <Link to={'/'}  className="navbar-logo">
                AutoEX
            </Link>

            <ul className='nav-menu'>
                <li className='nav-item'>
                    <Link to={'/'}  className='nav-links' >
                        Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link  className='nav-links' to={'/vehicles'} >
                        Vehicle
                    </Link>
                </li>
                <li className='nav-item' >
                    <Link  className='nav-links' to={'/communities'} >
                        community
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link  className='nav-links' to={'/news'} >
                        News
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link  className='nav-links' to={'/experts'} >
                        Experts
                    </Link>
                </li>

                <li className='nav-item'>
                    <Link to={'/auth'}  className='nav-links' >
                        Signup/login
                    </Link>
                </li>

            </ul>

        </div>
      </nav>
    </div>

  
  );
}

export default Header;
