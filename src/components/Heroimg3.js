import React from 'react';
import "../components/Heroimg3Style.css";
import {useState, useEffect} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import db from "../Firebase";
import { auth } from "../Firebase";

const Heroimg2 = () => {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();

    

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth,email,password).then((usecredential) => {
      console.log(usecredential);
      alert("You Have Login Successfully.");
      window.location.href = "/home";
    }).catch((error) => {alert(error);})
  }
  return (
    <div className='hero-img3'>
      <div className='heading'>
      <div className='form'>
      <form onSubmit={signIn}>
        <h1>Login</h1>
        <label>Email</label>
        <input type='Email' value={email} onChange={e => setEmail(e.target.value)} required></input>
        <label>Password</label>
        <input type='text' value={password} onChange={e => setPassword(e.target.value)} required></input>
        <button className='btn'> Submit</button>
        {/* <h4>If you have not reagistred </h4>
        <a className='link' href='/signup'>Sign Up</a> */}
      </form>
    </div>
      </div>
    </div>
  )
}

export default Heroimg2
