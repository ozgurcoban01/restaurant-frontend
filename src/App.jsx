import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, fetchData, increment,incrementByAmount } from './redux/features/counter/counterSlice'


function App() {

const counter=useSelector(state=>state.counter.value)
const getData=useSelector(state=>state.counter.getData)
const loading=useSelector(state=>state.counter.loading)

const dispatch=useDispatch()
console.log(loading)

useEffect(()=>{
  dispatch(fetchData())
},[])

console.log(loading)
console.log(getData)

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <div>{counter}</div>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
}

export default App
