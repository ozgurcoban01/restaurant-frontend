import {
    Autocomplete,
    Box,
    TextField,
    Typography,
    Button,
    Skeleton,
    Snackbar ,
    Alert,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import CloudUploadIcon from "@mui/icons-material/CloudUpload";
  import { styled } from "@mui/material/styles";
  import axios from "axios";
  import SendIcon from "@mui/icons-material/Send";
  import FormControlLabel from "@mui/material/FormControlLabel";
  import LoadingButton from "@mui/lab/LoadingButton";
import { setCategories } from "../../../redux/features/categorySlice";
  
const CategoryAddForm = () => {
    const [category, setCategory] = useState("");
    const [changeCat, setChangeCat] = useState();
    const handleCategory=e=>{setCategory(e.target.value)}
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [submitFinished, setSubmitFinished] = useState(false);
    const dispatch=useDispatch()
    const categories = useSelector((state) => state.categories.categories);

    const fetchCategoryFunc = async () => {
        const response = await axios(
            `${import.meta.env.VITE_API_URL}/category/getAllCategory`
          )
            .then((res) => res.data)
            .then((data)=>{
              const tempCategories=[]
              if(data.length>0){
                data.forEach(element => {
                  tempCategories.push(element.name)
                });
              }
              dispatch(setCategories(tempCategories))
              
            })
            fetchCategoryFunc2()
          return;
      };

      const fetchCategoryFunc2 = async () => {
        const response = await axios(
            `${import.meta.env.VITE_API_URL}/category/getAllCategory`
          )
            .then((res) => res.data)
            .then((data)=>{
              const tempCategories=[]
              if(data.length>0){
                data.forEach(element => {
                  tempCategories.push(element.name)
                });
              }
              dispatch(setCategories(tempCategories))
              
            }).then(()=>{setLoading(false), setSubmitFinished(true), setOpen(true)})
           
          return;
      };
   

    const submitImage = async (e) => {

        

        const submitedCategory={
            "name":category
        }

        setLoading(true);
        e.preventDefault();

        const result = await axios.post(
          `${import.meta.env.VITE_API_URL}/category/createNewCategory`,
          submitedCategory
        ).then(fetchCategoryFunc());
    
   
      };

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

  return (
    <>
     <form onSubmit={submitImage}>
        <Typography variant="h5" color="primary" fontWeight="500">
          KATEGORİ ADI
        </Typography>
        <TextField
          sx={{ mb: 3, width: "100%" }}
          id="outlined-basic"
          label="Kategori"
          variant="outlined"
          onChange={handleCategory}
        />


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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
    Kategori Eklendi
  </Alert>
</Snackbar>
    </>
  )
}

export default CategoryAddForm