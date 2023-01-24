import React, { useEffect } from 'react'
import MovingComponent from "react-moving-text";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; 
import { Card, Typography, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import './Communities.css'
import { axiosUserInstance } from '../../../instance/axios';
import { useState } from 'react';

function Communities() {
  const { Title } = Typography;
  const [community,setcommunity]=useState([])

 async function getcommunity(){
  try {
   const res=await axiosUserInstance.get('/communities')
   if(res){
    console.log(res);
    setcommunity(res.data.community)
   }
  } catch (error) {
    
  }
 }

 useEffect(() => {
   getcommunity()
 }, [])
 
  return (
    <div>
        <div className="image">
        <MovingComponent
          type="fadeIn"
          duration="900ms"
          delay="0"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none"
        >
          <img
            className="ImgNews"
            src="https://wallpaperaccess.com/full/690719.jpg"
            alt=""
          />
        </MovingComponent>
        <MovingComponent
          type="fadeInFromBottom"
          duration="900ms"
          delay="0"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none"
        >
          <h1 className="textNews">
            Keep Connected With
            <br />  Communities
          </h1>
        </MovingComponent>
      </div>
        
   <div className='flex-wrap' style={{marginTop:"20em"}}>
    {community.map((communities)=>{
      return (
        <Card className="card">
      <Title level={4}>{communities.name}</Title>
      <p>{communities.decription}</p>
      <p className='text-red-600'> {communities.platform}</p>
      <Button href={communities.link} type="primary" icon={<PlusCircleOutlined />}>
        Join
      </Button>
    </Card>
      )
      
    })}
   
   </div>
   

    </div>
  )
}

export default Communities