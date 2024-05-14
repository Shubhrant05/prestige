import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInSuccessfull } from '../Redux/userSlice';
import { BACKEND_URL } from '../config';
import toast from 'react-hot-toast';

const Oauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const body = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      }
      const res = await axios.post(`${BACKEND_URL}/api/user/google`, body);
      const data = await res.data;
      dispatch(signInSuccessfull(data));
      document.cookie = `access_token=${res.data.access_token}; path=/;`;
      navigate('/');
    } catch (error) {
      toast.error('Could not sign in with google');
      console.log('could not sign in with google', error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className=' mt-2 bg-white w-full focus:outline-none  text-black font-bold py-2 px-4 rounded focus:shadow-outline relative'
    >
      Continue with google
    </button>
  )
}

export default Oauth