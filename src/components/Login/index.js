import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { tokenContext } from "../../App";
import "./style.css";
import axios from "axios";

const localstorge = window.localStorage;
const Login = () => {
  const { Token, Settoken } = useContext(tokenContext);
  const [email, Setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, Seterror] = useState("");
  const Navigate = useNavigate();
  const login = async () => {
    await axios
      .post("http://localhost:5000/users/login", {
        email: email,
        password: password,
      })
      .then((resualt) => {
        localstorge.setItem("token",JSON.stringify(resualt.data.token));
        Settoken( resualt.data.token );
        Navigate("/GetGamesList");
      })
      .catch((err) => {
        Seterror("Please Check your Email or Password");
      });
  };
  return (
    <div className="ChildLogin">
      <div className="child1">
        <div className="child2">
          <input
            className="loginInput"
            placeholder="Email"
            onChange={(e) => {
              Setemail(e.target.value);
            }}
          ></input>
          <input
            type={"password"}
            className="loginInput"
            placeholder="Password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          ></input>
          <button
            className="loginbutt"
            onClick={(e) => {
              login();
            }}
          >
            login
          </button>
          <h1>{error}</h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
