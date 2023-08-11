import React, { useState, useEffect } from 'react'
// import {FaBars,FaTimes} from 'react-icons/fa';
// import {AiTwotoneDelete} from 'react-icons/ai';
import axios from "axios"
import { baseURL } from '../utils/Constant';

import { auth } from '../Firebase';
import { onAuthStateChanged ,signOut } from 'firebase/auth';
import db from "../Firebase";
import {collection, onSnapshot, query,addDoc} from "firebase/firestore";
import Navbar from '../components/Navbar';
import Heroimg2 from '../components/Heroimg2';
import CartToggle from '../restaurent/CartToggle';
import Footer from '../components/Footer';
import Category from '../restaurent/Category';


const RestaurentCategory = () => {

  const [authuser,setAuthuser] = useState(null)
  const [auth_user_data,setAuth_user_data] = useState([]);
  const [auth_id,setAuth_id] = useState();

  const [fname,setFname] = useState();
  const [lname,setLname] = useState();



  useEffect(() => {
      const listen = onAuthStateChanged(auth, (user) =>{
          if(user){
              setAuthuser(user);
          }else{
              setAuthuser(null);
          }
      })
      return () =>{
          listen();
      }
  },[])

  useEffect(() => {
    if(authuser != null){
        axios.post(`${baseURL}/user_data`,{Email:authuser.email}).then((res) => {
        console.log(res.data);
        setAuth_user_data(res.data)
        // setAuth_id(res.data._id)
    }) 
  }
  },[authuser])

  useEffect(() => {
    auth_user_data.map((index)=>
     {
       setAuth_id(index._id)
     })
   },[authuser]);

  //  auth_user_data.map((index) => 
  //  <>{setFname(index.F_Name)}{setLname(index.L_Name)}</>)


  return (
    <div>
      <Navbar/>
      <CartToggle/>
      <Heroimg2 heading="WELCOME" text="Great places to eat And best restaurants services in India"/>
      <Category/>
      <Footer/>
    </div>
  )
}

export default RestaurentCategory