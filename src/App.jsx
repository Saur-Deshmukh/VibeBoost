import { BrowserRouter } from 'react-router-dom';
import Header from './Components/Header';
import Main from './Components/Main';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'
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
