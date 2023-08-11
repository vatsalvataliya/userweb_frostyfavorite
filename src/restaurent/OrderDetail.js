import React from 'react'
import Navbar from '../components/Navbar'
import CartToggle from '../restaurent/CartToggle'
import Footer from '../components/Footer'
import OrderReceipt from '../components/OrderReceipt'
import Heroimg2 from '../components/Heroimg2'

const OrderDetail = () => {
  return (
    <div>
        <Navbar/>
        {/* <CartToggle/> */}
        <Heroimg2 heading="PROJECTS" text="Some of my most recent works"/>
        <OrderReceipt/>
        <Footer/>

    </div>
  )
}

export default OrderDetail