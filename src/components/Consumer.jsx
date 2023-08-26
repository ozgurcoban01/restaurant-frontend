
import React, { useRef, useState} from 'react'


import {Box} from '@mui/material'

import { Route, Routes } from 'react-router-dom'
import EnterName from './consumerComponents/EnterName'

const Consumer = () => {
  return (
    <><Routes>
         <Route path="ScanQR" element={<ScanQR/>} />
         <Route path="enterName" element={<EnterName/>} />
         <Route path="Order" element={<Order/>} />
    </Routes>
    </> 
  )
}

export default Consumer