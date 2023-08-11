import React from 'react'
import Form from '../components/Form'
import Navbar from '../components/Navbar'
import CartToggle from './CartToggle'
import Heroimg2 from '../components/Heroimg2'
import Footer from '../components/Footer'

const PlaceOrder = () => {
  return (
    <div>
    <Navbar/>
    <CartToggle/>
    <Heroimg2 heading="PROJECTS" text="Some of my most recent works"/>
    <Form/>
    <Footer/>
   </div>
  )
}

export default PlaceOrder