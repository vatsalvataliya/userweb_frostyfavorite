import React, { useState, useEffect } from 'react'

import "../components/AboutContentStyle.css";
import { Link } from 'react-router-dom';
import React1 from "../assets/gallery-img-05.jpg";
import React2 from "../assets/gallery-img-04.jpg";

import { auth } from '../Firebase';
import { onAuthStateChanged ,signOut } from 'firebase/auth';
import db from "../Firebase";
import {doc, collection, onSnapshot, addDoc, query, orderBy, deleteDoc, setDoc} from "firebase/firestore";


const AboutContent = () => {
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
    <div className='about'>
      <div className='left'>
        <h1>Who Am I?</h1>
        <p> I am a react {listnew.About_l_name} deleloper. I create responsive secure website for my clints.</p>
        <Link to="/contact"><button className='btn'>Contact</button></Link>

      </div>
      <div className='right'>
        <div className='img-container'>
            <div className='img-stack top'>
                <img className='img' alt='img' src={listnew.About_Img_1}/>
            </div>
            <div className='img-stack bottom'>
                <img className='img' alt='img' src={listnew.About_Img_2}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AboutContent
