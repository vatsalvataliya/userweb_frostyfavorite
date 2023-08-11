import React from 'react'
import {useState, useEffect} from "react";
import db from "../Firebase";
import { auth } from "../Firebase";
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import "../components/Heroimg3Style.css";
import "../components/NavbarStyle.css";
import '../components/Heroimgstyle.css';
import "../components/FooterStyle.css";
import "../components/Heroimg2Style.css";
import "../components/WorkCardStyle.css";
import "../components/WorkCardStyle.css";
import "../components/AboutContentStyle.css";
import "../components/FormStyle.css";


import IntroImg from '../assets/background.jpeg';
import pro1 from "../assets/gallery-img-03.jpg";

import { signInWithEmailAndPassword } from "firebase/auth";
import {FaBars,FaTimes,FaUser,FaArrowAltCircleDown} from 'react-icons/fa';
import {FaFacebook, FaHome, FaLinkedin, FaMailBulk, FaPhone, FaTwitter} from 'react-icons/fa';
import {doc, collection, onSnapshot, addDoc, query, orderBy, deleteDoc, setDoc} from "firebase/firestore";
import { onAuthStateChanged ,signOut } from 'firebase/auth';




const OnlineSubmit = () => {

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

    const [f_home,setF_home] = useState(false);
    const [f_project,setF_project] = useState(false);
    const [f_about,setF_about] = useState(false);
    const [f_contact,setF_contact] = useState(false);
    const [f_login,setF_login] = useState(false);


    const Heroimg4 = () => {
        const [email,setEmail] = useState();
        const [password,setPassword] = useState();
        const signIn = (e) => {
          e.preventDefault();
          signInWithEmailAndPassword(auth,email,password).then((usecredential) => {
            console.log(usecredential);
            alert("You Have Login Successfully.");
            setF_home(true)
            setF_login(true)
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

      const Navbar = () => {
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
      
          const userSignOut = () => {
              signOut(auth).then(()=>{
                 alert('sign out successful');
                 setF_home(false)
                 setF_project(false)
                 setF_about(true)
                 setF_contact(false)
                 setF_login(false)
              }).catch(error => console.log(error))
             
          }

          const fun_home = () => {
            setF_home(true)
            setF_project(false)
            setF_about(false)
            setF_contact(false)
            setF_login(true)
          }
          const fun_project = () => {
            setF_home(false)
            setF_project(true)
            setF_about(false)
            setF_contact(false)
            setF_login(true)
          }
          const fun_about = () => {
            setF_home(false)
            setF_project(false)
            setF_about(true)
            setF_contact(false)
            setF_login(true)
          }
          const fun_contact = () => {
            setF_home(false)
            setF_project(false)
            setF_about(false)
            setF_contact(true)
            setF_login(true)
          }
      
        return (
          <div className={color ? "header header-bg" : "header"}>
            <Link to="/"><h1>{listnew.FirstName} {listnew.LastName}</h1></Link>
            <ul className={click ? "nav-menu active":"nav-menu"}>
              <li>
                  <Link onClick={fun_home}>Home</Link>
              </li>
              <li>
                  <Link onClick={fun_project}>Project</Link>
              </li>
              <li>
                  <Link onClick={fun_about}>About</Link>
              </li>
              <li>
                  <Link onClick={fun_contact}>Contact</Link>
              </li>
              <li>
                  <Link onClick={userSignOut}>Log Out</Link>
              </li>
            </ul>
            <div className='hamburger' onClick={handleClick}>
              {click ?
              (<FaTimes size={20} style={{ color:"#fff" }}/>)
              :(<FaBars size={20} style={{ color:"#fff" }}/>)} 
              
      
            </div>
            {/* <div className={hideclick ? "user" : "user_click"}>
              <div onClick={userClick}>
            <FaArrowAltCircleDown size={20} style={{ color:"white" }}/>
              </div>
            {userclick ?
              (authuser ? <div><p>{`${authuser.email}`}</p><button onClick={userSignOut}>Sign Out</button></div> : <p>Signed Out</p>)
              : ("")} 
              
            </div> */}
          </div>
        )
      }  

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
                //    alert(user.email);
                  lists.filter((list) =>{
                    if(list.Email == user.email){
                    //   alert(list.Email);
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
    //   alert(listnew);
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

      const Footer = () => {
        return (
          <div className='footer'>
              <div className='footer-container'>
                  <div className='left'>
                      <div className='location'>
                          <FaHome size={20} style={{ color:"#fff",marginRight:"2rem" }}/>
                          <div>
                              <p>Sarkhej Ahmedabad</p>
                              <p>Gujarat</p>
                          </div>
                      </div>
                      <div className='phone'>
                          <h4>
                          <FaPhone size={20} style={{ color:"#fff",marginRight:"2rem" }}/>
                          +91 9106588074 
                          </h4>    
                      </div>
                      <div className='phone'>
                          <h4>
                          <FaMailBulk size={20} style={{ color:"#fff",marginRight:"2rem" }}/>
                          vatsalrprajapati20@gmail.com 
                          </h4>    
                      </div>
                      
                  </div>
                  <div className='right'>
                      <h4>About the company</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      <div className='social'>
                      <FaFacebook size={30} style={{ color:"#fff",marginRight:"2rem" }}/>
                      <FaTwitter size={30} style={{ color:"#fff",marginRight:"2rem" }}/>
                      <FaLinkedin size={30} style={{ color:"#fff",marginRight:"2rem" }}/>   
      
                      </div>
                  </div>
      
      
              </div>
          </div>
        )
      }

        const Heroimg2 = (props) => {
        return (
            <div className='hero-img'>
            <div className='heading'>
                <h1>{props.heading}</h1>
                <p>I am a friendly {props.text} Developer.</p>
            </div>
            </div>
        )
        }

        const Work = () => {
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
              <div className='work-container'>
                  <h1 className='project-heading'>Projects</h1>
                  <div className='project-container'>
                       
                              <WorkCard imgsrc={listnew.Project1_img} title={listnew.Project1_title} text={listnew.Project1_Info} view={listnew.Project1_URL} />
                              <WorkCard imgsrc={listnew.Project1_img} title={listnew.Project1_title} text={listnew.Project1_Info} view={listnew.Project1_URL} />
          
                  </div>
                
              </div>
            )
          }

          const WorkCard = (props) => {
            return (
          
              <div className='project-card'>
                          <img src={props.imgsrc} alt='img'/>
                          <h2 className='project-title'>{props.title}</h2>
                          <div className='pro-detail'>
                              <p>{props.text}</p>
                              <div className='pro-btns'>
                                  <NavLink to={props.view} className='btn'>View</NavLink>
                                  {/* <NavLink to="url.com" className='btn'>Source</NavLink> */}
                              </div>
                          </div>
          
                      </div>
            )
          }

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

          const Form = () => {
            const [contact_email,setContact_email] = useState();
            const [yourname,setYourname] = useState();
            const [subject,setSubject] = useState();
            const [message,setMessage] = useState();
          
            // const [password,setPassword] = useState();
          
              useEffect(()=> {
              const q = query(collection(db, "react"));
          
              const unsubscribe = onSnapshot(q, () => {
                
                setContact_email("")
                setMessage('')
                setSubject('')
                setYourname('')
              });
                return () => unsubscribe()
           }, []) 
          
          
           //for add
               const submitclick = (e) => {
                e.preventDefault()
                 
                if(contact_email){
                  addDoc(collection(db,"react"),{
                    Your_Name:yourname,
                    Email:contact_email,
                    Subject:subject,
                    Message:message
                    // Password:password
                  }).catch(err => console.error(err))
                  alert('Your Report Is Added...')
                }
              }
          
            // const [lists, setLists] = useState([])
          
            // const signUp = (e) => {
            //   e.preventDefault();
            //   createUserWithEmailAndPassword(auth,email,password).then((usecredential) => {
            //     console.log(usecredential);
            //   }).catch((error) => {console.log(error);})
            // }
            return (
              <div className='form'>
                <form>
                  <label>Your Name</label>
                  <input type='text' value={yourname} onChange={e => setYourname(e.target.value)} required></input>
                  <label>Email</label>
                  <input type='Email' value={contact_email} onChange={e => setContact_email(e.target.value)} required></input>
                  <label>Subject</label>
                  <input type='text' value={subject} onChange={e => setSubject(e.target.value)} required></input>
                  <label>Message</label>
                  <textarea rows="6" placeholder='Type your message here' type='text' value={message} onChange={e => setMessage(e.target.value)} required/>
                  <button className='btn' onClick={submitclick}> Submit</button>
                </form>
              </div>
            )
          }
  return (
    <div>
        {f_login ? 
         <>
         <Navbar/>
         {f_home ? <><Heroimg/></>
         :
          <>
          {f_project ?<><Heroimg2 heading="PROJECTS" text="Some of my most recent works"/><Work/></> :<></>}
          {f_about ? <><Heroimg2 heading="ABOUT" text={listnew.About_l_name}/><AboutContent/></> :<></>}
          {f_contact ? <><Heroimg2 heading="CONTACT" text="Let's have a chat"/><Form/></> :<></>}
          </>
           }
         
         <Footer/>

         </>
         :

         <Heroimg4/>
         }
    </div>
  )
}

export default OnlineSubmit
