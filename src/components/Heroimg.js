import React, {useState, useEffect} from "react"
import '../components/Heroimgstyle.css';
import IntroImg from '../assets/background.jpeg';
import { Link } from 'react-router-dom';
import db from "../Firebase";
import {doc, collection, onSnapshot, addDoc, query, orderBy, deleteDoc, setDoc} from "firebase/firestore";
import { auth } from '../Firebase';
import { onAuthStateChanged ,signOut } from 'firebase/auth';

const Heroimg = () => {
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

  return (
    <div className='hero'>
      <div className='mask'>
        <img className='into-img' src={IntroImg}/>
      </div>
      <div className='content'> 
      {/* {listnew.map(list =>(
        <p>{list.Email}</p>
      ))} */}
        <p>HI, I'M A {listnew.developer_type} Developer</p>
        <h1>{listnew.language} Developer.</h1>
        <div>
            <Link to="/project" className='btn'>Projects</Link>
            <Link to="/contact" className='btn btn-light'>Contact</Link>
        </div>
      </div>
    </div>
  )
}

export default Heroimg
