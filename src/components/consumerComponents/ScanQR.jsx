import React, { useEffect, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { Box, Container } from '@mui/material'
import { lime, purple,red,green,orange,deepOrange,deepPurple } from '@mui/material/colors';
import "../../index.css";
const ScanQR = () => {
    const [scanResult,setScanResukt]=useState(null)
     useEffect(()=>{

        const scanner=new Html5QrcodeScanner('reader',{
            qrbox:{
                width:250,
                height:250
            },
            fps:20
        })
      
        const success=(result)=>{
            scanner.clear()
            setScanResukt(result)
        }
        const error=(err)=>{
            console.warn(err)
        }
        scanner.render(success,error)
        const button=document.querySelector("#html5-qrcode-button-camera-permission")
        const frame=document.querySelector("#reader")
  
        button.style["background-color"]=deepPurple[300]
        button.style["border"]="none"
        button.style["padding"]="10px"
        button.style["border-radius"]="10px"
        button.style["cursor"]="pointer"
      

        frame.style["border"]="none"
    },[])
    
  return (
    <div>
        <Box sx={{backgroundColor:deepPurple[100]}}>
            <Container sx={{display:"flex",height:"100vh",alignItems:"center",justifyContent:"center"}}>
            {
            scanResult?<div>{scanResult}</div>:<div id="reader" ></div> 
        }
            </Container>
        </Box>
        
    </div>
  )
}

export default ScanQR