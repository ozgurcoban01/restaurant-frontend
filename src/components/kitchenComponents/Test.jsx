import React, { useEffect, useState } from "react";
import axios from "axios";

const Test = () => {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState();
  const [src, setSrc] = useState([]);
  const [srcImage, setSrcImage] = useState([]);
  const [imageSrc, setimageSrc] = useState();

  const getImages =async ()=>{
    const allImages=await (await axios.get(`${import.meta.env.VITE_API_URL}/image/getAll`).then(res => res.data))
    
    setImages(allImages)
  }

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/image/post`,
      formData,
      {
        headers:{"Content-Type":"multipart/form-data"},
      }
    )

    getImages()
  };

  const onInputChange = (e) => {

    setImage(e.target.files[0]);
  };

  useEffect( ()=>{
    getImages()
  },[])
  
 useEffect( ()=>{
   if(images.length>0){
     setSrc(images[0].buffer.data)
   }

  },[images])

  useEffect( ()=>{
    console.log()
    
    var imagesSrcList=[];

    images.forEach(image => {

      const imgData=image.buffer.data

      var binary = '';
      var bytes = new Uint8Array( imgData );
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
      }
      const imgSrc= window.btoa( binary );
      imagesSrcList.push(imgSrc)

      //setSrcImage(images)

    });
    setSrcImage(imagesSrcList)
    setimageSrc(srcImage[0])
    
   },[src])

  return (
    <div>
      <form onSubmit={submitImage}>
        <input type="file" onChange={onInputChange}></input>
        <button type="submit">gönder</button>
      </form>
      
      {srcImage.map(e=><img style={{width:"800px"}} src={`data:image/png;base64,${e}`} />
         )}
      
   </div>
  );
};

export default Test;
