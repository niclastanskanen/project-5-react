import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './api/axiosDefaults';

import Login from './components/Login';
import Home from './container/Home';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';

const App = () => {
  const navigate = useNavigate();


  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='/*' element={<Home />} />
      <Route path='/signin' element={<SignInForm />} />
      <Route path='/signup' element={<SignUpForm />} />
    </Routes>
  )
}

export default App