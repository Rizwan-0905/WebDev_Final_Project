import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Signup from './pages/common/Signup';
import Login from './pages/common/Login';
import './App.css';
import './index.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
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
}

export default App;
