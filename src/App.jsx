import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment,incrementByAmount } from './redux/features/counter/counterSlice'
import { fetchMenu } from './redux/features/menuSlice'
import Menu from './components/Menu'


function App() {

const counter=useSelector(state=>state.counter.value)
const menu=useSelector(state=>state.menu.menu)


const dispatch=useDispatch()

useEffect(()=>{
  dispatch(fetchMenu())
},[])


  return (
    <>
      {menu.map((m)=>{
        return <Menu key={m._id} id={m._id}/>
   
      })}
    </>
  )
}

export default App
