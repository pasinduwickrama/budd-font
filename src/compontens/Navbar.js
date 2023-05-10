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
                    <button onClick={()=>navigate('/add')}>{name} Add pinkama  </button>
                    {/* <p>Well Come To {name} </p> */}
                    <button onClick={logout}  >logout</button>
                </div>
            </div>
   
  )
}

export default Navbar