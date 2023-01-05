import React,{useEffect,useState} from 'react'
import {useParams,Link} from 'react-router-dom'
import axios from 'axios'
import {showErrorMsg,showSuccessMsg} from '../../Utils/Notifications/Notification'
import { motion, useMotionValue, useTransform } from "framer-motion"
import './ActivateEmail.css'
import {Button} from "@mui/material"


function ActivateEmail() {
    const {activation_Token}=useParams()
    console.log(activation_Token)

    const [err,seterr]=useState('')
    const [success,setsuccess]=useState('')

    //for animation

    function CircularProgress({ progress }) {
        const circleLength = useTransform(progress, [0, 100], [0, 1])
        const checkmarkPathLength = useTransform(progress, [0, 95, 100], [0, 0, 1])
        const circleColor = useTransform(
          progress,
          [0, 95, 100],
          ["#FFCC66", "#FFCC66", "#66BB66"]
        )
      
        return (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="258"
            height="258"
            viewBox="0 0 258 258"
          >
            {/* Check mark  */}
            <motion.path
              transform="translate(60 85)"
              d="M3 50L45 92L134 3"
              fill="transparent"
              stroke="#7BB86F"
              strokeWidth={8}
              style={{ pathLength: checkmarkPathLength }}
            />
            {/* Circle */}
            <motion.path
              d="M 130 6 C 198.483 6 254 61.517 254 130 C 254 198.483 198.483 254 130 254 C 61.517 254 6 198.483 6 130 C 6 61.517 61.517 6 130 6 Z"
              fill="transparent"
              strokeWidth="8"
              stroke={circleColor}
              style={{
                pathLength: circleLength
              }}
            />
          </motion.svg>
        )
      }
  

useEffect(()=>{
     if(activation_Token){
     const  activateMail= async ()=>{
        try {
            
            const res=await axios.post('/users/activation',{activation_Token})
            setsuccess(res.data.msg)

        } catch (err) {
           err.response.data.msg && seterr(err.response.data.msg) 
           console.log(err)
        }
     }
     activateMail()
    }
},[activation_Token])

let progress = useMotionValue(90)
  return (
    
   
    <div className='active-page'>
        

        {err && 
        <div className='success'>
         <div className='errmsg'>
         {showErrorMsg(err)}
          </div> 
           <img src='https://img.icons8.com/ios/512/box-important--v3.png' className='image-err'>
        </img><br />
        <Link to={'/auth'} style={{ textDecoration: 'none' }}><Button className='btn' variant="outlined" color="error"   >
              login
      </Button></Link></div>}



        {success && 
           <div className="success">
           <motion.div 
             initial={{ x: 0 }}
             animate={{ x: 100 }}
             style={{ x: progress }}
             transition={{ duration: 1 }}
           />
           <p className='heading'> email successfully verified.Please login</p>
           <CircularProgress progress={progress}  /><br />
          <Link to={'/auth'} style={{ textDecoration: 'none' }}><Button className='btn' variant="outlined" color="error"   >
              login
      </Button></Link>
        
         
         </div> 
         

       

        }

    </div>
  )
}

export default ActivateEmail