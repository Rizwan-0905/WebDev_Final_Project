import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import './App.css';
import './index.css';
import Signup from './pages/common/Signup';
import Login from './pages/common/Login';
import AvailableTask from './pages/seller/AvailableTask';
import Home from './pages/buuyer/Home';
import Profile from './pages/seller/Profile';
import CreateTask from './pages/buuyer/CreateTask';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children, currentUser }) => {
  return currentUser ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('currentUser');

    if (token && storedUser) {
      try {
        const decoded = jwtDecode(token);
        const expiry = decoded.exp * 1000;
        if (Date.now() >= expiry) {
          localStorage.clear();
        } else {
          setCurrentUser(JSON.parse(storedUser));
        }
      } catch (err) {
        localStorage.clear(); // invalid token
      }
    }
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />

        {/* Protected Routes */}
        <Route
          path="/seller/home"
          element={
            <PrivateRoute currentUser={currentUser}>
              <AvailableTask currentUser={currentUser} />
            </PrivateRoute>
          }
        />

        <Route
          path="/client/home"
          element={
            <PrivateRoute currentUser={currentUser}>
              <CreateTask currentUser={currentUser} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
