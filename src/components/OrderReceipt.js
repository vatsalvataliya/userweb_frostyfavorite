import React, { useState, useEffect } from 'react'
import axios from "axios"
import { baseURL } from '../utils/Constant';
import { auth } from '../Firebase';
import { onAuthStateChanged ,signOut } from 'firebase/auth';
import "../components/OrderReceiptStyle.css";
import db from "../Firebase";
import { Link } from 'react-router-dom';
// import OrderDetail from '../../../backend/models/OrderDetail';

const OrderReceipt = () => {

  const [order_detail,setOrder_detail] = useState([]);
  


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

  useEffect(() => {
    if(authuser != null){
        axios.post(`${baseURL}/get_OrderDetail`,{Auth_id:auth_id}).then((res) => {
          setOrder_detail(res.data)
      //   setAuth_id(res.data._id)
    }) 
  }
  },[auth_id])
  return (
    <div className='order_receipt'>
    <div className='main'>
    {order_detail.map((index) => 
    <div>
      <div>
        <div>
          <h3 className='data'>
            <div>Restaurent Name </div>
            <div></div>
            <div>Frosty Favourite</div>     
          </h3>
        </div>
        <div>
          <h3 className='data'>
            <div>Coustomer Name</div>
            <div></div>
            <div>{index.Name}</div>     
          </h3>
        </div>
        <div>
          <h3 className='data'>
            <div>Contact Number</div>
            <div></div>
            <div>{index.Number}</div>     
          </h3>
        </div>
        <div>
          <h3 className='data'>
            <div>Email</div>
            <div></div>
            <div>{index.Email}</div>     
          </h3>
        </div>
        <div>
          <h3 className='data'>
            <div>Address</div>
            <div></div>
            <div>{index.Address}</div>     
          </h3>
        </div>
      </div>
      <div><h3>Item Data</h3></div><hr/>
      <div>
        {index.Cart_data.map((data) => 
        <div>
          <h3 className='data'>
            <div>{data.Item_name}({data.Item_qty})</div>
            <div></div>
            <div>{data.Price}</div>     
          </h3>
        </div>
        
        )}
        
      </div><hr/>
      <div>
          <h3 className='data'>
            <div>Total Amount</div>
            <div></div>
            <div>{index.Total}</div>     
          </h3>
        </div>
    </div>
    )}
    {/* <h1>Order</h1> */}
    </div>
    <div className='back_btn'>
    <Link to='/' className='btn'>Back To Category</Link>
    </div>
    </div>
  )
}

export default OrderReceipt