import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBars } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (path) => {
    setIsOpen(false); 
    navigate(path);
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-4">
            <Link to="/" className="text-xl font-bold">
              Prestige Properties
            </Link>
          </div>
          <div className="hidden md:block relative">
            <input
              type="text"
              placeholder="Search"
              className="px-3 py-1 rounded-md bg-gray-700 focus:outline-none focus:bg-gray-600 text-white"
            />
            <FaSearch className="absolute top-0 right-0 mt-2 mr-2 text-white" />
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link to="/signin" className="hover:text-gray-300">
            Sign In
          </Link>
        </div>
        <div className="md:hidden">
          <FaBars className="text-3xl cursor-pointer" onClick={toggleMenu} />
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="flex flex-col items-center">
          <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="px-3 py-1 rounded-md bg-gray-700 focus:outline-none focus:bg-gray-600 text-white"
              />
              <FaSearch className="absolute top-0 right-0 mt-2 mr-2 text-white" />
            </div>
            <Link
              to="/"
              className="py-2 hover:text-gray-300"
              onClick={() => handleLinkClick('/')}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="py-2 hover:text-gray-300"
              onClick={() => handleLinkClick('/about')}
            >
              About
            </Link>
            <Link
              to="/signin"
              className="py-2 hover:text-gray-300"
              onClick={() => handleLinkClick('/signin')}
            >
              Sign In
            </Link>
            
            
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
