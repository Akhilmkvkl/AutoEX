import React from "react";
import "./Auth.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MovingComponent from "react-moving-text";
import axios from "axios";
import {useDispatch} from'react-redux';
import {userLoginDetails} from '../../../Redux/adminReducer'
import {
  showErrorMsg,
  showSuccessMsg,
} from "../../Utils/Notifications/Notification";

import {
  isEmpty,
  isMail,
  isLength,
  isMatch,
} from "../../Utils/Validation/Validation";

//login

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};
const initialState2 = {
  username: "",
  useremail: "",
  userpassword: "",
  usercf_password: "",
  Regerr: "",
  Regsuccess: "",
};
function Auth() {
  const navigate = useNavigate();
  const Dispatch=useDispatch()
  const [User, setUser] = useState(initialState);
  const [user, setnewUser] = useState(initialState2);
  const {
    username,
    useremail,
    userpassword,
    usercf_password,
    Regerr,
    Regsuccess,
  } = user;

  const { email, password, err, success } = User;
  const [isSignup, setSignup] = useState(false);
  console.log(isSignup);
 

  function handleChangeinput(e) {
    const { name, value } = e.target;
    setUser({ ...User, [name]: value, err: "", success: "" });
    console.log(email);
    console.log(password);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/users/login", {
        email,
        password,
      });
      console.log(res);

      setUser({ ...User, err: "", success: res.data.msg });
      localStorage.setItem("firstlogin", true,"user",);
      const user=res.data.user
      console.log(user)
      Dispatch(userLoginDetails(user))
      navigate("/");
    } catch (error) {
      error.response.data.msg &&
        setUser({ ...User, err: error.response.data.msg, success: "" });
    }
  };

  //signup

  function handleChangeRegister(e) {
    const { name, value } = e.target;
    console.log("hii");
    setnewUser({ ...user, [name]: value, Regerr: "", Regsuccess: "" });
    console.log(username);
    console.log(useremail);
    console.log(userpassword);
    console.log(usercf_password);
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(user, "this is final");

    if (!isMatch(userpassword, usercf_password))
    {
      setnewUser({
        ...user,
        Regerr: "Passwords did not match! please check it once again",
        Regsuccess: "",
      })
    }else{
    try {
      const res = await axios.post("http://localhost:4000/users/register", {
        username,
        useremail,
        userpassword,
      })
        setnewUser({
          ...user,
          Regerr: "",
          Regsuccess:
            "verfication mail successfully sended please check your mail",
        });
    } catch (error) {
      error.response.data.msg &&
        setnewUser({
          ...user,
          Regerr: error.response.data.msg,
          Regsuccess: "",
        });
    }
  }
  };

  const resetState = () => {
    setSignup(!isSignup);
  };

  return (
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
        {isSignup ? (
          <form onSubmit={handleRegister}>
            <Box className="box">
              <Link to={"/"} className="navbar-logo2">
                AutoEX
              </Link>
              <Typography className="typog">Signup</Typography>

              {Regerr && showErrorMsg(Regerr)}
              {Regsuccess && showSuccessMsg(Regsuccess)}

              <TextField
                onChange={handleChangeRegister}
                margin="normal"
                value={username}
                type={"text"}
                variant="outlined"
                name="username"
                placeholder="name"
              />

              <TextField
                onChange={handleChangeRegister}
                margin="normal"
                value={useremail}
                type={"email"}
                variant="outlined"
                name="useremail"
                placeholder="email"
              />
              <TextField
                onChange={handleChangeRegister}
                margin="normal"
                type={"password"}
                value={userpassword}
                variant="outlined"
                name="userpassword"
                placeholder="password"
              />

              <TextField
                onChange={handleChangeRegister}
                placeholder="confirmpassword"
                margin="normal"
                variant="outlined"
                value={usercf_password}
                name="usercf_password"
                type={"password"}
              />

              <Button
                type="submit"
                className="button1"
                variant="contained"
                color="error"
              >
                Signup
              </Button>

              <Button onClick={resetState} className="button1">
                {isSignup ? "Login Here" : "Signup here"}
              </Button>
            </Box>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <Box className="box">
              <Link to={"/"} className="navbar-logo2">
                AutoEX
              </Link>
              <Typography className="typog">Login</Typography>

              {err && showErrorMsg(err)}
              {success && showSuccessMsg(success)}

              <TextField
                onChange={handleChangeinput}
                margin="normal"
                value={email}
                type={"email"}
                variant="outlined"
                name="email"
                placeholder="email"
              />
              <TextField
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
              <div className="ml-20">

             <Link to={'/forgott'}>forgott password?</Link>
              </div>
              <Button onClick={resetState} className="button1">
                {isSignup ? "Login Here" : "Signup here"}
              </Button>
            </Box>
          </form>
        )}
      </div>
    </MovingComponent>
  );
}

export default Auth;
