import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../slice/user-slice.js'
import './style-folder/style.css'


const RegLog = () => {

    const [isRegistered, setisRegistered] = useState(false);
    const [data, setData] = useState({
        fullname: "",
        email: "",
        password: ""
    });
    const [checkPassword, setCheckPassword] = useState("");
    const [iscorrect, setIscorrect] = useState(true);
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const dispatch = useDispatch();
    const [isError, setisError] = useState("");
    const [isLoginError, setisLoginError] = useState("");


    const Registered = (val) => {
        setisRegistered(val);
    }

    const handleRegesterChange = (e) => {
        const newData = { ...data };
        newData[e.target.name] = e.target.value;
        setData(newData);
    }

    const handleLoginChange = (e) => {
        const newData = { ...loginData };
        newData[e.target.name] = e.target.value;
        setLoginData(newData);
    }

    const submitLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/app/student-login', loginData);
            if (response && response.data) {
                dispatch(addUser(response.data));
                navigate('/Learning')
            } else if (response && response.success === false && response.message === "user not verified") {
                const resendCode = await axios.put('/app/student-resend', loginData.email);
                if (resendCode && resendCode.success === true) {

                    navigate('/verify-user')
                }
            }
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                console.log(error.response.data.message); // Log the error message from the server

                setisLoginError(error.response.data.message);
                console.log(error.response.status); // Log the status code
            } else if (error.request) {
                // Request was made, but no response was received
                console.log("No response received:", error.request);
            } else {
                // Something else happened while setting up the request
                console.log("Error:", error.message);
            }
        }
    }


    const confirmPassword = (e) => {
        let confPass = [...checkPassword];
        confPass = e.target.value;
        console.log(confPass)
        setCheckPassword(confPass);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (checkPassword != data.password) {
            setIscorrect(false);
            console.log(iscorrect);
        } else {
            setIscorrect(true);
            try {
                const registerResponse = await axios.post('/app/register-student', data);
                if (registerResponse) {
                    console.log(registerResponse);
                    if (registerResponse.data.success == true) {
                        navigate('/verify-user', { state: { email: data.email } })
                        console.log(registerResponse.data);
                    }
                }


            } catch (error) {
                if (error.response) {
                    // Server responded with a status other than 2xx
                    console.log(error.response.data.message); // Log the error message from the server
                    setisError(error.response.data.message);
                    console.log(error.response.status); // Log the status code
                } else if (error.request) {
                    // Request was made, but no response was received
                    console.log("No response received:", error.request);
                } else {
                    // Something else happened while setting up the request
                    console.log("Error:", error.message);
                }
            }
        }
    }

    return (
        <div className='w-full h-[100vh] bg-black flex items-center justify-center' >
            {
                !isRegistered ?
                    <form className='w-full h-[70vh]  flex flex-col items-center py-5  md:w-[35rem] md:h-[32rem] md:border-4 md:border-white rounded-3xl' id='login-form' >
                        <h1 className='text-[2rem] font-bold text-white sm:text-[3rem] mt-3'>Login</h1>
                        <h3 className='text-[1rem] font-[400] text-white mb-4 sm:text-[1.3rem] sm:mb-6'>Continue Your Learnings</h3>
                        <input onChange={handleLoginChange} name='email' id='email' type='email' placeholder='email' className='w-[20rem] px-3 py-[0.5rem] rounded-full outline-none mb-3 sm:w-[30rem] sm:py-[0.7rem] border-2 border-blue-400 text-white' />
                        <input onChange={handleLoginChange} name='password' id='password' type='password' placeholder='password' className='w-[20rem] px-3 py-[0.5rem] rounded-full outline-none mb-4 sm:w-[30rem] sm:py-[0.7rem] border-2 border-blue-400 text-white'/>
                        
                        {
                            isLoginError!==""?<p className='text-red-500 font-bold'> {isLoginError} </p>:<></>
                        }
                        
                        <button id='login-button' className='w-[8rem] h-[3rem] active:scale-90 bg-blue-500 rounded-full mb-3 bg-transparent border-white border-4 text-white' onClick={submitLogin}
                        >
                            Login
                        </button>

                        <p className='text-white font-semibold' onClick={() => Registered(true)}>Sign Up</p>
                    </form> : <form id='register-form' className='w-full h-[70vh]  flex flex-col items-center py-3  md:w-[35rem] md:h-[39rem] md:border-4 md:border-white rounded-3xl' >
                        <h1 className='text-[2rem] font-bold text-white sm:text-[3rem] mt-3'>Register</h1>
                        <h3 className='text-[1rem] font-[400] text-white mb-4 sm:text-[1.3rem] sm:mb-6'>Unlock your learning potential</h3>
                        <input onChange={handleRegesterChange}  name='fullname' type='Fullname' id='fullname' placeholder='full name' className='w-[20rem] px-3 py-[0.5rem] rounded-full outline-none mb-3 sm:w-[30rem] sm:py-[0.7rem] border-2 border-blue-400 text-white' />
                        <input onChange={handleRegesterChange}   name='email' type='email' id='email' placeholder='email' className='w-[20rem] px-3 py-[0.5rem] rounded-full outline-none mb-3 sm:w-[30rem] sm:py-[0.7rem] border-2 border-blue-400 text-white' />
                        <input onChange={handleRegesterChange} name='password' type='password'id='password' placeholder='password' className='w-[20rem] px-3 py-[0.5rem] rounded-full outline-none mb-4 sm:w-[30rem] sm:py-[0.7rem] border-2 border-blue-400 text-white' />
                        <input onChange={confirmPassword} type='password' id='confirm-password' placeholder='Confirm Password' className='w-[20rem] px-3 py-[0.5rem] rounded-full outline-none mb-4 sm:w-[30rem] sm:py-[0.7rem] border-2 border-blue-400 text-white'  />
                        
                        {
                            !iscorrect?<p className='text-red-500 font-bold' id='error-1'>Password Not Matched</p>:<></>
                        }
                        {
                            isError!==""?<p className='text-red-500 font-bold'> {isError} </p>:<></>
                        }
                        
                        <button className='w-[8rem] h-[3rem] bg-blue-500 rounded-full mb-3 bg-transparent active:scale-90 border-white border-4 text-white' onClick={handleSubmit}
                            style={{ boxShadow: "-2px 1px 45px #60a5fa, 5px 5px 50px inset #60a5fa" }}>
                            Register
                        </button>

                        <p className='text-white font-semibold' onClick={() => Registered(false)}>Login</p>
                    </form>
            }
        </div>
    )
}

export default RegLog