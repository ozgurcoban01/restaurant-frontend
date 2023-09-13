import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setImages } from '../../redux/features/imagesSlice'
import axios from 'axios'
import { setCategories } from '../../redux/features/categorySlice'

const MainMenus = () => {


  return (
    <Box sx={{width:{sm:"40vw",md:"50vw",xs:"100vw"},height:"80vh",backgroundColor:"green" ,padding:5,display:"flex"}}>MainMenus</Box>
  
  )
}

export default MainMenus