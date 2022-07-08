import React, { useState, useEffect } from "react";
import "./style.css";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
const Getallnews = () => {
  let { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [title, Settitle] = useState("");
  const [description, Setdescription] = useState("");
  const [image, setImage] = useState("");
  const [news, Setnews] = useState("");
  const [theNews, SettheNews] = useState("");

  const getbyid = (req, res) => {
    axios
      .get(`http://localhost:5000/newes/${id}`)
      .then((result) => {})
      .catch((err) => {});
  };

  const getallnews = (req, res) => {
    axios
      .get("http://localhost:5000/newes")
      .then((resulat) => {
        Setnews(resulat.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getallnews();
  }, []);

  const allnews =
    news &&
    news.map((element, index) => {
      return (
        <div className="mainNewsDiv">
          <div className="Test">
            <h1 className="newtext">{element.title}</h1>
            <Link to={`/getnews/${element._id}`}>
              <img src={element.image} className="newsimag"></img>
            </Link>
          </div>
        </div>
      );
    });

  let newnews = theNews.slice(1);
  return <div className="mainnews">{allnews}</div>;
};
export default Getallnews;
