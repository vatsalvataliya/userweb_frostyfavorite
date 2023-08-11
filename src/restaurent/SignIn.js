// import React from 'react'
import React, { useState, useEffect } from 'react'

import { NavLink } from 'react-router-dom';
import axios from "axios"
import { baseURL } from '../utils/Constant';
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from '../Firebase';
import db from "../Firebase";

// import { signInWithEmailAndPassword } from "firebase/auth";
import "../components/NavbarStyle.css";
import "../components/CartToggleStyle.css";
import {FaBars,FaTimes,FaUser,FaArrowAltCircleDown} from 'react-icons/fa';
import {FaFacebook, FaHome, FaLinkedin, FaMailBulk, FaPhone, FaTwitter} from 'react-icons/fa';
import {doc, collection, onSnapshot, addDoc, query, orderBy, deleteDoc, setDoc} from "firebase/firestore";
import { onAuthStateChanged ,signOut } from 'firebase/auth';


// const SignIn = () => {
//     const [email,setEmail] = useState();
//     const [password,setPassword] = useState();
//     const [condition, setCondition] = useState(false)
// const [condition1, setCondition1] = useState(false)

// const [list_owner, setList_owner] = useState([])


// useEffect(()=> {
//     const q1 = query(collection(db, "react-user"));

//     const unsubscribe = onSnapshot(q1, (snapshot) => {
//       setList_owner(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
//       // console.log(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
//     });
    

// },[]);

//     const signIn = (e) => {
//       e.preventDefault();
//       setCondition(false)
//       setCondition1(false)
//       list_owner.map((data) =>{
//          if(email == data.Email && password == data.Password){
//           // alert(data.Email)
//             signInWithEmailAndPassword(auth,email,password).then((usecredential) => {
//             console.log(usecredential);
//             // alert("You Have Login Successfully.");
//             setCondition1(true)
//             setCondition(false)

//           }).catch((error) => {alert(error);})
//          }else{
//             setCondition(true)
//          }
//       })

//       if(condition == true){

//         setCondition(false)
//         alert("Please Check Your Email And Password")

//         // setF_login(true)

//       }else{
  
//         if(condition1 == true){
//           alert("You Have Login Successfully.");
//         //   setF_home(true)
//         //     setF_login(true)
//             setCondition1(false)
//             // setCondition(false)

    
//         }
//       }
      
//     }
//     return (
//       <div className='hero-img3'>
//         <div className='heading'>
//         <div className='form'>
//         <form onSubmit={signIn}>
//           <h1>Login</h1>
//           <label>Email</label>
//           <input type='Email' value={email} onChange={e => setEmail(e.target.value)} required></input>
//           <label>Password</label>
//           <input type='text' value={password} onChange={e => setPassword(e.target.value)} required></input>
//           <button className='btn' type='submit'> Submit</button>
//           {/* <h4>If you have not reagistred </h4>
//           <a className='link' href='/signup'>Sign Up</a> */}
//         </form>
//       </div>
//         </div>
//       </div>
//     )
//   }

const SignIn = () => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    // const [userpassword,setUserpassword] = useState();
    const [signup, setSignup] = useState(false)
// const [condition1, setCondition1] = useState(false)
const [auth_email,setAuth_email] = useState();
const [auth_password,setAuth_password] = useState();

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
  
  setUpemail("")
  setUp_password("")
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
      setAuth_email(email)
      setAuth_password(password)
      window.location = '/';
    // setUseremail(email)
    // setUserpassword(password)
    // setLogin(false)
    // setPlaceorder(false)
  }).catch((error) => {alert(error);})
}

const signUpform = (e) => {
  e.preventDefault();

  if(upemail){
      addDoc(collection(db,"react"),{
        FirstName:fname,
        LastName:lname,  
        Number:number,  
        Email:upemail,
        Password:up_password,
        ConfirmPassword:c_password  
      }).catch(err => console.error(err))

      axios.post(`${baseURL}/user_signup`,{F_Name:fname,L_Name:lname,Number:number,Email:upemail,Password:up_password,ConfirmPassword:c_password}).then((res) => {
        console.log(res.data);
    })
    }

  createUserWithEmailAndPassword(auth,upemail,up_password).then((usecredential) => {
    console.log(usecredential);
    alert("You Have Successfully Registered");
    // window.location = '/login';
    setSignup(false)

  }).catch((error) => {alert(error);})
  
}
    return (
      <div className='hero-img4'>
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
         <div>
           
        <div className='form'>
        <form onSubmit={signInform}>
          <h1 style={{ textAlign:"center" }}>Login</h1>
          <label>Email</label>
          <input type='Email' value={email} onChange={e => setEmail(e.target.value)} required></input>
          <label>Password</label>
          <input type='text' value={password} onChange={e => setPassword(e.target.value)} required></input>
          <button className='btn' type='submit'> Submit</button>
          <h4>If you have not reagistred </h4>
          <p className='link' onClick={SignUp}>Sign Up</p>
        </form>
      </div>
         </div>
        }
        </div>
      </div>
    )
}

export default SignIn