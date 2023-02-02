


import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Space } from "antd";
import { useDispatch } from "react-redux";
import { clearAdminLoginDetails } from "../../../Redux/adminReducer";
import {  Modal } from 'antd';

function Navebar() {


  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    Dispatch(clearAdminLoginDetails());
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [bgColor, setBgColor] = useState('transparent');

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setBgColor('white');
      } else {
        setBgColor('transparent');
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const Dispatch = useDispatch();

  const [loggedin, setloggedin] = useState(false);
 
  const admindetails = useSelector((state) => state.admin.adminDetails);
 


 
 const [isMenuOpen, setIsMenuOpen] = useState(false);

 const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    }
  

  return (
    
     <>
      <nav className={`bg-${bgColor} fixed top-0 w-full z-50`}>
  <div className="container mx-auto flex flex-wrap items-center justify-between p-6">
    <div className="w-1/3">
      <Link to={"/Admin-home"} className="text-red-600 text-4xl font-extrabold text-decoration-none">
        AutoEX
      </Link>
    </div>
    <div className="w-2/3 hidden md:block">
      <ul className="flex justify-end">
        <li className="mr-10">
          <Link to={"/Admin-home"} className="text-black text-1xl text-decoration-none">
            Home
          </Link>
        </li>
        <li className="mr-10">
          <Link to={"/Admin-Users"} className="text-black text-1xl text-decoration-none">
           users
          </Link>
        </li>
        <li className="mr-10">
          <Link to={"/Admin-Vehicles"} className="text-black text-1xl text-decoration-none">
           Vehicles
          </Link>
        </li>
        <li className="mr-10">
          <Link to={"/Admin-Community"} className="text-black text-1xl text-decoration-none">
            Community
          </Link>
        </li>
        <li className="mr-10">
          <Link to={"/Admin-news"} className="text-black text-1xl text-decoration-none">
            News
          </Link>
        </li>
        <li className="mr-10">
          <Link to={"/Admin-Experts"} className="text-black text-1xl text-decoration-none">
            Experts
          </Link>
        </li>
          <li className="mr-6">
            <Button
              onClick={showModal}
              type="primary"
              danger
              className="text-white"
            >
              Logout
            </Button>
            <Modal
              title="LOGOUT?"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Are you sure you want to log out?</p>
              </Modal>
          </li>
        
      </ul>
    </div>
    <div className="w-1/3 md:hidden">
      <button
        className="flex items-center px-3 py-2 text-black rounded"
        onClick={toggleMenu}
      >
        <svg
          className="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
  </div>
  <div
    className={`${
      isMenuOpen ? "block" : "hidden"
    } md:hidden bg-white text-black p-6`}
  >
    <ul className="block">
      <li className="mb-2">
        <Link to={"/Admin-home"} className="text-black text-decoration-none ">
          Home
        </Link>
      </li>
      <li className="mb-2">
        <Link to={"/Admin-Users"} className="text-black text-decoration-none">
          users
        </Link>
      </li>
      <li className="mb-2">
        <Link to={"/Admin-Vehicles"} className="text-black text-decoration-none">
          Vehicles
        </Link>
      </li>
      <li className="mb-2">
        <Link to={"/Admin-Community"} className="text-black text-decoration-none">
        Community
        </Link>
      </li>
      <li className="mb-2">
        <Link to={"/Admin-news"} className="text-black text-decoration-none">
          News
        </Link>
      </li>
      <li className="mb-2">
        <Link to={"/Admin-Experts"} className="text-black text-decoration-none">
          Experts
        </Link>
      </li>
     
        <li className="mb-2">
          <Button
            onClick={showModal}
            type="primary"
            danger
            className="text-black"
          >
            Logout
          </Button>
          <Modal
            title="LOGOUT?"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Are you sure you want to log out?</p>
          </Modal>
        </li>
     
    </ul>
  </div>
</nav>





     </>
    
    
  );
}

export default Navebar;
