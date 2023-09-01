import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

const ConsumerSelect = () => {
  const consumerId=useParams()
  const consumerName=useSelector((state)=>state.consumerName)
  console.log(consumerName.value)
  return (
    <div>ConsumerSelected: {consumerId.consumerId} {consumerName.value}</div>
  )
}

export default ConsumerSelect