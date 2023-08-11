import React from 'react'
import "../components/Heroimg3Style.css";
import {useState, useEffect} from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import db from "../Firebase";
import { auth } from "../Firebase";
import {doc, collection, onSnapshot, addDoc, query, orderBy, deleteDoc, setDoc} from "firebase/firestore";


const Signup = () => {
    const [fname,setFname] = useState();
    const [lname,setLname] = useState();
    const [number,setNumber] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
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
    
    // for ADD listing
    // const submitclick = (e) => {
    //   e.preventDefault()
       
    //   if(email){
    //     addDoc(collection(db,"react"),{
    //       Email:email,
    //       Password:password
    //     }).catch(err => console.error(err))
    //   }
    // }
  
    const signUp = (e) => {
        e.preventDefault();

        if(email){
            addDoc(collection(db,"react"),{
              FirstName:fname,
              LastName:lname,  
              Number:number,  
              Email:email,
              Password:password,
              ConfirmPassword:c_password  
            }).catch(err => console.error(err))
          }

        createUserWithEmailAndPassword(auth,email,password).then((usecredential) => {
          console.log(usecredential);
          alert("You Have Successfully Registered");
          window.location.href = "/home";
        }).catch((error) => {alert(error);})
      }
    return (
      <div className='hero-img4'>
        <div className='heading'>
        <div className='form'>
        <form onSubmit={signUp}>
          <label>First Name</label>
          <input type='text' value={fname} onChange={e => setFname(e.target.value)} required></input>
          <label>Last Name</label>
          <input type='text' value={lname} onChange={e => setLname(e.target.value)} required></input>
          <label>Contact Number</label>
          <input type='text' value={number} onChange={e => setNumber(e.target.value)} required></input>
          <label>Email</label>
          <input type='Email' value={email} onChange={e => setEmail(e.target.value)} required></input>
          <label>Password</label>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} required></input>
          <label>Confirm Password</label>
          <input type='possword' value={c_password} onChange={e => setC_password(e.target.value)} required></input>
          <button className='btn'> Submit</button><hr/>
          <h4>If you have reagistred </h4>
          <a className='link' href='/'>Sign In</a>
        </form>
      </div>
        </div>
      </div>
    )
}

export default Signup