import React, { useEffect, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { Box, Container } from '@mui/material'
import { lime, purple,red,green,orange,deepOrange,deepPurple } from '@mui/material/colors';
import "../../index.css";
import CircularProgress from '@mui/material/CircularProgress';
const ScanQR = () => {
    
    const [scanResult,setScanResult]=useState(null)
    const [loading,setLoading]=useState(false)
     useEffect(()=>{
        const scanner=new Html5QrcodeScanner('reader',{
            qrbox:{
                width:250,
                height:250
            },
            fps:20
        })
      
        const success=(result)=>{
            setLoading(true)
            setTimeout(()=>{
                setLoading(false)
                scanner.clear()
                setScanResult(result)
            },2000)

       
        }
        const error=(err)=>{
            console.warn(err)
            
        }
        scanner.render(success,error)
        
    if(!scanResult){
        const button=document.querySelector("#html5-qrcode-button-camera-permission")
        const frame=document.querySelector("#reader")
        const scanFile=document.querySelector("#html5-qrcode-anchor-scan-type-change")
       
        scanFile.style["display"]="none"
        scanFile.innerHTML=""
        button.style["background-color"]=deepPurple[600]
        button.style["border"]="none"
        button.style["padding"]="10px"
        button.style["border-radius"]="10px"
        button.style["cursor"]="pointer"

        frame.style["border"]="none"
       }
    },[])
    let scanResultDiv;
   
    if (scanResult) {
        scanResultDiv = <div >{scanResult}</div>;
      } else {
        scanResultDiv = <div id="reader" ></div> ;
      }
      
  return (
    <div>
        <Box sx={{backgroundColor:deepPurple[100]}}>
            <Container sx={{display:"flex",height:"100vh",alignItems:"center",justifyContent:"center"}}>
            {loading?<CircularProgress />:scanResultDiv}
            </Container>
        </Box>
        
    </div>
  )
}

export default ScanQR