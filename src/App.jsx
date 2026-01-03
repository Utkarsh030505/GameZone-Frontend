import React from 'react';
 import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Register from './Forms/register';
import Login from './Forms/login';
 import Payment from "./Forms/payment";
function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path="/payment" element={<Payment />} />

   </Routes>
   </BrowserRouter>
  );
}

export default App;
