import React,{useState} from 'react'
import MovingComponent from "react-moving-text";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import './Admin_login.css'
import axios from 'axios'
import {showErrorMsg,showSuccessMsg}  from '../../Utils/Notifications/Notification'
import {useDispatch} from'react-redux';
import {adminLoginDetails} from '../../../Redux/adminReducer'
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Admin_login() {
  const navigate = useNavigate();

  const admindetails = useSelector((state) => state.admin.adminDetails);

  useEffect(() => {
    if (!admindetails == false) navigate("/Admin-home");
  }, [admindetails]);
   const navigaete=useNavigate()
   const Dispatch=useDispatch()
    const initialState = {
        email: "",
        password: "",
        err: "",
        success: "",
      };
      const [User, setUser] = useState(initialState);

      const { email, password, err, success } = User;
      function handleChangeinput(e) {
        const { name, value } = e.target;
        setUser({ ...User, [name]: value, err: "", success: "" });
        console.log(email);
        console.log(password);
      }




      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("http://localhost:4000/admin/login", {
            email,
            password,
          });
          console.log(res);
           if(res){
            setUser({ ...User, err: "", success: res.data.msg });
            navigaete('/Admin-home')
            Dispatch(adminLoginDetails(res.data.admin))
           }
         
         
        } catch (error) {
            console.log(error)
          error.response.data.msg &&
            setUser({ ...User, err: error.response.data.msg, success: "" });
        }
      };

  return (
    <div>
          <MovingComponent
      type="fadeIn"
      duration="900ms"
      delay="0"
      direction="normal"
      timing="ease"
      iteration="1"
      fillMode="none"
    >
      <div className="authdiv">
          <form onSubmit={handleSubmit}>
            <Box className="box">
              <Link to={"/"} className="navbar-logo2">
                AutoEX ADMIN
              </Link>
              <Typography className="typog">Admin Login</Typography>

              {err && showErrorMsg(err)}
              {success && showSuccessMsg(success)}

              <TextField className='textfield'
                onChange={handleChangeinput}
                margin="normal"
                value={email}
                type={"email"}
                variant="outlined"
                name="email"
                placeholder="email"
              />
              <TextField className='textfield'
                onChange={handleChangeinput}
                margin="normal"
                type={"password"}
                value={password}
                variant="outlined"
                name="password"
                placeholder="password"
              />

              <Button
                type="submit"
                className="button1"
                variant="contained"
                color="error"
              >
                Login
              </Button>

              
            </Box>
          </form>
        
      </div>
    </MovingComponent>
    </div>
  )
}

export  default Admin_login