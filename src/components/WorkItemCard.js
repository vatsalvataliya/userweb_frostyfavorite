import React from 'react'
import "../components/WorkCardStyle.css";
import pro1 from "../assets/gallery-img-03.jpg";
import { NavLink } from 'react-router-dom';

const WorkCard = (props) => {
  return (
    // <div className='work-container'>
    //     <h1 className='project-heading'>Projects</h1>
    //     <div className='project-container'>
    //         <div className='project-card'>
    //             <img src={pro1} alt='img'/>
    //             <h2 className='project-title'>Project Title</h2>
    //             <div className='pro-detail'>
    //                 <p>This is text</p>
    //                 <div className='pro-btns'>
    //                     <NavLink to="url.com" className='btn'>View</NavLink>
    //                     <NavLink to="url.com" className='btn'>Source</NavLink>
    //                 </div>
    //             </div>

    //         </div>

    //     </div>
      
    // </div>
    <div className='project-card'>
                <img src='' alt='img'/>
                <h2 className='project-title'>{props.cate_id}</h2>
                {/* <div className='pro-detail'>
                    <p>{props.text}</p>
                    <div className='pro-btns'>
                        <NavLink to={props.view} className='btn'>View</NavLink>
                        
                    </div>
                </div> */}

            </div>
  )
}

export default WorkCard
