import {
  Autocomplete,
  Box,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import axios from 'axios'
import SendIcon from '@mui/icons-material/Send';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoadingButton from '@mui/lab/LoadingButton';

const MenuAddForm = () => {
    const [loading, setLoading] = React.useState(false);
  
  const [postMenu, setPostMenu] = useState({
    title: "",
    price: 0,
    category: "",
    image_id: "",
  });
  const categories = useSelector((state) => state.categories.categories);
  useEffect(() => {
    console.log(categories);
  }, []);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });


  /*FİLENPUTFUNCS
  */
  const [images, setImages] = useState([]);
  const [image, setImage] = useState();
  const [src, setSrc] = useState([]);
  const [srcImage, setSrcImage] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [imageSrc, setimageSrc] = useState();
  const [submited, setSubmitted] = useState(false);

  const getImages =async ()=>{
   
        const allImages=await (await axios.get(`${import.meta.env.VITE_API_URL}/image/getAll`).then(res => res.data))
    
    setImages(allImages)

  }

  const submitImage = async (e) => {
    setLoading(true);
    setSubmitted(true);
    console.log(e)
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/image/post`,
      formData,
      {
        headers:{"Content-Type":"multipart/form-data"},
      }
    )

    getImages()
   
  };

  const onInputChange = (e) => {
    console.log("askhfjasd")
    setImage(e.target.files[0]);
  };

  useEffect( ()=>{
    getImages()
  },[])
  
 useEffect( ()=>{
   if(images.length>0){
     setSrc(images[0].buffer.data)
   }

  },[images])

  useEffect( ()=>{
    console.log()
    
    var imagesSrcList=[];

    images.forEach(image => {

      const imgData=image.buffer.data

      var binary = '';
      var bytes = new Uint8Array( imgData );
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
      }
      const imgSrc= window.btoa( binary );
      imagesSrcList.push(imgSrc)

      //setSrcImage(images)

    });
    setSrcImage(imagesSrcList)
    setimageSrc(srcImage[0])
    
   },[src])


  return (
    <>
      <form onSubmit={submitImage}>
        <Typography variant="h5" color="primary" fontWeight="500">
          MENÜ ADI
        </Typography>
        <TextField
          sx={{ mb: 3, width: "100%" }}
          id="outlined-basic"
          label="Menü"
          variant="outlined"
        />

        <Typography variant="h4" color="primary" fontWeight="500">
          FİYAT
        </Typography>
        <TextField
          sx={{ mb: 3, width: "100%" }}
          id="outlined-number"
          label="Fiyat"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Typography variant="h4" color="primary" fontWeight="500">
          KATEGORİ
        </Typography>
        <Autocomplete
  
          disablePortal
          id="combo-box-demo"
          options={categories}
          sx={{ mb: 3, width: "100%" }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />

        <Typography variant="h4" color="primary" fontWeight="500">
          RESİM
        </Typography>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Resim Yükle
          <VisuallyHiddenInput onChange={onInputChange} type="file" />
        </Button>

        <LoadingButton
         
          onClick={submitImage}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          color="success"
          variant="contained"
         sx={{m:3}}
        >
          <span type="submit">Gönder</span>
        </LoadingButton>
      </form>
      {srcImage.map((e,key)=>(key==srcImage.length-1?
      <Box >
        <img style={{width:"200px",marginTop:"10px",borderRadius:"30px"}} src={`data:image/png;base64,${e}`} />
      </Box>
      :null)
         )}
    </>
  );
};

export default MenuAddForm;
