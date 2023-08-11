import React, { useState, useEffect } from 'react'
import {FaBars,FaTimes} from 'react-icons/fa';
import {AiTwotoneDelete} from 'react-icons/ai';
import axios from "axios"
import { baseURL } from '../utils/Constant';

// import axios from "axios"
// import { baseURL } from '../utils/Constant';

import { auth } from '../Firebase';
import { onAuthStateChanged ,signOut } from 'firebase/auth';
import db from "../Firebase";
import {collection, onSnapshot, query,addDoc} from "firebase/firestore";
import { Link, useHref } from 'react-router-dom';
import OrderDetail from "../components/OrderReceipt"
import "../components/FormStyle.css";

const Form = () => {



  const [cart_item,setCart_item] = useState([]);
  const [order_cart_item,setOrder_cart_item] = useState([]);
  const [cart_count, setCart_count] = useState()

  const [pay_now,setPay_now] = useState(false);
  const [cart_id,setCart_id] = useState([]);
  const [place_order,setPlace_order] = useState(false);

  var total_price = 0;




  // const [cart_item,setCart_item] = useState([]);

  const [authuser,setAuthuser] = useState(null)
  const [auth_user_data,setAuth_user_data] = useState([]);
  const [auth_id,setAuth_id] = useState();
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
   },[auth_user_data]);
  //dynamic data
  const [toggle, setToggle] = useState(false)


  useEffect(() => {
    // alert(auth_id);
    // if(authuser != null){
    // console.warn(auth_id);
    axios.post(`${baseURL}/getcartdata`,{Auth_id:auth_id}).then((res) => {
      // console.log(res.data);
      setCart_item(res.data.cart_data)
      setOrder_cart_item(res.data.cart_data)
      setCart_count(res.data.cart_data.length)
  })
  // }
  },[auth_id,cart_item]);
  cart_item.map((index) =>{
    total_price += parseInt(index.Price);
    // setItem_price(sum)
  });


  const [email,setEmail] = useState(null);
  const [yourname,setYourname] = useState(null);
  const [number,setNumber] = useState(null);
  const [address,setAddress] = useState(null);

  const [o_email,setO_email] = useState(null);
  const [o_name,setO_name] = useState(null);
  const [o_number,setO_number] = useState(null);
  const [o_address,setO_address] = useState(null);
  const [total,setTotal] = useState(null);



    useEffect(()=> {
    const q = query(collection(db, "react"));

    const unsubscribe = onSnapshot(q, () => {
      
      setEmail("")
      setAddress('')
      setNumber('')
      setYourname('')
    });
      return () => unsubscribe()
 }, []) 


 //for add
     const Placeorder = () => {
      
      if((email == "") || (yourname == "")){
        alert('Please Fill Out All Filed ... ...');
      }else{
        // alert(email == "");
        setPay_now(true)
      }
      // if(){
      //   alert('Email Is Required');
      // }
      // if(){
      //   alert('Message Is Required');
      // }
      // if(){
      //   alert('Subject Is Required');
      // }

      // setCategory(false)
      // setPlace_order(true)
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
  // const btcate = () => {
  //   // setCategory(false)
  // }

  

  // const href = useHref();
  const payletter = () => {
    // setPlace_order(true)
    // window.location = "/order";
    axios.post(`${baseURL}/pay_letter`,{ Auth_id:auth_id }).then((res) => {
      console.log(res.data);
  }) 
  axios.post(`${baseURL}/sendCartDataMail`,{ Auth_id:auth_id,Name:yourname,Email:email,Number:number,Address:address,Cart_data:cart_item,Total:total_price }).then((res) => {
    console.log(res.data.msg);
})
  axios.post(`${baseURL}/delete_cart`,{ Auth_id:auth_id }).then((res) => {
    console.log(res.data);
    if(cart_count != 0){
      alert('Order Placed Successfully ....');
    }else{
      alert('Please Add Item ...')
      window.location = '/';
    }

    setCart_count(0)
    setCart_item([])
    setCart_id([])
    // href.push('/category');
    // alert('Pay Letter Successfully ....');
    // alert('Pay Letter Successfully ....');
    // setAuth_user_data(res.data)
    // setAuth_id(res.data._id)
}) 
// window.location = '/order_detail';
  }

  const deletecart = value => () => {
    axios.post(`${baseURL}/delete_item`,{Auth_id:auth_id,Cart_Id:value}).then((res) => {
      console.log(res.data);
      alert(res.data);
  })
  }
  return (
   <div className='place_order_main'>

  <div className='place_order'>

  {pay_now 
    ?
    <div className='payment'>
     <div className='form-payment'>
      <form>

        <label>Card Number</label>
        <input type='text'></input>
        <label>CVV</label>
        <input type='Email'></input>
        <label>Expiry Date</label>
        <input type='text'></input>
        <div className='payment-type'>
          {/* <div className='pay-now'>
          <button className='btn'>Pay Now</button>
        </div> */}
          <div className='pay-letter'>
            <Link to='/order' className='btn' onClick={payletter}>Pay Letter</Link>
          </div>
    </div>
      </form>
     </div>
    
    </div>
    :
    <div className='form'>
      <form>
        <label>Your Name</label>
        <input type='text' value={yourname} onChange={e => setYourname(e.target.value)} required></input>
        <label>Email</label>
        <input type='Email' value={email} onChange={e => setEmail(e.target.value)} required></input>
        <label>Contact Number</label>
        <input type='text' value={number} onChange={e => setNumber(e.target.value)} required></input>
        <label>Address</label>
        <textarea rows="6" placeholder='Type your address here' type='text' value={address} onChange={e => setAddress(e.target.value)} required/>
        <button className='btn' onClick={Placeorder}>Place Order</button>
        <Link className='btn' to='/'>Back To Menu Page</Link>
      </form>

    </div>  
    }
    </div>
    <div className='cart_data'>
      <div className='cart-place-order'>
          {cart_item.map((index) =>
          <div className='cart_place_item'>
          <div className='cart_place_img'><img src={index.Image}/><p>{index.Item_name}({index.Item_qty})</p></div>
          <div className='cart_contant'><p>${parseInt(index.Price)}</p><AiTwotoneDelete onClick={deletecart(index.Cart_Id)} size={20} style={{ color:"black" }}/></div>
          
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

export default Form
