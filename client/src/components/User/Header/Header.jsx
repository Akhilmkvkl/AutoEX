import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import "./Header.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Space } from "antd";
import { useDispatch } from "react-redux";
import { clearUserLoginDetails } from "../../../Redux/adminReducer";
import {  Modal } from 'antd';

function Header() {


  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    Dispatch(clearUserLoginDetails());
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
 
  const userdetails = useSelector((state) => state.admin.userDetails);
 


 console.log(userdetails);
 const [isMenuOpen, setIsMenuOpen] = useState(false);

 const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    }
  

  return (
    
     <>
      <nav className={`bg-${bgColor} fixed top-0 w-full z-50`}>
  <div className="container mx-auto flex flex-wrap items-center justify-between p-6">
    <div className="w-1/3">
      <Link to={"/"} className="text-red-600 text-4xl font-extrabold text-decoration-none">
        AutoEX
      </Link>
    </div>
    <div className="w-2/3 hidden md:block">
      <ul className="flex justify-end">
        <li className="mr-10">
          <Link to={"/"} className="text-black text-1xl text-decoration-none">
            Home
          </Link>
        </li>
        <li className="mr-10">
          <Link to={"/vehicles"} className="text-black text-1xl text-decoration-none">
            Vehicle
          </Link>
        </li>
        <li className="mr-10">
          <Link to={"/communities"} className="text-black text-1xl text-decoration-none">
            Community
          </Link>
        </li>
        <li className="mr-10">
          <Link to={"/news"} className="text-black text-1xl text-decoration-none">
            News
          </Link>
        </li>
        <li className="mr-10">
          <Link to={"/experts"} className="text-black text-1xl text-decoration-none">
            Experts
          </Link>
        </li>
        {userdetails == false ? (
          <li className="mr-6">
            <Link to={"/auth"} className="text-black text-1xl text-decoration-none">
              Signup/login
            </Link>
          </li>
        ) : (
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
        )}
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
        <Link to={"/"} className="text-black text-decoration-none ">
          Home
        </Link>
      </li>
      <li className="mb-2">
        <Link to={"/vehicles"} className="text-black text-decoration-none">
          Vehicle
        </Link>
      </li>
      <li className="mb-2">
        <Link to={"/communities"} className="text-black text-decoration-none">
          Community
        </Link>
      </li>
      <li className="mb-2">
        <Link to={"/news"} className="text-black text-decoration-none">
        News
        </Link>
      </li>
      <li className="mb-2">
        <Link to={"/experts"} className="text-black text-decoration-none">
          Experts
        </Link>
      </li>
      {userdetails == false ? (
        <li className="mb-2">
          <Link to={"/auth"} className="text-black text-decoration-none">
            Signup/login
          </Link>
        </li>
      ) : (
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
      )}
    </ul>
  </div>
</nav>





     </>
    
    
  );
}

export default Header;
