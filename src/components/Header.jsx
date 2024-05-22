import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBars } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Header = () => {
  const currentuser = useSelector(state => state.user.currentUser);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <header className="bg-black  text-white p-4 z-111">
      <div className="container mx-auto flex justify-between items-center ">
        <div className="flex items-center">
          <div className="mr-4">
            <Link to="/" className="text-xl font-bold">
              Jimmy Properties
            </Link>
          </div>
          <form
            onSubmit={handleSubmit}
            className='bg-slate-100 p-3 rounded-lg flex items-center mr-2'
          >
            <input
              type='text'
              placeholder='Search...'
              className='bg-transparent text-black focus:outline-none w-24 sm:w-64'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className='text-slate-600' />
            </button>
          </form>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link
            to="/profile"
            className="py-2 hover:text-gray-300"
            onClick={() => handleLinkClick('/signin')}
          >{
              currentuser ?
                (<img src={currentuser.avatar} alt="profile pic" class="rounded-full w-10 h-10 object-cover" />
                ) :
                ("Sign In")
            }
          </Link>
        </div>
        <div className="md:hidden">
          <FaBars className="text-3xl cursor-pointer" onClick={toggleMenu} />
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-black ">
          <div className="flex flex-col items-center">
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
              to="/profile"
              className="py-2 hover:text-gray-300"
              onClick={() => handleLinkClick('/signin')}
            >{
                currentuser ?
                  (<img src={currentuser.avatar} alt="profile pic" class="rounded-full w-10 h-10 object-cover" />
                  ) :
                  ("Sign In")
              }
            </Link>


          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
