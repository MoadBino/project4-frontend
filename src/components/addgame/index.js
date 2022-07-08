import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
const Addgame = () => {
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  const Navigate = useNavigate();

  let gamename=""
let playtime=""
let rate=""
let released=""





  let wherefound = [];
  let genres = [];




  const addgame = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "GGwebsite");
    data.append("cloud_name", "dhiowfje1");
    fetch("https://api.cloudinary.com/v1_1/dhiowfje1/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        axios
          .post(
            "http://localhost:5000/gamelist/addGame",
            {
              image: data.url,
              gamename: gamename,
              genres: genres,
              playtime: playtime,
              rate: rate,
              released: released,
              wherefound: wherefound,
            },
            { headers: { Authorization: `Bearer ${token.token}` } }
          )
          .then((resulat) => {
            Navigate("/GetGamesList")
          })
          .catch((err) => {
          });
      })
      .catch();
  };

  return (
    <div className="addgame">
      <div className="addgamechild">
       
        <input
          className="addphoto"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        ></input>

        <input
          className="addgameinput"
          placeholder=" Name"
          onChange={(e) => {
            gamename = e.target.value
          }}
        ></input>




        <input
          className="addgameinput"
          placeholder="playtime"
          onChange={(e) => {
            playtime=e.target.value

          }}
        ></input>

        <input
          className="addgameinput"
          placeholder="released"
          onChange={(e) => {
            released =e.target.value
          }}
        ></input>

        <input
          className="addgameinput"
          placeholder="rate"
          onChange={(e) => {
            rate = e.target.value

          }}
        ></input>

<select
          className="addgameinput"
          onChange={(e) => {
            genres.push(e.target.value);

          }}
        >
          <option></option>
          <option> Sandbox store</option>
          <option>RPG</option>
          <option> Shooter </option>
          <option> Puzzlers</option>
          <option> Action</option>
          <option> Adventure</option>
          <option> Survival</option>
          <option> Platformer</option>
          <option> Conclusion</option>
        </select>

        <select
          className="addgameinput"
          onChange={(e) => {
            wherefound.push(e.target.value);

          }}
        >
          <option> </option>
          <option> PC</option>
          <option>PlayStation</option>
          <option> Xbox</option>
          <option> iOS</option>
          <option> Android</option>
          <option> Nintendo</option>
        </select>
         <button onClick={addgame}>Upload</button>
      </div>
    </div>
  );
};

export default Addgame;
