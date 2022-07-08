import "./App.css";
import React, { useState, createContext } from "react";
import Logout from "./components/logout";
import Login from "../src/components/Login/index";
import Register from "../src/components/Register/index";
import Addpost from "./components/postpage/index";
import GetGamesList from "./components/gitgemlist/gamelist";
import Image from "./components/add news/index";
import Getallnews from "./components/news/news";
import Navbar from "./components/Navbar/index";
import Addgame from "./components/addgame";
import Newsbyid from "./components/newsbyid/newsbyid";
import { Routes, Route } from "react-router-dom";

const localstorge = window.localStorage;
const token = "" || JSON.parse(localstorge.getItem("token"));

export const tokenContext = createContext();
const App = () => {
  const [Token, Settoken] = useState(token || "");

  return (
    <div className="App">
      <tokenContext.Provider value={{ Token, Settoken }}>
        <div>
          <Navbar />
          <Routes>
            <Route path="/Addgame" element={<Addgame />} />
            <Route path="/getnews/:id" element={<Newsbyid />} />
            <Route path="/addnews" element={<Image />} />
            <Route path="/news" element={<Getallnews />} />
            <Route
              path="/login"
              element={
                <div>
                  <Logout />
                  <Login />
                </div>
              }
            />
            <Route path="/Register" element={<Register />} />
            <Route path="/postpage" element={<Addpost />} />
            <Route path="/GetGamesList" element={<GetGamesList />} />
          </Routes>
        </div>
      </tokenContext.Provider>

    </div>
  );
};

export default App;
