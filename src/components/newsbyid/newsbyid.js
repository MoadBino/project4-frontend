import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./style.css"

const Newsbyid = () => {
  const [news, Setnews] = useState([]);
  let { id } = useParams();

  const getbyid = (req, res) => {
    axios
      .get(`http://localhost:5000/newes/${id}`)
      .then((result) => {
        Setnews(result.data.result);
      })
      .catch((err) => {
      });
    };
  useEffect(() => {
    getbyid();
  }, []);

  return(
     <div className="">
       <div className="mainnewspage">
    <h1 className="newtext" >{news.title}</h1>
    <img src={news.image} className="newsimag" ></img>
    <h1 className="newtext"> {news.description} </h1>
    </div>
  </div>)
};

export default Newsbyid;
