import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import jwt_decode from "jwt-decode";
import "./style.css";
import image from "./test_3.png";
import { tokenContext } from "../../App";
const localstorge = window.localStorage;
const Navbar = () => {
  const { Token, Settoken } = useContext(tokenContext);
  let decoded=""
let Role=""

  if (Token) {
    decoded = jwt_decode(Token)
    Role=decoded.role.role
  }

  const Navigate = useNavigate();
  return (
    <div>
      {Token === "" ? (
        <div>
          <div className="navbar">
            <img
              src={image}
              className="logo"
              onClick={() => {
                Navigate("/GetGamesList");
              }}
            ></img>
            <div className="links">
              <Link to="/GetGamesList" className="links">
                {" "}
                Games
              </Link>
              <Link to="/postpage" className="links">
                Posts
              </Link>
              <Link to="/news" className="links">
                {" "}
                New{" "}
              </Link>
              <Link to="/login" className="links">
                Login
              </Link>

              <Link to="/Register" className="links">
                Register
              </Link>
            </div>
          </div>
          <hr></hr>
        </div>
      ) : Role=== "USER" ? (
        <div>
          <div className="navbar">
            <img
              src={image}
              className="logo"
              onClick={() => {
                Navigate("/GetGamesList");
              }}
            ></img>
            <div className="links">
              <Link to="/GetGamesList" className="links">
                {" "}
                Games
              </Link>
              <Link to="/postpage" className="links">
                Posts
              </Link>
              <Link to="/news" className="links">
                {" "}
                News{" "}
              </Link>
              <Link to="/login" className="links">
                {" "}
                Logout
              </Link>
            </div>
          </div>
          <hr></hr>
        </div>
      ) : (
        <div>
          <div className="navbar">
            <img
              src={image}
              className="logo"
              onClick={() => {
                Navigate("/GetGamesList");
              }}
            ></img>
            <div className="links">
              <Link to="/GetGamesList" className="links">
                {" "}
                Games
              </Link>
              <Link to="/postpage" className="links">
                Posts
              </Link>
              <Link to="/news" className="links">
                {" "}
                New{" "}
              </Link>
              <Link to="/addnews" className="links">
                {" "}
                Add news
              </Link>
              <Link to="/Addgame" className="links">
                {" "}
                Add Game
              </Link>
              <Link to="/login" className="links">
                {" "}
                Logout
              </Link>
            </div>
          </div>
          <hr></hr>
        </div>
      )}
    </div>
  );
};

export default Navbar;
