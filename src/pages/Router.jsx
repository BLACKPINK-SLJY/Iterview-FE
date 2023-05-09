import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';


function Router() {
  return (
    <BrowserRouter>
     <Routes>
       <Route path='/' element={<Home />} />
       <Route path='/login' element={<Login />} />
       <Route path='/signup' element={<Signup />} />
     </Routes>
    </BrowserRouter>
  )
}

export default Router