import { BrowserRouter } from 'react-router-dom';
import Header from './Components/Header';
import Main from './Components/Main';
import Login from './screens/auth/Login';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import GenreTracks from './Components/music';
import { setClientToken } from './spotify';
import Output from './Components/Output';


function App() {
  return (
    <div className="bg-cover bg-center bg-gray-800 min-h-screen pb-8">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Main />}/>
          <Route path='/output' element = {<Output />}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
