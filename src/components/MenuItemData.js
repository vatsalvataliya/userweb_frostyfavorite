import React, { useState, useEffect } from 'react'
// import {FaBars,FaTimes} from 'react-icons/fa';
// import {AiTwotoneDelete} from 'react-icons/ai';
import axios from "axios"
import { baseURL } from '../utils/Constant';
import {useNavigate} from "react-router-dom"

import { auth } from '../Firebase';
import { onAuthStateChanged  } from 'firebase/auth';

import "../components/WorkCardStyle.css";


const MenuItemData = (props) => {

    const [authuser,setAuthuser] = useState(null)
    const [auth_user_data,setAuth_user_data] = useState([]);
    const [auth_id,setAuth_id] = useState();
  const[qty,setQty] = useState(0);
  const[qty_id,setQty_id] = useState({Qty:0,Id:""});

  const navigate = useNavigate();


  
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
        //   setAuth_id(res.data._id)
      }) 
    }
    },[authuser])
  
    useEffect(() => {
      auth_user_data.map((index)=>
       {
         setAuth_id(index._id)
       })
     },[auth_user_data]);
    
     
    const addtocart = value => () => {
    // alert(auth_id)
    // console.log(auth_id);
          if(qty != 0){

            
            axios.post(`${baseURL}/add_to_cart`,{Item_Id:value,User_Id:auth_id,Qty:qty}).then((res) => {
              console.log(res.data);
              if(authuser != null){
                alert("Cart Data Added Successfully...")
                setQty_id([])
                setQty(0)
                axios.post(`${baseURL}/delete_order_detail`,{ Auth_id:auth_id }).then((res) => {
                  console.log(res.data);
                }) 
                
              }else{
                navigate('/login')
                alert("Please Login Now ...")
                
              }
            })
          }else{

               alert("Please add qty ....")
          }

       
    }
    const btnminus = value => () => {
      if(qty >= 1){
        setQty(qty - 1)
      }
      setQty_id({Qty:qty,Id:value})
        // alert(qty_id.Id)
      

    }

    const btnplus = value => () => {
      setQty(qty + 1)
      setQty_id({Qty:qty,Id:value})
      
    }
  return (
    <div className='project-card-item'>
                {/* <NavLink onClick={itemdata(props._id)}></NavLink> */}
                <div className='project-card-img'>
                <img src={props.imgsrc} alt='img'/>
                </div>
                <div className='project-card-qty-main'>
                  <p>Qty</p>
                <div className='project-card-qty'>
                <div><button className='btn-min' onClick={btnminus(props.menu_id)}>-</button></div><div><p>{qty}</p></div><div><button className='btn-plus' onClick={btnplus(props.menu_id)}>+</button></div>
                </div>
                </div>
                <div className='project-card-content'>
                <h2>{props.price}$</h2>
                <h2 className='project-title'>{props.title}</h2>
                <button className='add-btn' onClick={addtocart(props.menu_id)}>Add</button>
                </div>

      </div> 
  )
}

export default MenuItemData