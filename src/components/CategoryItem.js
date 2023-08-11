import React, { useState, useEffect } from 'react'
import {FaBars,FaTimes} from 'react-icons/fa';
import {AiTwotoneDelete} from 'react-icons/ai';
import axios from "axios"
import { baseURL } from '../utils/Constant';
import { NavLink,useHref } from 'react-router-dom';
import "../components/Heroimg2Style.css";


const CategoryItem = (props) => {

  const [itemdata2,setItemdata2] = useState([]);
  const history = useHref();



  //   useEffect(() => {
  
       
  // },[])
    
    const itemdata = value => (e) => {
      // alert(value);
      // setCategory(false)
      // setCate_id(value)
    //   axios.post(`${baseURL}/category_id`,{Cate_id:value}).then((res) => {
    //     console.log(res.data);
    //     // setCategory(false)
    //     setItemdata2(res.data)
    
    // })
    // const handleProceed = (e) => {
      // history.push('/menu', value);
      // history.push(`/menu/` + value);
      // history.push(generatePath("/menu/:id", { value }));
      // history.push(`/menu/${value}`);
    // };

    }
    return (
      <div>
        <div className='project-card'>
                  <NavLink to={'/menu/'+ props.cate_id} onClick={itemdata(props.cate_id)}><img src={props.imgsrc} alt='img'/></NavLink>
                  <h2 className='project-title'>{props.title}</h2>
  
        </div> 
        </div>
    )
  }

export default CategoryItem