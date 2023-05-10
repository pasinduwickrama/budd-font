import { useState, useEffect } from 'react';
import img1 from '../asses/logo1.png'
import { useNavigate } from 'react-router-dom'
// import { useAppContext } from '../context/appContext';
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../redux/features/auth/authSlice";
import { registerUser, validateEmail, loginUser } from "../services/authService";
import { toast } from "react-toastify"

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "", 
  isText: true,
}
const Rigister = () => {
   
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const [isLoading, setIsLoading] = useState(false);
      const [formData, setformData] = useState(initialState);
      const { name, email, password, password2 } = formData;

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
      };

      const toggle = () => {
        setformData({...formData, isText: !formData.isText});
    };

      const register = async (e) => {
        e.preventDefault();
    
        if (!name || !email || !password  ) {
          return toast.error("All fields are required");
        }
        if (password.length < 6) {
          return toast.error("Passwords must be up to 6 characters");
        }
        if (!validateEmail(email)) {
          return toast.error("Please enter a valid email");
        }
        // if (password !== password2) {
        //   return toast.error("Passwords do not match");
        // }
    
        const userData = {
          name,
          email,
          password,
        };
        setIsLoading(true);
        try {
          const data = await registerUser(userData);
          console.log(data);
          await dispatch(SET_LOGIN(true));
          await dispatch(SET_NAME(data.name));
          navigate("/pr");
          setIsLoading(false);
         
         
        } catch (error) {
          setIsLoading(false);
        }
       
      };

      const login = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
          return toast.error("All fields are required");
        }
    
        if (!validateEmail(email)) {
          return toast.error("Please enter a valid email");
        }
    
        const userData = {
          email,
          password,
        };
        setIsLoading(true);
        try {
          const data = await loginUser(userData);
          console.log(data);
          await dispatch(SET_LOGIN(true));
          await dispatch(SET_NAME(data.name));
          navigate("/pr");
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      };

  return (
    <div className='landinggg'>
       <div className='re'>
            <div className='re-r'>
                    <img src={img1} alt='' />
            </div>    
            <div className='re-l'>
                <form >
                    <div className='re-he'>
                    <h2>Buddhist Diary {formData.isText ? 'Login Here' : 'Register Here'} </h2>
                    </div>
                    {!formData.isText && (
                    <div className='re-in'>
                        <label>Name</label>
                        <input type="text" name='name' 
                         value={name}
                        onChange={handleInputChange} />
                    </div>
                    )}
                    <div className='re-in'>
                        <label>Email</label>
                        <input type="text" name='email' value={email}
                        onChange={handleInputChange} />
                    </div>
                    <div className='re-in'>
                        <label>Password</label>
                        <input type="password" name='password' 
                        value={password}
                        onChange={handleInputChange}  />
                    </div>
                    {/* {!formData.isText && (
                    <div className='re-in'>
                        <label>Password2</label>
                        <input type="password" name='password' 
                         value={password2}
                        onChange={handleInputChange}  />
                    </div>
                    )} */}
                    <div className='re-bu'>
                        {/* <button onClick={register} >{formData.isText ? 'Login' : 'Register'} </button> */}
                          {!formData.isText ?
                            <button onClick={register} >Register </button> : <button onClick={login} >Login </button>
                          } 
                        
                        
                    </div>
                            
                   
                    <div className='re-bu'>
                        <p className='re-bup' onClick={toggle} >{formData.isText ? 'Register Here' : 'Login Here'} </p>
                        {/* <p className='re-bup' onClick={()=>navigate('/forgot')} > forg password </p> */}

                    </div>
                    <div className='re-bu'>
                        <p className='re-bupp' onClick={()=>navigate('/forgot')} > Forgot Password </p>
                    </div>
                </form>
            </div>
       </div>
    </div>
  )
}

export default Rigister