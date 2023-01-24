import React, { useEffect } from 'react'
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import { axiosUserInstance } from '../../../instance/axios';
import { useSelector } from "react-redux";


function Success() {
  const userdetails = useSelector((state) => state.admin.userDetails);
 async function confirm(){
   try {
    const succesurl=window.location.href
    console.log(succesurl)
   const res= await  axiosUserInstance.post('/paymentsucces',{succesurl,userdetails})
   console.log(res)
   } catch (error) {
    
   }
  }

  useEffect(() =>{
      confirm()
  }, [])
  

  return (
    <div>
        <div className='mt-32'>
        <Result
    status="success"
    title="Successfully compleated payment"
    subTitle="You can view the session details on you console."
    extra={[
    <Link to={'/experts'}>  <Button type="primary" key="console">
        Go Console
      </Button>,</Link>  // <Button key="buy">Buy Again</Button>,
    ]}
  />
        </div>
    </div>
  )
}

export default Success