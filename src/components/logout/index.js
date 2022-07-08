import React, { useContext } from "react";
import { tokenContext } from "../../App";
const localstorge = window.localStorage;
const Logout=()=>{
const {Token,Settoken}=useContext(tokenContext)

Settoken("")
localstorge.removeItem("token", JSON.stringify());

}



export default Logout;