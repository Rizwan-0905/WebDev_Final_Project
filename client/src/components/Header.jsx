import './Header.css';
import React from 'react';

function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-6 shadow-md">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold tracking-wide">Freelance Guru</h1>
        <p className="mt-2 text-sm sm:text-base opacity-80">
          Connecting talent with tasks — effortlessly.
        </p>
      </div>
    </header>
  );
}

export default Header;
