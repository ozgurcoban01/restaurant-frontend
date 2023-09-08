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

    setImage(e.target.files[0]);
  };

  useEffect( ()=>{
    const getImages =async ()=>{
      const allImages=await (await axios.get("https://pleasant-gloves-deer.cyclic.cloud/image/getAll").then(res => res.data))
      
      setImages(allImages)
    }

    getImages()
  },[])
  
 useEffect( ()=>{
   if(images.length>0){
     setSrc(images[0].buffer.data)
   }

  },[images])

  useEffect( ()=>{


 
      var binary = '';
      var bytes = new Uint8Array( src );
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
      }
      const r= window.btoa( binary );
      setSrcImage(r)
      
   },[src])

  return (
    <div>
      <form onSubmit={submitImage}>
        <input type="file" onChange={onInputChange}></input>
        <button type="submit">gönder</button>
      </form>
      <img style={{width:"1000px"}} src={`data:image/png;base64,${srcImage}`} />
    </div>
  );
};

export default Test;
