import React from 'react'
import { useParams } from 'react-router'

const ConsumerSelect = () => {
  const consumerId=useParams()

  return (
    <div>ConsumerSelected: {consumerId.consumerId}</div>
  )
}

export default ConsumerSelect