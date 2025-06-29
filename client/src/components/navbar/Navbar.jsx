import React from "react";
import "./navbar.scss";
import { useContext, useState } from "react";
import {Link } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

export default function Navbar() {

  const[open, setOpen] = useState(false);

  const {currentUser} = useContext(AuthContext)

  const fetch = useNotificationStore( (state) => state.fetch);
  const number = useNotificationStore( (state) => state.number); 
  fetch();

 
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="logo" />
          <span> NextEdge </span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div> 
      <div className="right">
        {currentUser ? (<div className="user"> 
          <img src= {currentUser.avatar || "/noavatar.jpg"} alt="" />
          <span> {currentUser.username}</span>
          <Link  to = "/profile" className = "profile" >
        {number > 0  &&  <div className="notification">{number}</div> }
          <span> Profile </span>
          </Link>
           </div>) : (<><a href="/login"> Sign In</a>
        <a href="/register" className="register"> 
          Sign Up
        </a>  </> )}
        <div className="menuIcon">
          <img  
          src="/menu.png" 
          alt=""
           onClick={() => setOpen((prev) => !prev)}
          />
        </div> 
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign In</a>
          <a href="/">Sign Up</a>
        </div>
      </div>
    </nav>
  );
}
