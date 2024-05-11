import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { BiLogOut, BiTrash } from 'react-icons/bi';
import { app } from "../firebase";
import { Link } from 'react-router-dom';
import {
  updateUserStart, updateUserSuccessfull, updateUserFailure,
  deleteUserStart, deleteUserSuccessfull, deleteUserFailure,
  signOutStart, signOutSuccessfull, signOutFailure
} from '../Redux/userSlice';
import { useDispatch } from 'react-redux';
import { BACKEND_URL } from '../config';
import axios from 'axios';
import toast from 'react-hot-toast';
import PropertyCard from '../components/PropertyCard';

const Profile = () => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [showListing, setShowListing] = useState([]);
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

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      const res = await axios.get(`${BACKEND_URL}/api/user/signout`);
      if (res.status === 200) {
        toast.success('Signed out successfully')
        dispatch(signOutSuccessfull())
      }
      else {
        toast.error(res.data)
        dispatch(signOutFailure(res.data))
        return;
      }
    } catch (error) {
      dispatch(signOutFailure(error.response.data))
    }

  };

  const handleShowListing = async (e) => {
    try {
      setShowListingError(false);
      const body = {
        access_token: document.cookie.split('=')[1]
      }
      const res = await axios.post(`${BACKEND_URL}/api/user/get-listings/${currentUser._id}`, body);
      if (res.status === 200) {
        setShowListing(res.data)
        console.log(res.data)
      }
      else {
        setShowListingError(true);
        return;
      }
    } catch (error) {
      setShowListingError(true);
    }
  };

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
      </form>
      <div className='flex flex-row gap-1 justify-between mt-4'>
        <Link
          className='bg-green-700 text-white w-1/2 p-3 rounded-lg uppercase text-center hover:opacity-95'
          to={'/create-listing'}
        >
          Create Listing
        </Link>
        <button
          className='bg-white text-green-700 border w-1/2 border-green-700 p-3 rounded-lg uppercase text-center hover:opacity-95'
          onClick={() => handleShowListing()}
        >
          Show Listing
        </button>
      </div>
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

      {showListing && showListing.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>
          {showListing.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
              <PropertyCard property={listing} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
