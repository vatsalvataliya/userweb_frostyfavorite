import React from "react";
import "./index.css";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Project from "./routes/Project";
import Contact from "./routes/Contact";
import About from "./routes/About";
import {  Route, BrowserRouter, Routes } from "react-router-dom";
import Signup from "./routes/Signup";
import { useEffect, useState } from 'react';
import { auth } from './Firebase';
import { onAuthStateChanged ,signOut } from 'firebase/auth';
import { CreateProject } from "./routes/CreateProject";
import OnlineSubmit from "./routes/OnlineSubmit";
// import RestaurentProject from "./routes/RestaurentProject";
import MenuItem from "./restaurent/MenuItem";
import RestaurentCategory from "./routes/RestaurentCategory";
import PlaceOrder from "./restaurent/PlaceOrder";
import SignIn from "./restaurent/SignIn";
import OrderDetail from "./restaurent/OrderDetail";

function App() {
  const [authuser,setAuthuser] = useState(null)

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

  // if(authuser != null){

    return (
      <BrowserRouter>
<Routes>

            {/* <Route path="/" element={<Project />} /> */}
            <Route path="/" element={<RestaurentCategory />} />
            <Route path="/menu/:id" element={<MenuItem />} />
            <Route path="/place_order" element={<PlaceOrder />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/order" element={<OrderDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />




            {/* <Route path="/home" element={<Project />} />
            <Route path="/project" element={<Project />} />
            <Route path="/about" element={<Project />} />
            <Route path="/contact" element={<Project />} />
            <Route path="/signup" element={<Project />} />
            <Route path="/createproject" element={<Project/>}/> */}

</Routes>
      </BrowserRouter>
    );
  // }
  // else{
  //   // window.location.href = "/";
  //   return (
  //     <BrowserRouter>
  //       <Routes>

  //       <Route path="/" element={<Login />} />
  //       <Route path="/home" element={<Project />} />
  //         <Route path="/project" element={<Project />} />
  //         <Route path="/about" element={<Project />} />
  //         <Route path="/contact" element={<Project />} />
  //         {/* <Route path="/createproject" element={<CreateProject/>}/> */}
  //       {/* <Route path="/signup" element={<Signup />} /> */}

  //       </Routes>
  //     </BrowserRouter>
        
      
  //   )
  // }
}

export default App;
