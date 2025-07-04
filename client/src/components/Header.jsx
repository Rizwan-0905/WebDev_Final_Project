import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-6 shadow-md">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold tracking-wide header-title">Freelance Guru</h1>
        <p className="mt-2 text-sm sm:text-base header-subtitle">
          Connecting talent with tasks — effortlessly.
        </p>
        <div className="mt-4 space-x-4">
          <Link to="/login" className="underline hover:text-gray-200">Login</Link>
          <Link to="/signup" className="underline hover:text-gray-200">Signup</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
