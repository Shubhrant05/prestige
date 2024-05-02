import React, { useState } from 'react';
import { HiOutlineLogout, HiOutlinePencilAlt } from 'react-icons/hi';
import { TiDeleteOutline } from 'react-icons/ti';
import { useSelector } from 'react-redux';

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogout = () => {
    // Logout functionality
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save profile functionality
  };

  const handleDeleteAccount = () => {
    // Delete account functionality
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <button onClick={handleLogout} className="text-red-500 hover:text-red-700">
          <HiOutlineLogout className="w-6 h-6" />
        </button>
      </div>
      <div>
        <div className="flex justify-center mb-4">
          <img src={currentUser.avatar} alt="Profile" className="w-32 h-32 rounded-full border border-gray-300" />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          {isEditing ? (
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <p className="text-center text-lg font-semibold">{name}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          {isEditing ? (
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <p className="text-center text-gray-500">{email}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-around space-x-4">
        {isEditing ? (
          <button onClick={handleSaveProfile} className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md">
            Save
          </button>
        ) : (
          <button onClick={handleEditProfile} className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-md">
            <HiOutlinePencilAlt className="w-6 h-6 mr-2" /> Edit Profile
          </button>
        )}
        <button onClick={handleDeleteAccount} className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md">
          <TiDeleteOutline className="w-6 h-6 mr-2" /> Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
