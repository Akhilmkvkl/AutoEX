import React from 'react'
import './Notification.css'
import Alert from '@mui/material/Alert';

export const showErrorMsg=(msg)=>{
    return <Alert severity="error">
   
    {msg}
  </Alert>
}


export const showSuccessMsg=(msg)=>{
    return <Alert severity="success">{msg}</Alert>
}
