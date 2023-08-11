import React, { useState, useEffect } from 'react'
import "../components/WorkCardStyle.css";
import { auth } from '../Firebase';
import { onAuthStateChanged ,signOut } from 'firebase/auth';
import db from "../Firebase";
import {doc, collection, onSnapshot, addDoc, query, orderBy, deleteDoc, setDoc} from "firebase/firestore";

import WorkCard from './WorkCard';
import image from '../assets/background.jpeg';
import WorkCardData from '../components/WorkCardData';
// import WorkItemCard from '../components/WorkItemCard';

import { NavLink } from 'react-router-dom';
import axios from "axios"
import { baseURL } from '../utils/Constant';

const Work = () => {

  const [category,setCategory] = useState(true);
  const [cate_id,setCate_id] = useState(null);


  const [itemdata,setItemdata] = useState([]);
  const [catitemdata,setCatitemdata] = useState([]);

    useEffect(() => {
        axios.get(`${baseURL}/itemdata_get`)
        .then((res) => {
            console.log(res.data);
            setItemdata(res.data)
        })
    },[]);

  const WorkCard1 = (props) => {
  
    const itemdata = value => () => {
      // alert(value);
      setCategory(false)
      setCate_id(value)
    }
  

  
  
    return (
      <div>
  
  
        <div className='project-card'>
                  <NavLink onClick={itemdata(props.cate_id)}><img src={props.imgsrc} alt='img'/></NavLink>
                  <h2 className='project-title'>{props.title}</h2>
                  {/* <div className='pro-btns'>
                          <NavLink to={props.view} className='btn'><h2>View</h2></NavLink>
                        </div> */}
                  {/* <div className='pro-detail'>
                      <p>{props.text}</p>
                      <div className='pro-btns'>
                      <NavLink to={props.view} className='btn'>View</NavLink>
                      </div>
                    </div> */}
  
        </div> 
  
  
      
        </div>
    )
  }

  const WorkItemCard = (props) => {
    
  return (
      <div>
  
  
        <div className='project-card'>
                  <NavLink onClick={itemdata(props.cate_id)}><img src={props.imgsrc} alt='img'/></NavLink>
                  <h2 className='project-title'>{props.title}</h2>
                  {/* <div className='pro-btns'>
                          <NavLink to={props.view} className='btn'><h2>View</h2></NavLink>
                        </div> */}
                  {/* <div className='pro-detail'>
                      <p>{props.text}</p>
                      <div className='pro-btns'>
                      <NavLink to={props.view} className='btn'>View</NavLink>
                      </div>
                    </div> */}
  
        </div> 
  
  
      
        </div>
    )
  }

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
      {category ? 
      <>
      <h1 className='project-heading'>Catagories</h1>
        <div className='project-container'>
        {tasks.map((index) => 
                    <WorkCard1 imgsrc={index.Image} title={index.Cate_name} cate_id={index._id} view='' />
        )}
        </div>
      </> 
      :
       <>
       <div className='project-container'>
        {catitemdata.map((index) => 
                    
                   
                        <WorkItemCard imgsrc={index.Image} title={index.Item_name} cate_id={index._id} view='' />
                      
        )}
        </div>
       </>
      }
        
      
    </div>
  )
}

export default Work
