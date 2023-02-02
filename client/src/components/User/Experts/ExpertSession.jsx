import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl';


import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {axiosUserInstance} from '../../../instance/axios'
import Button from '@mui/material/Button';
import { useSelector } from "react-redux";


function ExpertSession() {
    const userdetails = useSelector((state) => state.admin.userDetails);
    const [date, setDate] = React.useState(dayjs(Date.now()));
    const [dateDb, seDateDb] = useState([])
    const [sessionDb, setSessionDb] = useState([])
    console.log("state sesions : ", sessionDb);
    const expert = localStorage.getItem("expert")


    const handleDate = (newValue) => {
        setDate(newValue)
    }
    const handleSave = async () => {
        const expertid=userdetails._id
        axiosUserInstance.post('/addAvailability',{expertid,date})
        getDate()
    }
    const handleClose = async (index) => {
        const expertid=userdetails._id

        const removeDate = await axiosUserInstance.post('/removeDate', { index, expertid })
        console.log(removeDate)
        getDate()

    }

    const getDate = async () => {
        const expertid=userdetails._id
        const dateResult = await axiosUserInstance.post('/getDate', { expertid })
        console.log(dateResult,"this is dates")
        const dateFromDb = dateResult.data.dates
        seDateDb(dateFromDb)

    }
    useEffect(() => {
        getDate()
        
    }, [])

   



    return (
        <>

            <div className='font-bold text-3xl mt-32 text-center'>Manage your sessions here !</div>
            {/* <hr className='h-2 mt-2 mb-6 w-60 my-0 rounded border-0 mx-auto bg-green-400' /> */}

            <div className='flex justify-center flex-wrap'>
                <div className='text-2xl mt-4  text-center'>Pick your available dates : </div>
                <FormControl sx={{ m: 1, minWidth: 120 }} >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={3}>
                            <DesktopDatePicker
                                minDate={new Date()}
                                label=""
                                inputFormat="DD/MM/YYYY"
                                value={date}
                                onChange={handleDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                </FormControl>
                <div className='pt-4'>
                    <Stack spacing={2} direction="row">

                        <Button onClick={handleSave} variant="contained" > Save</Button>

                    </Stack>
                </div>
            </div>


            <div className='text-2xl mt-4 pb-1 text-center'>Picked dates</div>
            {/* <hr className='h-1  mb-6 w-60 my-0 rounded border-0 mx-auto bg-green-400' /> */}
            <div className="flex flex-wrap">
                {
                    dateDb.map((item, index) => {
                        const date = new Date(item);
                        const formattedDate = date.toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                            timeZone: "UTC"
                        });

                        return (
                            < div className="ml-16 mb-4 w-60 p-4 bg-white border rounded-xl text-gray-800 space-y-2" >
                                <div className="flex justify-between">
                                    <div className="text-gray-400 text-xs"></div>
                                    {/* <div className="text-gray-400 text-xs">4h</div> */}
                                    <button className="text-gray-600 hover:text-gray-800" onClick={() => handleClose(index)} >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>

                                <a href="javascript:void(0)" className="font-bold hover:text-yellow-800 hover:underline">Availabe </a>
                                <div className="text-sm text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-gray-800 inline align-middle mr-1" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                    </svg>Session date: <span className='font-bold'>{formattedDate}</span>
                                </div>
                            </div>
                        )

                    })
                }
            </div>

            {/* <div className='text-2xl mt-4 pb-1 text-center'>Upcoming Sessions</div> */}
            

            
        </>
    )
}

export default ExpertSession