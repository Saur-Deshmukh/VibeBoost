import { BrowserRouter } from 'react-router-dom';
import Header from './Components/Header';
import Main from './Components/Main';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Output from './Components/Output';
import Login from './Components/Login';
import Logout from './Components/Logout';
import Signup from './Components/SignUp';

function App() {
  return (
    <div className="bg-cover bg-center bg-gray-800 min-h-screen pb-8">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Main />}/>
          <Route path='/output' element = {<Output />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
