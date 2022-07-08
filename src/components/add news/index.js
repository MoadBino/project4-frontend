import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"
const Image = () => {
  const Navigate = useNavigate();
  const [title, Settitle] = useState("");
  const [description, Setdescription] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Data Pirates");
    data.append("cloud_name", "doxxh3kej");
    fetch("https://api.cloudinary.com/v1_1/doxxh3kej/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        axios
          .post("http://localhost:5000/newes/addnews", {
            image: data.url,
            title: title,
            description: description,
          })
          .then((resulat) => {
            Navigate("/news");
          })
          .catch();
      })
      .catch();
  };
  return (
    <div className="addnews">
      <div className="addNewsChild">
      <textarea
      className="newsinput"
        placeholder="title"
      onChange={(e)=>{
        Settitle(e.target.value);
      }}></textarea>

<textarea
className="newsinput"
        placeholder="description"
      onChange={(e)=>{
        Setdescription(e.target.value);
      }}></textarea>


      <div>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        ></input>
        <button onClick={uploadImage}>Upload</button>
      </div>
      <div>
        <img src={url} />
      </div>
      </div>
    </div>
  );
};
export default Image;
