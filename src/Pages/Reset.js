import React, { useState } from "react";

import { MdPassword } from "react-icons/md";

import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../services/authService";

const initialState = {
  password: "",
  password2: "",
};

const Reset = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState(initialState);
  const { password, password2 } = formData;

  const { resetToken } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      password,
      password2,
    };

    try {
      const data = await resetPassword(userData, resetToken);
      toast.success(data.message);
      navigate('/')
    } catch (error) {
      console.log(error.message);
    }

    
  };

  return (
    <div className='landinggg' >
      <div className='ref'>
        <div className='refro' >
         
          

          <form onSubmit={reset}>
          <h2>Reset Password</h2>
            <input
              type="password"
              placeholder="New Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              required
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />

            <button className="btnn" type="submit" >
              Reset Password
            </button>
            <div >
              <p>
                <Link to="/"> Home</Link>
              </p>
              <p>
                <Link to="/register">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
