import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Select from './Select';
import Question from './Question';
import Test from './Test';
import Mypage from './Mypage';


function Router() {
  return (
    <BrowserRouter>
     <Routes>
       <Route path='/' element={<Home />} />
       <Route path='/login' element={<Login />} />
       <Route path='/signup' element={<Signup />} />
       <Route path='/select' element={<Select />} />
       <Route path='/question/:category' element={<Question />} />
       <Route path='/interview' element={<Test />} />
       <Route path='/mypage' element={<Mypage />} />
     </Routes>
    </BrowserRouter>
  )
}

export default Router