import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { BiLogOut, BiTrash } from 'react-icons/bi';
import { app } from "../firebase";
import { Link } from 'react-router-dom';
import {
  updateUserStart, updateUserSuccessfull, updateUserFailure,
  deleteUserStart, deleteUserSuccessfull, deleteUserFailure
} from '../Redux/userSlice';
import { useDispatch } from 'react-redux';
import { BACKEND_URL } from '../config';
import axios from 'axios';
import toast from 'react-hot-toast';

const Profile = () => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
  });
  
  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart());

      const res = await axios.post(`${BACKEND_URL}/api/user/update/${currentUser._id}`, { ...formData, access_token: document.cookie.split('=')[1] });
      if (res.status === 200) {
        toast.success('Profile updated successfully')
        dispatch(updateUserSuccessfull(res.data))
      }
      else {
        toast.error(res.data)
        dispatch(updateUserFailure(res.data))
        return;
      }
    } catch (error) {
      dispatch(updateUserFailure(error.response.data))
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save profile functionality
  };

  const handleDeleteUser = async (e) => {
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(`${BACKEND_URL}/api/user/delete/${currentUser._id}`,
        { data: { access_token: document.cookie.split('=')[1] } });
      if (res.status === 200) {
        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        toast.success('Profile deleted successfully')
        dispatch(deleteUserSuccessfull())
      }
      else {
        toast.error(res.data)
        dispatch(deleteUserFailure(res.data))
        return;
      }

    } catch (error) {
      dispatch(deleteUserFailure(error.response.data))
    }
  };

  const handleSignOut = () => {
    // Sign out functionality
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type='text'
          placeholder='username'
          defaultValue={currentUser.username}
          id='username'
          className='border p-3 rounded-lg'
          onChange={handleChange}
          autoComplete='off'
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          defaultValue={currentUser.email}
          className='border p-3 rounded-lg'
          onChange={handleChange}
          autoComplete='off'
        />
        <input
          type='password'
          placeholder='password'
          onChange={handleChange}
          id='password'
          className='border p-3 rounded-lg'
          autoComplete='off'
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link
          className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
          to={'/create-listing'}
        >
          Create Listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span
          onClick={handleDeleteUser}
          className='text-red-700 cursor-pointer flex gap-2 items-center font-semibold'
        >
          <BiTrash /> Delete account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer flex gap-2 items-center font-semibold'>
          <BiLogOut /> Sign out
        </span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ''}</p>

    </div>
  );
};

export default Profile;
