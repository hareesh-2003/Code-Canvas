import { useContext, useEffect, useState } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../UserContext";
import logo from "../assests/LogoRL.png";
import Snackbar from '@mui/material/Snackbar';

function Header(){

  const {userInfo,setUserInfo} = useContext(UserContext)

  useEffect(()=>{
    fetch('http://localhost:4000/profile',{
      credentials:'include',
    }).then(response =>{
        response.json().then(userInfo =>{
          // console.log(userInfo);
          
          setUserInfo(userInfo)
        });
    })
  },[]);

  function logout(){
    // console.log('logging out');
    fetch('http://localhost:4000/logout',{
      credentials:'include',
      method:'POST',
    }).then(response=>{
      response.json().then(data=>{
        alert(data)
      })
    })
    setUserInfo(null)
  }



  const username = userInfo?.username
  
return(
    <header>
    <NavLink to="/" className="logo">
    <nav className="Site_title_container">
      <img className="header_img" src={logo} alt=""/><br /><br />
      <span className="header_title">Code Canvas</span>
    </nav>
    </NavLink>
    <nav>

    {!username && <>
    
    <NavLink to="/login" className="header_login">Login</NavLink>
    <span>|</span>
    <NavLink to="/register" className="header_register">Register</NavLink>
      
      </>}

      {username && <>
      
      <NavLink to="/createPost" className="createPost">Create a Post</NavLink>
      <span>|</span>
      <a className="logOut" onClick={logout}>Logout</a>
      
      
    
      </>}

    </nav>
  </header>
  
);

}

export default Header