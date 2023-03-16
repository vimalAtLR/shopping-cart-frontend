import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Auth(props) {
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();;
  useEffect(() => {
    if (!auth._id) {
      navigate("/login")
    }
  });

  return (
    <>
        <Navbar/>
        {props.children}
    </>
  )
}

export default Auth
