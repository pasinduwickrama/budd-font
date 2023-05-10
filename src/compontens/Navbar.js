import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { selectName, SET_LOGIN } from "../redux/features/auth/authSlice";
import { logoutUser } from "../services/authService";
import '../Pages/page.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { MdSchool } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import img1 from '../asses/logo1.png'
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/");
  };
  return (
     
            <div className='nav-body'>
                <div className='nav-l'>
                <img onClick={()=>navigate('/pr')}  src={img1} alt='' /> 
                </div>
                <div className='nav-r'>
                    <button onClick={()=>navigate('/add')}>{name} Add Merit(පින්කම)  </button>
                    {/* <p>Well Come To {name} </p> */}
                    <button onClick={logout}  >logout</button>
                </div>
                {/* <div className='nav-r'>
                  <p>රැස් කරනා පින එයි පසු පස්සේ - සැප සලසන්නට හැමතිස්සේ</p>
                  <p>Merit collected follows one - providing happiness always</p>
                  <p>මේ රැස් කරනා පින එනවාමයි - යන යන  ගමනේ පසු පස්සෙ</p>
                  <p>This merit collected will definitely follow - from place to place, wherever you go</p>
                </div> */}
            </div>
   
  )
}

export default Navbar