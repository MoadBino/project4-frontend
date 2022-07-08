import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

const localstorge = window.localStorage;
const Register = () => {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [userName, Setusername] = useState("");
  const [FirstName, SetFirstname] = useState("");
  const [lastName, SetlastName] = useState("");
  const [password, Setpassword] = useState("");
  const [email, Setemail] = useState("");
  const [error, Seterror] = useState("");
  const Navigate = useNavigate();

  const register = () => {
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
          .post("http://localhost:5000/users/Register", {
            FirstName: FirstName,
            userName: userName,
            lastName: lastName,
            email: email,
            password: password,
            imag: data.url,
            role: "62c304615d29aa5f779e5fcc",
          })
          .then((resualt) => {
            Navigate("/login")
          })
          .catch((err) => {
            Seterror("The Email  already exist");
          });
      })
      .catch((err)=>{
      });
  };
  return (
    <div className="mainregister">
        <div className="childregister">
          <input
            className="Input"
            onChange={(e) => {
              Setusername(e.target.value);
            }}
            placeholder="User name"
          ></input>
          <input
            className="Input"
            onChange={(e) => {
              SetFirstname(e.target.value);
            }}
            placeholder="First name"
          ></input>

          <input
            className="Input"
            placeholder="Last name"
            onChange={(e) => {
              SetlastName(e.target.value);
            }}
          ></input>

          <input
          type="password"
            className="Input"
            placeholder="password"
            onChange={(e) => {
              Setpassword(e.target.value);
            }}
          ></input>

          <input
            className="Input"
            placeholder="email"
            onChange={(e) => {
              Setemail(e.target.value);
            }}
          ></input>
              <input
            className="inputimg"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          ></input>
          <p>{error}</p>

          </div>
      
          <button
          className="register"
            onClick={(e) => {
              if (image === "") {
                Seterror("please add your picther");
              } else if (userName === "") {
                Seterror("please enter your username");
              } else {
                register();
              }
            }}
          >
            login
          </button>

 
    </div>
  );
};

export default Register;
