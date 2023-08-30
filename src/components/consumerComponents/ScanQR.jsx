import React, { useEffect, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
const ScanQR = () => {
    const [scanResult,setScanResukt]=useState(null)

    useEffect(()=>{
        const scanner=new Html5QrcodeScanner('reader',{
            qrbox:{
                width:250,
                height:250
            },
            fps:5
        })
      
        const success=(result)=>{
            scanner.clear()
            setScanResukt(result)
        }
        const error=(err)=>{
            console.warn(err)
        }
        scanner.render(success,error)
    },[])
   
  return (
    <div>
        {
            scanResult?<div>{scanResult}</div>:<div id="reader"></div> 
        }
        asfasdad
    </div>
  )
}

export default ScanQR