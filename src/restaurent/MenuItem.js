import React, { useState, useEffect } from 'react'
// import {FaBars,FaTimes} from 'react-icons/fa';
// import {AiTwotoneDelete} from 'react-icons/ai';
import axios from "axios"
import { baseURL } from '../utils/Constant';
import { Link, useParams } from 'react-router-dom';
import MenuItemData from '../components/MenuItemData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartToggle from './CartToggle';
import Heroimg2 from '../components/Heroimg2';


const MenuItem = () => {
  const { id } = useParams();
  const [itemdata2,setItemdata2] = useState([]);
  // const [cate_id,setCate_id] = useState();


  // const location = useLocation();
  // const { id } = location.state || { id: "none" };

  // alert(id);
  // setCate_id(id)
  useEffect(() => {
    axios.post(`${baseURL}/category_id`,{Cate_id:id}).then((res) => {
      console.log(res.data);
      // setCategory(false)
      setItemdata2(res.data)
  
  })
  },[])

  return (
    <>
    <Navbar/>
    <CartToggle/>
    <Heroimg2 heading="PROJECTS" text="Some of my most recent works"/>
    <div className='work-container'>
        
        <h1 className='project-heading'>Menu Item</h1>
          <div className='project-container-item'>
          {itemdata2.map((index) => 
                      <MenuItemData imgsrc={index.Image} title={index.Item_name} menu_id={index._id} price={index.Price} view='' />
                      )}
          </div>
        <div className='project-heading'><Link to='/' className='btn'>back</Link></div>
      </div>
      <Footer/>
    </>
  )
}

export default MenuItem