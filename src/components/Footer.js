import React from 'react'
import "../components/FooterStyle.css";
import {FaFacebook, FaHome, FaLinkedin, FaMailBulk, FaPhone, FaTwitter} from 'react-icons/fa';


const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-container'>
            <div className='left'>
                <div className='location'>
                    <FaHome size={20} style={{ color:"#fff",marginRight:"2rem" }}/>
                    <div>
                        <p>Sarkhej Ahmedabad</p>
                        <p>Gujarat</p>
                    </div>
                </div>
                <div className='phone'>
                    <h4>
                    <FaPhone size={20} style={{ color:"#fff",marginRight:"2rem" }}/>
                    +91 9106588074 
                    </h4>    
                </div>
                <div className='phone'>
                    <h4>
                    <FaMailBulk size={20} style={{ color:"#fff",marginRight:"2rem" }}/>
                    vatsalvataliya00@gmail.com 
                    </h4>    
                </div>
                
            </div>
            <div className='right'>
                <h4>About the company</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className='social'>
                <FaFacebook size={30} style={{ color:"#fff",marginRight:"2rem" }}/>
                <FaTwitter size={30} style={{ color:"#fff",marginRight:"2rem" }}/>
                <FaLinkedin size={30} style={{ color:"#fff",marginRight:"2rem" }}/>   

                </div>
            </div>


        </div>
    </div>
  )
}

export default Footer
