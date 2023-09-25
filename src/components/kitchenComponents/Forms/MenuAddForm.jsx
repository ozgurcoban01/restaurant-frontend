import {
  Autocomplete,
  Box,
  TextField,
  Typography,
  Button,
  Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import FormControlLabel from "@mui/material/FormControlLabel";
import LoadingButton from "@mui/lab/LoadingButton";

const MenuAddForm = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  const [loading, setLoading] = React.useState(false);

  const [postMenu, setPostMenu] = useState({});
  const categories = useSelector((state) => state.categories.categories);
  useEffect(() => {}, []);

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
  const [selectedImage, setSelectedImage] = useState(false);

  const [image, setImage] = useState();
  const [submitFinished, setSubmitFinished] = useState(false);
  const [src, setSrc] = useState([]);
  const [srcImage, setSrcImage] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [imageSrc, setimageSrc] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [sended, setSended] = useState(false);
  const [submitted2, setSubmitted2] = useState(false);

  const getImages = async () => {
    const allImages = await await axios
      .get(`${import.meta.env.VITE_API_URL}/image/getAll`)
      .then((res) => res.data);
    setImages(allImages);
  };

  const sendNewMenu=async()=>{

    
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/menu/createNewMenuItem`,
      postMenu
    );
    
  }

  const submitImage = async (e) => {
    setLoading(true);
    setSended(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/image/post`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    getImages();
    setSubmitted(true);
  };

  const onInputChange = (e) => {
    setSelectedImage(true);
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    if (images.length > 0) {
      setSrc(images[0].buffer.data);
    }
  }, [images]);

  useEffect(() => {
    var imagesSrcList = [];

    images.forEach((image) => {
      const imgData = image.buffer.data;

      var binary = "";
      var bytes = new Uint8Array(imgData);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const imgSrc = window.btoa(binary);
      imagesSrcList.push(imgSrc);

      //setSrcImage(images)
    });
    setSrcImage(imagesSrcList);
    setimageSrc(srcImage[0]);
    setLoading(false);
    setSended(false);
    
    if(images.length>0){
      const newMenu = {
        title: title,
        price: price,
        category: category,
        image_id: images[images.length - 1]._id,
      };
 
      setPostMenu(newMenu);
    }
    
  }, [src]);

  useEffect(()=>{
    
    if(postMenu.title!=undefined){
      sendNewMenu()
    }
  },[postMenu])




  useEffect(() => {
    setSubmitted2(true);
  }, [submitted]);

  const handleTitle=e=>{setTitle(e.target.value)}
  const handlePrice=e=>{setPrice(e.target.value)}
  const handleCategory=e=>{setCategory(e.target.innerText)}

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
          onChange={handleTitle}
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
          onChange={handlePrice}
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
          onChange={handleCategory}
       />

        <Typography variant="h4" color="primary" fontWeight="500">
          RESİM
        </Typography>
        <Button
          disabled={selectedImage}
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Resim Yükle
          <VisuallyHiddenInput onChange={onInputChange} type="file" />
        </Button>

        <LoadingButton
          disabled={submitFinished}
          onClick={submitImage}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          color="success"
          variant="contained"
          sx={{ m: 3 }}
        >
          <span type="submit">Gönder</span>
        </LoadingButton>
      </form>
      {sended ? (
        <Box>
          <Skeleton
            animation="wave"
            sx={{ borderRadius: "10px" }}
            width={210}
            height={150}
          />
        </Box>
      ) : null}
      {srcImage.map((e, key) =>
        key == srcImage.length - 1 ? (
          <Box key={key}>
            <img
              key={key}
              style={{
                width: "200px",
                marginTop: "10px",
                borderRadius: "30px",
              }}
              src={`data:image/png;base64,${e}`}
            />
          </Box>
        ) : null
      )}
    </>
  );
};

export default MenuAddForm;
