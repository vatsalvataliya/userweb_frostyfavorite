import React, { useState, useEffect } from 'react'
import "../components/WorkCardStyle.css";
import pro1 from "../assets/gallery-img-03.jpg";
import { NavLink } from 'react-router-dom';
import { baseURL } from '../utils/Constant';
import axios from "axios"

const WorkCard = (props) => {
  const [category,setCategory] = useState(true);
  const [cate_id,setCate_id] = useState();

  const itemdata = value => () => {
    // alert(value);
    setCate_id(value)
    setCategory(false)
  }

  // const Item = () => {
  
  // const [tasks,setTasks] = useState([]);
  
  //     // const [delete_id,setDelete_id] = useState();
  //     // const [updateUI,setUpdateUI] = useState(false);
  
  
  
  
  //     useEffect(() => {
  //         axios.get(`${baseURL}/catedata_get`)
  //         .then((res) => {
  //             console.log(res.data);
  //             setTasks(res.data)
  //         })
  //     },[]);
  // ///////////////////////////////////////////////////////
  //   return (
  //     <div className='work-container'>
  //         <h1 className='project-heading'>Catagories</h1>
  //         <div className='project-container'>
  //         {tasks.map((index) => 
  //                     <WorkCard imgsrc={index.Image} title={index.Cate_name} cate_id={index._id} view='' />
  //         )}
  //         </div>
        
  //     </div>
  //   )
  // }


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

export default WorkCard
