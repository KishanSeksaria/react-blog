import React from 'react';
import authService from '../../appwrite/auth.service';
import { logout } from '../../store/authSlice';
import { useDispatch } from 'react-redux';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService
      .logout()
      .then(dispatch(logout()))
      .catch(console.log('Logout error'));
  };

  return (
    <button
      className='px-6 py-2 inline-block duration-200 hover:bg-blue-100 rounded-full'
      onClick={logoutHandler}>
      Logout
    </button>
  );
};

export default LogoutButton;
