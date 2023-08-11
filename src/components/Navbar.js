import React, { useState, useEffect } from 'react'

import "../components/NavbarStyle.css";
import { Link } from 'react-router-dom';
import {FaBars,FaTimes,FaUser,FaArrowAltCircleDown} from 'react-icons/fa';
import { auth } from '../Firebase';
import { onAuthStateChanged ,signOut } from 'firebase/auth';
import db from "../Firebase";
import {doc, collection, onSnapshot, addDoc, query, orderBy, deleteDoc, setDoc} from "firebase/firestore";

import axios from "axios"
import { baseURL } from '../utils/Constant';
// import { auth } from '../Firebase';
// import { onAuthStateChanged ,signOut } from 'firebase/auth';
 
const Navbar = (props) => {
  //dynamic data
  const [lists, setLists] = useState([])
  const [listnew, setListnew] = useState([])
  const [auth_user_data,setAuth_user_data] = useState([]);
  const [auth_id,setAuth_id] = useState();

  const [fname,setFname] = useState();
  const [lname,setLname] = useState();
  // const [auth_id,setAuth_id] = useState();




  
  
  useEffect(()=> {
    const q = query(collection(db, "react-admin"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLists(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
      // console.log(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
    });

 },[]);
 
//  const [authuser,setAuthuser] = useState(null)

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
///////////////////////////////////////////////////////////
  const[click,setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const[color,setColor] = useState(false);
  const changeColor = () =>{
    if(window.scrollY >= 100){
        setColor(true);
    } else{
        setColor(false);
    }
  };
  window.addEventListener("scroll",changeColor);

 //auth user
 const[userclick,setUserclick] = useState(false);
 const[hideclick,setHideclick] = useState(false)
 const userClick = () => {
  if(userclick == false)
  {
    setUserclick(true);
  }else{
    setUserclick(false);
  }
 };





  const [authuser,setAuthuser] = useState(null)

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
  // auth_user_data.map((index) => 
  // <>{setFname(index.F_Name)}{setLname(index.L_Name)}</>
  // );

// alert(authuser.email)

const User_data = () => {
    auth_user_data.map((index) => 
  <>{setFname(index.F_Name)}{setLname(index.L_Name)}</>
  );
  return(
    <p>{fname} {lname}</p>
  )
}

    const userSignOut = () => {
      // console.log(auth_user_data);
        signOut(auth).then(()=>{
           alert('sign out successful');
          //  window.location.href = "/";
        }).catch(error => console.log(error))
    }

  return (

    
    <div className={color ? "header header-bg" : "header"}>
      <Link to="/"><h1>Frosty Favourite</h1></Link>
      <ul className={click ? "nav-menu active":"nav-menu"}>
        <li>
            <Link to="/"><h4>Home</h4></Link>
        </li>
        <li>
            <Link to="/about"><h4>About</h4></Link>
        </li>
        <li>
            <Link to="/contact"><h4>Contact</h4></Link>
        </li>
        {authuser != null ?
        <li>
        <Link onClick={userSignOut}><h4>Sign Out</h4></Link>
        </li>
        :
        <li>
            <Link to="/login" ><h4>Login</h4></Link>
        </li>
        }
        <li>
            <Link to="/place_order"><h4>Cart</h4></Link>
        </li>
        <li>
        <div className='user_info'>
        <div className='user-logo'>
        <img src='https://th.bing.com/th/id/OIP.H1H0P8ROuSEf7JidrZH62wHaHa?w=160&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' alt='img'/>
        </div>
        <div className='user-data'>
        <p style={{ marginRight:"20px" }}>

        {authuser != null ?
        <User_data/>
        :
        <p>No User</p>
        }
          </p>
         
        </div>
        {/* <div onClick={userClick}>
      <FaArrowAltCircleDown size={20} style={{ color:"white" }}/>
        </div>
      {userclick ?
        (authuser ? <div><p>{`${authuser.email}`}</p><button onClick={userSignOut}>Sign Out</button></div> : <p>Signed Out</p>)
        : ("")}  */}
        
      </div>
        </li>
      </ul>
      <div className='hamburger' onClick={handleClick}>
        {click ?
        (<FaTimes size={20} style={{ color:"#fff" }}/>)
        :(<FaBars size={20} style={{ color:"#fff" }}/>)} 
        

      </div>
      
    </div>
  )
}

// const Navbar = () => {
//   //dynamic data
//   const [lists, setLists] = useState([])
//   const [listnew, setListnew] = useState([])

//   const [authuser,setAuthuser] = useState(null)
//   const [auth_user_data,setAuth_user_data] = useState([]);
//   const [auth_id,setAuth_id] = useState();

//   const [cart_item,setCart_item] = useState([]);
//   const [cart_count, setCart_count] = useState()

//   const [login,setLogin] = useState(false);


//   // const [cart_item,setCart_item] = useState([]);


//   // useEffect(() => {
//   //     const listen = onAuthStateChanged(auth, (user) =>{
//   //         if(user){
//   //             setAuthuser(user);
//   //         }else{
//   //             setAuthuser(null);
//   //         }
//   //     })
//   //     return () =>{
//   //         listen();
//   //     }
//   // },[])

//   useEffect(() => {
//     if(authuser != null){
//         axios.post(`${baseURL}/user_data`,{Email:authuser.email}).then((res) => {
//         console.log(res.data);
//         setAuth_user_data(res.data)
//         // setAuth_id(res.data._id)
//     }) 
//   }
//   },[authuser])

//   useEffect(() => {
//     auth_user_data.map((index)=>
//      {
//        setAuth_id(index._id)
//      })
//    },[auth_user_data]);

  
  
//   useEffect(()=> {
//     const q = query(collection(db, "react-admin"));

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setLists(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
//       // console.log(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
//     });

//  },[]);
 
// //  const [authuser,setAuthuser] = useState(null)

//  useEffect(() => {
//      const listen = onAuthStateChanged(auth, (user) =>{
//          if(user){
//              setAuthuser(user);
//             //  alert(user.email);
//             lists.filter((list) =>{
//               if(list.Email == user.email){
//                 // alert(list.Email);
//                 return setListnew(list)
//               }else{
//                 return false;
//               }
//             })
//          }else{
//              setAuthuser(null);
//          }
//      })
//      return () =>{
//          listen();
//      }
//  })
// ///////////////////////////////////////////////////////////
//   const[click,setClick] = useState(false);
//   const handleClick = () => setClick(!click);

//   const[color,setColor] = useState(false);
//   const changeColor = () =>{
//     if(window.scrollY >= 100){
//         setColor(true);
//     } else{
//         setColor(false);
//     }
//   };
//   window.addEventListener("scroll",changeColor);

//  //auth user
// //  const[userclick,setUserclick] = useState(false);
// //  const[hideclick,setHideclick] = useState(false)
// //  const userClick = () => {
// //   if(userclick == false)
// //   {
// //     setUserclick(true);
// //   }else{
// //     setUserclick(false);
// //   }
// //  };






//     // useEffect(() => {
//     //     const listen = onAuthStateChanged(auth, (user) =>{
//     //         if(user){
//     //             setAuthuser(user);
//     //         }else{
//     //             setAuthuser(null);
//     //         }
//     //     })
//     //     return () =>{
//     //         listen();
//     //     }
//     // },[])

//     const userSignOut = () => {
//         signOut(auth).then(()=>{
//            alert('sign out successful');
//            setAuth_user_data([])
//            setCart_item([])
//            setCart_count()
//         }).catch(error => console.log(error))
//     }

//     const userlogin = () => {
//       setLogin(true)
//     }
//     // alert(authuser)

//     // if(authuser == null){
//     //   setLogin_out("Sign Out")
//     // }else{
//     //   setLogin_out("Login")
//     // }

//   return (
//     <div className={color ? "header header-bg" : "header"}>
//       <Link to="/"><h1>Frosty Favourites</h1></Link>
//       <ul className={click ? "nav-menu active":"nav-menu"}>
//         <li>
//             <Link to="/home">Home</Link>
//         </li>
//         <li>
//             <Link to="/project">Project</Link>
//         </li>
//         <li>
//             <Link to="/about">About</Link>
//         </li>
//         <li>
//             <Link to="/contact">Contact</Link>
//         </li>
//         {authuser != null ?
//         <li>
//         <Link to="/" onClick={userSignOut}>Sign Out</Link>
//         </li>
//         :
//         <li>
//             <Link to="/" onClick={userlogin}>Login</Link>
//         </li>
//         }
        
//       </ul>
//       <div className='hamburger' onClick={handleClick}>
//         {click ?
//         (<FaTimes size={20} style={{ color:"#fff" }}/>)
//         :(<FaBars size={20} style={{ color:"#fff" }}/>)} 
        

//       </div>
//       <div className='user_info'>
        
//           <img src='https://th.bing.com/th/id/OIP.H1H0P8ROuSEf7JidrZH62wHaHa?w=160&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' alt='img'/>
        
//         <div className='user-data'>
//           <p>
//           {
//             auth_user_data.map((index)=>
            
//               <p>{index.F_Name} {index.L_Name} {setAuth_id(index._id)}</p>
//             )
//           }
//           </p>
//         </div>
//         {/* <div onClick={userClick}>
//       <FaArrowAltCircleDown size={20} style={{ color:"white" }}/>
//         </div>
//       {userclick ?
//         (authuser ? <div><p>{`${authuser.email}`}</p><button onClick={userSignOut}>Sign Out</button></div> : <p>Signed Out</p>)
//         : ("")}  */}
        
//       </div>
//     </div>
//   )
// }

export default Navbar
