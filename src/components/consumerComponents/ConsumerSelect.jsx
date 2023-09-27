import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

const ConsumerSelect = () => {
  const consumerId=useParams()
  const consumerName=useSelector((state)=>state.consumer.name)
  const allImages = useSelector((state) => state.images);
  const allMenus = useSelector((state) => state.menu);
  const allCategories = useSelector((state) => state.categories);
  console.log(allImages)
  console.log(allMenus)
  console.log(allCategories)
  return (
    <div>ConsumerSelected: {consumerId.consumerId} {consumerName}</div>
  )
}

export default ConsumerSelect 