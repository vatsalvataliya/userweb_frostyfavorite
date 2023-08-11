import React, { useState, useEffect } from 'react'
import {FaBars,FaTimes} from 'react-icons/fa';
import {AiTwotoneDelete} from 'react-icons/ai';
import axios from "axios"
import { baseURL } from '../utils/Constant';
import CategoryItem from '../components/CategoryItem';
import "../components/Heroimg2Style.css";

const Category = (props) => {

  
  
    const [catitemdata,setCatitemdata] = useState([]);

  
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
        
        <h1 className='project-heading'>Categories</h1>
          <div className='project-container'>
          {tasks.map((index) => 
                      <CategoryItem imgsrc={index.Image} title={index.Cate_name} cate_id={index._id} view='' />
          )}
          </div>
        
      </div>
    )
  }

export default Category