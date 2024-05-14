import React, { useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import {  RiEyeFill, RiEyeOffFill } from 'react-icons/ri'; 
import { BACKEND_URL } from '../config';
import { useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import Oauth from '../components/Oauth';
import toast from 'react-hot-toast';
import auth_bg from '../Assets/auth_background.jpg'

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false); 
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      let res = await axios.post(`${BACKEND_URL}/api/user/signup`, formData);

      if (res.status === 200) {
        toast('Signup Successful');
        navigate('/signin');
      } else {
        toast(res.data);
        console.log(res);
      }
    } catch (error) {
      toast(error.response.data);
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage: `url(${auth_bg})`,
          filter: 'blur(2px)',
          opacity: 0.5,
          position: 'fixed',
          left: 0,
          width: '100%',
          height: '100%',
          
        }}
      ></div>
      <form className="rounded px-8 pt-6 pb-8 mb-4 lg:w-2/5 w-4/5 z-10" onSubmit={handleSubmit}>
        <h2 className="text-center text-black text-3xl text-bold mb-6">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="bg-transparent border-b border-black w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline placeholder-black"
            id="name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <input
              className="bg-transparent border-b border-black w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline placeholder-black"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <HiOutlineMail className="absolute text-gray-500 top-3 right-3" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              className="bg-transparent border-b border-black w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline placeholder-black"
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-3 right-3 text-gray-500"
            >
              {showPassword ? <RiEyeOffFill /> : <RiEyeFill />} 
            </button>
            
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="bg-transparent border-b border-black w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline placeholder-black"
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between flex-col">
          <button
            className="bg-gray-700 w-full focus:outline-none focus:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:shadow-outline relative"
            type="submit"
          >
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-100"></div>
              </div>
            )}
            Sign Up
          </button>
          <Oauth />
        </div>
        <div className='flex gap-2 mt-5'>
          <p>Have an account?</p>
          <Link to={'/signin'}>
            <span className='text-blue-700'>Sign In</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
