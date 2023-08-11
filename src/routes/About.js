import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Heroimg2 from '../components/Heroimg2';
import AboutContent from '../components/AboutContent';
import { auth } from '../Firebase';
import { onAuthStateChanged ,signOut } from 'firebase/auth';
import db from "../Firebase";
import {doc, collection, onSnapshot, addDoc, query, orderBy, deleteDoc, setDoc} from "firebase/firestore";
import CartToggle from '../restaurent/CartToggle';

const About = () => {
   //dynamic data
   const [lists, setLists] = useState([])
   const [listnew, setListnew] = useState([])
 
   
   
   useEffect(()=> {
     const q = query(collection(db, "react-admin"));
 
     const unsubscribe = onSnapshot(q, (snapshot) => {
       setLists(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
       // console.log(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
     });
 
  },[]);
  
  const [authuser,setAuthuser] = useState(null)
 
  useEffect(() => {
      const listen = onAuthStateChanged(auth, (user) =>{
          if(user){
              setAuthuser(user);
             //  alert(user.email);
             lists.filter((list) =>{
               if(list.Email == user.email){
                 // alert(list.Email);
                 return setListnew(list)
               }else{
                 return false;
               }
             })
          }else{
              setAuthuser(null);
          }
      })
      return () =>{
          listen();
      }
  })
 ///////////////////////////////////////////////////////
  return (
    <div>
      <Navbar/>
      <CartToggle/>
      <Heroimg2 heading="ABOUT" text={listnew.About_l_name}/>
      <AboutContent/>
      <Footer/>
    </div>
  ) 
}

export default About
