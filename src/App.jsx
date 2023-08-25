import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment,incrementByAmount } from './redux/features/counter/counterSlice'

function App() {

const counter=useSelector((state)=>state.counter.value)
const dispatch=useDispatch()

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <div>{counter}</div>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
}

export default App
