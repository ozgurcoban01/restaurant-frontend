import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import { Alert, Box, Button, Snackbar, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import axios from 'axios'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
import ReactToPrint from 'react-to-print';

const QRGenerate = () => {

    const [loading, setLoading] = useState(false);
    const [print,setPrint] = useState(false);
    const [consumerName, setConsumerName] = useState("");
    const [open, setOpen] = useState(false);
    const [qrId, setQrId] = useState(false);
    const componentRef = useRef();
    const setConsumerText = () => {
        const div = textRef.current;
        const innerText = div.children[1].children[0].value;
        setConsumerName(innerText);
      };

      useEffect(()=>{
        console.log(consumerName)
      },[consumerName])
      const textRef = useRef();

      const [textError, setTextError] = useState(false);
    
      const checkText = () => {
        const div = textRef.current;
        const innerText = div.children[1].children[0].value;
    
        if (innerText) {
          setTextError(false);
        } else {
          setTextError(true);
        }
      };
      const setTextCheck = () => {
        setTextError(0);
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

      const submitQR = async (e) => {
        setLoading(true);
        console.log(consumerName)
        const newTable={
     
            "name": consumerName
          
        }



        const result = await axios.post(
          `${import.meta.env.VITE_API_URL}/tables/createTable`,
          newTable
        ).then((data)=>{setQrId(data.data._id)}).then(()=>{setPrint(true),setLoading(false),setOpen(true)});
    
      };

   

  return (
    <div >
         <Typography sx={{pb:1}} variant="h5" color="primary" fontWeight="500">
          MASA ADI
        </Typography>
      
        <TextField
                onChange={setConsumerText}
                required
                ref={textRef}
                onBlur={checkText}
                onFocus={setTextCheck}
                id="outlined-basic"
                label="Enter Name"
                variant="outlined"
                error={textError}
                sx={{width:"100%"}}
              />
                <LoadingButton
                    color="success"
                        sx={{width:"150px",mt:1,mb:1}}
                    onClick={submitQR}
                    loading={loading}
                    disabled={print}
                    variant="contained"
                    > 
          <span>MASAYI EKLE</span>
        </LoadingButton>
              <Box ref={componentRef} sx={{display:print?"flex":"none",flexDirection:"column",backgroundColor:"transparent",mt:3,width:"100%",alignItems:"center",justifyContent:"center"}}>
              <Box sx={{p:3,borderRadius:"20px",backgroundColor:"white"}}  >
              <QRCode
              
              size={256}
              style={{backgroundColor:"white"}}
              value={qrId}
            
              />
              </Box>
       
              </Box>
             <Box sx={{display:print?"flex":"none",alignItems:"center",justifyContent:"center",width:"100%"}} >
             <ReactToPrint
        trigger={() => <Button disabled={!print} sx={{mt:1}} variant="contained">YAZDIR</Button>}
        content={() => componentRef.current}
      />
             </Box>
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
    Masa Eklendi
  </Alert>
</Snackbar>
    </div>
  )
}

export default QRGenerate