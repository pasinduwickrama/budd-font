import React, { useState } from "react";

import { AiOutlineMail } from "react-icons/ai";

import { Link } from "react-router-dom";
import { forgotPassword, validateEmail } from "../services/authService";
import { toast } from "react-toastify";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const forgot = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter an email");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
    };

    await forgotPassword(userData);
    setEmail("");
  };

  return (
    <div className='landinggg' >
      <div className='ref'>
        <div className='refro' >

          <form onSubmit={forgot}>
          <div className="flex-center">
            <AiOutlineMail size={55} color="#999" />
            <h2>Forgot Password</h2>
          </div>
          
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="btnn" type="submit" >
              Get Reset Email
            </button>
            <div >
             
              <p>
                <Link to="/register">- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
