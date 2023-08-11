
import React from 'react'
import {useState, useEffect} from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import db from "../Firebase";
import { auth } from "../Firebase";
import {collection, onSnapshot, addDoc, query} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";




const SignIn = () => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [signup, setSignup] = useState(false)
// const [condition1, setCondition1] = useState(false)

const [fname,setFname] = useState();
const [lname,setLname] = useState();
const [number,setNumber] = useState();
const [upemail,setUpemail] = useState();
const [up_password,setUp_password] = useState();
const [c_password,setC_password] = useState();

// add data
useEffect(()=> {
const q = query(collection(db, "react"));

const unsubscribe = onSnapshot(q, () => {
  
  setEmail("")
  setPassword("")
});
  return () => unsubscribe()
}, []) 

const SignUp = () => {
  setSignup(true)
}
const Signin = () => {
  setSignup(false)
}

const signInform = (e) => {
  e.preventDefault();
  signInWithEmailAndPassword(auth,email,password).then((usecredential) => {
    console.log(usecredential);
    alert("You Have Login Successfully.");
  }).catch((error) => {alert(error);})
}

const signUpform = (e) => {
  e.preventDefault();

  if(email){
      addDoc(collection(db,"react"),{
        FirstName:fname,
        LastName:lname,  
        Number:number,  
        Email:upemail,
        Password:up_password,
        ConfirmPassword:c_password  
      }).catch(err => console.error(err))
    }

  createUserWithEmailAndPassword(auth,email,password).then((usecredential) => {
    console.log(usecredential);
    alert("You Have Successfully Registered");
  }).catch((error) => {alert(error);})
}
    return (
      <div className='hero-img3'>
        <div className='heading'>
        {signup 
        ?
        <div className='form-signup'>
        <form onSubmit={signUpform}>
        <label>First Name</label>
          <input type='text' value={fname} onChange={e => setFname(e.target.value)} required></input>
          <label>Last Name</label>
          <input type='text' value={lname} onChange={e => setLname(e.target.value)} required></input>
          <label>Contact Number</label>
          <input type='text' value={number} onChange={e => setNumber(e.target.value)} required></input>
          <label>Email</label>
          <input type='Email' value={upemail} onChange={e => setUpemail(e.target.value)} required></input>
          <label>Password</label>
          <input type='password' value={up_password} onChange={e => setUp_password(e.target.value)} required></input>
          <label>Confirm Password</label>
          <input type='possword' value={c_password} onChange={e => setC_password(e.target.value)} required></input>
          <button className='btn'> Submit</button><hr/>
          <h4>If you have reagistred </h4>
          <p className='link' onClick={Signin}>Sign In</p>
        </form>
      </div>
         :
        <div className='form'>
        <form onSubmit={signInform}>
          <h1>Login</h1>
          <label>Email</label>
          <input type='Email' value={email} onChange={e => setEmail(e.target.value)} required></input>
          <label>Password</label>
          <input type='text' value={password} onChange={e => setPassword(e.target.value)} required></input>
          <button className='btn' type='submit'> Submit</button>
          <h4>If you have not reagistred </h4>
          <p className='link' onClick={SignUp}>Sign Up</p>
        </form>
      </div>
        }
        </div>
      </div>
    )
}

export default SignIn