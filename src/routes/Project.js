// import React from 'react'
// import Navbar from '../components/Navbar';
import CartToggle from '../restaurent/CartToggle';

import Footer from '../components/Footer';
import Heroimg2 from '../components/Heroimg2';
// import PricingCard from '../components/PricingCard';
// import Work from '../components/Work';
import { NavLink } from 'react-router-dom';
import axios from "axios"
import { baseURL } from '../utils/Constant';

import React, { useState, useEffect } from 'react'

import "../components/NavbarStyle.css";
import "../components/CartToggleStyle.css";
import { Link } from 'react-router-dom';
import {FaBars,FaTimes} from 'react-icons/fa';
import {AiTwotoneDelete} from 'react-icons/ai';
import { auth } from '../Firebase';
import { onAuthStateChanged ,signOut } from 'firebase/auth';
import db from "../Firebase";
import {collection, onSnapshot, query,addDoc} from "firebase/firestore";
import "../components/WorkCardStyle.css";
// import SignIn from '../components/SignIn';

import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import Form from '../components/Form';

const Project = () => {
  const [category,setCategory] = useState(true);
  const [placeorder,setPlaceorder] = useState(false);

  const [itemdata,setItemdata] = useState([]);
  // const [cate_id,setCate_id] = useState(null);

  const [auth_user_data,setAuth_user_data] = useState([]);

  const [auth_id,setAuth_id] = useState();
  const [auth_email,setAuth_email] = useState();
  const [auth_password,setAuth_password] = useState();

  const [itemdata2,setItemdata2] = useState([]);
  const [cart_item,setCart_item] = useState([]);
  const [cart_count, setCart_count] = useState()
  const [cart_id,setCart_id] = useState([]);

  // add cart item 
  const [item_id,setItem_id] = useState();
  const [singleitem,setSingleitem] = useState('');
  const [pastitem,setPastitem] = useState([]);


  // const [login_out,setLogin_out] = useState();
  const [pay_now,setPay_now] = useState(false);


  const [login,setLogin] = useState(false);


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

// alert(authuser);

useEffect(() => {
  axios.get(`${baseURL}/itemdata_get`)
  .then((res) => {
      console.log(res.data);
      setItemdata(res.data)
  })
},[]);

useEffect(() => {
  // if(authuser != null){
  // console.warn(auth_id);
  // alert(auth_id);
  axios.post(`${baseURL}/getcartdata`,{Auth_id:auth_id}).then((res) => {
    console.log(res.data);
    setCart_item(res.data.cart_data)
    setCart_id(res.data.cart_id)
    setCart_count(res.data.cart_data.length)
})
// }
},[login,auth_id,pay_now]);
// alert(cart_item);

const backbtn = () => {
  setCategory(true);
}

// if(category == false){
//   itemdata.map((index) => {
//     // console.log(index);/
//     if(index._id == cate_id){
//       setItemdata3(index)
//       return setItemdata2(...itemdata3,index);
//     }
//   })
// }


useEffect(() => {
  if(authuser != null){
      axios.post(`${baseURL}/user_data`,{Email:authuser.email}).then((res) => {
      console.log(res.data);
      setAuth_user_data(res.data)
      // setAuth_id(res.data._id)
  }) 
}
},[authuser])
// alert(h)
  //else{
  //   setAuth_user_data([])
  // }
  // alert(authuser.email == null);

const SignIn = () => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    // const [userpassword,setUserpassword] = useState();
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
    // setUseremail(email)
    // setUserpassword(password)
    setLogin(false)
    setPlaceorder(false)
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

const CategoryItem = (props) => {
    
  const itemdata = value => () => {
    // alert(value);
    // setCategory(false)
    // setCate_id(value)

    axios.post(`${baseURL}/category_id`,{Cate_id:value}).then((res) => {
      console.log(res.data);
      setCategory(false)
      setItemdata2(res.data)
  
  })
  }




  return (
    <div>


      <div className='project-card'>
                <NavLink onClick={itemdata(props.cate_id)}><img src={props.imgsrc} alt='img'/></NavLink>
                <h2 className='project-title'>{props.title}</h2>

      </div> 


    
      </div>
  )
}

const MenuItem = (props) => {

  useEffect(() => {
 auth_user_data.map((index)=>
  {
    setAuth_id(index._id)
    // setAuth_email(index.Email)
    // setPassword(index.Password)
  })


},[authuser]);

const addtocart = value => () => {
    
    axios.post(`${baseURL}/add_to_cart`,{Item_Id:value,User_Id:auth_id}).then((res) => {
    console.log(res.data);
    alert("Cart Data Added Successfully...")
    // window.location.reload();
    // CartToggle.reload();
    // setAuth_user_data(res.data)
})

setItem_id(value)
    
}

  return (
    <div>


      <div className='project-card-item'>
                {/* <NavLink onClick={itemdata(props._id)}></NavLink> */}
                <div className='project-card-img'>
                <img src={props.imgsrc} alt='img'/>
                </div>
                <div className='project-card-content'>
                <h2>100$</h2>
                <h2 className='project-title'>{props.title}</h2>
                <button className='btn' onClick={addtocart(props.cate_id)}>Add</button>
                </div>

      </div> 


    
      </div>
  )
}

const CartToggle = (props) => {
  //dynamic data
  const [toggle, setToggle] = useState(false)

// alert(count);
    const togglemenu = () => {
      setToggle(true)
    }
    const no_toggle_menu = () => {
      setToggle(false)
    }

    const placeorder = () => {
      setPlaceorder(true)
    }
    

    itemdata2.map((index) => 
      {
        if(item_id == index._id){
          // return true;
          setSingleitem(index)
          // setPastitem(...pastitem,index)
        }
      }
      )

      // var array = [];
      // if(cart_count != 0){
        var array = [...cart_item,singleitem];
      //   setPastitem(array)
      //   // setPastitem([...pastitem,singleitem])
        // console.log(pastitem);
      // }
      // // setPastitem()

      // const array = [...cart_item,singleitem];
      // const array2 = [...pastitem,singleitem];

      // setPastitem(array2)

      
      // setPastitem(array)
      // }else{
      //  const array = [];
      // }
      // alert(cart_count);

  return (
    <div>
    {toggle 
    ?
    <div className="header-toggle-cart" >
      {/* <Link to="/"><h1>{listnew.FirstName} {listnew.LastName}</h1></Link> */}
      <FaTimes onClick={no_toggle_menu} size={20} style={{ color:"#fff" }}/>
      <div className='cart-toggle-qty'>
        {singleitem == '' ? <>{cart_item.map((index) =>
        <div className='cart_toggle_item'>
         <div className='cart_img'><img src={index.Image}/><p>{index.Item_name}</p></div>
         <div className='cart_contant'><p>$100</p><AiTwotoneDelete size={20} style={{ color:"black" }}/></div>
         
        </div>
         )}</> 
         :
         <>
         {array.map((index) =>
          <div className='cart_toggle_item'>
           <div className='cart_img'><img src={index.Image}/><p>{index.Item_name}</p></div>
           <div className='cart_contant'><p>$100</p><AiTwotoneDelete size={20} style={{ color:"black" }}/></div>
           
          </div>
           )}
           </>
         }
        
          {/* <p>2</p> */}
      </div>
      <div className='cart-toggle-price'>
        <div>
          <p>Total Price :</p>
        </div>

        <div onClick={placeorder}>
          <p className='btn_price'>100$</p>
        </div>
      </div>
      
    </div>
      :
      <div className="header-cart" onClick={togglemenu}>
      {/* <Link to="/"><h1>{listnew.FirstName} {listnew.LastName}</h1></Link> */}
      <div className='cart-qty'>
          <p>{cart_count}</p>
      </div>
      <div className='cart-price'>
          <p>100$</p>
      </div>
      
    </div>
      }
    </div>
  )
}

const Work = () => {

  
  
    const [catitemdata,setCatitemdata] = useState([]);
    // const WorkItemCard = (props) => {
      
    // return (
    //     <div>
    
    
    //       <div className='project-card'>
    //                 <NavLink onClick={itemdata(props.cate_id)}><img src={props.imgsrc} alt='img'/></NavLink>
    //                 <h2 className='project-title'>{props.title}</h2>
    //                 {/* <div className='pro-btns'>
    //                         <NavLink to={props.view} className='btn'><h2>View</h2></NavLink>
    //                       </div> */}
    //                 {/* <div className='pro-detail'>
    //                     <p>{props.text}</p>
    //                     <div className='pro-btns'>
    //                     <NavLink to={props.view} className='btn'>View</NavLink>
    //                     </div>
    //                   </div> */}
    
    //       </div> 
    
    
        
    //       </div>
    //   )
    // }
  
  const [tasks,setTasks] = useState([]);
      useEffect(() => {
          axios.get(`${baseURL}/catedata_get`)
          .then((res) => {
              console.log(res.data);
              setTasks(res.data)
          })
      },[]);
  ///////////////////////////////////////////////////////
    return (
      <div className='work-container'>
        
        <h1 className='project-heading'>Catagories</h1>
          <div className='project-container'>
          {tasks.map((index) => 
                      <CategoryItem imgsrc={index.Image} title={index.Cate_name} cate_id={index._id} view='' />
          )}
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
  //  const[userclick,setUserclick] = useState(false);
  //  const[hideclick,setHideclick] = useState(false)
  //  const userClick = () => {
  //   if(userclick == false)
  //   {
  //     setUserclick(true);
  //   }else{
  //     setUserclick(false);
  //   }
  //  };
  
  
  
  
  
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
             setAuth_user_data([])
             setCart_item([])
             setCart_count()
          }).catch(error => console.log(error))
      }

      const userlogin = () => {
        setLogin(true)
      }
      // alert(authuser)

      // if(authuser == null){
      //   setLogin_out("Sign Out")
      // }else{
      //   setLogin_out("Login")
      // }
  
    return (
      <div className={color ? "header header-bg" : "header"}>
        <Link to="/"><h1>Frosty Favourites</h1></Link>
        <ul className={click ? "nav-menu active":"nav-menu"}>
          <li>
              <Link to="/home">Home</Link>
          </li>
          <li>
              <Link to="/project">Project</Link>
          </li>
          <li>
              <Link to="/about">About</Link>
          </li>
          <li>
              <Link to="/contact">Contact</Link>
          </li>
          {authuser != null ?
          <li>
          <Link to="/" onClick={userSignOut}>Sign Out</Link>
          </li>
          :
          <li>
              <Link to="/" onClick={userlogin}>Login</Link>
          </li>
          }
          
        </ul>
        <div className='hamburger' onClick={handleClick}>
          {click ?
          (<FaTimes size={20} style={{ color:"#fff" }}/>)
          :(<FaBars size={20} style={{ color:"#fff" }}/>)} 
          
  
        </div>
        <div className='user_info'>
          
            <img src='https://th.bing.com/th/id/OIP.H1H0P8ROuSEf7JidrZH62wHaHa?w=160&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' alt='img'/>
          
          <div className='user-data'>
            <p>
            {
              auth_user_data.map((index)=>
              
                <p>{index.F_Name} {index.L_Name} {setAuth_id(index._id)}</p>
              )
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
      </div>
    )
  }

const Placeorder = () => {
return (
  <div>
    <Form/>
  </div>
)
}  

const Form = () => {
  const [email,setEmail] = useState();
  const [yourname,setYourname] = useState();
  const [subject,setSubject] = useState();
  const [message,setMessage] = useState();


    useEffect(()=> {
    const q = query(collection(db, "react"));

    const unsubscribe = onSnapshot(q, () => {
      
      setEmail("")
      setMessage('')
      setSubject('')
      setYourname('')
    });
      return () => unsubscribe()
 }, []) 


 //for add
     const placeorder = () => {
      setPay_now(true)
      // setCategory(false)
      setPlaceorder(true)
      // e.preventDefault()
      // if(email){
      //   addDoc(collection(db,"react"),{
      //     Your_Name:yourname,
      //     Email:email,
      //     Subject:subject,
      //     Message:message
      //     // Password:password
      //   }).catch(err => console.error(err))
      //   alert('Your Report Is Added...')
      // }
    }

  const [lists, setLists] = useState([])

  // const signUp = (e) => {
  //   e.preventDefault();
  //   createUserWithEmailAndPassword(auth,email,password).then((usecredential) => {
  //     console.log(usecredential);
  //   }).catch((error) => {console.log(error);})
  // }
  const btcate = () => {
    setPlaceorder(false)
    // setCategory(false)
  }

  const payletter = () => {
    axios.post(`${baseURL}/pay_letter`,{ Auth_id:auth_id }).then((res) => {
      console.log(res.data);
    // alert(res.data);

      // setAuth_user_data(res.data)
      // setAuth_id(res.data._id)
  }) 
  axios.post(`${baseURL}/delete_cart`,{ Auth_id:auth_id }).then((res) => {
    console.log(res.data);
    alert('Order Placed Successfully ....');

    setCart_count(0)
    setCart_item([])
    setCart_id([])

    // alert('Pay Letter Successfully ....');
    // alert('Pay Letter Successfully ....');
    // setAuth_user_data(res.data)
    // setAuth_id(res.data._id)
}) 
  }
  return (
    <div className='place_order'>

    
    {pay_now 
    ?
    <div className='payment'>
     <div className='form-payment'>
      <form>

        <label>Card Number</label>
        <input type='text' value={yourname} onChange={e => setYourname(e.target.value)} ></input>
        <label>CVV</label>
        <input type='Email' value={email} onChange={e => setEmail(e.target.value)} ></input>
        <label>Expiry Date</label>
        <input type='text' value={subject} onChange={e => setSubject(e.target.value)} ></input>
        <div className='payment-type'>
          {/* <div className='pay-now'>
          <button className='btn'>Pay Now</button>
          </div> */}
          <div className='pay-letter'>
            <button className='btn' onClick={payletter}>Pay Letter</button>
          </div>
    </div>
      </form>
     </div>
    
    </div>
    :
    <div className='form'>
      <form>
        <label>Your Name</label>
        <input type='text' value={yourname} onChange={e => setYourname(e.target.value)} ></input>
        <label>Email</label>
        <input type='Email' value={email} onChange={e => setEmail(e.target.value)} ></input>
        <label>Subject</label>
        <input type='text' value={subject} onChange={e => setSubject(e.target.value)} ></input>
        <label>Message</label>
        <textarea rows="6" placeholder='Type your message here' type='text' value={message} onChange={e => setMessage(e.target.value)} />
        <button className='btn' onClick={placeorder}>Place Order</button>
        <button className='btn' onClick={btcate}>Back To Menu Page</button>
      </form>

    </div>  
    }
    
    <div className='cart_data'>
      <div className='cart-toggle-qty'>
          {cart_item.map((index) =>
          <div className='cart_toggle_item'>
          <div className='cart_img'><img src={index.Image}/><p>{index.Item_name}</p></div>
          <div className='cart_contant'><p>$100</p><AiTwotoneDelete size={20} style={{ color:"black" }}/></div>
          
          </div>
          )}

      {/* <div>
        <button className='btn'>Place Order</button> 
      </div>      */}
      </div>
    </div>
    </div>
  )
}

  return (
    <div>
      {login 
      ?
       <SignIn/>
      :
       <>

      <Navbar/>
      <CartToggle/>
      <Heroimg2 heading="PROJECTS" text="Some of my most recent works"/>
      {placeorder ?
      <><Placeorder/></>
      : 
      <>{category ? <Work/>
      :
      <div className='work-container'>
        
        <h1 className='project-heading'>Menu Item</h1>
          <div className='project-container-item'>
          {itemdata2.map((index) => 
                      <MenuItem imgsrc={index.Image} title={index.Item_name} cate_id={index._id} view='' />
                      )}
          </div>
        <div className='project-heading'><button className='btn' onClick={backbtn}>back</button></div>
      </div>
       }
      </>
}
      <Footer/>
       </>
      
    }
    </div>
  )
}

export default Project
