import React, { useEffect, useState } from "react";
import axios from "axios";

const Test = () => {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState();
  const [src, setSrc] = useState([]);
  const [srcImage, setSrcImage] = useState();

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post(
      "http://localhost:5001/image/post",
      formData,
      {
        headers:{"Content-Type":"multipart/form-data"},
      }
    )
  };

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  useEffect( ()=>{
    const getImages =async ()=>{
      const allImages=await (await axios.get("http://localhost:5001/image/getAll").then(res => res.data))
    
    setImages(allImages)
    
    }
    getImages()
  },[])
  
 useEffect( ()=>{
   
   if(images.length>0){
   setSrc(images[0].buffer.data)

   console.log(images[0])
   }
  },[images])
  useEffect( ()=>{
   
    console.log(src.toString('base64'))
    setSrcImage('data:image/jpeg;base64,' + src.toString('base64'))
   },[src])
  return (
    <div>
      <form onSubmit={submitImage}>
        <input type="file" onChange={onInputChange}></input>
        <button type="submit">gönder</button>
      </form>
      
    </div>
  );
};

export default Test;
