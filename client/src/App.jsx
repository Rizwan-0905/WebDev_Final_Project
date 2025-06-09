import { useState } from 'react'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import './App.css'
import './index.css'
import Signup from './pages/common/Signup'
import Login from './pages/common/Login'


function App() {
  return (
    <div>
      <Header/>
      <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    
    </div>
  )
}

export default App;
