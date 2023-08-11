import React, { useState, useEffect } from 'react'
import {FaBars,FaTimes} from 'react-icons/fa';
import {AiTwotoneDelete} from 'react-icons/ai';
import axios from "axios"
import { baseURL } from '../utils/Constant';

// import axios from "axios"
// import { baseURL } from '../utils/Constant';

import { auth } from '../Firebase';
import { onAuthStateChanged ,signOut } from 'firebase/auth';
// import db from "../Firebase";
// import {collection, onSnapshot, query,addDoc} from "firebase/firestore";
import { Link } from 'react-router-dom';
import "../components/CartToggleStyle.css";



const CartToggle = (props) => {

  const [authuser,setAuthuser] = useState(null)
    const [auth_user_data,setAuth_user_data] = useState([]);
    const [auth_id,setAuth_id] = useState();

    const [cart_item,setCart_item] = useState([]);
    const [cart_data,setCart_data] = useState([]);
    const [cart_count, setCart_count] = useState()

    const [item_price, setItem_price] = useState(0)

    var total_price = 0;

    // let sum = 0;


    // const [cart_item,setCart_item] = useState([]);

  
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
        setCart_count(res.data.cart_data.length)
    })
    // }
    },[auth_id,cart_item]);
  // alert(count);
      const togglemenu = () => {
        setToggle(true)
      }
      const no_toggle_menu = () => {
        setToggle(false)
      }
      cart_item.map((index) =>{
        total_price += parseInt(index.Price);
        // setItem_price(sum)
      });

      // cart_item.map((index) => index.map((data) => setCart_data(index.item)));
      

      // alert(item_price);
  // console.log(cart_item.cart_data);
      // const placeorder = () => {
      //   setPlaceorder(true)
      // }
      const Cart_data = () => {
      //         for (let index = 0; index < cart_count; index++) {
      //   // const element = array[index];
      //   const sum= item_price + cart_item[index].Price;
      //   setItem_price(sum);  
      // }
      // console.warn(item_price);
      const deletecart = value => () => {
        axios.post(`${baseURL}/delete_item`,{Auth_id:auth_id,Cart_Id:value}).then((res) => {
          console.log(res.data);
          alert(res.data);
      })
      }

        return (
<div className='cart-toggle-qty'>
          {cart_item.map((index) =>
          <div className='cart_toggle_item'>
           <div className='cart_img'><img src={index.Image}/><p>{index.Item_name}({index.Item_qty})</p></div>
           <div className='cart_contant'><p>Rs.{index.Price}</p><div onClick={deletecart(index.Cart_Id)}><AiTwotoneDelete size={20} style={{ color:"black" }}/></div></div>
           
          </div>
           )}
            {/* <p>2</p> */}
        </div>
        )
      }
  
    return (
      <div>
      {toggle 
      ?
      <div className="header-toggle-cart" >
        {/* <Link to="/"><h1>{listnew.FirstName} {listnew.LastName}</h1></Link> */}
        <FaTimes onClick={no_toggle_menu} size={20} style={{ color:"#fff" }}/>
        <div className='scroller'>
        <Cart_data/>
        </div>
        <div className='cart-toggle-price'>
          <div>
            <p>Total Price :</p>
          </div>
  
          <Link to='/place_order'>
            <p className='btn_price'>$ {total_price}</p>
          </Link>
        </div>
        
      </div>
        :
        <div className="header-cart" onClick={togglemenu}>
        {/* <Link to="/"><h1>{listnew.FirstName} {listnew.LastName}</h1></Link> */}
        <div className='cart-qty'>
            <p>{cart_count}</p>
        </div>
        <div className='cart-price'>
            <p>$ {total_price}</p>
        </div>
        
      </div>
        }
      </div>
    )
  }

export default CartToggle